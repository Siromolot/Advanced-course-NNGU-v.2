import * as c from "../constants";
import axios from "axios";

const clientAction = {

    // отлов вводимых данных
    saveClientInputName (value) {
        return {
            value,
            type: c.CLIENT_INPUT_NAME_CHANGED
        }
    },
    saveClientInputOrganisation (value) {
        return {
            value,
            type: c.CLIENT_INPUT_ORGANISATION_CHANGED
        }
    },
    saveClientInputCity (value) {
        return {
            value,
            type: c.CLIENT_INPUT_CITY_CHANGED
        }
    },
    saveClientInputPhone (value) {
        return {
            value,
            type: c.CLIENT_INPUT_PHONE_CHANGED
        }
    },
    saveClientInputEmail (value) {
        return {
            value,
            type: c.CLIENT_INPUT_EMAIL_CHANGED
        }
    },
    saveClientInputTaskDate (value) {
        return {
            value,
            type: c.CLIENT_INPUT_CURRENT_TASK_DATE_CHANGED
        }
    },
    saveClientInputTask (value) {
        return {
            value,
            type: c.CLIENT_INPUT_CURRENT_TASK_CHANGED
        }
    },
    saveClientInputCondition (value) {
        return {
            value,
            type: c.CLIENT_INPUT_CURRENT_CONDITION
        }
    },

    // валидация полей
    checkClientName () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[\sA-ZА-ЯЁ-]+$/gi;
            // ошибка будет только при наличии текста в поле. При пустом поле - ошибки валидации не будет
            if(!reg.test(store.client.clientName) && store.client.clientName !== "") {
                dispatch({
                    type: c.CLIENT_NAME_INVALID,
                });
            } else {
                dispatch({
                    type: c.CLIENT_NAME_VALID,
                });
            }
        }
    },
    checkClientCity () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[\sA-ZА-ЯЁ-]+$/gi;
            // ошибка будет только при наличии текста в поле. При пустом поле - ошибки валидации не будет
            if(!reg.test(store.client.clientCity) && store.client.clientCity !== "") {
                dispatch({
                    type: c.CLIENT_CITY_INVALID,
                });
            } else {
                dispatch({
                    type: c.CLIENT_CITY_VALID,
                });
            }
        }
    },
    checkClientPhone () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[\s0-9-+]+$/gi;
            // ошибка будет только при наличии текста в поле. При пустом поле - ошибки валидации не будет
            if(!reg.test(store.client.clientPhone) && store.client.clientPhone !== "") {
                dispatch({
                    type: c.CLIENT_PHONE_INVALID,
                });
            } else {
                dispatch({
                    type: c.CLIENT_PHONE_VALID,
                });
            }
        }
    },
    checkClientEmail () {
        return (dispatch, getStore) => {
            const store = getStore();
            if ( (!store.client.clientEmail.includes("@") || !store.client.clientEmail.includes(".")) &&
                store.client.clientEmail !== "" ) {
                dispatch({
                    type: c.CLIENT_EMAIL_INVALID,
                });
            } else {
                dispatch({
                    type: c.CLIENT_EMAIL_VALID,
                });
            }
        }
    },
    checkClientTaskData () {
        return (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.CLIENT_CURRENT_TASK_DATE_VALID,
            });

            let dateNewTask = store.client.clientNewTaskDate;
            let currentDate = new Date();
            // через slice получим строки YYYY MM DD
            let day = dateNewTask.slice(0, 2);
            let month = dateNewTask.slice(3, 5);
            let year = dateNewTask.slice(6);
            // проверка на ввод нечисловых данных
            if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // проверка на длину введенного значения
            if (dateNewTask.length !== 10) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            if (dateNewTask[2] !== "." ||
                dateNewTask[5] !== ".") {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // убедимся, что год не более текущего
            if (+year < currentDate.getFullYear()) { //
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // если год указан текущий, то надо убедиться, что месяц не более текущего
            if ((+year === currentDate.getFullYear()) && +month < (currentDate.getMonth() + 1)) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // если год и месяц указаны текущие, то убедимся, что дата не более текущей
            if (((+year === currentDate.getFullYear()) &&
                +month === (currentDate.getMonth() + 1)) &&
                +day < currentDate.getDate()) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // далее проверки на количество месяцев и дней в них (на минимальный год проверку не ставил)
            if (+month < 1 || +day < 1) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            if (+month > 12) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            if ((+month === 1 || +month === 3 || +month === 5 ||
                +month === 7 || +month === 8 || +month === 10 ||
                +month === 12) && +day > 31) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            if ((+month === 4 || +month === 6 || +month === 9 ||
                +month === 11) && +day > 30) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            if ((+month === 2) && +day > 29) {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_INVALID,
                });
            }
            // если поле будет стерто после написания, ошибки валидации не будет
            if (store.client.clientNewTaskDate === "") {
                dispatch({
                    type: c.CLIENT_CURRENT_TASK_DATE_VALID,
                });
            }
        }
    },
    // добавление Клиента к базе
    addClientToBase (event) {
        return async (dispatch, getStore) => {
            event.preventDefault();
            const store = getStore();
            dispatch({
                type: c.TRYING_TO_ADD_CLIENT,
            });
            if (store.client.clientName &&
                store.client.clientOrganisation &&
                store.client.clientCity &&
                store.client.clientPhone &&
                store.client.clientEmail &&
                store.client.clientNewTaskDate &&
                store.client.clientNewTask &&
                store.client.clientCondition &&
                !store.client.validClientName &&
                !store.client.validClientCity &&
                !store.client.validClientPhone &&
                !store.client.validClientEmail &&
                !store.client.validClientNewTaskDate) {
                try {
                    let client = {
                        name: store.client.clientName,
                        organisation: store.client.clientOrganisation,
                        city: store.client.clientCity,
                        phone: store.client.clientPhone,
                        email: store.client.clientEmail,
                        newTaskDate: store.client.clientNewTaskDate,
                        newTask: store.client.clientNewTask,
                        condition: store.client.clientCondition
                    };
                    console.log(store.client.clientEmail);

                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.post("http://localhost:5000/clients/add", client, config);
                    dispatch({
                        type: c.ADD_CLIENT_SUCCESS,
                        actionMessage: response.data
                    });
                } catch (e) {
                    dispatch({
                        type: c.ADD_CLIENT_FAILED,
                        actionMessage: e.response.data.message
                    });
                }

            } else if (!store.client.clientName ||
                !store.client.clientOrganisation ||
                !store.client.clientCity ||
                !store.client.clientPhone ||
                !store.client.clientEmail ||
                !store.client.clientNewTaskDate ||
                !store.client.clientNewTask ||
                !store.client.clientCondition) {
                dispatch({
                    type: c.ADD_CLIENT_EMPTY_FIELD_FAILED,
                });

            } else {
                dispatch({
                    type: c.ADD_CLIENT_INVALID_FIELD_FAILED,
                });
            }
        }
    },
// изменение данных Клиента из базы
    changeClientInBase (clientId) {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.TRYING_TO_CHANGE_CLIENT_DATA,
            });
            if (!store.client.clientName &&
                !store.client.clientOrganisation &&
                !store.client.clientCity &&
                !store.client.clientPhone &&
                !store.client.clientEmail &&
                !store.client.clientNewTaskDate &&
                !store.client.clientNewTask &&
                !store.client.clientCondition) {
                dispatch({
                    type: c.CHANGE_CLIENT_DATA_EMPTY_FIELD_FAILED,
                });
            } else if (!store.client.validClientName &&
                !store.client.validClientCity &&
                !store.client.validClientPhone &&
                !store.client.validClientEmail &&
                !store.client.validClientNewTaskDate) {
                try {
                    let client = {
                        clientId: clientId,
                        name: store.client.clientName || store.client.clientData.name,
                        organisation: store.client.clientOrganisation || store.client.clientData.organisation,
                        city: store.client.clientCity || store.client.clientData.city,
                        phone: store.client.clientPhone || store.client.clientData.phone,
                        email: store.client.clientEmail || store.client.clientData.email,
                        newTaskDate: store.client.clientNewTaskDate || store.client.clientData.newTaskDate,
                        newTask: store.client.clientNewTask || store.client.clientData.newTask,
                        condition: store.client.clientCondition || store.client.clientData.condition
                    };

                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.put("http://localhost:5000/clients/edit", client, config);
                    dispatch({
                        type: c.CHANGE_CLIENT_DATA_SUCCESS,
                        actionMessage: response.data
                    });
                } catch (e) {
                    dispatch({
                        type: c.CHANGE_CLIENT_DATA_FAILED,
                        actionMessage: e.response.data.message
                    });
                }
            } else {
                dispatch({
                    type: c.ADD_CLIENT_INVALID_FIELD_FAILED,
                });
            }
        }
    },
    // удаление Клиента
    deleteClient (clientId) {
        return async (dispatch, getStore) => {
            // event.preventDefault();
            const store = getStore();
            // let client = e.target.clientId;
            let client = clientId;
            dispatch({
                type: c.TRYING_TO_DELETE_CLIENT,
            });
            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token")
                    }
                };
                console.log(client, config);
                let response = await axios.delete(`http://localhost:5000/clients/delete?clientId=${client}`, config);
                dispatch({
                    type: c.DELETE_CLIENT_SUCCESS,
                    actionMessage: response.data
                });
            } catch (e) {
                dispatch({
                    type: c.DELETE_CLIENT_FAILED,
                    actionMessage: e.response.data.message
                });
            }
        }
    },
    // создаем новое поле для Клиента
    AddClient() {
        return (dispatch, getStore) => {
            dispatch({
                type: c.CREATE_NEW_CLIENT_FIELD,
            });
        }
    },
    // автоматическая загрузка Клиентов
    getClients() {
        return async (dispatch, getStore) => {
            // const { } = getStore();
            dispatch({
                type: c.GET_CLIENT_LOADING,
            });
            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    }
                };

                let response = await axios.get("http://localhost:5000/clients/info", config);

                dispatch({
                    type: c.GET_CLIENT_SUCCESS,
                    clientData: response.data,
                });

            } catch (e) {
                dispatch({
                    type: c.GET_CLIENT_FAILED,
                });
            }
        }
    },
    // убираем сообщение о выполнненом с Клиентами действии
    clearMessage() {
        return (dispatch, getStore) => {
            dispatch({
                type: c.CLEAR_MESSAGE,
            });
        }
    },
    // отлов введенных параметров для поиска Клиента
    saveSearchClient(value) {
        return (dispatch) => {
            dispatch({
                value,
                type: c.CLIENT_SEARCH_INPUT_CHANGED,
            })
        }
    },
    // функции для загрузки Клиентов по результатам поиска
    searchClientByName(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let name = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${name}&where=name`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByOrganisation(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let organisation = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${organisation}&where=organisation`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByCity(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let city = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${city}&where=city`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByPhone(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let phone = String(store.client.searchInputClient);
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${phone}&where=phone`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByEmail(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let email = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${email}&where=email`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByTaskDate(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let taskDate = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${taskDate}&where=newTaskDate`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByTask(e) {
        return async (dispatch, getStore) => {

            if(e.key === "Enter") {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let task = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${task}&where=newTask`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
            }
        }
    },
    searchClientByCondition(e) {
        return async (dispatch, getStore) => {
                const store = getStore();
                dispatch({
                    type: c.GET_CLIENT_LOADING,
                });
                let condition = store.client.searchInputClient;
                try {
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token"),
                        }
                    };
                    let response = await axios.get(`http://localhost:5000/clients/search?query=${condition}&where=condition`, config);
                    console.log(response.data);
                    dispatch({
                        type: c.GET_SEARCH_CLIENT_SUCCESS,
                        clientData: response.data,
                    });

                } catch (e) {
                    dispatch({
                        type: c.CLIENT_SEARCH_INPUT_FAILED,
                        clientMainMessage: e.response.data.message
                    });
                }
        }
    },
};




export default clientAction;