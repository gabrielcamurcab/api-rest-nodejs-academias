import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma.js";

interface registerUseCaseRequest {
    name: string,
    email: string,
    password: string
}

export async function registerUseCase({
    name,
    email,
    password
}: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userWithSameEmail) {
        throw new Error('Email already exists');
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password_hash
        }
    });
}