import React from "react";
import "../Main.css";

export default function ConditionText(props) {
    return (
        <p className={"condition_text"}>
            {props.body}
        </p>
    )
}
