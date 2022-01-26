import { Schema, model, Types, HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CarritoModel, ICarrito } from './carrito';

export interface IUser {
    email: string;
    password?: string;
    name: string;
    address: string;
    age: number;
    phoneNumber: string;
    picture?: string;
    carrito?: Types.ObjectId;
}
export interface PopulatedUser {
    carritoID: ICarrito;
}
interface IUserMethod {
    comparePassword: (candidatePassword: string) => Promise<boolean>
    createCarritoifNotExists: () => Promise<void>
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
    carrito: { type: Types.ObjectId, ref: 'Carrito' }
}, {
    // // Testing this
    // toObject: {
    //     transform: function (doc, ret) {
    //         delete ret.password;
    //         delete ret.__v;
    //     }
    // }
});

UserSchema.pre('save', async function (this: HydratedDocument<IUser>, next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password!, salt);
        user.password = hash;
        next();
    } catch (err) {
        if (err instanceof Error) next(err);
        else next(new Error("Error al encriptar la contraseña"));
    }
});




UserSchema.methods.comparePassword = async function (this: HydratedDocument<IUser>, candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password!)
}


UserSchema.methods.createCarritoifNotExists = async function (this: HydratedDocument<IUser>): Promise<void> {
    const user = this;
    if (user.carrito) return;
    try {
        const carrito = await CarritoModel.create({ timestamp: new Date() });
        user.carrito = carrito._id;
        await user.save();
    } catch (err) {
        if (err instanceof Error) throw err;
        else throw new Error("Error al crear el carrito");
    }
}

export const UserModel = model<IUser, Model<IUser, {}, IUserMethod>>('User', UserSchema);

