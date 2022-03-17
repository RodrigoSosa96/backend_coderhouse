import { prop, Ref, pre, DocumentType, ReturnModelType, index } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

import { Ordenes } from "./ordenes";
// import { CarritoModel } from "./models";
import { Carrito } from "./carrito";
import { ModelType } from "@typegoose/typegoose/lib/types";

const emailValidator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/s;

enum Role {
    admin = "admin",
    user = "user"
}

@pre<User>("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
		next();
	} catch (err) {
		if (err instanceof Error) next(err);
		else next(new Error("Error al encriptar la contraseña"));
	}
})
@index({ email: 1, carrito:1 }, { unique: true })
export class User {
	@prop({
		required: true,
		lowercase: true,
		trim: true,
		validate: emailValidator,
	})
	public email!: string;

	@prop({ required: true })
	public password!: string;

	@prop({ required: true })
	public name!: string;

	@prop({ required: true })
	public address!: string;

	@prop({ required: true })
	public age!: number;

	@prop({ required: true })
	public phoneNumber!: string;

	public picture?: string;

    @prop({enum: Role})
    public role?: Role;

	@prop({ref: () => Ordenes})
	public ordenes?: Ref<Ordenes>[];

	@prop({ ref: () => Carrito })
	public carrito?: Ref<Carrito>



    public async comparePassword(this:DocumentType<User>, candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password)
    }


	public static async findByEmail(this: ReturnModelType<typeof User>, email: string): Promise<DocumentType<User> | null> {
		return await this.findOne({ email });
	}

    public async createCarrito(this:DocumentType<User>, carritoModel: ModelType<Carrito>, carritoData:Carrito): Promise<Ref<Carrito>> {
		if(this.carrito === undefined || this.carrito === null) { 
			const data = await carritoModel.create({
				...carritoData
			}) ;
			this.carrito  = await data.save();
			await this.save();
			return this.carrito;
		}
    }

	public async deleteCarrito(this:DocumentType<User>, carritoModel: ModelType<Carrito>): Promise<boolean> {
		if(this.carrito !== undefined && this.carrito !== null) {
			try {
				await carritoModel.deleteOne({_id: this.carrito!}).exec();
				this.carrito = undefined;
				await this.save();
				return true;
			} catch{
				return false;
			}

		}
		return false;
			
	}
	
}




