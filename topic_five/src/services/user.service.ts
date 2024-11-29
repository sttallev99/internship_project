import { User } from '../models/user';

interface UserProps {
    name: string,
    email: string,
    password: string
}

export const getUser = async(email: string) => {
    return await User.findOne({
        email: email
    });
}

export const createUser = async({name, email, password}: UserProps) => {
    return await User.create({
        name,
        email,
        password
    });
}
