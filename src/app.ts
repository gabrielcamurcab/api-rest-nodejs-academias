import fastify from "fastify";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: "Gabriel",
        email: "teste@teste.com"
    }
})

export const app = fastify();