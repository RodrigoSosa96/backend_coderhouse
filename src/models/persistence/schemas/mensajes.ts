import {Schema, model} from 'mongoose';

interface Mensajes {
    author: {
        mail: string,
        nombre: string,
        apellido: string,
        edad: number,
        alias: string,
        avatar: string
    },
    message: string,
}

const MensajesSchema = new Schema<Mensajes>({
    author: {
        mail: {type: String, trim: true, lowercase: true, unique: true, required: [true, "Email address is required"], validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please fill a valid email address"]},
        nombre: {type: String, trim: true, lowercase: true, required: [true, "Name is required"]},
        apellido: {type: String, trim: true, lowercase: true, required: [true, "Last name is required"]},
        edad: {type: Number, required: [true, "Age is required"]},
        alias: {type: String, trim: true, lowercase: true, unique: true, required: [true, "Alias is required"]},
        avatar: {type: String, trim: true, lowercase: true, required: [true, "Avatar is required"]}
    },
    message: {type: String, trim: true, lowercase: true, required:[true, "Message is required"]}
});

export default model<Mensajes>('Mensajes', MensajesSchema);
