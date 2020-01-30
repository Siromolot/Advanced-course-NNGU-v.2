import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import clientAction from "../actions/client";
import taskAction from "../actions/task";
import userAction from "../actions/user";

import "./Main.css";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actionClient.getClients();
        this.props.actionUser.getColleagues();
        this.props.actionTask.getCommonTasks();
    }

    render() {
        return (
            <div>

                {(this.props.isLoadingClient ||
                    this.props.colleaguesIsLoading ||
                    this.props.isLoadingTasks) ?

                    <div className={"spinner"}>
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    </div> :

                    <div className={"statistics_main_box"}>
                    <div className={"statistics_item_box"}>
                        <div className={"statistics_row"}>
                            <p className={"main_statistics_point"}>
                                Всего Клиентов:
                            </p>
                            <p className={"main_statistics_value"}>
                                {this.props.clientDataForStat.length}
                            </p>
                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                Не обработан:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "Не обработан").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "Не обработан").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>

                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                Неверный контакт:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "Неверный контакт").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "Неверный контакт").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>
                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                В работе:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "В работе").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "В работе").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>
                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                Договор:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "Договор").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "Договор").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>
                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                Отказ:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "Отказ").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "Отказ").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>
                        </div>
                        <div className={"statistics_row"}>
                            <p className={"statistics_point"}>
                                В заморозке:
                            </p>
                            <div className={"value_row"}>
                                <p className={"statistics_value"}>
                                    {this.props.clientDataForStat.filter(item => item.condition === "В заморозке").length}
                                </p>
                                <p className={"statistics_value"}>
                                    ({(this.props.clientDataForStat.filter(item => item.condition === "В заморозке").length /
                                    this.props.clientDataForStat.length * 100).toFixed(1) + "%"})
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"statistics_item_box"}>
                        <div className={"statistics_row"}>
                            <p className={"main_statistics_point"}>
                                Всего коллег:
                            </p>
                            <p className={"main_statistics_value"}>
                                {this.props.colleagues.length}
                            </p>
                        </div>
                    </div>

                    <div className={"statistics_item_box"}>
                        <div className={"statistics_row"}>
                            <p className={"main_statistics_point"}>
                                Всего задач:
                            </p>
                            <p className={"main_statistics_value"}>
                                {this.props.tasksData.length}
                            </p>
                        </div>
                    </div>
                    </div>
                }
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.client,
        ...state.user,
        ...state.task,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionClient: bindActionCreators(clientAction, dispatch),
        actionTask: bindActionCreators(taskAction, dispatch),
        actionUser: bindActionCreators(userAction, dispatch),
    }
};

const StatisticsWrapped =
    connect(mapStateToProps, mapDispatchToProps)(Statistics);

export default StatisticsWrapped;