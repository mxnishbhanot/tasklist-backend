import mongoose, { Schema } from "mongoose";
import { TaskListInterface } from "../../helpers/interfaces";

export const TaskListSchema = new Schema<TaskListInterface>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['ACTIVE', 'INACTIVE' , 'DELETED' ] ,default: 'ACTIVE' },
        priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH' ] , default: 'LOW' },
        startDate: { type: Date },
        endDate: { type: Date },
        progress: { type: Number, default: 0 },
        tags: { type: [String] },
        // createdBy: { type: Schema.Types.ObjectId, ref: 'User' } // TODO: Add user model

    },
    { timestamps: true, versionKey: false }
);

export const TaskListModel = mongoose.model<TaskListInterface>('Task-List', TaskListSchema);
