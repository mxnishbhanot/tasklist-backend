import mongoose from 'mongoose';

export interface TaskListInterface extends mongoose.Document {
    title: string;
    description: string;
    status: string;
    priority: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    progress: number;
    createdBy: mongoose.Types.ObjectId;
}