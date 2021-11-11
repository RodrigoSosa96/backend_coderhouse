import { Schema, model } from 'mongoose';


interface Carrito {
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
}

const Carrito = new Schema({
    timestamp: { type: Date, default: Date.now },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});


export default model('carrito', Carrito);