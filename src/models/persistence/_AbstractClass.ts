type tableName = "productos" | "carrito"

export abstract class Database {
	// public readonly tables: string[]
	constructor() {
		// this.tables = table
	}
	abstract initSchemas(): Promise<any>
	abstract getAll(tableName: tableName): Promise<any>
	abstract getById(tableName: tableName, id: string): Promise<any>
	abstract addItem(tableName: tableName, data: any): Promise<any>
	abstract updateItem(tableName: tableName, id: string, data: any): Promise<any>
	abstract deleteItem(tableName: tableName, id: string): Promise<any>
}