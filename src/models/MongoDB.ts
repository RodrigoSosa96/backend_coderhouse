import { Schema, model, connect, connection } from 'mongoose';

import { v4 } from "uuid";
import { DateTime } from "luxon";

type Produto = {
    timestamp: string;
    nombre: string;
    descripcion: string;
    codigo: string; //uuid
    foto: string;
    precio: number;
    stock: number;

}
type Chat = {
    email: string
    fecha: string
    mensaje: string
}
const ChatSchema = new Schema<Chat>({
    email: { type: String, require: true, minLength: 3, maxLenghth: 30 },
    fecha: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    mensaje: { type: String, require: true, minlength: 3, maxlength: 200 }

});
const ProductoSchema = new Schema<Produto>({
    timestamp: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    nombre: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    descripcion: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    codigo: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    foto: { type: String, require: true, minLength: 3, maxLenghth: 25 },
    precio: { type: Number, require: true, minLength: 3, maxLenghth: 25 },
    stock: { type: Number, require: true, minLength: 3, maxLenghth: 25 },

})
const ChatModel = model<Chat>("Chat", ChatSchema)
const ProductoModel = model<Produto>("Produto", ProductoSchema)



class mongooseClass {
    protected _uri: string
    constructor(URI: string) {
        this._uri = URI
    }
    protected async _mongooseConnect() {
        await connect(this._uri, {
            // Me aparecen mensajes de error :?
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1000
        })
    }
    async newProduct({ nombre, descripcion, codigo, foto, precio, stock }: Produto) {
        this._mongooseConnect()
        const data: Produto = {
            timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo ?? v4(),
            foto: foto,
            precio: precio,
            stock: stock,
        }
        const datos = new ProductoModel(data)
        await datos.save()

        connection.close()
    }
    async readAll() {
        this._mongooseConnect()

        const data = await ProductoModel.find({}, { _id: 0, __v: 0 })

        connection.close()
        return data
    }
    async readFilter(codigo: string) {
        this._mongooseConnect()

        const data = await ProductoModel.find({ codigo: codigo }, { _id: 0, __v: 0 })

        connection.close()
        return data
    }
    async updateOne(codigo: string, datos: object) {
        this._mongooseConnect()

        const data = await ProductoModel.updateOne({ codigo: codigo }, { ...datos })

        connection.close()
        return data
    }
    async deleteOne(codigo: string) {
        this._mongooseConnect()

        const data = await ProductoModel.deleteOne({ codigo: codigo })

        connection.close()
        return data
    }


}
class MongoChat {
    protected _uri: string
    constructor(URI: string) {
        this._uri = URI
    }
    protected async _mongooseConnect() {
        this._mongooseConnect()

        await connect(this._uri, {
            // Me aparecen mensajes de error :?
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1000
        })
    }
    async newMessage({ email, mensaje }: Chat) {
        this._mongooseConnect()

        const data: Chat = {
            email: email,
            fecha: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
            mensaje: mensaje
        }
        const datos = new ChatModel(data)
        await datos.save()
    }
    async readAll() {
        this._mongooseConnect()

        const data = await ChatModel.find({}, { _id: 0, __v: 0 })
        return data
    }
    async readFilter(email: string) {
        this._mongooseConnect()

        const data = await ChatModel.find({ email: email }, { _id: 0, __v: 0 })
        return data
    }
    async updateOne(id: string, datos: object) {
        this._mongooseConnect()

        const data = await ChatModel.updateOne({ _id: id }, { ...datos })
        return data
    }
    async deleteOne(id: string) {
        this._mongooseConnect()

        const data = await ChatModel.deleteOne({ _id: id })
        return data
    }
}

