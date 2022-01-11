import { v4 } from "uuid";
import { User } from "../user/user.model";
import { Producto } from "./Producto";

export class Carrito {
    public timestamp: Date;
	public user: User 
		
	public productos: Producto[];

	constructor(user:User) {
		this.timestamp = new Date()
		this.user = user
		this.productos = [];
	}

	set (producto:Producto) {
		this.productos.push(producto)
	}
}
