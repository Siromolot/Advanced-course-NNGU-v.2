import mongoose from "mongoose";

// импортируем тулзу uuid для создания уникальных токенов и id
import uuid from "uuid";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        email: { // он же место логина
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        birthDate: {
            type: String,
            required:true,
        },
        registerDate: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
            default: uuid,
        },
        token: {
            type: String,
            required: true,
            default: uuid,
        }
    },
    {
        timestamps: true,
    }
);

export default schema;