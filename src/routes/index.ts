import { FastifyInstance } from 'fastify';
import { tasklistController } from '../controllers/tasklist';

export default async function routes(fastify: FastifyInstance): Promise<void> {
    await fastify.register(tasklistController, { prefix: '/api/tasklist' }); 
    // Register other routes similarly
}
