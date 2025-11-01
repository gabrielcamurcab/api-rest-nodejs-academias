import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { registerUseCase } from "../../use-cases/register.js";

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const RegisterBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    });

    const { name, email, password } = RegisterBodySchema.parse(request.body);

    try {
        await registerUseCase({name, email, password});
    } catch (err) {
        reply.status(409).send()
    }

    return reply.status(201).send();
}