import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Products {
    timestamp: string;
    nombre: string;
    descripcion: string;
    codigo: string; //uuid
    foto: string;
    precio: number;
    stock: number;
}

// 2. Create a Schema corresponding to the document interface.
const Products = new Schema<Products>({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export default model<Products>('products', Products);
