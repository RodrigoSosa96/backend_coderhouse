import { isDocument } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import { CarritoModel,  Carrito, ProductoModel, UserModel, User, ListaProductosModel } from "../../models";

const allowlist = ["Jon", "Jane"];

const allowlistOnly = (target: any, memberName: string) => {
  let currentValue: any = target[memberName];

  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
      if (!allowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue
  });
};


function MethodDecorator(value) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class CarritoController {
	constructor() {}
	
	//  * Ruta: carrito/listar/:id?
	static async get (req: Request, res: Response, next: NextFunction) {
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
	// * Ruta: carrito/agregar/:id_producto
	static async post (req: Request, res: Response, next: NextFunction)  {
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

	}
	
	// * Ruta: carrito/borrar/:id
	static delete (req: Request, res: Response, next: NextFunction) {

	}
}



export default CarritoController;