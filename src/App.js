import React from "react";
import ReactDOM from "react-dom";

let values = [];
let currentHook = 0;

function useState(initialState) {
  if (typeof values[currentHook] === "undefined")
    values[currentHook] = initialState;

  let hookIndex = currentHook;
  function setState(nextValue) {
    values[hookIndex] = nextValue;
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  return [values[currentHook++], setState];
}

export default function App() {
  currentHook = 0;
  const [enableName, setEnableName] = useState(false);
  const [name, setName] = enableName ? useState("") : ["", () => {}];
  const [lastName, setLastName] = useState("");

  function handleChange(evt) {
    setName(evt.target.value);
  }

  function handleLastNameChange(evt) {
    setLastName(evt.target.value);
  }

  function handleEnableChange(evt) {
    setEnableName(!enableName);
  }

  return (
    <div>
      <h1>
        Typed: {enableName ? name : ""} {lastName}
      </h1>
      <input type="checkbox" value={enableName} onChange={handleEnableChange} />
      <input type="text" value={name} onChange={handleChange} />
      <input type="text" value={lastName} onChange={handleLastNameChange} />
    </div>
  );
}
