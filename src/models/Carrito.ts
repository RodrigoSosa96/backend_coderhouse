import { ProductoType } from "../utils/interface";

export class Carrito {
	private _id: number;
	private _timestamp: string;
	public items: Array<ProductoType>;

	constructor(timestamp: string, id?: number) {
		this._id = id ?? 0;
		this._timestamp = timestamp;
		this.items = [];
	}
	setItem(props: ProductoType) {
		let newProd: ProductoType = {
			id: props.id,
			timestamp: props.timestamp,
			nombre: props.nombre,
			descripcion: props.descripcion,
			codigo: props.codigo,
			foto: props.foto,
			precio: props.precio,
			stock: props.stock,
		};
		this.items.push(newProd);
	}
	get getCarro() {
		return {
			id: this._id,
			timestamp: this._timestamp,
			productos: this.getItems(),
		};
	}

	getItems(itemId?: number) {
		if (itemId !== undefined) {
			return this.items.filter((item) => item.id === itemId);
		} else {
			return this.items;
		}
	}
	get numberOfItems() {
		return this.items.length;
	}
}