import * as fs from "fs/promises";
import * as path from "path";

import { Database, TableName } from "./_AbstractClass";

export default class FileSystem extends Database {
    private readonly rootPath: string// =  path.resolve(__dirname, "../../files");
    private readonly _productos: string = "productos.json"
    private readonly _carrito: string = "carrito.json"
    private readonly _mensajes: string = "mensajes.json"
    constructor(pathDIR: string) {
        super();
        this.rootPath = path.resolve(__dirname, pathDIR);
    }
    public async initSchemas() {
        try {
            const files = await fs.readdir(this.rootPath);

            if (files.length !== 3) {
                await fs.mkdir(this.rootPath, { recursive: true });
                await fs.writeFile(path.join(this.rootPath, this._productos), JSON.stringify([]));
                await fs.writeFile(path.join(this.rootPath, this._carrito), JSON.stringify([]));
                await fs.writeFile(path.join(this.rootPath, this._mensajes), JSON.stringify([]));
                return "FileSystem: Se crearon los archivos";
            }
            return "FileSystem: Los archivos ya existen";
        } catch (error) {
            throw error;
        }
    }
    public async getAll(tableName: TableName): Promise<any[]> {
        const data = await fs.readFile(path.join(this.rootPath, tableName + ".json"), "utf-8");
        return JSON.parse(data);
    }

    public async getById(tableName: TableName, id: string): Promise<any> {
        const data = await this.getAll(tableName);
        return data.find(item => item.id === id);
    }

    public async addItem(tableName: TableName, item: any): Promise<any> {
        if(!item.length) item = [item];
        const data = await this.getAll(tableName);
        item.forEach((element: any) => {
            element.id = this.generateId();
            data.push(element);
        });
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
        return item;
    }

    public async updateItem(tableName: TableName, id: string, item: any): Promise<any> {
        const data = await this.getAll(tableName);
        const index = data.findIndex(item => item.id === id);
        if(index === -1) return;
        data[index] = { ...data[index], ...item };
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
        return data[index];
    }

    public async deleteItem(tableName: TableName, id: string): Promise<void> {
        const data = await this.getAll(tableName);
        const index = data.findIndex(item => item.id === id);
        data.splice(index, 1);
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
    }
}


