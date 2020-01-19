import * as c from "../constants";

const initialState = {
    // количество соданных новых задач
    taskNumChildren: 0,
    isLoadingTasks: false,
    // массив загруженных задач
    tasksData: [],
    taskMainMessage: "",
    emptyTasks: "У Вас нет задач",
    // отлов введенного в input нового task
    task: "",
    // taskDoneOrActive: false,
};

export default function taskReducer (state=initialState, action) {
    switch(action.type) {
        case c.TRYING_TO_GET_TASKS:
            return {
                ...state,
                isLoadingTasks: true,
                tasksData: [],
            };
        case c.TASK_GOT_SUCCESS:
            return {
                ...state,
                isLoadingTasks: false,
                tasksData: action.taskData,
                taskMainMessage: "",
                taskNumChildren: 0,
            };
        case c.GOT_EMPTY_TASKS:
            return {
                ...state,
                isLoadingTasks: false,
                taskMainMessage: "У Вас нет задач"
            };
        case c.TASK_GOT_FAILED:
            return {
                ...state,
                isLoadingTasks: false,
                taskMainMessage: "Ошибка загрузки задач"
            };
        case c.CREATE_NEW_TASK_FIELD:
            return {
                ...state,
                taskNumChildren: state.taskNumChildren + 1,
                taskMainMessage: ""
            };
        case c.TASK_INPUT_CHANGED:
            return {
                ...state,
                task: action.value,
            };
        default:
            return state;
    }
};