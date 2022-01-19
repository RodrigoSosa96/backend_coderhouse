import { Schema, model, Types, HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcrypt';
// email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar.
export interface IUser {
    email: string;
    password: string;
    name: string;
    address: string;
    age: number;
    phoneNumber: string;
    picture: string;
}
interface IUserMethod {
    comparePassword: (candidatePassword: string) => Promise<boolean>
}

const emailValidator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/s;

const UserSchema = new Schema<IUser, Model<IUser, {}, IUserMethod>>({
    email: { type: String, validate: emailValidator, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    picture: { type: String, required: true },
}, { collection: "Local-Users" });

UserSchema.pre('save', async function (this: HydratedDocument<IUser>, next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        if (err instanceof Error) next(err);
        else next(new Error("Error al encriptar la contraseña"));
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password)
}

export const UserModel = model<IUser, Model<IUser, {}, IUserMethod>>('User', UserSchema);