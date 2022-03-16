import { Schema, model, Types, Model, HydratedDocument } from 'mongoose';
import { IProducto } from "./productos"

export interface ICarrito {
    timestamp: Date;
    productos?: [Types.ObjectId];
    address: String
}
export interface PopulatedCarrito {
    productos: Types.DocumentArray<IProducto> | null;
}

export interface ICarritoMethod {
    addProducto: (producto: IProducto) => Promise<void>
    removeProducto: (producto: IProducto) => Promise<void>
    getTotal: () => Promise<number>
    deleteCarrito: () => Promise<void>
}
const Carrito = new Schema<ICarrito, Model<ICarrito, {}, ICarritoMethod>>({
    timestamp: { type: Date, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    address: {type:String, required:true},
}, { timestamps: true }
);




export const CarritoModel = model<ICarrito, Model<ICarrito, {}, ICarritoMethod>>("Carrito", Carrito);
