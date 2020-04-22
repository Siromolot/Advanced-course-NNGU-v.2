import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import NewTask from "./bricks/NewTask";
import TaskFromBase from "./bricks/TaskFromBase";
import taskAction from "../actions/task";
import "./Main.css";

class CommonTasks extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getCommonTasks()
    }

    render(props) {
        let children = [];
        for (let i = 0; i < this.props.taskNumChildren; i++) {
            children.push (
                <NewTask
                    key={i}
                    number={i}
                />
            )
        }

        return (
            <div className={"task_list"}>
                {/*загружаем задачи из базы*/}
                {
                    this.props.isLoadingTasks &&
                    <div className={"spinner"}>
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                    </div>
                }

                {this.props.taskMainMessage ?

                    <div className={"warning"}>
                        {this.props.taskMainMessage}
                    </div> :

                this.props.tasksData.map((item, i) => {
                    return (
                        <TaskFromBase
                            value={item.task}
                            key={i}
                            taskId={item.taskId}
                            ownerLogin={item.ownerLogin}
                            doneStatus={item.doneStatus}
                        />
                    )
                })}

                {/*и, собственно, добавляем новых детей*/}
                {children}
                <p
                    className={"add_client_icon"}
                    onClick={this.props.actions.AddTaskEvent}>
                    +
                </p>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.task,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(taskAction, dispatch),
    };
};

const TaskWrapped =
    connect(mapStateToProps, mapDispatchToProps)(CommonTasks);

export default TaskWrapped;