import { FastifyRequest, FastifyReply } from 'fastify';
import { TaskListModel } from '../../models/tasklist';
import { sendResponse } from '../../helpers/utils';
import { response } from '../../helpers/enums';
import { TaskListInterface } from '../../helpers/interfaces';

export const tasklistService = {
    getAllTaskLists: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { page = 1, limit = 10 } = request.query as { page: string, limit: string };
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            const query = { status: { $ne: 'DELETED' } };

            const totalCount = await TaskListModel.countDocuments(query);
            const totalPages = Math.ceil(totalCount / limitNumber);

            const skip = (pageNumber - 1) * limitNumber;

            const tasks = await TaskListModel.find(query).skip(skip).limit(limitNumber);
            await sendResponse(reply, 200, { success: true, data: tasks, message: response.en.TASKLIST.FETCH, }, {
                totalRecords: totalCount,
                totalPages,
                page: pageNumber
            });
        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },

    getTaskList: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { id } = request.params as { id: string };
            const task = await TaskListModel.findById(id);
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.FETCH, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },
    createTaskList: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const task = await TaskListModel.create(request.body as TaskListInterface);
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.CREATE });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },

    updateTaskList: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { id } = request.params as { id: string };
            const update = request.body as TaskListInterface;
            const task = await TaskListModel.updateOne({ _id: id }, { $set: update });
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.UPDATE, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },

    deleteTaskList: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { ids } = request.body as { ids: string[] };
            const task = await TaskListModel.updateMany({ _id: { $in: ids } }, { $set: { status: 'DELETED' } });
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.DELETE, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },
};
