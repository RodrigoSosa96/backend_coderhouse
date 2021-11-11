import { v4 } from "uuid";

export class Producto {
    public id: string;
    public name: string;
    public timestamp: number;
    public description: string;
    public code: string;
    public image: string;
    public price: number;
    public stock: number;
	constructor(name:string, description:string, code:string, image:string, price:number, stock:number) {
		this.id = v4();
		this.timestamp = Date.now();
		this.name = name;
		this.description = description;
		this.code = code;
		this.image = image;
		this.price = price;
		this.stock = stock;
	}
}
