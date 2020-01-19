// функция создания store
import { createStore, applyMiddleware } from "redux";
// для логгирования
import logger from "redux-logger";
// для возможности возвращать функции, а не объекты в action
import thunk from "redux-thunk";
// для роутинга
import { routerMiddleware } from "connected-react-router";
// для браузерной истории
import { createBrowserHistory } from "history";

// корневой reducer
import createRootReducer from "../reducers";

export const history = createBrowserHistory();
// главный store
const store = createStore(
    createRootReducer(history),
    // middleware как enhancer
    applyMiddleware (
        logger,
        thunk,
        routerMiddleware(history),
    ),
);

export default store;