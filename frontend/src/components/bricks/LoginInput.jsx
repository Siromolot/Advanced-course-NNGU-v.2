import React from "react";
import "../Main.css";

export default function LoginInput(props) {
    return (
        <input
            className={"login_input"}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            onBlur={props.onBlur}
        />
    )
}