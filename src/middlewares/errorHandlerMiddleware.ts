import { NextFunction, Request, Response } from "express";
import { BadErrorHandler } from "../utils/Errors";


export const errorHandlerMiddleware = (err:BadErrorHandler, req:Request, res:Response, next:NextFunction) => {
	if (!err) return res.status(409).json({ message: "conflict" });

	if(err.statusCode === 401) {
		res.status(err.statusCode).json({ error : err.statusCode, descripcion:` Ruta ${req.originalUrl} método ${err.metodo} no autorizada`})
	}if(err.statusCode === 400) {
		res.status(err.statusCode).json({error: err.statusCode, descripcion: `Ruta no disponible`})
	}if(err.statusCode === -1) {
		res.status(err.statusCode).json({error:err.statusCode, descripcion: err.message})
	}
	else {
		res.status(err.statusCode).json({error:err.statusCode, descripcion: `Error desconocido en ${req.originalUrl}, método ${err.metodo}`})
	}
	



};
