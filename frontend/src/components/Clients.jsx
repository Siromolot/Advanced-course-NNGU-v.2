import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import clientAction from "../actions/client";

import NewClient from "./bricks/NewClient";
import ClientsMenu from "./bricks/ClientsMenu";
import ClientSearch from "./bricks/ClientSearch";
import SubmitButton from "./bricks/SubmitButton";
import "./Main.css";

class Clients extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getClients();
    }

    render() {
        let children = [];
        for (let i = 0; i < this.props.numChildren; i++) {
            children.push(<NewClient key={i} number={i}/>)
        }

        return (
            <div className={"clients_main"}>
                <SubmitButton
                    value={"Все Клиенты"}
                    onClick={this.props.actions.getClients}
                />

                <ClientsMenu />
                <ClientSearch />

                {this.props.isLoadingClient ?

                    <div className={"spinner"}>
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    </div> :

                this.props.clientMainMessage ?

                    <div className={"warning"}>
                        {this.props.clientMainMessage}
                    </div> :

                    this.props.clientData.map((item, i) => {
                        return (
                            <NewClient
                                key={i}
                                {...item}/>
                        )
                    })}

                {children}
                <p
                    className={"add_client_icon"}
                    onClick={this.props.actions.AddClient}>
                    +
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.client,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(clientAction, dispatch),
    };
};

const ClientsWrapped =
    connect(mapStateToProps, mapDispatchToProps)(Clients);

export default ClientsWrapped;