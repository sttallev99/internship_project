import { Request, Response } from "express";
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUser } from "../services/user.service";

interface Options  {
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
}

export const registerUser = async (req:Request, res:Response) => {
    try {
        const { name, email, password } = req.body;

        const isEmailAllreadyExist = await getUser(email);

        if(isEmailAllreadyExist) {
            res.status(400).json({
                status: 400,
                message: 'Email allready in use'
            })
            return
        }

        const newUser = await createUser({name, email, password});

        res.status(200).json({
            status: 201,
            success: true,
            message: 'User created Successfully',
            user: newUser
        });
    } catch(err: any) {
        console.log(err);

        res.status(400).json({
            status: 400,
            message: err.message.toString()
        })
    }
}

export const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await getUser(email);

        if(!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found"
            });
            return
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                succeess: false,
                message: 'Wrong Password',
            });
            return;
        }

        const token = jwt.sign(
            { _id: isUserExist._id, email: isUserExist.email },
            process.env.SECRET_KEY!,
            {
                expiresIn: "1d"
            }
        );



        res.cookie("SessionID", token, {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Login successfully",
            token: token
        });
    } catch(err: any) {
        res.status(400).json({
            status: 400,
            message: err.message.toString(),
        })
    }
}
