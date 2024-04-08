import { FastifyInstance } from 'fastify';
import { tasklistController ,taskController} from '../controllers';

export default async function routes(fastify: FastifyInstance): Promise<void> {
    await fastify.register(tasklistController, { prefix: '/api/tasklist' }); 
    await fastify.register(taskController, { prefix: '/api/task' }); 
    // Register other routes similarly
}
