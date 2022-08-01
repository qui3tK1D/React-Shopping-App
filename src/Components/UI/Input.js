import React, { useRef } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(function (props, ref) {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} ref={ref} />
    </div>
  );
});

export default Input;
