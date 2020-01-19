import mongoose from "mongoose";
import uuid from "uuid";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        organisation: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        newTaskDate: {
            type: String,
            required: true,
        },

        newTask: {
            type: String,
            required: true,
        },

        condition: {
            type: String,
            required: true,
        },

        clientId: {
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