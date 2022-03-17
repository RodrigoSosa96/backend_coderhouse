import faker from "faker"
import { ProductoModel, Producto } from "../models/_index"
faker.setLocale("es_MX")
faker.seed(245665)



export const mockProductos = (num?: number): Producto[] => {
    const productos: any[] = []

   for (let i = 0; i < (num ?? 5); i++) {
       productos.push(
           new ProductoModel({
               name: faker.commerce.productName(),
               description: faker.commerce.productDescription(),
               category: faker.commerce.department(),
               code: faker.datatype.uuid(),
               image: faker.image.imageUrl(),
               price: faker.commerce.price(),
               stock: faker.datatype.number()
           }) as Producto
       )
    }
    return productos
}

// const mockAuthors = (num: number): { _id: string }[] => {
//     // original array
//     //I wanted something like this
//     const authors: { _id: string }[]= []


//     // IUser & { _id: string }  = []
//     for (let i = 0; i < num; i++) {
//         authors.push({
//             _id: faker.datatype.uuid()

//         })
//     }

    // IUser & { _id: string }  = []
    // for (let i = 0; i < num; i++) {
    //     authors.push({
    //         _id: faker.datatype.uuid(),
    //         phoneNumber: {
    //             number: faker.phone.phoneNumber(),
    //             countryCode: faker.phone.phoneNumber("#"),
    //             stateCode: faker.phone.phoneNumber("#"),
    //         },
    //         address: faker.address.streetAddress(),
    //         age: faker.datatype.number({ min: 18, max: 65 }),
    //         email: faker.internet.email(),
    //         name: faker.name.findName(),
    //         password: faker.internet.password(),
    //         picture: faker.image.avatar(),
    //     })
    // }
//     return authors
// }


// const test = mockAuthors(3)

export const mockMensajes = (): any[] => {
    // const mensajes: IMensajes[] = []
    // for (let i = 0; i < 100; i++) {
    //     mensajes.push({
    //         message: faker.lorem.sentence(),
    //         //author is a red to an user
    //         author: faker.random.arrayElement(test)._id,
    //     })
    // }
    return ["no implementado"]
}

