import fastify from 'fastify';
import { connectDB } from './db';

const app = fastify();

const start = async (): Promise<void> => {
    try {
        await app.register(import('./routes'));
        const port = Number(process.env.PORT);

        // Listen to the specified port
        const address = await app.listen({ port, host: '0.0.0.0' });

        await connectDB();
        //eslint-disable-next-line no-console
        console.log(`Server listening on ${address}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start().catch(err => {
    console.error(err);
    process.exit(1);
});
