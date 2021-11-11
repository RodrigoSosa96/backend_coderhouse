import { Database } from "./_AbstractClass";

type tableName = "productos" | "carrito"
export default class Memory extends Database {
    protected data: any;
    constructor() {
        super();
        this.data = [];
    }
    test() {
        return "chau"
    }
    async initSchemas() {
        this.data.productos = [];
		this.data.carrito = [];
		return 'Arrays en memoria inicializados';
    }
    async getAll(table: tableName) {
        return this.data[table];
    }
    async getById(table: tableName, id: string) {
        return this.data[table].find((item:any) => item.id === id);
    }
    async addItem(table: tableName, item: any) {
        this.data[table].push(item);

    }
    async updateItem(table: tableName, item: any) {
        const index = this.data[table].findIndex((i:any) => i.id === item.id);
        this.data[table][index] = item;
    }
    async deleteItem(table: tableName, id: string) {
        const index = this.data[table].findIndex((i:any) => i.id === id);
        this.data[table].splice(index, 1);
    }

}