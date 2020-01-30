// функция, соединяющая все функции, работающие со store
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./user";
import clientReducer from "./client"
import taskReducer from "./task";
import generalReducer from "./general";

// Создаем корневой reducer
export default function rootReducer (history) {
    return combineReducers({
        user: userReducer,
        client: clientReducer,
        task: taskReducer,
        general: generalReducer,
        router: connectRouter(history),
    })
}
