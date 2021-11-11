import { ProductoType } from "../utils/interface";

export class Producto {
	public items: Array<ProductoType>;
	constructor() {
		this.items = [];
	}

	getProductos(id?: number) {
		// Switch if general
		if (id !== undefined) {
			return this.items.filter((prod) => prod.id === id);
		} else {
			return this.items;
		}
	}
	setProduct(props: ProductoType) {
		const newProd = {
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
		return `Producto agregado`;
	}
	get numberOfItems() {
		return this.items.length;
	}
}
