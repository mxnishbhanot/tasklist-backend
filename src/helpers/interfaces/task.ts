import mongoose from 'mongoose';

export interface TaskInterface extends mongoose.Document {
    _tasklist: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: string;
    priority: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    progress: number;
    attachments: { file: string, name: string }[];
    createdBy: mongoose.Types.ObjectId;
}