import { NextFunction, Request, Response } from "express";

const enum StatusCode {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,	
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	SERVICE_UNAVAILABLE = 503
}

export const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
	if (!err) return res.status(409).json({ message: "conflict" });

	if(err.statusCode === StatusCode.UNAUTHORIZED) {
		res.status(err.statusCode).json({ error : err.statusCode, descripcion:` Ruta ${req.originalUrl} método ${err.metodo} no autorizada`})
	}if(err.statusCode === StatusCode.BAD_REQUEST) {
		res.status(err.statusCode).json({error: err.statusCode, descripcion: `Ruta no disponible`})
	}if(err.statusCode === -1) {
		res.status(err.statusCode).json({error:err.statusCode, descripcion: err.message})
	}
	else {
		res.status(err.statusCode).json({error:err.statusCode, descripcion: `Error desconocido en ${req.originalUrl}, método ${err.metodo}`})
	}
	



};
