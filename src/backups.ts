import { DateTime } from "luxon";
import { v4 } from "uuid";
import { ProductoType, CarritoType } from "./utils/interface";

/**
 * Uso pruebas
 */

export const PRODUCTOS: Array<ProductoType> = [
	{
		id: 1,
		timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
		nombre: "Huevos",
		descripcion: "descripcion",
		codigo: v4(),
		foto: "https://upload.wikimedia.org/wikipedia/en/5/58/Instagram_egg.jpg",
		precio: 100,
		stock: 10,
	},
	{
		id: 2,
		timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
		nombre: "Huevos fritos",
		descripcion: "descripcion",
		codigo: v4(),
		foto: "https://cookieandkate.com/images/2018/09/crispy-fried-egg-recipe-550x824.jpg",
		precio: 30,
		stock: 12,
	},
	{
		id: 3,
		timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
		nombre: "Huevos poche",
		descripcion: "descripcion",
		codigo: v4(),
		foto: "https://i.blogs.es/fd0648/pexels-photo-704571-1024/1366_2000.jpg",
		precio: 30,
		stock: 12,
	},
];
export const CARRITO :Array<CarritoType> = [
    {
        id: 1,
        timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),//del carrito,
        producto : [{
            id: 1,
            timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
            nombre: "Huevos",
            descripcion:"descripcion",
            codigo: v4(),
            foto: "https://upload.wikimedia.org/wikipedia/en/5/58/Instagram_egg.jpg",
            precio:  100,
            stock:10
        }]
    }

]

