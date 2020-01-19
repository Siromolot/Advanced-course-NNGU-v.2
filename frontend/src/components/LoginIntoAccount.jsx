import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import userAction from "../actions/user";
import { bindActionCreators } from "redux";

import "./Main.css";
import WelcomeText from "./bricks/WelcomeText";
import LoginInput from "./bricks/LoginInput";
import SubmitButton from "./bricks/SubmitButton";

class LoginIntoAccount extends React.Component {
    constructor(props) {
        super(props);
    }

        render() {
            return (
                this.props.isLoggedIn &&
                    <Redirect to={"/clients"}/> ||
                <div className={"login_box"}>
                    <WelcomeText
                        value={"Добро пожаловать в CRM Samantha"}
                    />

                    <LoginInput
                        type={"email"}
                        placeholder={"Логин (email)"}
                        onChange={(e) => {
                            this.props.actions.saveAuthUserInputEmail(e.target.value)
                        }}
                        onBlur={(e) => {
                            this.props.actions.checkAuthEmail(e.target.value)
                        }}
                    />
                    <p className={"error_input_message"}>{this.props.authValidEmail}</p>

                    <LoginInput
                        type={"password"}
                        placeholder={"Пароль"}
                        onChange={(e) => {
                            this.props.actions.saveAuthUserInputPassword(e.target.value)
                        }}
                    />

                        <SubmitButton
                            value={"Войти"}
                            onClick={this.props.actions.EnterSubmit}
                        />

                    <ul className={"login_questions_box"}>
                        <li key={this.props.unauthPages[1].pageId}>
                            <Link to={"/recover"} className={"login_question"}>
                                {this.props.unauthPages[1].name}
                            </Link>
                        </li>
                        <li key={this.props.unauthPages[2].pageId}>
                            <Link to={"/registration"} className={"login_question"}>
                                {this.props.unauthPages[2].name}
                            </Link>
                        </li>
                    </ul>

                    <div className={"warning"}>
                        {this.props.errorLoginMes}
                    </div>
                </div>
            )
        }
}

const mapStateToProps = state => {
    return {
        ...state.user,
        ...state.general,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userAction, dispatch)
    };
};

const LoginIntoAccountWrapped =
    connect(mapStateToProps, mapDispatchToProps)(LoginIntoAccount);

export default LoginIntoAccountWrapped;