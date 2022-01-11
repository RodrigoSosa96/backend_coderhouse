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

const Carrito = new Schema<any>({
    timestamp: { type: Date, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Productos' }]
}, { timestamps: true } //? testar
);


export default model<Carrito>("carrito", Carrito);