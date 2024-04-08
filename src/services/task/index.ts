import { FastifyRequest, FastifyReply } from 'fastify';
import { TaskModel } from '../../models';
import { sendResponse } from '../../helpers/utils';
import { response } from '../../helpers/enums';
import { TaskInterface } from '../../helpers/interfaces';

export const taskService = {
    getAllTasks: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { page = 1, limit = 10 } = request.query as { page: string, limit: string };
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            const query = { status: { $ne: 'DELETED' } };

            const totalCount = await TaskModel.countDocuments(query);
            const totalPages = Math.ceil(totalCount / limitNumber);

            const skip = (pageNumber - 1) * limitNumber;

            const tasks = await TaskModel.find(query).skip(skip).limit(limitNumber);
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

    getTask: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { id } = request.params as { id: string };
            const task = await TaskModel.findById(id);
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.FETCH, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },
    createTask: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const task = await TaskModel.create(request.body as TaskInterface);
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.CREATE });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },

    updateTask: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { id } = request.params as { id: string };
            const update = request.body as TaskInterface;
            const task = await TaskModel.updateOne({ _id: id }, { $set: update });
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.UPDATE, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },

    deleteTask: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { ids } = request.body as { ids: string[] };
            const task = await TaskModel.updateMany({ _id: { $in: ids } }, { $set: { status: 'DELETED' } });
            await sendResponse(reply, 200, { success: true, data: task, message: response.en.TASKLIST.DELETE, });

        } catch (error) {
            console.error(error);
            await sendResponse(reply, 400, { success: false, message: (error as Error).message, data: null });
        }
    },
};
