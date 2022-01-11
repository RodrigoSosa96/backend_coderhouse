import { Schema, model } from 'mongoose';


export interface productosDoc {
    name: string,
    timestamp: Date,
    description: string,
    code: string,
    image: string,
    price: string | number,
    stock: number,
}


const Productos = new Schema<productosDoc>({
    timestamp: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export default model<productosDoc>('Productos', Productos);
