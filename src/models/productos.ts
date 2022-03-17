import { prop, getModelForClass, ReturnModelType, DocumentType, index } from "@typegoose/typegoose";
import { Types } from "mongoose";

@index<Producto>({ code: 1 }, { unique: true })
export class Producto {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public description!: string;
    
    @prop({ required: true })
    public category!: string;

    @prop({ required: true })
    public code!: string;

    @prop({ required: true })
    public image!: string;

    @prop({ required: true, type: Types.Decimal128  })
    public price!: string;
    // public price!: string;

    @prop({ required: true, default: 0 })
    public stock!: number;

    public static async findByCode(this: ReturnModelType<typeof Producto>, code: string) {
        return await this.findOne({ code });
    }

    public static async findByCategory(this: ReturnModelType<typeof Producto>, category: string) {
        return await this.find({ category });
    }

    private checkStock(this:DocumentType<Producto>, quantity: number) {
        if (this.stock >= quantity) {
            return true;
        }
        return false;
    }

    public async updateStock(this: DocumentType<Producto>, quantity: number) {
        if (this.checkStock(quantity)) {
            this.stock -= quantity;
            await this.save();
            return true;
        }
        return false;
    }

    public async addStock(this: DocumentType<Producto>, quantity: number) {
        this.stock += quantity;
        await this.save();
    }


    
}
 export default getModelForClass(Producto);


