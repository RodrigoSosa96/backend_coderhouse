import { metodo } from "./interface";

export class BadErrorHandler extends Error {
	data: object;
	metodo: metodo | undefined;
	statusCode: number;
	constructor(err: {
		message?: string;
		statusCode?: number;
		metodo?: metodo;
	}) {
		super(err.message);

		this.data = { error: err };
		this.statusCode = err.statusCode || -1;
		this.metodo = err.metodo;
	}
}

// export class FSError extends Error {
// 	data: object;
// 	statusCode: number;
// 	constructor(error) {}
// }
