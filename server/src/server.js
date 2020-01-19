"use strict";

// устанавливаем dotenv (после скачивания ее через npm).
// Это не первое наше действие, оно идет много позже первичных установок
// Просто dotenv требует этого реквайринга как можно выше в файле
// следующая строка идет из документации, но т.к пишем на ES6, надо делать через импорт
// require('dotenv').config()
import dotenv from "dotenv";

// создаем package.json для хранения всей инфы о проекте через npm init

// устанавливаем hapi - через терминал вводим npm install @hapi/hapi
// импортируем объект hapi из объекта "@hapi/hapi"
import Hapi from "@hapi/hapi";

// импортируем руты из файла routes.js
import routes from "./routes.js";

// также, мы можем раздавать статику (html, css, img и т.д.). Для этого нам нужен плагин inert. Устанавливаем в терминале с помощью npm i @hapi/inert
// импортируем inert (но чтобы им пользоваться, надо еще добавить (зарегистрировать, ибо это плагин, а все плагины должны регистрироваться) в функцию создания сервера ниже)
import Inert from "@hapi/inert";

// для того, чтобы закрыть тот или иной роут (сделать доступными только для админов, например), есть стратегии авторизации.
// Любая авторизация - это заголовок (header) к этому запросу и обычно заголовки передаются в формате "ключ-значение"
// (key: authorization, а value может быть и token'ы и ключи и секретные строки и прочее - вообще любая строка определенного формата,
// а эти форматы и называются типом авторизации - простая, simple, bearer, jvt и т.д.).
// Поставим bearer через терминал (npm i hapi-auth-bearer-token)
// импортируем bearer
import AuthBearer from "hapi-auth-bearer-token";

// импортируем функцию доступа к приватному роуту (который только для админа) из файла admin и дальше в коде установки сервера эту функцию нужно будет вызвать
import makeAdminAuth from "./auth/admin.js";
// аналогично предыдущей импортируем стратегию для пользователей
import makeUserAuth from "./auth/user.js";

// устанавливаем dotenv (библиотека для работы с .env файлами) 
// после того, как импортнули (стр.8) dotenv, можно вызвать его config
dotenv.config();

// устанавливаем через "hapi/boom" npm i @hapi/boom - библиотека для работы с ошибками

// устанавливаем через npm i mongoose библиотеку mongoose для работы с БД MongoDB

// основная функция, создающая сервер
const init = async() => {

    const server = Hapi.server({
        // порт указываем из файла .env или если что-то пойдет не так, то 3000
        // т.к. получаем строку, то делаем через parseInt
        port: parseInt(process.env.PORT || 5000),
        host: "localhost",
        // для того, чтобы валидатор Joi писал нам конкретно, что именно не так в валидации (на стороне разработки):
        routes: {
            cors: true,
            validate: {
                failAction: (request, h, err) => {
                    // NODE_ENV - это переменная, которая как бы запускается в Node для понимания,
                    // в каком окружении все запускается - в продакшене (на сервере) или в девелопменте.
                    // Соответственно, будут выходить разные виды описания ошибок - для пользователей и для разрабов
                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message); // Better to use an actual logger here.
                        throw new Error('Invalid request payload input');
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                }
            }
        } 
    });

    // перед стартом сервера добавляем регистрацию плагина inert и AuthBearer
    await server.register([Inert, AuthBearer]);

    // вызываем импортированную функцию для доступа для админа к приватному роуту и туда передаем server, которые чуть выше инициализировали
    // важно вызвать ее до подключения роутов, но после добавления плагина Bearer!
    makeAdminAuth(server);

    makeUserAuth(server);
    
    // прописываем пути (не забываем перезапускать сервак после добавления или изменения каждого роута)
    server.route(routes);
    await server.start();
    console.log("Server running on", server.info.uri);
};

// некая "подписка" на глобальный объект process, в который передается reject, который никто не обработал
process.on("unhandledRejection", (err) => {
    console.log(err);
    // эта строка означает, что сервер "падает" и больше не может принимать запросы
    process.exit(1);
});

init();
