import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import userAction from "../actions/user";
import "./Main.css";

class ColleaguesList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getColleagues()
    }

    render() {
        return (
            <div>
            {this.props.colleaguesIsLoading ?

                        <div className={"spinner"}>
                            <div className="loader">
                                <div className="inner one"></div>
                                <div className="inner two"></div>
                                <div className="inner three"></div>
                            </div>
                        </div> :

                        <div>
                            {this.props.colleagues.map((colleague, i) => {
                                return (
                                    <li key={i} className={"colleagues_list"}>
                                        <p className={"colleague_name"}>
                                            {[colleague.name, " ", colleague.surname]}
                                        </p>
                                        <div className={"colleagues_contacts"}>
                                            <p className={"colleague_item_contact"}>Должность:</p>
                                            <p className={"colleague_item_value"}>{colleague.position}</p>
                                        </div>
                                        <div className={"colleagues_contacts"}>
                                            <p className={"colleague_item_contact"}>E-mail:</p>
                                            <p className={"colleague_item_value"}>{colleague.email}</p>
                                        </div>
                                        <div className={"colleagues_contacts"}>
                                            <p className={"colleague_item_contact"}>Дата рождения:</p>
                                            <p className={"colleague_item_value"}>{colleague.birthDate}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </div> }
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
        actions: bindActionCreators(userAction, dispatch),
    };
};

const ColleaguesListWrapped =
    connect(mapStateToProps, mapDispatchToProps)(ColleaguesList);

export default ColleaguesListWrapped;