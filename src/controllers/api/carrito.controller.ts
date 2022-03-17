import { isDocument } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CarritoModel,  Carrito, ProductoModel, UserModel, User, ListaProductosModel } from "../../models/_index";
/**
 * ! Revisar todo el carrito
 * ! 1 solo carrito
 */




/**
 * * Ruta: carrito/listar/:id?
 */

export const getCarrito = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const carrito = await CarritoModel.findOne({ user: req.user!._id }).select({user:0, _id: 0}).exec();
		if (!carrito) {
			const newCarrito = await CarritoModel.createDefault(req.user!._id)
			UserModel.findByIdAndUpdate(req.user!._id, { $set: { carrito: newCarrito._id } }).lean().exec();
			return res.json(newCarrito);
		}
		return res.json(carrito);
	} catch(err) {
		return res.json({ message: "Error al listar el carrito" });
	}
};

/**
 * * Ruta: carrito/agregar/:id_producto
 */
export const postCarrito = async (req: Request, res: Response, next: NextFunction) => {
	const { id_producto } = req.params;
	try {
		const producto = await ProductoModel.findById(id_producto).exec();
		if (!producto) return res.json({ message: "Producto no encontrado" });

		const { carrito }  = await UserModel.findOne({ _id: req.user!._id }).populate("carrito").exec() as {carrito: Carrito};
		if (isDocument(carrito)) return res.json({ message: "Carrito no encontrado" });
		// const nuevoProducto = new ListaProductosModel({
		// 	producto: producto._id,
		// 	cantidad: "1"
		// });
		// carrito.addProducto(nuevoProducto);
		
		res.json(carrito)

		
	} catch(err) {
		return res.json({ message: "Error al agregar el producto" });
	}

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

/**
 exports.deleteImageById = function(req, res, next) {
  const email = req.user.email;
  const id = req.body.id;

  Image.findOneAndRemove({ _id: id })
   .exec(function(err, removed) {
      User.findOneAndUpdate(
        { email: email },
        { $pull: { favorites: { _id: id } } },
        { new: true },
        function(err, removedFromUser) {
          if (err) { console.error(err) }
          res.status(200).send(removedFromUser)
        })
    })
}
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
