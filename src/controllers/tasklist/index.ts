import { FastifyInstance } from 'fastify';
import { tasklistService } from '../../services/tasklist';

export const tasklistController = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get("/", tasklistService.getAllTaskLists); // Get all tasklists
    fastify.post("/", tasklistService.createTaskList); // Create a new tasklist
    fastify.delete("/", tasklistService.deleteTaskList); // Delete tasklists
    fastify.get("/:id", tasklistService.getTaskList); // Get a single tasklist
    fastify.put("/:id", tasklistService.updateTaskList); // Update a tasklist
};
