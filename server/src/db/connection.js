// импортируем пользовательскую схему
import userSchema from "./userSchema.js";
//импортируем схему задач
import taskSchema from "./taskSchema.js";
import clientSchema from "./clientSchema.js";


// импортируем mongoose
import mongoose from 'mongoose';

// данные о хосте и порте из .env файла
const hostPort = `${process.env.MONGO_HOST || "localhost"}:${process.env.MONGO_PORT || "27017"}`;
mongoose.connect(`mongodb://${hostPort}/site`, {useUnifiedTopology: true, useNewUrlParser: true});

// обработчики из документации
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection to MongoDB is successful");
});

// оборачиваем схему в модель и у модели user появятся свои методы
let user = mongoose.model('user', userSchema);
// когда пригодится сделать другие модели, делаем аналогично
let task = mongoose.model('task', taskSchema);
let client = mongoose.model('client', clientSchema);


// экспортируем модель
export default {
    user,
    // точно также экспортируем какую-либо новую модель
    task,
    client
};
