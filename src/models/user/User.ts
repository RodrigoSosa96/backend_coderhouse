import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    comparePassword(password: string): Promise<boolean>;

}
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}, { collection: "userss" });

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err: any) {
        next(err);
    }
});
UserSchema.methods.generateHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<User>('User', UserSchema);
