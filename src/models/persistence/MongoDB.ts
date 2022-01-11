import mongoose, { Model } from 'mongoose';

import { Database, TableName } from "./_AbstractClass";
import productos from './schemas/productos';
import carrito from './schemas/carrito';
import mensajes from './schemas/mensajes';
import Logger from '../../utils/logger';

interface CollectionModel {
    [key: string]: Model<any>
}

export default class MongoDB extends Database {
    private _url: string;
    public options: any;
    private _collection: CollectionModel = {};
    constructor(url: string, options: any) {
        super();
        this._url = url;
        this.options = options;

    }
    async initSchemas() {
        try {
            let db: any = await mongoose.connect(this._url);
            this._addCollection("productos", productos);
            this._addCollection("carrito", carrito);
            this._addCollection("mensajes", mensajes); 
            return `MongoDB Schemas inicializados en ${db.connection.host + ":" + db.connection.port + "/" + db.connection.name}`;
        } catch (error) {
            throw error;
        }
    }
    private async _addCollection(name: TableName, model: Model<any>) {
        this._collection[name] = model;
    }
    async getAll(collection: TableName) {
        let Collection = this._collection[collection];
        return Collection.find();
    }
    async getById<T extends TableName, K extends keyof T> (collection: T, id: string) {
        let Collection = this._collection[collection];
        return Collection.findById(id);
    }
    async addItem(collection: TableName, item: any) {
        try {
            let Collection = this._collection[collection];
            return Collection.create(item);
        } catch (error) {
            Logger.error(error);
        }
    }
    async updateItem(collection: TableName, id: string, item: any) {
        try {
            let Collection = this._collection[collection];
            return Collection.findByIdAndUpdate(id, item, { new: true });
        } catch (error) {
            Logger.error(error);
        }
    }
    async deleteItem(collection: TableName, id: string) {
        try {
            let Collection = this._collection[collection];
            return Collection.findByIdAndDelete(id);
        } catch (error) {
            Logger.error(error);
        }
    }
    private async _disconnect(): Promise<void> {
        return mongoose.disconnect();
    }
}