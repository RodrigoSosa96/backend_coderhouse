import { knex, Knex } from "knex";
import Logger from "../../utils/logger";

import { Database, TableName } from "./_AbstractClass";

export default class SQL extends Database {
    private _knex: Knex;
    constructor(sqlOptions: any) {
        super();
        this._knex = knex(sqlOptions);
    }
    async initSchemas() {
        try {
            const productsExist = await this._knex.schema.hasTable("productos");
            const carritoExist = await this._knex.schema.hasTable("carrito");
            if (!productsExist && !carritoExist) {
                await this._knex.schema.createTable("productos", (table) => {
                    table.increments("id").primary()
                    table.string("timestamp", 20)
                    table.string("name", 20)
                    table.string("description", 200)
                    table.uuid("code")
                    table.string("image")
                    table.float("price")
                    table.integer("stock")
                });
                await this._knex.schema.createTable("carrito", (table) => {
                    table.increments("id")
                    table.string("email", 100)
                    table.string("fecha", 20)
                    table.string("mensaje", 200)
                });
                return `Tabla productos inicializada en ${this._knex.client.config.client}`;
            }
            return `Tablas ya existentes en ${this._knex.client.config.client} `;
        } catch (error:any) {
            await this._knex.destroy();
            throw new Error(error.message);
        }
    };
    async getAll(table: TableName): Promise<any> {
        try {
            const products = await this._knex.select("*").from(table);
            return products;
        } catch (error:any) {
            throw new Error(error.message);
        }
    };
    async getById(table: TableName, id: string): Promise<any> {
        try {
            const product = await this._knex.select("*").from(table).where("id", id);
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async addItem(table: TableName, data: any): Promise<any> {
        try {
            const product = await this._knex(table).insert(data);
            return product;
        } catch (error:any) {
            Logger.error(error);
            throw new Error(error.message);
        }
    }
    async updateItem(table: TableName, id: string, data: any): Promise<any> {
        try {
            const update = await this._knex(table).where("id", id).update(data);
            if(update === 0) return
            const newProduct = await this._knex.select("*").from(table).where("id", id);
            return newProduct;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async deleteItem(table: TableName, id: string): Promise<any> {
        try {
            const product = await this._knex(table).where("id", id).del();
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}