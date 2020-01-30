import React from "react";
import "../Main.css";

export default function RemoveButton(props) {
    return (
        <button className={"remove_button"}
                onClick={props.onClick}
                type={props.type}>
            {props.value}
        </button>
    )
}