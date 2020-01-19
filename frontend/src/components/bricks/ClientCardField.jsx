import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import clientAction from "../../actions/client";

import LoginInput from "./LoginInput";
import SubmitButton from "./SubmitButton";
import RemoveButton from "./RemoveButton";
import "../Main.css";

class ClientCardField extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className={"main_client_card_box"}>
                {
                    this.props.isLoadingClient &&
                    <div className={"spinner"}>
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    </div>
                }

                <p className={"card_topic_text"}>Карточка Клиента</p>
                <div>
                    <div className={"cardLine"}>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Ф.И.О."}
                                    value={this.props.clientName}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputName(e.target.value)}}
                                    onBlur={(e) => {
                                        this.props.actions.checkClientName(e.target.value)}}/>
                                <p className={"error_input_message"}>{this.props.validClientName}</p>
                            </label>
                        </div>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Организация"}
                                    value={this.props.clientOrganisation}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputOrganisation(e.target.value)}}/>
                            </label>
                        </div>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Город"}
                                    value={this.props.clientCity}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputCity(e.target.value)}}
                                    onBlur={(e) => {
                                        this.props.actions.checkClientCity(e.target.value)}}/>
                                <p className={"error_input_message"}>{this.props.validClientCity}</p>
                            </label>
                        </div>
                    </div>

                    <div className={"cardLine"}>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Телефон"}
                                    value={this.props.clientPhone}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputPhone(e.target.value)}}
                                    onBlur={(e) => {
                                        this.props.actions.checkClientPhone(e.target.value)}}/>
                                <p className={"error_input_message"}>{this.props.validClientPhone}</p>
                            </label>
                        </div>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Почта"}
                                    value={this.props.clientEmail}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputEmail(e.target.value)}}
                                    onBlur={(e) => {
                                        this.props.actions.checkClientEmail(e.target.value)}}/>
                                <p className={"error_input_message"}>{this.props.validClientEmail}</p>
                            </label>
                        </div>
                        <div className={"input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Контрольная точка (дд.мм.гггг)"}
                                    value={this.props.clientNewTaskDate}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputTaskDate(e.target.value)}}
                                    onBlur={(e) => {
                                        this.props.actions.checkClientTaskData(e.target.value)}}/>
                                <p className={"error_input_message"}>{this.props.validClientNewTaskDate}</p>
                            </label>
                        </div>
                    </div>

                    <div className={"cardLine"}>
                        <div className={"big_input_in_card"}>
                            <label>
                                <LoginInput
                                    placeholder={"Текущая задача"}
                                    value={this.props.clientNewTask}
                                    onChange={(e) => {
                                        this.props.actions.saveClientInputTask(e.target.value)}}/>
                            </label>
                        </div>
                        <div className={"input_in_card"}>
                            <select onChange={(e) => {
                                this.props.actions.saveClientInputCondition(e.target.value)}}
                                name="select_client_condition"
                                className="select_opt">
                                <option className="select_opt" value="">Выберите статус</option>
                                <option className="select_opt" value="Не обработан">Не обработан</option>
                                <option className="select_opt" value="Неверный контакт">Неверный контакт</option>
                                <option className="select_opt" value="В работе">В работе</option>
                                <option className="select_opt" value="Договор">Договор</option>
                                <option className="select_opt" value="Отказ">Отказ</option>
                                <option className="select_opt" value="В заморозке">В заморозке</option>
                            </select>
                        </div>
                    </div>

                    <div className={"box_for_button"}>
                        <div className={"side_button"}>
                            <SubmitButton
                                onClick={this.props.actions.addClientToBase}
                                value={"Добавить в базу"} />
                            <SubmitButton
                                onClick={() => {this.props.actions.changeClientInBase(this.props.clientId)}}
                                value={"Изменить данные"} />
                            <p className={"action_message"}>{this.props.actionMessage}</p>
                        </div>
                        <div className={"side_button"}>
                            <RemoveButton
                                onClick={() => {this.props.actions.deleteClient(this.props.clientId)}}
                                value={"Удалить Клиента"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.client
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(clientAction, dispatch),
    };
};

const ClientCardFieldWrapped =
    connect(mapStateToProps, mapDispatchToProps)(ClientCardField);

export default ClientCardFieldWrapped;