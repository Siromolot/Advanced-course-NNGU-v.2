import * as c from "../constants";

const initialState = {
    // из компонента ClientCardField
    // состояния валидации полей Клиента
    validClientName: "",
    validClientCity: "",
    validClientPhone: "",
    validClientEmail: "",
    validClientNewTaskDate: "",
    // состояния для отправки на сервер
    clientName: "",
    clientOrganisation: "",
    clientCity: "",
    clientPhone: "",
    clientEmail: "",
    clientNewTaskDate: "",
    clientNewTask: "",
    clientCondition: "",
    // состояние для отображения сообщения об успешном действии или ошибке
    actionMessage: null,
    // обращение к базе
    isLoadingClient: false,
    // открытие карточки Клиента
    openClientCard: false,
    // количество созданных новых строк для Клиентов
    numChildren: 0,
    // загруженный массив с Клиентами
    clientData: [],
    clientDataForStat: [],
    // сообщение о неуспешной загрузке Клиентов
    clientMainMessage: "",
    // отлов введенных данных для поиска Клиента
    searchInputClient: "",

};

export default function clientReducer(state=initialState, action) {
    switch(action.type) {
        // ВНЕСЕНИЕ ДАННЫХ О НОВОМ КЛИЕНТЕ
            // автоматическая загрузка Клиентов
        case c.GET_CLIENT_LOADING:
            return {
                ...state,
                isLoadingClient: true,
                actionMessage: "",
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.GET_CLIENT_SUCCESS:
            return {
                ...state,
                clientData: action.clientData,
                clientDataForStat: action.clientData,
                isLoadingClient: false,
                clientMainMessage: "",
                numChildren: 0,
            };
        case c.GET_SEARCH_CLIENT_SUCCESS:
            return {
                ...state,
                clientData: action.clientData,
                isLoadingClient: false,
                clientMainMessage: "",
                numChildren: 0,
            };
        case c.CLEAR_MESSAGE:
            return {
                ...state,
                actionMessage: "",
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.GET_CLIENT_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                clientMainMessage: "Не удалось загрузить список Клиентов",
            };
            // создание поля для нового Клиента
        case c.CREATE_NEW_CLIENT_FIELD:
            return {
                ...state,
                numChildren: state.numChildren + 1,
            };
            // открытие карточки Клиента
        case c.OPEN_CLOSE_CLIENT_CARD:
            return {
                ...state,
                openClientCard: !state.openClientCard,
            };
            // отлов введенных данных
        case c.CLIENT_INPUT_NAME_CHANGED:
                return {
                    ...state,
                    clientName: action.value,
                };
        case c.CLIENT_INPUT_ORGANISATION_CHANGED:
            return {
                ...state,
                clientOrganisation: action.value,
            };

        case c.CLIENT_INPUT_CITY_CHANGED:
            return {
                ...state,
                clientCity: action.value,
            };
        case c.CLIENT_INPUT_PHONE_CHANGED:
            return {
                ...state,
                clientPhone: action.value,
            };
        case c.CLIENT_INPUT_EMAIL_CHANGED:
            return {
                ...state,
                clientEmail: action.value,
            };
        case c.CLIENT_INPUT_CURRENT_TASK_DATE_CHANGED:
            return {
                ...state,
                clientNewTaskDate: action.value,
            };
        case c.CLIENT_INPUT_CURRENT_TASK_CHANGED:
            return {
                ...state,
                clientNewTask: action.value,
            };
        case c.CLIENT_INPUT_CURRENT_CONDITION:
            return {
                ...state,
                clientCondition: action.value,
            };
            // валидация данных в полях о Клиенте
        case c.CLIENT_NAME_INVALID:
            return {
                ...state,
                validClientName: "Некорректное имя",
            };
        case c.CLIENT_NAME_VALID:
            return {
                ...state,
                validClientName: "",
            };
        case c.CLIENT_CITY_INVALID:
            return {
                ...state,
                validClientCity: "Некорректное название города",
            };
        case c.CLIENT_CITY_VALID:
            return {
                ...state,
                validClientCity: "",
            };
        case c.CLIENT_PHONE_INVALID:
            return {
                ...state,
                validClientPhone: "Некорректный номер телефона",
            };
        case c.CLIENT_PHONE_VALID:
            return {
                ...state,
                validClientPhone: "",
            };
        case c.CLIENT_EMAIL_INVALID:
            return {
                ...state,
                validClientEmail: "Некорректный адрес почты",
            };
        case c.CLIENT_EMAIL_VALID:
            return {
                ...state,
                validClientEmail: "",
            };
        case c.CLIENT_CURRENT_TASK_DATE_INVALID:
            return {
                ...state,
                validClientNewTaskDate: "Некорректная дата события",
            };
        case c.CLIENT_CURRENT_TASK_DATE_VALID:
            return {
                ...state,
                validClientNewTaskDate: "",
            };
            // сохранение Клиента в базе
        case c.TRYING_TO_ADD_CLIENT:
            return {
                ...state,
                // isLoadingClient: true,
                actionMessage: "",
            };
        case c.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.ADD_CLIENT_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
            };
        case c.ADD_CLIENT_EMPTY_FIELD_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: "Заполните все поля",
            };
        case c.ADD_CLIENT_INVALID_FIELD_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: "Исправьте некорректные поля",
            };
            // изменение данных Клиента
        case c.TRYING_TO_CHANGE_CLIENT_DATA:
            return {
                ...state,
                // isLoadingClient: true,
                actionMessage: "",
            };
        case c.CHANGE_CLIENT_DATA_SUCCESS:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.CHANGE_CLIENT_DATA_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.CHANGE_CLIENT_DATA_EMPTY_FIELD_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: "Не изменено ни одного поля",
            };
            // удаление Клиента
        case c.TRYING_TO_DELETE_CLIENT:
            return {
                ...state,
                // isLoadingClient: true,
                // actionMessage: "",
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
                clientName: "",
                clientOrganisation: "",
                clientCity: "",
                clientPhone: "",
                clientEmail: "",
                clientNewTaskDate: "",
                clientNewTask: "",
                clientCondition: "",
            };
        case c.DELETE_CLIENT_FAILED:
            return {
                ...state,
                isLoadingClient: false,
                actionMessage: action.actionMessage,
            };
            // отлов информации поиска Клиента
        case c.CLIENT_SEARCH_INPUT_CHANGED:
            return {
                ...state,
                searchInputClient: action.value,
            };
            // неуспешная попытка поиска Клиентов
        case c.CLIENT_SEARCH_INPUT_FAILED:
            return {
                ...state,
                clientMainMessage: action.clientMainMessage,
                isLoadingClient: false,
            };

        default: return state;
    }
}