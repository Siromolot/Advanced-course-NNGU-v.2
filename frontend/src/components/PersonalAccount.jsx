import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import WelcomeText from "./bricks/WelcomeText";
import LoginInput from "./bricks/LoginInput";
import "./Main.css";
import SubmitButton from "./bricks/SubmitButton";
import userAction from "../actions/user";


class PersonalAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    // вызываем загрузку личных данных после отрисовки компонента
    componentDidMount() {
        this.props.actions.getPersonalData()
    }

    render() {
        return (
            <div>
                {this.props.personalDataIsLoading ?

                    <div className={"spinner"}>
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    </div> :

                    <div className={"account_main_box"}>
                    <div className={"account_block"}>
                        <p className={"account_name"}>{this.props.personalData.name + " " + this.props.personalData.surname}</p>
                        <div className={"info_and_edit_blocks"}>
                            <div className={"account_left_block_info"}>
                                <div className={"account_info_item"}>
                                    <p className={"account_info_field"}>
                                        Должность:
                                    </p>
                                    <p className={"account_info_value"}>
                                        {this.props.personalData.position}
                                    </p>
                                </div>
                                <div className={"account_info_item"}>
                                    <p className={"account_info_field"}>
                                        Почта:
                                    </p>
                                    <p className={"account_info_value"}>
                                        {this.props.personalData.email}
                                    </p>
                                </div>
                                <div className={"account_info_item"}>
                                    <p className={"account_info_field"}>
                                        Дата рождения:
                                    </p>
                                    <p className={"account_info_value"}>
                                        {this.props.personalData.birthDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <SubmitButton
                            value={"Удалить аккаунт"}
                            onClick={this.props.actions.DeletePersonalAccount}/>
                    </div>

                        <div className={"login_box_change_personal_data"}>
                            <WelcomeText
                                value={"Изменить личные данные"}
                            />
                            <LoginInput
                                placeholder={"Имя"}
                                value={this.props.changeName}
                                onChange={(e) => {
                                    this.props.actions.saveChangeUserInputName(e.target.value)}}
                                onBlur={(e) => {
                                    this.props.actions.checkPersDataName(e.target.value)}}
                            />
                            <p className={"error_input_message"}>{this.props.changeValidName}</p>

                            <LoginInput
                                placeholder={"Фамилия"}
                                value={this.props.changeSurname}
                                onChange={(e) => {
                                    this.props.actions.saveChangeUserInputSurname(e.target.value)}}
                                onBlur={(e) => {
                                    this.props.actions.checkPersDataSurname(e.target.value)}}
                            />
                            <p className={"error_input_message"}>{this.props.changeValidSurname}</p>

                            <LoginInput
                                placeholder={"Пароль"}
                                value={this.props.changePassword}
                                onChange={(e) => {
                                    this.props.actions.saveChangeUserInputPassword(e.target.value)}}
                                type={"password"}
                                onBlur={(e) => {
                                    this.props.actions.checkPersDataPassword(e.target.value)}}
                            />
                            <p className={"error_input_message"}>{this.props.changeValidPassword}</p>

                            <LoginInput
                                placeholder={"Дата рождения"}
                                value={this.props.changeBirthDate}
                                onChange={(e) => {
                                    this.props.actions.saveChangeUserInputBirthDate(e.target.value)}}
                                onBlur={(e) => {
                                    this.props.actions.checkPersDataBirthDate(e.target.value)}}
                            />
                            <p className={"error_input_message"}>{this.props.changeValidBirthDate}</p>

                            <SubmitButton
                                value={"Изменить"}
                                onClick={this.props.actions.ChangePersonalData}
                            />

                            <div className={"mes_change_pers_data"}>{this.props.messageChangePersonalData}</div>
                        </div>

                    </div>
                }
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userAction, dispatch)
    };
};

const PersonalAccountWrapped =
    connect(mapStateToProps, mapDispatchToProps)(PersonalAccount);

export default PersonalAccountWrapped;
