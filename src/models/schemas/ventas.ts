import { Schema, model, Document, Types, PopulatedDoc } from 'mongoose';
import {IProductos} from './productos';

interface ventasDoc {
    saleDate: Date,
    items: [{
        item: String,
        itemRef: IProductos,
    }],
    costumer: [{
        user: String,
        userRef: Types.ObjectId,
    }],
    purchasedMethod: Types.Decimal128,
    total: Types.Decimal128,
}


const ventas = new Schema<ventasDoc>({
    saleDate: { type: Date, required: true },
    items: [{
        item: { type: String, required: true },
        itemRef: { type: Schema.Types.ObjectId, ref: "Productos" },
    }],
    costumer: [{
        user: { type: String, required: true },
        userRef: { type: Schema.Types.ObjectId, ref: "Users" }

    }],
    purchasedMethod: { type: Schema.Types.Decimal128, required: true },
    total: { type: Schema.Types.Decimal128, required: true }

})



export const VentasModel = model<ventasDoc>('Ventas', ventas);



