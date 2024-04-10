import { FastifyInstance } from 'fastify';
import { tasklistController, taskController } from '../controllers';
import { decryptData, encryptData } from '../helpers';

export default async function routes(fastify: FastifyInstance): Promise<void> {
    // Middleware to decrypt request data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fastify.addHook('onRequest', async (request: any) => {
        request.body = decryptData(request.body);
        request.query = decryptData(request.query);
        request.params = decryptData(request.params);
    });

    // Middleware to encrypt response data
    fastify.addHook('onSend', async (request, reply, payload) => {
        return encryptData(payload);
    });

    // Main Routes
    await fastify.register(tasklistController, { prefix: '/api/tasklist' });
    await fastify.register(taskController, { prefix: '/api/task' });
}
