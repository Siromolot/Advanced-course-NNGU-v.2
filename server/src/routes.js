// "use strict";

import controllers from "./controllers.js";

// подключаем Joi (для валидации входящих данных) до контроллеров, ибо туда должны уйти уже отвалидированные данные
import Joi from "@hapi/joi";

// один объект - один роут
export default [
    // роуты для работы с пользователями:

    // ЗАПРОС К БД НА РЕГИСТРАЦИЮ
    {
        // обычно у POST и PUT запросов есть тело, называемое payload
        method: "POST",
        path: "/user/register",
        handler: controllers.register,
        // добавляем валидацию с помощью @hapi/joi
        options: {
            validate: {
                payload: Joi.object ({
                    // благодаря тому, что мы прописали какие поля должны быть, Joi уже не пропустит другие отправленные данные
                    name: Joi.string().pattern(/^[a-zA-Zа-яА-ЯёЁ-]{1,30}$/).required(),
                    surname: Joi.string().pattern(/^[\sa-zA-Zа-яА-ЯёЁ-]{1,30}$/).required(),
                    position: Joi.string().pattern(/^[\sa-zA-Zа-яА-ЯёЁ-]{1,50}$/).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().pattern(/^[a-zA-Z0-9*._,-]{6,30}$/).required(),
                    birthDate: Joi.string().required(),
                    // при использовании Joi и указании полей, получение неуказанных полей вызовет ошибку,
                    // но этого можно изменить, прописав (приниматься будут все поля):
                    //}).unknown(true).required
                }).required(),
            }
        }
    },

    // ЗАПРОС К БД НА ВХОД В АККАУНТ
    {
        method: "POST",
        path: "/user/login",
        handler: controllers.enterIntoSystem,
        options: {
            validate: {
                payload: Joi.object ({
                    email: Joi.string().email().required(),
                    password: Joi.string().pattern(/^[a-zA-Z0-9*._,-]{6,30}$/).required(),
                }).required(),
            }
        }
    },

    // ЗАПРОС К БД НА УДАЛЕНИЕ СВОЕГО АККАУНТА
    {
        method: "DELETE",
        path: "/user/delete",
        handler: controllers.deleteUser,
        options: {
            validate: {
                query: Joi.object ({
                    email: Joi.string().email().required(),
                }).required(),
            },
            auth: {
                strategy: "user",
            },
        },
    },

    // ЗАПРОС К БД НА РЕДАКТИРОВАНИЕ СВОЕГО АККАУНТА
    {
        method: "PUT",
        path: "/user/edit",
        handler: controllers.editUser,
        options: {
            validate: {
                payload: Joi.object ({
                    name: Joi.string().pattern(/^[a-zA-Zа-яА-ЯёЁ-]{1,30}$/),
                    surname: Joi.string().pattern(/^[a-zA-Zа-яА-ЯёЁ-]{1,30}$/),
                    email: Joi.string().email(),
                    password: Joi.string().pattern(/^[a-zA-Z0-9*._,-]{6,30}$/),
                    birthDate: Joi.string()
                }).required(),
            },
            auth: {
                strategy: "user",
            }
        }
    },

    // ЗАПРОС К БД НА ПОЛУЧЕНИЕ ВСЕХ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ ЛЮБЫМ АВТОРИЗОВАННЫМ ПОЛЬЗОВАТЕЛЕМ
    // через query
    {
        method: "GET",
        path: "/user/info",
        handler: controllers.getUserInfoByQuery,
        options: {
            validate: {
                query: Joi.object({
                    email: Joi.string().email().required(),
                }).required(),
            },
            auth: {
                strategy: "user",
            }
        }
    },

    // ЗАПРОС К БД НА ПОЛУЧЕНИЕ ВСЕХ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ ЛЮБЫМ АВТОРИЗОВАННЫМ ПОЛЬЗОВАТЕЛЕМ
    // аналог предыдущего роута, но без query, а с использованием параметров (params)
    // прим: на фронте axios запрос через params не казан, тольько через query
    {
        method: "GET",
        path: "/user/{userId}/info",
        handler: controllers.getUserInfoByParams,
        options: {
            validate: {
                // здесь вместо query уже указываем params
                params: Joi.object({
                    email: Joi.string().email().required(),
                }).required(),
            },
            auth: {
                strategy: "user"
            }
        }
    },

    // ЗАПРОС К БД НА ПОЛУЧЕНИЕ ВСЕХ ДАННЫХ О ВСЕХ ПОЛЬЗОВАТЕЛЯХ ЛЮБЫМ АВТОРИЗОВАННЫМ ПОЛЬЗОВАТЕЛЕМ
    // Страница на фронте - Colleagues
    {
        method: "GET",
        path: "/users/info",
        handler: controllers.getAllUsersInfo,
        options: {
            auth: {
                strategy: "user"
            }
        }
    },

    // роуты для работы с задачами:
    // добавить задачу в базу
    {
        method: "POST",
        path: "/task/add",
        handler: controllers.addTask,
        options: {
            auth: {
                strategy: "user"
            }
        }
    },
    // автоматическая загрузка задач
    {
        method: "GET",
        path: "/task/info",
        handler: controllers.getTask,
        options: {
            validate: {
                query: Joi.object({
                    email: Joi.string().email().required(),
                }).required(),
            },
            auth: {
                strategy: "user"
            }
        }
    },
    // редактирование задачи
    {
        method: "PUT",
        path: "/task/edit",
        handler: controllers.editTask,
        options: {
            // validate: {
            //     query: Joi.object({
            //         email: Joi.string().email().required(),
            //     }).required(),
            // },
            auth: {
                strategy: "user"
            }
        },
    },
    // изменение статуса задачи выполнено/активно
    {
        method: "GET",
        path: "/task/done",
        handler: controllers.editDoneOrActiveTask,
        options: {
            auth: {
                strategy: "user"
            }
        },
    },
    // удаление задачи
    {
        method: "DELETE",
        path: "/task/delete",
        handler: controllers.deleteTaskByQuery,
        options: {
            validate: {
                query: Joi.object({
                    taskId: Joi.string().required(),
                })
            },
            auth: {
                strategy: "user"
            }
        },
    },

    // роуты для работы с Клиентами:
    // добавить клиента в базу
    {
        method: "POST",
        path: "/clients/add",
        handler: controllers.addClient,
        options: {
            validate: {
                payload: Joi.object ({
                    // благодаря тому, что мы прописали какие поля должны быть, Joi уже не пропустит другие отправленные данные
                    name: Joi.string().pattern(/^[\sa-zA-Zа-яА-ЯёЁ-]{1,30}$/).required(),
                    organisation: Joi.string().required(),
                    city: Joi.string().pattern(/^[\sa-zA-Zа-яА-ЯёЁ-]{1,40}$/).required(),
                    phone: Joi.string().pattern(/^[\s0-9-+]+$/).required(),
                    email: Joi.string().email().required(),
                    newTaskDate: Joi.string().required(),
                    newTask: Joi.string().required(),
                    condition: Joi.string().required()
                    // при использовании Joi и указании полей, получение неуказанных полей вызовет ошибку,
                    // но этого можно изменить, прописав (приниматься будут все поля):
                    //}).unknown(true).required
                }).required()
            },
            auth: {
                strategy: "user"
            }
        }
    },

    // автоматическая загрузка списка Клиентов
    {
        method: "GET",
        path: "/clients/info",
        handler: controllers.getClients,
        options: {
            auth: {
                strategy: "user"
            }
        }
    },

    // изменение данных Клиентов
    {
        method: "PUT",
        path: "/clients/edit",
        handler: controllers.editClients,
        options: {
            auth: {
                strategy: "user"
            }
        }
    },

    // удаление Клиента
    {
        method: "DELETE",
        path: "/clients/delete",
        handler: controllers.deleteClientsByQuery,
        options: {
            auth: {
                strategy: "user"
            }
        }
    },

    // поиск по Клиентам
    {
        method: "GET",
        path: "/clients/search",
        handler: controllers.searchUserInfoByQuery,
        options: {
            auth: {
                strategy: "user",
            }
        }
    },

];
