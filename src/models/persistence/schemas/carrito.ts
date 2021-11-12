import { Schema, model } from 'mongoose';


interface Carrito {
    timestamp: string;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
}

const Carrito = new Schema<Carrito>({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
}, { timestamps: true } //? testar
);


export default model<Carrito>("carrito", Carrito);