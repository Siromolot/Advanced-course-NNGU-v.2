import React from "react";
import "../Main.css";

export default function LoginQuestion(props) {
    return (
        <div className={"login_questions_box"}>
            <p className={"login_question"}
                onClick={props.onClick}>
                {props.left}
            </p>
            <p className={"login_question"}>
                {props.right}
            </p>
        </div>
    )
}