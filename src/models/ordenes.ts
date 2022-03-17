import {  prop, Ref, modelOptions, ReturnModelType, plugin, index } from "@typegoose/typegoose";
import { AutoIncrementSimple } from "@typegoose/auto-increment"

import { Producto } from "./productos";
import { User } from "./user";
import { OrdenesModel } from "./models"



/**
 * - Ítems: las órdenes deben poder tener productos surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
- Número de orden: Se extrae de la cantidad de órdenes almacenadas
- Fecha y hora
- estado ( por defecto en ‘generada’)
- Email de quién realizó la orden
 */
@modelOptions({ schemaOptions: { _id: false } })
class Items {
    @prop({ required: true, ref: () => Producto })
    public producto!: Ref<Producto>;

    @prop({ required: true })
    public cantidad!: number;
}


@index<Ordenes>({user: 1})
@plugin(AutoIncrementSimple, [{ field: 'numero' }])
export class Ordenes {

    @prop({ required: true })
    public numero?: number;

    @prop({ required: true, ref: () => User })
    public user : Ref<User>;
    
    @prop({ required: true })
    public fecha!: Date;
    
    @prop({ required: true, type: () => Items })
    public items!: Items[];

    @prop({ required: true })
    public address!: string;    

    @prop({ required: true })
    public estado!: string;

    public static async countOrdenes(this: ReturnModelType<typeof Ordenes>): Promise<number> {
        return await this.countDocuments({});
    }
}

