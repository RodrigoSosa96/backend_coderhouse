import { getModelForClass } from "@typegoose/typegoose"

import {User} from "./user"
import { Producto } from "./productos"
import { Mensaje } from "./mensajes"
import { Ordenes } from "./ordenes"
import { Carrito, ListaProductos } from "./carrito"

export const UserModel = getModelForClass(User)
export const ProductoModel = getModelForClass(Producto)
export const MensajeModel = getModelForClass(Mensaje)
export const OrdenesModel = getModelForClass(Ordenes)
export const CarritoModel = getModelForClass(Carrito)
export const ListaProductosModel = getModelForClass(ListaProductos)

