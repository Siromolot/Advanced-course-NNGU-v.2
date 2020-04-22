// импортнем все константы
import * as c from "../constants";
import axios from "axios";

// создаем объект, куда поместим ActionCreator'ы, создающие action'ы
const userAction = {

    // авторизация
    saveAuthUserInputEmail (value) {
        return {
            value,
            type: c.USER_AUTH_INPUT_EMAIL_CHANGED
        }
    },
    saveAuthUserInputPassword (value) {
        return {
            value,
            type: c.USER_AUTH_INPUT_PASSWORD_CHANGED,
        }
    },
    // валидация e-mail
    checkAuthEmail () {
        return (dispatch, getStore) => {
            const store  = getStore();
            console.log(store.user.authEmail);
            if (!store.user.authEmail.includes("@") || !store.user.authEmail.includes(".")) {
                dispatch({
                    type: c.AUTH_USER_EMAIL_INVALID,
                });
            } else {
                dispatch({
                    type: c.AUTH_USER_EMAIL_VALID,
                });
            }
        }
    },
    // вход в аккаунт
    EnterSubmit (event) {
        // event.preventDefault();
        return async (dispatch, getStore) => {
            const store = getStore();
            if (store.user.authValidEmail === "") {
                try {
                    const store = getStore();
                    console.log(store);
                    let user = {
                        email: store.user.authEmail,
                        password: store.user.authPassword,
                    };
                    let response = await axios.post("http://localhost:5000/user/login", user);
                    await localStorage.setItem("token", response.data);
                    // поставить переход на страницу Clients
                    dispatch({
                        type: c.USER_LOG_IN_SUCCESS,
                    });
                    console.log(store.user.userLogin);
                    // this.props.successLoginOrRegister();
                    // this.props.onLogin();
                } catch (error) {
                    console.log(error.response.data.message);
                    dispatch({
                        type: c.USER_LOG_IN_FAILED,
                        errorLoginMes: error.response.data.message,
                    })
                }
            } else {
                dispatch({
                    type: c.AUTH_MAIN_INVALID_MESSAGE,
                })
            }
        }
    },


    // восстановление пароля
    // получение введенных данных
    saveUserRecoverInputEmail (value) {
        return {
            value,
            type: c.USER_RECOVER_INPUT_EMAIL_CHANGED,
        }
    },
    // валидация e-mail
    checkRecoverEmail () {
        return (dispatch, getStore) => {
            const store  = getStore();
            console.log(store.user.recoverEmail);
            if (!store.user.recoverEmail.includes("@") || !store.user.recoverEmail.includes(".")) {
                dispatch({
                    type: c.RECOVER_USER_EMAIL_INVALID,
                });
            } else {
                dispatch({
                    type: c.RECOVER_USER_EMAIL_VALID,
                });
            }
        }
    },
    // отправка письма
    recoverPasswordSubmit(event) {
        return (dispatch, getStore) => {
            event.preventDefault();
            const store = getStore();
            if (store.user.recoverValidEmail === "") {
                // далее выполнить функцию в обертке try.. catch
                console.log("Выполняется какая-то функция отправки письма на почту");
                // после написания try... catch убрать отсюда dispatch
                dispatch({
                            type: c.USER_RECOVER_SUCCESS,
                        });
                // try {
                //     // какая-то функция отправки письма на указанный email
                //     dispatch({
                //         type: c.USER_RECOVER_SUCCESS,
                //     });
                // } catch (e) {
                //     dispatch({
                //         type: c.USER_RECOVER_FAILED,
                //         errorRecoverMes: e.message,
                //     })
                // }
            } else {
                dispatch({
                    type: c.RECOVER_MAIN_INVALID_MESSAGE,
                })
            }
        }
    },


    // регистрация
    // получение введенных данных
    saveRegUserInputName (value) {
        return {
            value,
            type: c.USER_REG_INPUT_NAME_CHANGED,
        }
    },
    saveRegUserInputSurname (value) {
        return {
            value,
            type:c.USER_REG_INPUT_SURNAME_CHANGED,
        }
    },
    saveRegUserInputPosition (value) {
        return {
            value,
            type:c.USER_REG_INPUT_POSITION_CHANGED,
        }
    },
    saveRegUserInputEmail (value) {
        return {
            value,
            type:c.USER_REG_INPUT_EMAIL_CHANGED,
        }
    },
    saveRegUserInputPassword (value) {
        return {
            value,
            type:c.USER_REG_INPUT_PASSWORD_CHANGED,
        }
    },
    saveRegUserInputRepeatPassword (value) {
        return {
            value,
            type:c.USER_REG_INPUT_REPEAT_PASSWORD_CHANGED,
        }
    },
    saveRegUserInputBirthDate (value) {
        return {
            value,
            type:c.USER_REG_INPUT_BIRTHDATE_CHANGED,
        }
    },
    // валидация полей регистрации
    checkRegName () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[A-ZА-ЯЁ-]+$/gi;
            if (!reg.test(store.user.registerName)) {
                dispatch({
                    type: c.REG_USER_NAME_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_NAME_VALID,
                });
            }
        }
    },
    checkRegSurname () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[\sA-ZА-ЯЁ-]+$/gi;
            if (!reg.test(store.user.registerSurname)) {
                dispatch({
                    type: c.REG_USER_SURNAME_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_SURNAME_VALID,
                });
            }
        }
    },
    checkRegPosition () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[\sA-ZА-ЯЁ-]+$/gi;
            if (!reg.test(store.user.registerPosition)) {
                dispatch({
                    type: c.REG_USER_POSITION_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_POSITION_VALID,
                });
            }
        }
    },
    checkRegEmail () {
        return (dispatch, getStore) => {
            const store  = getStore();
            if (!store.user.registerEmail.includes("@") || !store.user.registerEmail.includes(".")) {
                dispatch({
                    type: c.REG_USER_EMAIL_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_EMAIL_VALID,
                });
            }
        }
    },
    checkRegPassword() {
        return (dispatch, getStore) => {
            const store = getStore();
            if (store.user.registerPassword.length < 6 ||
                store.user.registerPassword.length > 30) {
                dispatch({
                    type: c.REG_USER_PASSWORD_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_PASSWORD_VALID,
                });
            }
        }
    },
    checkRegRepeatPassword () {
        return (dispatch, getStore) => {
            const store = getStore();
            if (store.user.registerPassword !== store.user.registerRepeatPassword) {
                dispatch({
                    type: c.REG_USER_REPEAT_PASSWORD_INVALID,
                });
            } else {
                dispatch({
                    type: c.REG_USER_REPEAT_PASSWORD_VALID,
                });
            }
        }
    },
    checkRegBirthDate() {
        return (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.REG_USER_BIRTHDATE_VALID,
            });
            let dateBirth = store.user.registerBirthDate;
            let currentDate = new Date();
            // через slice получим строки YYYY MM DD
            let day = dateBirth.slice(0, 2);
            let month = dateBirth.slice(3, 5);
            let year = dateBirth.slice(6);
            // проверка на ввод нечисловых данных
            if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            // проверка на длину введенного значения
            if (dateBirth.length !== 10) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            if (dateBirth[2] !== "."||
                dateBirth[5] !== ".") {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            // убедимся, что год не более текущего
            if (+year > currentDate.getFullYear()) { //
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            // если год указан текущий, то надо убедиться, что месяц не более текущего
            if ( (+year === currentDate.getFullYear()) && +month > (currentDate.getMonth() + 1) ) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            // если год и месяц указаны текущие, то убедимся, что дата не более текущей
            if ( ( (+year === currentDate.getFullYear()) &&
                +month === (currentDate.getMonth() + 1) ) &&
                +day > currentDate.getDate()) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            // далее проверки на количество месяцев и дней в них (на минимальный год проверку не ставил)
            if (+month < 1 || +day < 1) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            if(+month > 12) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            if ( (+month === 1 || +month === 3 || +month === 5 ||
                +month === 7 || +month === 8 || +month === 10 ||
                +month === 12) && +day > 31) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            if ( (+month === 4 || +month === 6 || +month === 9 ||
                +month === 11) && +day > 30) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
            if( (+month === 2) && +day > 29) {
                dispatch({
                    type: c.REG_USER_BIRTHDATE_INVALID,
                });
            }
        }
    },

    // действие регистрации
    RegisterSubmit (event) {
        return async (dispatch, getStore) => {
            event.preventDefault();
            const store = getStore();
            dispatch ({
                type: c.USER_TRY_TO_REGISTER,
            });
            if (!store.user.registerName ||
                !store.user.registerSurname ||
                !store.user.registerPosition ||
                !store.user.registerEmail ||
                !store.user.registerPassword ||
                !store.user.registerRepeatPassword ||
                !store.user.registerBirthDate) {
                dispatch({
                    type: c.REG_EMPTY_FIELD_MESSAGE,
                })
            } else if(store.user.registerName &&
                store.user.registerSurname &&
                store.user.registerPosition &&
                store.user.registerEmail &&
                store.user.registerPassword &&
                store.user.registerRepeatPassword &&
                store.user.registerBirthDate &&
                !store.user.registerValidName &&
                !store.user.registerValidSurname &&
                !store.user.registerValidPosition &&
                !store.user.registerValidEmail &&
                !store.user.registerValidPassword &&
                !store.user.registerValidRepeatPassword &&
                !store.user.registerValidBirthDate) {
                try {
                    let user = {
                        name: store.user.registerName,
                        surname: store.user.registerSurname,
                        position: store.user.registerPosition,
                        email: store.user.registerEmail,
                        password: store.user.registerPassword,
                        birthDate: store.user.registerBirthDate
                    };
                    let response = await axios.post("http://localhost:5000/user/register", user);
                    await localStorage.setItem("token", response.data);
                    // поставить переход на страницу Clients
                    dispatch({
                        type: c.USER_REGISTER_SUCCESS,
                    });
                } catch (error) {
                    dispatch({
                        type: c.USER_REGISTER_FAILED,
                        errorRegisterMes: error.response.data.message
                    })
                }
            } else {
                dispatch({
                    type: c.REG_MAIN_INVALID_MESSAGE,
                })
            }
        }
    },


    // загрузка всех пользователей
    getColleagues() {
        return async (dispatch, getStore) => {
            // const { } = getStore();
            dispatch({
                type: c.GET_ALL_USERS_LOADING,
            });

            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    }
                };
                let response = await axios.get("http://localhost:5000/users/info", config);
                dispatch({
                    type: c.GET_ALL_USERS_SUCCESS,
                    colleagues: response.data,
                });
            } catch (e) {
                dispatch({
                    type: c.GET_ALL_USERS_FAILED,
                    errorMessage: error.response.data.message,
                });
            }
        }
    },


    // загрузка и действия со своими персональными данными
    getPersonalData() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.GET_PERSONAL_DATA_LOADING,
            });

            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    }
                };
                // проверить query запрос в путе обращения к серверу
                console.log(store.user.userLogin);
                let response = await axios.get(`http://localhost:5000/user/info?email=${store.user.userLogin}`, config);
                dispatch({
                    type: c.GET_PERSONAL_DATA_SUCCESS,
                    personalData: response.data,
                });
            } catch (e) {
                dispatch({
                    type: c.GET_PERSONAL_DATA_FAILED,
                    errorMessage: error.response.data.message,
                });
            }
        }
    },
    // удаление своего аккаунта
    DeletePersonalAccount() {
        return async(dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_DELETE_ACCOUNT,
            });

            try {
                let config = {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem("token")
                    }
                };
                await axios.delete(`http://localhost:5000/user/delete?email=${store.user.userLogin}`, config);
                // поставить переход на страницу LoginIntoAccount
                localStorage.removeItem("token");
                dispatch({
                    type: c.USER_DELETE_ACCOUNT_SUCCESS,
                });
            } catch (e) {
                dispatch({
                    type: c.USER_DELETE_ACCOUNT_FAILED,
                    errorMessage: error.response.data.message,
                });
            }
        }
    },
    // получаем данные из полей
    saveChangeUserInputName (value) {
        return {
            value,
            type: c.USER_CHANGE_DATA_INPUT_NAME_CHANGED,
        }
    },
    saveChangeUserInputSurname (value) {
        return {
            value,
            type: c.USER_CHANGE_DATA_INPUT_SURNAME_CHANGED,
        }
    },
    saveChangeUserInputPassword (value) {
        return {
            value,
            type:c.USER_CHANGE_DATA_INPUT_PASSWORD_CHANGED,
        }
    },
    saveChangeUserInputBirthDate (value) {
        return {
            value,
            type:c.USER_CHANGE_DATA_INPUT_BIRTHDATE_CHANGED,
        }
    },
    // валидация полей изменения персональных данных
    checkPersDataName () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[A-ZА-ЯЁ-]+$/gi;
            if (store.user.changeName === "") {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_NAME_VALID,
                });
            } else if (!reg.test(store.user.changeName)) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_NAME_INVALID,
                });
            } else {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_NAME_VALID,
                });
            }
        }
    },
    checkPersDataSurname () {
        return (dispatch, getStore) => {
            const store = getStore();
            let reg = /^[A-ZА-ЯЁ-]+$/gi;
            if (store.user.changeSurname === "") {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_SURNAME_VALID,
                });
            } else if (!reg.test(store.user.changeSurname)) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_SURNAME_INVALID,
                });
            } else {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_SURNAME_VALID,
                });
            }
        }
    },
    checkPersDataPassword() {
        return (dispatch, getStore) => {
            const store = getStore();
            if (store.user.changePassword === "") {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_PASSWORD_VALID,
                });
            } else if (store.user.changePassword.length < 6 ||
                store.user.changePassword.length > 30) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_PASSWORD_INVALID,
                });
            } else {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_PASSWORD_VALID,
                });
            }
        }
    },
    checkPersDataBirthDate() {
        return (dispatch, getStore) => {
            const store = getStore();

            let dateBirth = store.user.changeBirthDate;
            let currentDate = new Date();
            // через slice получим строки YYYY MM DD
            let day = dateBirth.slice(0, 2);
            let month = dateBirth.slice(3, 5);
            let year = dateBirth.slice(6);
            // проверка на ввод нечисловых данных
            if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            // проверка на длину введенного значения
            if (dateBirth.length !== 10) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if (dateBirth[2] !== "."||
                dateBirth[5] !== ".") {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            // убедимся, что год не более текущего
            if (+year > currentDate.getFullYear()) { //
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            // если год указан текущий, то надо убедиться, что месяц не более текущего
            if ( (+year === currentDate.getFullYear()) && +month > (currentDate.getMonth() + 1) ) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            // если год и месяц указаны текущие, то убедимся, что дата не более текущей
            if ( ( (+year === currentDate.getFullYear()) &&
                +month === (currentDate.getMonth() + 1) ) &&
                +day > currentDate.getDate()) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            // далее проверки на количество месяцев и дней в них (на минимальный год проверку не ставил)
            if (+month < 1 || +day < 1) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if(+month > 12) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if ( (+month === 1 || +month === 3 || +month === 5 ||
                +month === 7 || +month === 8 || +month === 10 ||
                +month === 12) && +day > 31) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if ( (+month === 4 || +month === 6 || +month === 9 ||
                +month === 11) && +day > 30) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if( (+month === 2) && +day > 29) {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_INVALID,
                });
            }
            if (store.user.changeBirthDate === "") {
                dispatch({
                    type: c.USER_CHANGE_PERS_DATA_BIRTHDATE_VALID,
                });
            }
        }
    },
    // действие по изменению персональных данных
    ChangePersonalData(event) {
        return async(dispatch, getStore) => {
            // event.preventDefault();
            const store = getStore();
            dispatch({
                type:c.USER_TRY_TO_CHANGE_PERSONAL_DATA,
            });
            if (store.user.changeName === "" &&
                store.user.changeSurname === "" &&
                store.user.changePassword === "" &&
                store.user.changeBirthDate === "") {
                dispatch({
                    type: c.USER_CHANGE_EMPTY_FIELD_MESSAGE,
                });
            } else if (!store.user.changeValidName &&
                !store.user.changeValidSurname &&
                !store.user.changeValidPassword &&
                !store.user.changeValidBirthDate) {
                try {
                    let user = {
                        // запищем в объект или новое значение или, если поле пустое, то оставим старое полученное значение
                        name: store.user.changeName || store.user.personalData.name,
                        surname: store.user.changeSurname || store.user.personalData.surname,
                        password: store.user.changePassword || store.user.personalData.password,
                        birthDate: store.user.changeBirthDate || store.user.personalData.birthDate
                    };
                    console.log(user);
                    let config = {
                        headers: {
                            Authorization: "Bearer" + " " + localStorage.getItem("token")
                        }
                    };
                    let response = await axios.put(`http://localhost:5000/user/edit?email=${store.user.userLogin}`, user, config);
                    console.log("!");
                    dispatch({
                        type: c.USER_CHANGED_PERSONAL_DATA_SUCCESS,
                        messageChangePersonalData: response.data
                    });
                } catch (e) {
                    dispatch({
                        type: c.USER_CHANGED_PERSONAL_DATA_FAILED,
                        messageChangePersonalData: error.response.data.message,
                    });
                }
            } else {
                dispatch({
                    type: c.CHANGE_PERS_DATA_MAIN_INVALID_MESSAGE,
                });
            }
            }
    },


    // выход из аккаунта
    ExitFromAccount() {
        return (dispatch, getStore) => {
            const store = getStore();
            localStorage.removeItem("token");
            dispatch({
                type: c.USER_LOG_OUT
            });
        console.log(store.user.userLogin)
        }
    },
};

export default userAction;