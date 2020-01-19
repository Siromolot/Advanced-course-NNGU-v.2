// импортнем все константы
import * as c from "../constants";
import axios from "axios";

const taskAction = {

    // автоматическая загрузка задач
    getCommonTasks() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.TRYING_TO_GET_TASKS,
            });
            let config = {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                }
            };
            try {
                let response = await axios.get(`http://localhost:5000/task/info?email=${store.user.userLogin}`, config);
                if (response.data.length !== 0) {
                    dispatch({
                        type: c.TASK_GOT_SUCCESS,
                        taskData: response.data,
                    });
                } else {
                    dispatch({
                        type: c.GOT_EMPTY_TASKS,
                    });
                }
            } catch (e) {
                dispatch({
                    type: c.TASK_GOT_FAILED
                });
            }
        }
    },
    // добавление новой задачи
    AddTaskEvent() {
        return (dispatch) => {
            dispatch({
                type: c.CREATE_NEW_TASK_FIELD
            });
        }
    },
    // отлов введенных в input задач
    saveTaskInput (value) {
        return {
            value,
            type: c.TASK_INPUT_CHANGED
        }
    },
    // добавление задачи в базу
    addTaskToBase(event) {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.TRYING_TO_ADD_TASK
            });
            try {
                let task = {
                    task: store.task.task,
                    ownerLogin: store.user.userLogin,
                    doneStatus: false
                };

                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    }
                };
                await axios.post("http://localhost:5000/task/add", task, config);
                dispatch({
                    type: c.TRYING_TO_ADD_TASK_SUCCESS
                });

            } catch(e) {
                dispatch({
                    type: c.TRYING_TO_ADD_TASK_FAILED
                });
            }
        }
    },
    // отметка задачи выполненной/активной
    doneOrActiveTask(taskId) {
        return async (dispatch) => {
            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    }
                };
                let response = await axios.get(`http://localhost:5000/task/done?taskId=${taskId}`, config);
                return response;

            } catch(e) {
                dispatch({
                    type: c.TRYING_TO_ADD_TASK_FAILED
                });
            }
        }
    },
};

export default taskAction;