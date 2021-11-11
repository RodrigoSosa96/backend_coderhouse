import { knex, Knex } from "knex";

import { options } from "../options/databases";



type SchemaProducto = {
	timestamp: string;
	nombre: string;
	descripcion: string;
	codigo: string; //uuid
	foto: string;
	precio: number;
	stock: number;

}
type SchemaChat = {
	email: string
	fecha: string
	mensaje: string
}


abstract class Database {
	protected abstract _knex: Knex
	public table: string
	constructor(table: string) {
		this.table = table
	}
	protected abstract _checkTable(): Promise<any>
	async newItems(data: object): Promise<void> {
		try {
			await this._checkTable()

			await this._knex(this.table).insert(data) //deprecated
		} catch (err: any) {
			console.error(err)
		} finally {
			this._knex.destroy()
		}
	}
	async getItems(id?: number | string): Promise<object[]> {
		try {
			if (typeof id === "string") id = parseInt(id)
			await this._checkTable()
			if (id) {
				const datos = await this._knex.from(this.table).where("id", "=", id)
				return datos
			} else {
				const datos = await this._knex.from(this.table).select("*")
				return datos
			}
		} catch (err) {
			console.error("Error en proceso: " + err)
			return []
		} finally {
			this._knex.destroy()
		}
	}
	/**
	 * 
	 * @returns 1? se actualizó, 0 si no
	 */
	async updateItem(id: number | string, data: object): Promise<any> {
		try {
			if (typeof id === "string") id = parseInt(id)
			await this._checkTable()
			const state = await this._knex.from(this.table).where("id", "=", id).update(data)
			return state
		} catch (err) {
			console.error("Error en: " + err)
		} finally {
			this._knex.destroy()
		}
	}
	/**
	 * 
	 * @param id 
	 * @returns 1 si se borró, 0 si no
	 */
	async deleteItem(id: number | string) {
		try {
			if (typeof id === "string") id = parseInt(id)
			await this._checkTable()
			const deleted = await this._knex.from(this.table).where("id", "=", id).del()
			return deleted
		} catch (err) {
			console.error("Error en: " + err)
		} finally {
			this._knex.destroy()
		}
	}

	async dropTable(): Promise<void> {
		try {
			await this._knex.schema.dropTable(this.table)
		} catch (err) {
			console.error("Error en proceso: " + err)
		} finally {
			this._knex.destroy()
		}
	}
}

class Producto extends Database {
	protected readonly _knex = knex(options.mariaDB)
	protected async _checkTable(): Promise<any> {
		try {
			const exist = await this._knex.schema.hasTable(this.table)
			if (exist) return
			console.log(`Se creo la tabla: ${this.table}`)
			await this._knex.schema.createTable(this.table, table => {
				table.increments("id").primary()
				table.string("timestamp", 20)
				table.string("nombre", 20)
				table.string("descripcion", 200)
				table.uuid("codigo")
				table.string("foto")
				table.float("precio")
				table.integer("stock")
			})
		} catch (err) {
			return err
		}
	}
	async newItems(data: SchemaProducto | SchemaProducto[]): Promise<void> {
		super.newItems(data)
	}
	async updateItem(id: number | string, data: Partial<SchemaProducto>): Promise<any> {
		super.updateItem(id, data)
	}
}
class Chat extends Database {
	protected readonly _knex = knex(options.sqlite3)
	protected async _checkTable(): Promise<any> {
		try {
			const exist = await this._knex.schema.hasTable(this.table)
			if (exist) return
			console.log(`Se creo la tabla: ${this.table}`)
			await this._knex.schema.createTable(this.table, table => {
				table.increments("id")
				table.string("email", 100)
				table.string("fecha", 20)
				table.string("mensaje", 200)
			})
		} catch (err) {
			return err
		}
	}
	async newItems(data: SchemaChat): Promise<void> {
		super.newItems(data)
	}
	async updateItem(id: number | string, data: Partial<SchemaChat>): Promise<any> {
		super.updateItem(id, data)
	}
}
export const mensajes = new Chat("mensajes")
export const productos = new Producto("productos")
