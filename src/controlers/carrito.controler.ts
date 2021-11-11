import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";

import { CarritoType, ProductoType } from "../utils/interface";
import db from "../index"


export const getCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// /listar/:id?
	let { params } = req;

	try {
		if (params.id) {
			const carrito = await db.getById("productos", params.id);

			res.status(202).json(carrito);
		} else {
			const carrito = await db.getAll("productos");
			res.status(202).json(carrito);
		}
	} catch {
		next();
	}
};

export const postCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/agregar/:id_producto"
	try {
		let { params } = req;
		const { id_producto } = params;

		const producto = await db.getById("productos", id_producto);
		const carrito = await db.getById("carrito", "0");
		carrito.productos.push(producto);
		carrito.timestamp = DateTime.local().toISO();
		await db.updateItem("carrito", id_producto, carrito);
		res.status(202).json(carrito);
	} catch {
		next();
	}

		// const datosCarrito = (await carritoHuevos.readFile()) as CarritoType[];
		// const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		// let arrProd = datosProductos.filter(
		// 	(prod) => prod.id === parseInt(params.id_producto)
		// );
		// if (arrProd.length > 0) {
		// 	datosCarrito[0].producto.push(arrProd[0]);
		// 	await carritoHuevos.writeFile(datosCarrito);
		// 	res.json(datosCarrito);
		// } else {
		// 	res.json(202).json(datosCarrito);
		// }
		// const newID = datosCarrito.length + 1;
		// const newCarrito: CarritoType = {
		// 	id: newID,
		// 	timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
		// 	producto: arrProd[0],
		// };
		// res.json(newCarrito);
		// datosCarrito[0].producto.push(arrProd)
// 	} catch {
// 		next();
// 	}
};


export const deleteCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/borrar/:id
	let { params } = req;
	try {
		const carrito = await db.getById("carrito", params.id);
		await db.deleteItem("carrito", params.id);
		res.status(202).json(carrito);
	} catch {
		next();
	}

	// try {
	// 	const datosCarrito = (await carritoHuevos.readFile()) as Array<CarritoType>;

	// 	let objIndex = datosCarrito[0].producto.findIndex(
	// 		(obj) => obj.id == parseInt(params.id)
	// 	);
	// 	if (objIndex !== -1) {
	// 		datosCarrito[0].producto.splice(objIndex, 1);
	// 		await carritoHuevos.writeFile(datosCarrito);
	// 		res.json(datosCarrito);
	// 	} else {
	// 		res.status(403).json({
	// 			error: -1,
	// 			descripcion: "Id del archivo no valida",
	// 		});
	// 	}
	// } catch {
	// 	next();
	// }
};
