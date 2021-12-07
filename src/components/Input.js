import React from "react";
import './Input.css'

const Input = ({ name, type, placeholder, value, onChange, width, min, max, onKeyUp }) => {
    return (
        <input className={`Input-container ${width}`}
            name={name}
            type={type}
            min={min}
            max={max}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp} />
    )
}
export default Input;

Input.defaultProps = {
    width: 'middle',
    min: 0,
    max: 0
}