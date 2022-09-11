import * as userRepository from '../repositories/userRepository';

export async function findUserByEmail(email: string) {
    return await userRepository.findUserByEmail(email);
}