import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.js";

export async function appRoutes(app: FastifyInstance) {
    app.post('/user', register);   
}