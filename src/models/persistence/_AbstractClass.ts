import { v4 } from "uuid"

export type TableName = "productos" | "carrito" | "mensajes"
export abstract class Database {
	// public readonly tables: string[]
	constructor() {
		// this.tables = table
	}
	abstract initSchemas(): Promise<any>
	abstract getAll(tableName: TableName): Promise<any>
	abstract getById(tableName: TableName, id: string): Promise<any>
	abstract addItem(tableName: TableName, data: any): Promise<any>
	abstract updateItem(tableName: TableName, id: string, data: any): Promise<any>
	abstract deleteItem(tableName: TableName, id: string): Promise<any>
	generateId(): string {
		return v4()
	}
}