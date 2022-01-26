import { Schema, model, Model } from 'mongoose';


export interface IProducto {
    timestamp: Date;
    name: string;
    description: string;
    code: string;
    image: string;
    price: string | number;
    stock: number;
}


const Producto = new Schema<IProducto, Model<IProducto>>({
    timestamp: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});


export const ProductosModel = model<IProducto, Model<IProducto>>('Producto', Producto);
