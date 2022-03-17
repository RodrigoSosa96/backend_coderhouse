import { prop, Ref, modelOptions, ReturnModelType, DocumentType, index } from "@typegoose/typegoose";
import { Producto } from "./productos"
import { User } from "./user";
import { Types } from "mongoose"


@modelOptions({ schemaOptions: { _id: false } })
export class ListaProductos {
    @prop({ required: true, ref: () => Producto })
    public producto?: Ref<Producto>;

    @prop({ required: true, default: 1 })
    public cantidad!: number;
    
    @prop({ required: true, default: 0 })
    public precio!: Types.Decimal128;


    public static async calculateTotal(this: ReturnModelType<typeof ListaProductos>, ): Promise<any> {
        return this.aggregate([
            {
                $project: {
                    subtotal: { $multiply: ["$cantidad", "$precio"] }
                }
            }
        ])

    }
}

@index<Carrito>({ user: 1 }, { unique: true })
export class Carrito {
    @prop({ required: true, ref: () => User })
    public user!: Ref<User>;

    @prop({ required: true })
    public fecha!: Date;

    @prop()
    public address?: string;    
    
    @prop({ required: true, type: () => ListaProductos })
    public listaProductos?: ListaProductos[]

    public static async createDefault(this: ReturnModelType<typeof Carrito>, user: Ref<User>): Promise<DocumentType<Carrito>> {
        const data = await this.create({
            user,
            fecha: new Date()
        })
        return data;
    }

    public static async checkProducto(this:ReturnModelType<typeof Carrito>, producto: Ref<Producto>): Promise<boolean> {
        const check = await this.findOne({
            "listaProductos.producto": producto
        })
        return check !== null;
    } 

    public static async calculateTotaL(this: ReturnModelType<typeof Carrito>): Promise<number> {
        const data = await this.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: [ "$listaProductos.cantidad", "$listaProductos.precio" ] } }
                }
            }
        ])
        return data[0].total;
        

    }


    public async addProducto(this: DocumentType<Carrito>, listaProductos: ListaProductos = new ListaProductos()): Promise<DocumentType<Carrito>> {
        if (this.listaProductos === undefined || this.listaProductos === null) {
            this.listaProductos = [];
        }
        const index = this.listaProductos.findIndex(x => x.producto === listaProductos.producto);
        if (index !== -1) {
            this.listaProductos[index].cantidad += listaProductos.cantidad;
        } else {
            this.listaProductos.push(listaProductos);
        }
        return this.save();
    }
    
    public async removeProducto(this: DocumentType<Carrito>, producto: Ref<Producto>): Promise<DocumentType<Carrito>> {
        if (this.listaProductos === undefined || this.listaProductos === null) {
            this.listaProductos = [];
        }
        const index = this.listaProductos.findIndex(x => x.producto === producto);
        if (index !== -1) {
            this.listaProductos.splice(index, 1);
        }
        return this.save();
    }

    public async updateProducto(this: DocumentType<Carrito>, producto: Ref<Producto>, cantidad: number): Promise<DocumentType<Carrito>> {
        if (this.listaProductos === undefined || this.listaProductos === null) {
            this.listaProductos = [];
        }
        const index = this.listaProductos.findIndex(x => x.producto === producto);
        if (index !== -1) {
            this.listaProductos[index].cantidad = cantidad;
        }
        return this.save();
    }



}


// export interface ICarritoMethod {
//     addProducto: (producto: IProducto) => Promise<void>
//     removeProducto: (producto: IProducto) => Promise<void>
//     getTotal: () => Promise<number>
//     deleteCarrito: () => Promise<void>
// }



