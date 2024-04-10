import { FastifyReply } from "fastify";

export async function sendResponse(reply: FastifyReply, statusCode: number, data: { success: boolean, message: string, data: unknown }, pagination?: { page: number, totalRecords: number, totalPages: number }): Promise<void> {
    try {
        const body = {
            message: data.message,
            success: data.success,
            data: data.data,
            pagination
        }
        await reply.status(statusCode).send(body);
    } catch (error) {
        console.error(error);
        await reply.status(statusCode).send({ error: 'Internal Server Error' });
    }
}
