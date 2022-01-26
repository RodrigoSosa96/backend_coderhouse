import { Schema, model, Types, Model } from 'mongoose';
import { IProducto } from "./productos"

export interface ICarrito {
    timestamp: Date;
    productos?: [Schema.Types.ObjectId] | [];
}
export interface PopulatedCarrito {
    productos: Types.DocumentArray<IProducto> | null;
}



const Carrito = new Schema<ICarrito, Model<ICarrito>>({
    timestamp: { type: Date, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
}, { timestamps: true }
);



export const CarritoModel = model<ICarrito, Model<ICarrito>>("Carrito", Carrito);
