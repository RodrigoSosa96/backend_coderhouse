import { Schema, model } from 'mongoose';
import { Producto } from '../../ecommerce/Producto';



const Productos = new Schema<Producto>({
    timestamp: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export default model<Producto>('productos', Productos);
