import * as c from "../constants";

const initialState = {

    // состояния для валидации input при авторизации
    authValidEmail: "",
    // состояния для авторизации
    authEmail: "",
    authPassword: "",
    errorLoginMes: "",
    // состояния для валидации input восстановления пароля
    recoverValidEmail: "",
    // состояние для восстановления пароля
    recoverEmail: "",
    errorRecoverMes: "",
    successRecoverMes: "",
    // состояния для валидации input при регистрации
    registerValidName: "",
    registerValidSurname: "",
    registerValidPosition: "",
    registerValidEmail: "",
    registerValidPassword: "",
    registerValidRepeatPassword: "",
    registerValidBirthDate: "",
    // состояние для проверки заполненности всех input'ов
    registerInputsFullFill: "",
    // состояния для регистрации
    registerName: "",
    registerSurname: "",
    registerPosition: "",
    registerEmail: "",
    registerPassword: "",
    registerRepeatPassword: "",
    registerBirthDate: "",
    errorRegisterMes: "",
    // состояния для загрузки всех пользователей
    colleaguesIsLoading: false,
    colleagues: [],
    // состояние для загрузки персональных данных
    personalDataIsLoading: false,
    personalData: [],
    // состояния для валидации input при изменении персональных данных
    changeValidName: "",
    changeValidSurname: "",
    changeValidPassword: "",
    changeValidBirthDate: "",
    // состояния для изменения персональных данных пользователя
    changeName: "",
    changeSurname: "",
    changePassword: "",
    changeBirthDate: "",
    messageChangePersonalData: "",
    // начальная страница приложения
    activePageId: 0,
    // проверка на сам факт входа в систему
    isLoggedIn: false,
    // проверяем кто именно залогинился
    userLogin: null,
    // проверка пароля
    userPassword: null,
    // сообщения об ошибке
    errorMessage: "",
};

// Непосредственно, сам reducer, который принимает начальное состояние и action
// и возвращает обновленное состояние
export default function userReducer(state=initialState, action) {
    switch(action.type) {

        // АВТОРИЗАЦИЯ
        // ввод данных
        case c.USER_AUTH_INPUT_EMAIL_CHANGED:
            return {
                ...state,
                authEmail: action.value,
                userLogin: action.value,
            };
        case c.USER_AUTH_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                authPassword: action.value,
            };
            // валидация полей при авторизации
        case c.AUTH_USER_EMAIL_INVALID:
            return {
                ...state,
                authValidEmail: "Некорректный email",
            };
        case c.AUTH_USER_EMAIL_VALID:
            return {
                ...state,
                authValidEmail: "",
            };
        case c.AUTH_MAIN_INVALID_MESSAGE:
            return {
                ...state,
                errorLoginMes: "Исправьте некорректные поля"
            };
            // действие входа в систему
        case c.USER_TRY_TO_LOG_IN:
            return {
                ...state,
                // подумать, надо что-то здесь указывать?
            };
        case c.USER_LOG_IN_SUCCESS:
            return {
                ...state,
                errorLoginMes: "",
                isLoggedIn: true,
                // спорное значение, проверить работоспособность
                // userLogin: initialState.authEmail,
            };
        case c.USER_LOG_IN_FAILED:
            return {
                ...state,
                errorLoginMes: action.errorLoginMes,
            };


        // ВОССТАНОВЛЕНИЕ ПАРОЛЯ
        // ввод данных
        case c.USER_RECOVER_INPUT_EMAIL_CHANGED:
            return {
                ...state,
                recoverEmail: action.value,
            };
        // валидация
        case c.RECOVER_USER_EMAIL_INVALID:
            return {
                ...state,
                recoverValidEmail: "Некорректный email",
            };
        case c.RECOVER_USER_EMAIL_VALID:
            return {
                ...state,
                recoverValidEmail: "",
            };
        case c.RECOVER_MAIN_INVALID_MESSAGE:
            return {
                ...state,
                errorRecoverMes: "Исправьте некорректные поля",
            };
            // отправка данных
        case c.USER_RECOVER_SUCCESS:
            return {
                ...state,
                errorRecoverMes: "",
                successRecoverMes: "Письмо отправлено, проверьте почту",
            };
        case c.USER_RECOVER_FAILED:
            return {
                ...state,
                errorRecoverMes: "Не удалось отправить письмо на указанный email"
            };


        // РЕГИСТРАЦИЯ
        // ввод данных
        case c.USER_REG_INPUT_NAME_CHANGED:
            return {
                ...state,
                registerName: action.value,
            };
        case c.USER_REG_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                registerSurname: action.value,
            };
        case c.USER_REG_INPUT_POSITION_CHANGED:
            return {
                ...state,
                registerPosition: action.value,
            };
        case c.USER_REG_INPUT_EMAIL_CHANGED:
            return {
                ...state,
                registerEmail: action.value,
                userLogin: action.value,
            };
        case c.USER_REG_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                registerPassword: action.value,
            };
        case c.USER_REG_INPUT_REPEAT_PASSWORD_CHANGED:
            return {
                ...state,
                registerRepeatPassword: action.value,
            };
        case c.USER_REG_INPUT_BIRTHDATE_CHANGED:
            return {
                ...state,
                registerBirthDate: action.value,
            };
        // валидация полей регистрации
        case c.REG_USER_NAME_INVALID:
            return {
                ...state,
                registerValidName: "Возможно, некорректно указано имя",
            };
        case c.REG_USER_NAME_VALID:
            return {
                ...state,
                registerValidName: "",
            };
        case c.REG_USER_SURNAME_INVALID:
            return {
                ...state,
                registerValidSurname: "Возможно, некорректно указана фамилия",
            };
        case c.REG_USER_SURNAME_VALID:
            return {
                ...state,
                registerValidSurname: "",
            };
        case c.REG_USER_POSITION_INVALID:
            return {
                ...state,
                registerValidPosition: "Некорректно указана должность",
            };
        case c.REG_USER_POSITION_VALID:
            return {
                ...state,
                registerValidPosition: "",
            };
        case c.REG_USER_EMAIL_INVALID:
            return {
                ...state,
                registerValidEmail: "Некорректно указан email",
            };
        case c.REG_USER_EMAIL_VALID:
            return {
                ...state,
                registerValidEmail: "",
            };
        case c.REG_USER_PASSWORD_INVALID:
            return {
                ...state,
                registerValidPassword: "Пароль должен быть от 6 до 30 символов",
            };
        case c.REG_USER_PASSWORD_VALID:
            return {
                ...state,
                registerValidPassword: "",
            };
        case c.REG_USER_REPEAT_PASSWORD_INVALID:
            return {
                ...state,
                registerValidRepeatPassword: "Неверно повторен пароль",
            };
        case c.REG_USER_REPEAT_PASSWORD_VALID:
            return {
                ...state,
                registerValidRepeatPassword: "",
            };
        case c.REG_USER_BIRTHDATE_INVALID:
            return {
                ...state,
                registerValidBirthDate: "Некорректно указана дата",
            };
        case c.REG_USER_BIRTHDATE_VALID:
            return {
                ...state,
                registerValidBirthDate: "",
            };
        case c.REG_EMPTY_FIELD_MESSAGE:
            return {
                ...state,
                registerInputsFullFill: "Заполните все поля"
            };
        case c.REG_MAIN_INVALID_MESSAGE:
            return {
                ...state,
                registerInputsFullFill: "Исправьте заполненные поля",
            };


        // действие регистрации
        case c.USER_TRY_TO_REGISTER:
            return {
                ...state,
                // также как и с авторизацией - подумать, надо ли что-то писать
            };
        case c.USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                registerInputsFullFill: "",
            };
        case c.USER_REGISTER_FAILED:
            return {
                ...state,
                errorRegisterMes: action.errorRegisterMes,
            };


            // ЗАГРУЗКА ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
        case c.GET_ALL_USERS_LOADING:
            return {
                ...state,
                colleaguesIsLoading: true,
                errorMessage: "",
            };
        case c.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                colleagues: action.colleagues,
                colleaguesIsLoading: false,
            };
        case c.GET_ALL_USERS_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                colleaguesIsLoading: false,
            };

            // ЗАГРУЗКА И ДЕЙСТВИЯ СО СВОИМИ ПЕРСОНАЛЬНЫМИ ДАННЫМИ
        case c.GET_PERSONAL_DATA_LOADING:
            return {
                ...state,
                personalDataIsLoading: true,
                messageChangePersonalData: "",
            };
        case c.GET_PERSONAL_DATA_SUCCESS:
            return {
                ...state,
                personalData: action.personalData,
                personalDataIsLoading: false,
                errorMessage: "",
            };
        case c.GET_PERSONAL_DATA_FAILED:
            return {
                ...state,
                personalDataIsLoading: false,
                errorMessage: action.errorMessage
            };
        case c.USER_TRY_TO_DELETE_ACCOUNT:
            return {
                ...state,
                // также как и с авторизацией - подумать, надо ли что-то писать
            };
        case c.USER_DELETE_ACCOUNT_SUCCESS:
            return {
                ...initialState,
            };
        case c.USER_DELETE_ACCOUNT_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        // ввод данных
        case c.USER_CHANGE_DATA_INPUT_NAME_CHANGED:
            return {
                ...state,
                changeName: action.value,
            };
        case c.USER_CHANGE_DATA_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                changeSurname: action.value,
            };
        case c.USER_CHANGE_DATA_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                changePassword: action.value,
            };
        case c.USER_CHANGE_DATA_INPUT_BIRTHDATE_CHANGED:
            return {
                ...state,
                changeBirthDate: action.value,
            };
        // валидация полей изменения персональных данных
        case c.USER_CHANGE_PERS_DATA_NAME_INVALID:
            return {
                ...state,
                changeValidName: "Возможно, некорректное имя"
            };
        case c.USER_CHANGE_PERS_DATA_NAME_VALID:
            return {
                ...state,
                changeValidName: ""
            };
        case c.USER_CHANGE_PERS_DATA_SURNAME_INVALID:
            return {
                ...state,
                changeValidSurname: "Возможно, некорректная фамилия"
            };
        case c.USER_CHANGE_PERS_DATA_SURNAME_VALID:
            return {
                ...state,
                changeValidSurname: ""
            };
        case c.USER_CHANGE_PERS_DATA_PASSWORD_INVALID:
            return {
                ...state,
                changeValidPassword: "Пароль - от 6 до 30 символов"
            };
        case c.USER_CHANGE_PERS_DATA_PASSWORD_VALID:
            return {
                ...state,
                changeValidPassword: ""
            };
        case c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID:
            return {
                ...state,
                changeValidBirthDate: "Некорректная дата"
            };
        case c.USER_CHANGE_PERS_DATA_BIRTHDATE_VALID:
            return {
                ...state,
                changeValidBirthDate: ""
            };
        // действие по изменению персональных данных
        case c.USER_TRY_TO_CHANGE_PERSONAL_DATA:
            return {
                ...state,
                // personalDataIsLoading: true,
                messageChangePersonalData: "",
            };
        case c.USER_CHANGE_EMPTY_FIELD_MESSAGE:
            return {
                ...state,
                messageChangePersonalData: "В полях отсутствуют данные",
                personalDataIsLoading: false,
            };
        case c.USER_CHANGED_PERSONAL_DATA_SUCCESS:
            return {
                ...state,
                messageChangePersonalData: action.messageChangePersonalData,
                changeName: "",
                changeSurname: "",
                changePassword: "",
                changeBirthDate: "",
                personalDataIsLoading: false,
            };
        case c.USER_CHANGED_PERSONAL_DATA_FAILED:
            return {
                ...state,
                messageChangePersonalData: action.messageChangePersonalData,
                personalDataIsLoading: false,
            };
        case c.CHANGE_PERS_DATA_MAIN_INVALID_MESSAGE:
            return {
                ...state,
                messageChangePersonalData: "Исправьте некорректные поля",
                personalDataIsLoading: false,
            };


            // ВЫХОД ИЗ АККАУНТА
        case c.USER_LOG_OUT:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}