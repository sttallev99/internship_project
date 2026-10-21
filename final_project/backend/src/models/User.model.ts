import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const EMAIL_PATTERN = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
const DEFAULT_PROFILE_PICTURE =
    'https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg';

const userSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        nickname: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: (value: string) => EMAIL_PATTERN.test(value),
                message: (props: { value: string }) => `${props.value} is not a valid email!`,
            },
        },
        phoneNumber: { type: String, required: true, unique: true, trim: true },
        // Excluded from queries by default; request it explicitly with `.select('+password')`.
        password: { type: String, required: true, select: false },
        profilePicture: { type: String, default: DEFAULT_PROFILE_PICTURE },
    },
    {
        toJSON: {
            // Never leak the password hash, even when the field was selected.
            transform: (_doc, { password: _password, ...user }) => user,
        },
    },
);

userSchema.pre('save', async function hashPassword() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

export type UserAttributes = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserAttributes>;

const User = model('User', userSchema);

export default User;
