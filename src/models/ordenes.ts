import { Schema, model, Types, Model } from 'mongoose';


/**
 * - Ítems: las órdenes deben poder tener productos surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
- Número de orden: Se extrae de la cantidad de órdenes almacenadas
- Fecha y hora
- estado ( por defecto en ‘generada’)
- Email de quién realizó la orden
 */
export interface IOrdenes {
    items: [{producto: Types.ObjectId,cantidad: number}];
    numero: number;
    timestamp: Date;
    estado: string;
    email: string;
}

export interface IOrdenesMethod {
}

const OrdenesSchema = new Schema<IOrdenes, Model<IOrdenes, {}, IOrdenesMethod>>({
    items: [{producto: Types.ObjectId,cantidad: Number }],
    numero: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    estado: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });
