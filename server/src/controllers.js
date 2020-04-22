//импортируем uuid
import uuid from "uuid";

// импортируем базу данных по пользователям
import db from "./db/connection.js";

// подключаем Boom (для работы с ошибками и статус кодами)
import Boom from "@hapi/boom";

// экспортируемый объект с handler'ами для роутов
export default {
    // регистрация нового пользователя (с проверками)
    async register (req, h) {
        try {
            // ищем совпадение полученного логина (email) и уже имеющегося.
            // Match принимает объект и если его нет, то принимает null 
            let match = await db.user.findOne({ email: req.payload.email });
            if (match === null) {
                // после проверки на совпадение добавляем пользователя к БД
                const newUser = await db.user.create({
                    name: req.payload.name,
                    surname: req.payload.surname,
                    position: req.payload.position,
                    email: req.payload.email,
                    password: req.payload.password,
                    birthDate: req.payload.birthDate,
                    registerDate: new Date(),
                    userId: uuid(),
                    token: uuid()
                });
                return newUser.token;
            } else {
                // один из способов (устаревший) выдачи ошибки: через h выдается сообщение и статус-код
                // сам объект h очень богат на наполненность и можно исполььзовать разные его методы (напрмиер, есть еще редирект)
                // return h.response("Login in use").code(400);
                // теперь указываем отображение ошибки через новую либу Boom
                return Boom.badRequest("Данный логин (email) уже занят");
            }
        } catch (e) {
            return Boom.badRequest("Не удалось сохранить пользователя");
        }
    },

    // вход в систему
    async enterIntoSystem (req, h) {
        try {
            const { payload } = req;
            let match = await db.user.findOne({ email: payload.email} );
            if (match.password === payload.password) {
                return match.token;
            } else {
                return Boom.badRequest("Неверный логин или пароль");
            }
        } catch (e) {
            return Boom.badRequest("Ошибка авторизации");
        }
    },

    // удаление своего аккаунта
    async deleteUser (req, h) {
        try {
            // вытаскиваем данные самого пользователя, сделавшего запрос
            const {credentials: user} = req.auth;
            // вытаскиваем Id пользователя, котрого надо удалить
            // можно было бы обойтись и без этого запроса, но он пригодится если дальше добавить возможность удаления админом
            const {email} = req.query;
            // проверяем, является ли пользователь владельцем удаляемого аккаунта
            if (user.email !== email) {
                return Boom.forbidden("У вас нет прав на удаление данного аккаунта");
            } else {
                await db.user.deleteOne({email});
                return "Account was delete";
            }
        } catch (e) {
            return Boom.badRequest("Ошибка удаления аккаунта");
        }
    },

    // редактирование своего аккаунта
    async editUser (req, h) {
        try {
            const { credentials: user } = req.auth;
            console.log(user);
            const match = await db.user.findOne({ token: user.token });
            console.log(match);
            const newData = {
                name: req.payload.name || user.name,
                surname: req.payload.surname || user.surname,
                email: req.payload.email || user.email,
                password: req.payload.password || user.password,
                birthDate: req.payload.birthDate || user.birthDate,
            };
            await match.update({
                name: newData.name,
                surname: newData.surname,
                email: newData.email,
                password: newData.password,
                birthDate: newData.birthDate,
            });
            return "Данные успешно изменены";
        } catch (e) {
            return Boom.unauthorized("Sorry, you can't edit another User");
        }
    },

    // получение информации о пользователе через query запрос
    async getUserInfoByQuery (req, h) {
        try {
            let { query } = req;
            let match = await db.user.findOne({ email: query.email });
            if(match !== null) {
                return match;
            } else {
                return null;
            }
        } catch (e) {
            return Boom.badRequest("Такой пользователь не зарегистрирован");
        }
    },

    // получение информации о пользователе через запрос с использованием params
    async getUserInfoByParams (req, h) {
        try {
            let match = await db.user.findOne({ email: req.params.email });
            
            if (match !== null) {
                return match;
            } else {
                return null;
            }
            // а чтобы получить инфу именно по пользователю, кто сделал сам запрос (учитывая его токен):
            // let { credentials } = req.auth;
            // return {
            //     user: credentials
            // };
        } catch (e) {
            return Boom.badRequest("Такой пользователь не зарегистрирован");
        }
    },

    // получение данных обо всех пользователях любым авторизованным пользователем
    async getAllUsersInfo (req, h) {
        try {
            let match = await db.user.find({});
            if (match.length === 0) {
                return null
            } else {
                return match;
            }
        } catch (e) {
            return Boom.badRequest("Ошибка загрузки пользователей");
        }
    },

    // добавление задачи
    async addTask (req, h) {
        try {
            const { payload } = req;
            const match = await db.task.findOne({ task: payload.task });
            if (!match) {
            const newTask = await db.task.create({
                task: req.payload.task,
                taskId: uuid(),
                ownerLogin: req.payload.ownerLogin,
                doneStatus: req.payload.doneStatus
            });
                return "Добавлено успешно";
            } else {
                return "Задача уже существует"
            }
        } catch (e) {
            return Boom.badRequest("Ошибка добавления задачи");
        }
    },

    // загрузка задач
    async getTask (req, h) {
        try {
            let { query } = req;
            let match = await db.task.find({ownerLogin: query.email});
            console.log(match);
            if(match.length !== 0) {
                return match;
            } else {
                return null;
            }
        } catch (e) {
            return Boom.badRequest("Something went wrong");
        }
    },

    // редактирование задач
    async editTask (req, h) {
        try {
            const { payload } = req;
            const match = await db.task.findOne({ taskId: payload.taskId });
            console.log("taskId: " + payload.taskId);
            const newData = {
                task: req.payload.task
            };
            await match.update({
                task: newData.task
            });
            return "Сохранено";
        } catch (e) {
            return Boom.unauthorized("Ошибка сохранения");
        }
    },

    // изменение статуса выполнено/активно
    async editDoneOrActiveTask (req, h) {
        try {
            const { query } = req;
            const match = await db.task.findOne({ taskId: query.taskId });
            await match.update({
                doneStatus: !match.doneStatus
            });
            return match;

        } catch (e) {
            return Boom.unauthorized("Ошибка изменения");
        }
    },

    // удаление общей задачи
    async deleteTaskByQuery (req, h) {
        try {
            const { query } = req;
            const match = await db.task.findOne({taskId: query.taskId});
            await match.delete(match);
            return "Удалено";
        } catch (e) {
            return Boom.unauthorized("Ошибка удаления");
        }
    },

    // добавление Клиента к базе
    async addClient (req, h) {
        try {
            const { payload } = req;
            const match = await db.client.findOne({ email: payload.email });
            if (!match) {
                const newClient = await db.client.create({
                    name: req.payload.name,
                    organisation: req.payload.organisation,
                    city: req.payload.city,
                    phone: req.payload.phone,
                    email: req.payload.email,
                    newTaskDate: req.payload.newTaskDate,
                    newTask: req.payload.newTask,
                    condition: req.payload.condition,
                    clientId: uuid(),
                });
                return "Клиент добавлен успешно";
            } else {
                return Boom.badRequest("Клиент с данной почтой уже есть");
            }
        } catch (e) {
            return Boom.badRequest("Ошибка добавления Клиента");
        }
    },

    // загрузка списка Клиентов
    async getClients (req, h) {
        try {
            let match = await db.client.find({});
            return match;
        } catch (e) {
            return null;
        }
    },

    // измеение данных о Клиенте
    async editClients (req, h) {
        try {
            const { payload } = req;
            const match = await db.client.findOne({ clientId: payload.clientId });
            console.log(payload.clientId);
            console.log(match);
            const newData = {
                name: req.payload.name || match.name,
                organisation: req.payload.organisation || match.organisation,
                city: req.payload.city || match.city,
                phone: req.payload.phone || match.phone,
                email: req.payload.email || match.email,
                newTaskDate: req.payload.newTaskDate || match.newTaskDate,
                newTask: req.payload.newTask || match.newTask,
                condition: req.payload.condition || match.condition
            };
            await match.update({
                name: newData.name,
                organisation: newData.organisation,
                city: newData.city,
                phone: newData.phone,
                email: newData.email,
                newTaskDate: newData.newTaskDate,
                newTask: newData.newTask,
                condition: newData.condition,
            });
            return "Данные изменены";
        } catch (e) {
            return Boom.unauthorized("Ошибка изменения данных");
        }
    },

    // удаление Клиента
    async deleteClientsByQuery (req, h) {
        try {
            const { query } = req;
            const match = await db.client.findOne({clientId: query.clientId});
            console.log(query.clientId);
            console.log(match);
            await match.delete(match);
            return "Клиент удален";
        } catch (e) {
            return Boom.unauthorized("Ошибка удаления");
        }
    },

    // поиск по Клиентам
    async searchUserInfoByQuery (req, h) {
        try {
            const { query, where } = req.query;
            switch (where) {
                case "name":
                    let matchName = await db.client.find({ name: query });
                    if (matchName.length !== 0) {
                        return matchName;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "organisation":
                    let matchOrganisation = await db.client.find({ organisation: query });
                    if (matchOrganisation.length !== 0) {
                        return matchOrganisation;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "city":
                    let matchCity = await db.client.find({ city: query });
                    if (matchCity.length !== 0) {
                        return matchCity;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "phone":
                    let matchPhone = await db.client.find({ phone: query });
                    if (matchPhone.length !== 0) {
                        return matchPhone;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "email":
                    let matchEmail = await db.client.find({ email: query });
                    if (matchEmail.length !== 0) {
                        return matchEmail;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "newTaskDate":
                    let matchTaskDate = await db.client.find({ newTaskDate: query });
                    if (matchTaskDate.length !== 0) {
                        return matchTaskDate;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "newTask":
                    let matchTask = await db.client.find({ newTask: query });
                    if (matchTask.length !== 0) {
                        return matchTask;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
                case "condition":
                    let matchCondition = await db.client.find({ condition: query });
                    if (matchCondition.length !== 0) {
                        return matchCondition;
                    } else {
                        return Boom.badRequest("По указанным параметрам Клиенты не найдены");
                    }
            }
        } catch (e) {
            return Boom.badRequest("Ошибка поиска");
        }
    },

};