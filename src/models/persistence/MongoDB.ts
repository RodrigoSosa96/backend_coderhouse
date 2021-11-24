import mongoose from 'mongoose';

import { Database, TableName } from "./_AbstractClass";
import productos from './schemas/productos';
import carrito from './schemas/carrito';
import mensajes from './schemas/mensajes';

export default class MongoDB extends Database {
    public url: any;
    public options: any;
    private _collection: any = {
        productos,
        carrito,
        mensajes,
    };
    constructor(url: any, options: any) {
        super();
        this.url = url;
        this.options = options;

    }
    async initSchemas() {
        try {
            let db: any = await mongoose.connect(this.url, this.options);
            return `MongoDB Schemas inicializados en ${db.connections[0].host}`;
        } catch (error) {
            return error;
        }
    }
    async getAll(collection: TableName) {
        let Collection = this._collection[collection];
        return Collection.find();
    }
    async getById(collection: TableName, id: string) {
        let Collection = this._collection[collection];
        return Collection.findById(id);
    }
    async addItem(collection: TableName, item: any) {
        try {
            let Collection = this._collection[collection];
            return Collection.create(item);
        } catch (error) {
            console.log(error);
        }
    }
    async updateItem(collection: TableName, id: string, item: any) {
        try {
            let Collection = this._collection[collection];
            return Collection.findByIdAndUpdate(id, item, { new: true });
        } catch (error) {
            console.log(error);
        }
    }
    async deleteItem(collection: TableName, id: string) {
        try {
            let Collection = this._collection[collection];
            return Collection.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
    private async _disconnect(): Promise<void> {
        return mongoose.disconnect();
    }
}