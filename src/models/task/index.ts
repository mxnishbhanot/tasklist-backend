import mongoose, { Schema } from "mongoose";
import { TaskInterface } from "../../helpers/interfaces";

export const TaskSchema = new Schema<TaskInterface>(
    {
        _tasklist: { type: Schema.Types.ObjectId, ref: 'Task-List' },
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['ACTIVE', 'INACTIVE' , 'DELETED' ] ,default: 'ACTIVE' },
        priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH' ] , default: 'LOW' },
        startDate: { type: Date },
        endDate: { type: Date },
        progress: { type: Number, default: 0 },
        tags: { type: [String] },
        attachments: [{ file: String, name: String }],
        // createdBy: { type: Schema.Types.ObjectId, ref: 'User' } // TODO: Add user model

    },
    { timestamps: true, versionKey: false }
);

export const TaskModel = mongoose.model<TaskInterface>('Task', TaskSchema);
