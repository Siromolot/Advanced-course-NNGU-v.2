import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import clientAction from "../../actions/client";

import ClientCardField from "./ClientCardField";
import "../Main.css";

class NewClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCard: false
        };
        this.openCloseCard = this.openCloseCard.bind(this);
    }

    openCloseCard() {
        this.setState({
            openCard: !this.state.openCard
        });
    }

    render() {
        return (
            <div>
                <div className={"new_client"}>
                    <div
                        className={"clients client_name"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.name}
                    </div>

                    <div
                        className={"clients client_organisation"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.organisation}
                    </div>

                    <div
                        className={"clients client_city"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.city}
                    </div>

                    <div
                        className={"clients client_phone"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.phone}
                    </div>

                    <div
                        className={"clients word_wrap client_email"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.email}
                    </div>

                    <div
                        className={"clients client_control"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.newTaskDate}
                    </div>

                    <div
                        className={"clients client_task"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.newTask}
                    </div>

                    <div
                        className={"clients client_current_condition"}
                        onClick={(e) => {this.openCloseCard(e), this.props.actions.clearMessage(e)}}>
                        {this.props.condition}
                    </div>

                </div>
                {this.state.openCard ? <ClientCardField {...this.props}/> : null}
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

const NewClientWrapped =
    connect(mapStateToProps, mapDispatchToProps)(NewClient);

export default NewClientWrapped;