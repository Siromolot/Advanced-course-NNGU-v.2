import React from "react";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import userAction from "../actions/user";
import { bindActionCreators } from "redux";

import "./Main.css";
import WelcomeText from "./bricks/WelcomeText";
import LoginInput from "./bricks/LoginInput";
import SubmitButton from "./bricks/SubmitButton";
import ConditionText from "./bricks/ConditionText";


class Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.isLoggedIn &&
                    <Redirect to={"/clients"}/> ||
            <form className={"login_box"}>

                <WelcomeText
                    value={"Регистрация в CRM Samantha"}
                />

                <LoginInput
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputName(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegName(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidName}</p>

                <LoginInput
                    placeholder={"Фамилия"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputSurname(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegSurname(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidSurname}</p>

                <LoginInput
                    placeholder={"Должность"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputPosition(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegPosition(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidPosition}</p>

                <LoginInput
                    placeholder={"Логин (email)"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputEmail(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegEmail(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidEmail}</p>

                <LoginInput
                    placeholder={"Пароль"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputPassword(e.target.value)}}
                    type={"password"}
                    onBlur={(e) => {
                        this.props.actions.checkRegPassword(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidPassword}</p>

                <LoginInput
                    placeholder={"Повторите пароль"}
                    type={"password"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputRepeatPassword(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegRepeatPassword(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidRepeatPassword}</p>

                <LoginInput
                    placeholder={"Дата рождения (дд.мм.гггг)"}
                    onChange={(e) => {
                        this.props.actions.saveRegUserInputBirthDate(e.target.value)}}
                    onBlur={(e) => {
                        this.props.actions.checkRegBirthDate(e.target.value)}}
                />
                <p className={"error_input_message"}>{this.props.registerValidBirthDate}</p>

                <ConditionText
                    body={"* Все поля обязательны к заполнению"}
                />

                    <SubmitButton
                        value={"Зарегистрироваться"}
                        onClick={this.props.actions.RegisterSubmit}
                    />

                <ul className={"login_questions_box"}>
                    <li key={this.props.unauthPages[0].pageId}>
                        <Link to={"/"} className={"login_question"}>
                            {this.props.unauthPages[0].name}
                        </Link>
                    </li>
                    <li key={this.props.unauthPages[1].pageId}>
                        <Link to={"/recover"} className={"login_question"}>
                            {this.props.unauthPages[1].name}
                        </Link>
                    </li>
                </ul>
                <div className={"warning"}>
                    {this.props.registerInputsFullFill ||
                    this.props.errorRegisterMes}
                </div>
            </form>
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

const RegistrationWrapped =
    connect(mapStateToProps, mapDispatchToProps)(Registration);

export default RegistrationWrapped;