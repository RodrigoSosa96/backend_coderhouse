export interface ProductoType {
	id: number; //numero
	timestamp: string;
	nombre: string;
	descripcion: string;
	codigo: string; //uuid
	foto: string;
	precio: number;
	stock: number;
}
export interface CarritoType {
	id: number;
	timestamp: string;
	producto: Array<ProductoType>;
}
export interface ErrorArchivo {
	error: number;
	descripcion: string;
}
export type metodo = "GET" | "POST" | "DELETE" | "PUT"

