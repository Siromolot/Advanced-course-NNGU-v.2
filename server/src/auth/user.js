import db from "../db/connection.js";

export default function(server){

    server.auth.strategy('user', 'bearer-access-token', {
        // следующая строка показывает, что мы можем token передать через query запрос, что, как правило, не делается. Можем закомментить, ибо по умолчанию будет false
        // allowQueryToken: true,
        validate: async (request, token, h) => {
            // пока осуществляем поиск по базе просто без параметров (потом самому их вставить)
            /* здесь, в отличие от админа, мы получаем токен от пользователя
            (который может хранится у него как в localStorage, так и в куках) и
            должны сравнить со множеством токенов, которые уже должны храниться в БД,
            для чего, собственно, и подключим БД MongoDB*/
            const user = await db.user.findOne({token});

            if (user) {
                return {
                    isValid: true,
                    credentials: user,
                    artifacts: {},
                };

            } else {
                return {
                    isValid: false,
                    credentials: {},
                    artifacts: {},
                };
            }
        }
    });
}
