import React, { useEffect, useRef } from "react";
import "../Switch.css";

const Switch = ({ isOn, handleToggle, unique }) => {
  const test = useRef();
  useEffect(() => {}, []);

  return (
    <>
      <input
        className="react-switch-checkbox"
        id={unique}
        type="checkbox"
        checked={isOn}
        value={isOn}
        onChange={handleToggle}
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className="react-switch-label"
        htmlFor={unique}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
