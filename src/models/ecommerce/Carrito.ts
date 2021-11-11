import { v4 } from "uuid";
import { Producto } from "./Producto";

export class Carrito {
    public id: string;
    public timestamp: number;
    public productos: Producto[];
	constructor() {
		this.id = v4();
		this.timestamp = Date.now();
		this.productos = [];
	}
}
