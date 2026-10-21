import User from "../models/User.model.js";

export const getUser = async(email) => {
    return await User.findOne({ email });
}

export const createUser = async(firstName, lastName, nickname, email, phoneNumber, password) => {
    return await User.create({
        firstName,
        lastName,
        nickname,
        email,
        phoneNumber: Number(phoneNumber),
        password
    });
}
