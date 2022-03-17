import { GraphQLScalarType, Kind } from "graphql";
import { Producto, ProductoModel, User, UserModel  } from "../../models/_index";

export const rootController = {

    // Scalar improvisado
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value: any) {
            return new Date(value); // value from the client
        },
        serialize(value: any) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast: any) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value) // ast value is always in string format
            }
            return null;
        },
    }),


    //Usuarios
    getUser: async (id: any) => {
        return UserModel.findById(id).select({ _id: 0, __v: 0 }).lean().exec()
    },
    createUser: async (email: string, password: string, name: string, address: string, age: number, phoneNumber: string, picture: string) => {
        const newUser = await UserModel.create({
            email,
            password,
            name,
            address,
            age,
            phoneNumber,
            picture
        });
        return newUser.toObject()
    },
    updateUserPassword: async (id: any, password: string) => {
        const newUser = await UserModel.findByIdAndUpdate(id, {
            password,
        });
        if (newUser) return newUser.toObject()
        else return null
    },

    //Productos
    getProductos: async () => {
        return ProductoModel.find().select({ _id: 0, __v: 0 }).lean().exec()
    },
    getProducto: async (id: any) => {
        return ProductoModel.findById(id).select({ _id: 0, __v: 0 }).lean().exec()
    },

    createProducto: async (name: string, description: string, code: string, image: string, price: string, stock: number) => {
        const newProducto = await ProductoModel.create({
            timestamp: new Date(),
            name,
            description,
            code,
            image,
            price,
            stock
        });
        return newProducto.toObject()
    },
    deleteProducto: async (id: any) => {
        return ProductoModel.findByIdAndDelete(id).exec()

    },
    updateProducto: async (id: any, name: string, description: string, code: string, image: string, price: string, stock: number) => {
        const newProducto = await ProductoModel.findByIdAndUpdate(id, {
            timestamp: new Date(),
            name,
            description,
            code,
            image,
            price,
            stock
        });
        if (newProducto) return newProducto.toObject()
        else return null
    },
}

