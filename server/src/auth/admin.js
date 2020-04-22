export default function(server){

    server.auth.strategy('admin', 'bearer-access-token', {
        // следующая строка показывает, что мы можем token передать через query запрос, что, как правило, не делается. Можем закомментить, ибо по умолчанию будет false
        // allowQueryToken: true,
        validate: async (request, token, h) => {

            // сравниваем с token, который мы перенесли в файл .env
            const isValid = token === process.env.ADMIN_TOKEN;
            if(isValid) {
                return {
                    isValid,
                    // это данные того пользователя, который авторизовался
                    credentials: { admin: {isAdmin: true} },
                    // тоже какие-то параметры, которые оч редко используются. Но надо будет все равно о них почитать
                    artifacts: {},
                };
            } else {
                return {
                    isValid,
                    credentials: {},
                    artifacts: {},
                };
            }
        }
    });
}
