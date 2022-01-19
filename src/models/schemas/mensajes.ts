import { Schema, model, Types } from 'mongoose';
import { IUser } from './user';



export interface IMensajes {
    author: Types.ObjectId,
    name: string,
    message: string,
}
export interface PopulatedMensajes {
    author: IUser | null;

}

const MensajesSchema = new Schema<IMensajes>({
    author: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    message: { type: String, trim: true, lowercase: true, required: [true, "Message is required"] }
});

export const MensajesModel = model<IMensajes>('Mensajes', MensajesSchema);
