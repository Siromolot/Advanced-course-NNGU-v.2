import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import taskAction from "../../actions/task";
import "../Main.css";
import { IconContext } from "react-icons";
import { GoTrashcan } from "react-icons/go";
import { MdDone } from "react-icons/md";
import axios from "axios";

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classContentTask: true,
            renderTask: true,
            // отлов введенной задачи
            task: "",
            // состояние для отображения текста кнопки "Добавить в базу"
            addingTask: "Добавить задачу",
            errorTask: "",
        };
        this.taskFocus = React.createRef();
        this.DoneTask = this.DoneTask.bind(this);
        this.TaskUnmount = this.TaskUnmount.bind(this);
        // функции для отправки задач на сервер
        this.taskChange = this.taskChange.bind(this);
        this.addTaskToBase = this.addTaskToBase.bind(this);
    }

    // чтобы при создании задачи, поле было с фокусом для печати
    makeTextInputFocused() {
        this.taskFocus.current.focus();
    }

    // фокус ставится после того, как задача отрисовалась
    componentDidMount() {
        this.makeTextInputFocused();

    }

    // замена state для замены класса при клике на иконку Выполнено
    DoneTask(e) {
        this.setState({
            classContentTask: !this.state.classContentTask,
        })
    }

    // пробуем удалить отсюда
    TaskUnmount() {
        this.setState({
            renderTask: false
        });
    }

    // для отслеживания ввода в поле input
    taskChange (event) {
        this.setState({
            task: event.target.value
        });
    }

    // сохраняем задачи
    async addTaskToBase() {
        try {
            this.setState({
                errorTask: "",
                addingTask: "Добавить задачу"
            });

            let task = {
                task: this.state.task,
                ownerLogin: this.props.userLogin,
                doneStatus: false
            };
            let config = {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                }
            };
            console.log(task);
            let response = await axios.post("http://localhost:5000/task/add", task, config);

            this.setState({
                addingTask: response.data
            })
        } catch (e) {
            this.setState({
                errorTask: e.response.data.message
            })
        }
    }


    render() {
        // выбор класса для текста: выполнено или в работе
        let classContent = this.state.classContentTask ? "active_task_text_field" : "done_task_text_field";
        let classIcon = this.state.classContentTask ? "active_todo_icons" : "done_todo_icons";

        return (
            // удаленные задачи попросту не рендерятся
            this.state.renderTask ?
                <div className={"task_item_box"}>
                    <div className={"task_item"}>
                        <IconContext.Provider value={{className: classIcon}}>
                            <MdDone
                                onClick={this.DoneTask}/>
                            <GoTrashcan
                                onClick={this.TaskUnmount}/>
                        </IconContext.Provider>
                        <input
                            className={classContent}
                            ref={this.taskFocus}
                            contentEditable={true}
                            onChange={this.taskChange}
                            value={this.state.task}
                        />
                    </div>
                    <p className={"task_item_button"}
                       onClick={this.addTaskToBase}>
                        {this.state.addingTask}</p>
                    <p className={"task_item_button"}>
                        {this.state.errorTask}</p>
                </div>
            : null
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.task,
        userLogin: state.user.userLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(taskAction, dispatch),
    };
};

const NewTaskWrapped =
    connect(mapStateToProps, mapDispatchToProps)(NewTask);

export default NewTaskWrapped;
