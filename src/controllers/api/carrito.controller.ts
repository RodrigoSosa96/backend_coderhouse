import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CarritoModel, ICarrito, ProductosModel, UserModel } from "../../models/_index";
/**
 * ! Revisar todo el carrito
 * 
 */




/**
 * * Ruta: carrito/listar/:id?
 */

//  var user = newDataObj;
//  req.logIn(user, function(error) {
// 	 if (!error) {
// 		console.log('succcessfully updated user');
// 	 }
//  });
//  res.end(); // important to update session

export const getCarrito = async (req: Request, res: Response, next: NextFunction) => {
	if (req.isUnauthenticated()) return res.json({ message: "No estas autenticado" });
	try {
		let user = await UserModel.findById(req.user?._id).exec();
		user?.createCarritoifNotExists();
		

		return res.json(user?.carrito);
	} catch {
		return res.json({ message: "Error al listar el carrito" });
	}
};

/**
 * * Ruta: carrito/agregar/:id_producto
 */
export const postCarrito = async (req: Request, res: Response, next: NextFunction) => {
	// try {
	// 	let { params } = req;
	// 	const { id_producto } = params;
	// 	const producto = await db.getById("productos", id_producto);
	// 	let carrito = await db.getById("carrito", "0");
	// 	if (producto) {
	// 		carrito.productos.push(producto);
	// 		carrito.timestamp = new Date().toISOString();
	// 		await db.updateItem("carrito", id_producto, carrito);
	// 		res.status(202).json(carrito);
	// 	} else {
	// 		res.status(404).json({ message: "El producto no existe" });
	// 	}
	// } catch {
	// 	next();
	// }
};

/**
 * * Ruta: carrito/borrar/:id
 */
export const deleteCarrito = async (req: Request, res: Response, next: NextFunction) => {
	// //	/borrar/:id
	// let { params } = req;
	// try {
	// 	const carrito = await db.getById("carrito", params.id);
	// 	const deleted = await db.deleteItem("carrito", params.id);
	// 	if (deleted === 1) res.status(202).json(carrito);
	// 	else res.status(404).json({ message: "No se pudo borrar el producto" });
	// } catch {
	// 	next();
	// }
};
