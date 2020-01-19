import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import taskAction from "../../actions/task";

import "../Main.css";
import { IconContext } from "react-icons";
import { GoTrashcan } from "react-icons/go";
import { MdDone } from "react-icons/md";
import axios from "axios";

class TaskFromBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classContentTask: this.props.doneStatus,
            // состояние для отправки задач на сервер
            task: this.props.value,
            // состояние для удаления
            taskId: this.props.taskId,
            // состояние для отображения текста при редактировании задачи из базы
            changedTask: "Сохранить изменения",
            // состояние для отображения текста если задача удалена
            deleteTask: "",
            errorTask: ""
        };
        this.DoneTask = this.DoneTask.bind(this);
        this.taskChange = this.taskChange.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTaskFromBase = this.deleteTaskFromBase.bind(this);
    }

    // для отслеживания ввода в поле input
    taskChange (event) {
        this.setState({
            task: event.target.value
        });
        console.log("task from taskChange: " + this.state.task);
    }

    // сохраняем отредактированную задачу из базы
    async editTask() {
        this.setState({
            errorTask: "",
        });
        try {
            let task = {
                task: this.state.task,
                taskId: this.state.taskId,
                ownerLogin: this.state.taskId
            };

            let config = {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                }
            };
            let response = await axios.put("http://localhost:5000/task/edit", task, config);
            this.setState({
                changedTask: response.data
            })
        } catch (e) {
            this.setState({
                errorTask: e.response.data.message,
            })

        }
    }

    // замена state для замены класса при клике на иконку "Выполнено"
    DoneTask(e) {
        this.setState({
            classContentTask: !this.state.classContentTask,
        })
    }

    // удаление задачи
    async deleteTaskFromBase() {
        try {
            let config = {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                }
            };
            let response = await axios.delete(`http://localhost:5000/task/delete?taskId=${this.state.taskId}`, config);
            this.setState({
                deleteTask: response.data
            })
        } catch (e) {
            this.setState({
                errorTask: e.response.data.message
            })
        }
    }

    render() {

        // выбор класса для текста: выполнено или в работе
        let classContent =
            this.state.classContentTask ?
                "done_task_text_field" : "active_task_text_field";
        let finalClassContent =
            this.state.deleteTask ?
                "delete_task_text_field" : classContent;
        let classIcon =
            this.state.classContentTask  ?
                "done_todo_icons" : "active_todo_icons";

        return (
                <div className={"task_item_box"}>

                    {this.props.personalDataIsLoading ?

                        <div className={"spinner"}>
                            <div className="loader">
                                <div className="inner one"></div>
                                <div className="inner two"></div>
                                <div className="inner three"></div>
                            </div>
                        </div> :

                        <div className={"task_item"}>
                            <IconContext.Provider value={{className: classIcon}}>
                                <MdDone
                                    onClick={(e) => {this.DoneTask(e),
                                        this.props.actions.doneOrActiveTask(this.props.taskId)}}
                                />

                                <GoTrashcan
                                    onClick={this.deleteTaskFromBase}/>
                            </IconContext.Provider>
                            <input
                                className={finalClassContent}
                                contentEditable={true}
                                onChange={this.taskChange}
                                defaultValue={this.props.value}/>
                        </div>
                    }
                    <p className={"task_item_button"}
                       onClick={this.editTask}>
                        {this.state.deleteTask ||
                        this.state.changedTask }</p>

                    <p className={"task_item_button"}>
                        {this.state.errorTask}</p>
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

const TaskFromBaseWrapped =
    connect(mapStateToProps, mapDispatchToProps)(TaskFromBase);

export default TaskFromBaseWrapped;