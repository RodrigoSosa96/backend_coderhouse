import { Schema, model } from 'mongoose';
import { IProductos } from "./productos"

export interface ICarrito {
    timestamp: Date;
    productos: [Schema.Types.ObjectId];
}
export interface PopulatedCarrito {
    timestamp: Date;
    productos: IProductos[] | null;
}



const Carrito = new Schema<ICarrito>({
    timestamp: { type: Date, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Productos' }]
}, { timestamps: true } //? testar
);


export const CarritoModel = model<ICarrito>("Carrito", Carrito);
