import { Database, TableName } from "./_AbstractClass";

export default class Memory extends Database {
    private _data: any;
    constructor() {
        super();
        this._data = [];
    }
    async initSchemas() {
        this._data.productos = [];
		this._data.carrito = [];
        this._data.mensajes =[];
		return 'Arrays en memoria inicializados';
    }
    async getAll(table: TableName) {
        return this._data[table];
    }
    async getById(table: TableName, id: string) {
        return this._data[table].find((item:any) => item.id === id);
    }
    async addItem(table: TableName, item: any) {
        if(!item.length) item = [item];
        item.forEach((i:any) => {
            i.id = this.generateId();
            this._data[table].push(i);
        });
    }
    async updateItem(table: TableName, item: any) {
        const index = this._data[table].findIndex((i:any) => i.id === item.id);
        if(index === -1) return
        this._data[table][index] = item;
        return this._data[table][index];
    }
    async deleteItem(table: TableName, id: string) {
        const index = this._data[table].findIndex((i:any) => i.id === id);
        this._data[table].splice(index, 1);
    }

}