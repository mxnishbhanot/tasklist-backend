import { FastifyInstance } from 'fastify';
import { taskService } from '../../services';

export const taskController = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get("/", taskService.getAllTasks); // Get all tasklists
    fastify.post("/", taskService.createTask); // Create a new tasklist
    fastify.delete("/", taskService.deleteTask); // Delete tasklists
    fastify.get("/:id", taskService.getTask); // Get a single tasklist
    fastify.put("/:id", taskService.updateTask); // Update a tasklist
};
