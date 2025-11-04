import { expect, describe, it, test } from 'vitest';
import { RegisterUseCase } from './register.js';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

describe('Register use case', () => {
    it('should to able to register', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should hash user password upon registration', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async() => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = 'johndoe@test.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        });

        await expect(
        registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});