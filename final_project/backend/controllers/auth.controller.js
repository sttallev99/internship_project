import { getUser, createUser } from "../services/auth.services.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {
    console.log(req.body)
    try {
        const { firstName, lastName, nickname, email, phoneNumber, password} = req.body;
        console.log(firstName, lastName, nickname, email, phoneNumber, password)
    
        const user = await getUser(email);
    
        if(user) {
            res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            });
            return;
        }
    
        const newUser = await createUser(firstName, lastName, nickname, email, phoneNumber, password);

        res.status(200).json({
            status: 201,
            success: true,
            message: 'User created successfolly!',
            user: newUser
        })

    } catch(err) {
        console.log(err);

        res.status(400).json({
            status: 400,
            message: err.message.toString()
        })
    }

}

export const singIn = async(req, res) => {

    try {

        const { email, password } = req.body;
    
        const user = await getUser(email);

        if(!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found"
            });
            return
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if(!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                succeess: false,
                message: 'Wrong Password',
            });
            return;
        }
    
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );
    
        res.cookie("access_token", token, {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
        });
        const { password: pass,  ...restUserData } = user._doc;
        res.status(200).json({
            status: 200,
            success: true,
            message: "Login successfully",
            user: restUserData
        });
    } catch(err) {
        res.status(400).json({
            status: 400,
            message: err.message.toString(),
        })
    }
}

export const signOut = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json("User has beed logged out!")
}
