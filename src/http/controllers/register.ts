import type { FastifyReply, FastifyRequest } from "fastify";
import { email, z } from "zod";
import { prisma } from "../../lib/prisma.js";

export async function register (request: FastifyRequest, reply: FastifyReply) {
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
}