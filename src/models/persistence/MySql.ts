import { knex, Knex } from "knex";

import { Database } from "./_AbstractClass";

type tableName = "productos" | "carrito"
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
            if (!productsExist) {
                await this._knex.schema.createTable("productos", (table) => {
                    table.increments("id").primary()
                    table.string("timestamp", 20)
                    table.string("nombre", 20)
                    table.string("descripcion", 200)
                    table.uuid("codigo")
                    table.string("foto")
                    table.float("precio")
                    table.integer("stock")
                });
                return `Tabla productos inicializada en ${this._knex.client.config.client}`;
            }
            if(!carritoExist){
                await this._knex.schema.createTable("carrito", (table) => {
                    table.increments("id")
                    table.string("email", 100)
                    table.string("fecha", 20)
                    table.string("mensaje", 200)
                });
                return `Tabla carrito inicializada en ${this._knex.client.config.client}`;
            }
        } catch (error:any) {
            await this._knex.destroy();
            throw new Error(error.message);
        }
    };
    async getAll(table: tableName): Promise<any> {
        try {
            const products = await this._knex.select("*").from(table);
            return products;
        } catch (error:any) {
            throw new Error(error.message);
        }
    };
    async getById(table: tableName, id: string): Promise<any> {
        try {
            const product = await this._knex.select("*").from(table).where("id", id);
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async addItem(table: tableName, data: any): Promise<any> {
        try {
            const product = await this._knex(table).insert(data);
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async updateItem(table: tableName, id: string, data: any): Promise<any> {
        try {
            const product = await this._knex(table).where("id", id).update(data);
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async deleteItem(table: tableName, id: string): Promise<any> {
        try {
            const product = await this._knex(table).where("id", id).del();
            return product;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}