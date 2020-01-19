import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import clientAction from "../../actions/client";

import "../Main.css";

class ClientSearch extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        return (
            <div className={"search_menu"}>
                <input className={"search_cell client_name"}
                    placeholder={"Поиск"}
                    onChange={
                        (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                        onKeyDown={this.props.actions.searchClientByName}
                />

                <input className={"search_cell client_organisation"}
                       placeholder={"Поиск"}
                       onChange={
                           (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByOrganisation}
                />

                <input className={"search_cell client_city"}
                       placeholder={"Поиск"}
                       onChange={
                           (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByCity}
                />

                <input className={"search_cell client_phone"}
                       placeholder={"Поиск"}
                       onChange={
                            (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByPhone}
                />

                <input className={"search_cell client_email"}
                       placeholder={"Поиск"}
                       onChange={
                           (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByEmail}
                />

                <input className={"search_cell client_control"}
                       placeholder={"Поиск"}
                       onChange={
                           (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByTaskDate}
                />

                <input className={"search_cell client_task"}
                       placeholder={"Поиск"}
                       onChange={
                           (e) => {this.props.actions.saveSearchClient(e.target.value)}}
                       onKeyDown={this.props.actions.searchClientByTask}
                />

                <div className={"search_cell client_current_condition"}>
                <select onChange={
                    (e) => {this.props.actions.saveSearchClient(e.target.value),
                this.props.actions.searchClientByCondition(e)}}
                        name="search_client_condition"
                        className={"search_condition"}>
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

const ClientSearchWrapped =
    connect(mapStateToProps, mapDispatchToProps)(ClientSearch);

export default ClientSearchWrapped;
