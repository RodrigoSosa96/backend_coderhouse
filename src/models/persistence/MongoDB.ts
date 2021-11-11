import mongoose from 'mongoose';

import { Database } from "./_AbstractClass";
import products from './schemas/products';
import carrito from './schemas/carrito';

type tableName = "productos" | "carrito";
export default class MongoDB extends Database {
    public url: any;
    public options: any;
    constructor(url: any, options: any) {
        super();
        this.url = url;
        this.options = options;
    }
    async initSchemas() {
        let data: any = mongoose.connect(this.url, this.options);
        await products.deleteMany({});
        await carrito.deleteMany({});
        return `Schemas inicializados en ${data.connections[0].name}`;
    }
    async getAll(collection: tableName) {
		let Collection = collection === 'productos' ? products : carrito;
		return Collection.find();
    }
    async getById(collection: tableName, id: string) {
        let Collection = collection === 'productos' ? products : carrito;
        return Collection.findById(id);
    }
    async addItem(collection: tableName, item: any) {
        let Collection = collection === 'productos' ? products : carrito;
        return Collection.create(item);
    }
    async updateItem(collection: tableName, id: string, item: any) {
        let Collection = collection === 'productos' ? products : carrito;
        return Collection.findByIdAndUpdate(id, item);
    }
    async deleteItem(collection: tableName, id: string) {
        let Collection = collection === 'productos' ? products : carrito;
        return Collection.findByIdAndDelete(id);
    }

}