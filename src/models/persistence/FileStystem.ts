import * as fs from "fs/promises";
import * as path from "path";

import { Database } from "./_AbstractClass";

type tableName = "productos" | "carrito"
export default class FileSystem extends Database {
    private readonly rootPath: string// =  path.resolve(__dirname, "../../files");
    private readonly _productos: string = "productos.json"
    private readonly _carrito: string = "carrito.json"
    constructor(pathDIR: string) {
        super();
        this.rootPath = path.resolve(__dirname, pathDIR);
    }
    public async initSchemas(): Promise<void> {
        try {
            await fs.mkdir(this.rootPath, { recursive: true });
            await fs.writeFile(path.join(this.rootPath, this._productos), JSON.stringify([]));
            await fs.writeFile(path.join(this.rootPath, this._carrito), JSON.stringify([]));

        } catch (error) {
            throw error;
        }
    }
    public async getAll(tableName: tableName): Promise<any[]> {
        const data = await fs.readFile(path.join(this.rootPath, tableName + ".json"), "utf-8");
        return JSON.parse(data);
    }

    public async getById(tableName: tableName, id: string): Promise<any> {
        const data = await this.getAll(tableName);
        return data.find(item => item.id === id);
    }

    public async addItem(tableName: tableName, item: any): Promise<any> {
        const data = await this.getAll(tableName);
        item.id = data.length + 1;
        data.push(item);
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
        return item;
    }

    public async updateItem(tableName: tableName, id: string, item: any): Promise<any> {
        const data = await this.getAll(tableName);
        const index = data.findIndex(item => item.id === id);
        data[index] = item;
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
        return item;
    }

    public async deleteItem(tableName: tableName, id: string): Promise<void> {
        const data = await this.getAll(tableName);
        const index = data.findIndex(item => item.id === id);
        data.splice(index, 1);
        await fs.writeFile(path.join(this.rootPath, tableName + ".json"), JSON.stringify(data));
    }
}


