import fastify from "fastify";
import { email, z } from "zod";
import { prisma } from "./lib/prisma.js";

export const app = fastify();

app.post('/user', async (request, reply) => {
    const RegisterBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    });

    const { name, email, password } = RegisterBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password_hash: password
        }
    });

    return reply.status(201).send();
});