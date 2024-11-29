import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true});

UserSchema.pre("save", function(next) {
    const user = this;

    if(!user.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
})

export const User = mongoose.model("User", UserSchema);
