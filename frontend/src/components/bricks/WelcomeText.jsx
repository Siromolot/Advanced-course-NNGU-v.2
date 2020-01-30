import React from "react";
import "../Main.css";

export default function WelcomeText(props){
    return (
        <p className={"welcome_text"}>
            {props.value}
        </p>
    )
}