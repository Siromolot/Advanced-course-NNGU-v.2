import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import userAction from "../actions/user";
import { bindActionCreators } from "redux";

import "./Main.css";
import WelcomeText from "./bricks/WelcomeText";
import LoginInput from "./bricks/LoginInput";
import SubmitButton from "./bricks/SubmitButton";

class ForgotPass extends React.Component {
    constructor(props) {
        super(props);
    }

        render() {
            return (
                <form className={"login_box"}>
                    <WelcomeText
                        value={"Восстановление пароля"}
                    />

                    <LoginInput
                        type={"text"}
                        placeholder={"Введите Ваш логин (email)"}
                        onChange={(e) => {
                            this.props.actions.saveUserRecoverInputEmail(e.target.value)
                        }}
                        onBlur={this.props.actions.checkRecoverEmail}
                    />
                    <p className={"error_input_message"}>{this.props.recoverValidEmail}</p>

                    <SubmitButton
                        value={"Отправить"}
                        onClick={this.props.actions.recoverPasswordSubmit}
                    />

                    <ul className={"login_questions_box"}>
                        <li key={this.props.unauthPages[0].pageId}>
                            <Link to={"/"}
                                  className={"login_question"}>
                                {this.props.unauthPages[0].name}
                            </Link>
                        </li>
                        <li key={this.props.unauthPages[2].pageId}>
                            <Link to={"/registration"}
                                  className={"login_question"}>
                                {this.props.unauthPages[2].name}
                            </Link>
                        </li>
                    </ul>

                    <div className={"warning"}>
                        {this.props.errorRecoverMes}
                    </div>

                    <div className={"success"}>
                        {this.props.successRecoverMes}
                    </div>
                </form>
            )
        }
}

    const mapStateToProps = state => {
    return {
        ...state.user,
        ...state.general
    };
};

    const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userAction, dispatch)
    };
};

    const ForgotPassWrapped =
    connect(mapStateToProps, mapDispatchToProps)(ForgotPass);

    export default ForgotPassWrapped;