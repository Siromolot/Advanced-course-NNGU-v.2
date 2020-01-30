import mongoose from "mongoose";
import uuid from "uuid";

const schema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
        },
        taskId: {
            type: String,
            required: true,
            default: uuid,
        },
        ownerLogin: {
            type: String,
            required: true,
        },
        doneStatus: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

export default schema;