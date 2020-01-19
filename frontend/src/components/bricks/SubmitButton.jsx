import React from "react";
import "../Main.css";

export default function SubmitFunction(props) {
    return (
        <button className={"login_button"}
        onClick={props.onClick}
        type={props.type}>
            {props.value}
        </button>
    )
}