const initialState = {
    // страницы
    unauthPages: [
        {pageId: 0, name: "Авторизация", path: "/"},
        {pageId: 1, name: "Забыли пароль?", path: "/recover"},
        {pageId: 2, name: "Регистрация", path: "/registration"},
    ],
    mainPages: [
        {pageId: 3, name: "Клиенты", path: "/clients"},
        {pageId: 4, name: "Коллеги", path: "/colleagues"},
        {pageId: 5, name: "Личные задачи", path: "/tasks"},
        {pageId: 6, name: "Статистика", path: "/statistics"},
        {pageId: 7, name: "Личный кабинет", path: "/account"},
    ],
    additionalPages: [
        {pageId: 0, name: "Выйти", path: "/"}
    ]
};

export default function generalReducer(state=initialState) {
    return state;
}