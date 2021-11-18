import { v4 } from "uuid";
import { Producto } from "./Producto";

export class Carrito {
    public timestamp: number;
    public productos: Producto[];
	constructor() {
		this.timestamp = Date.now();
		this.productos = [];
	}
}
