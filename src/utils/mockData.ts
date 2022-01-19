import faker from "faker"
import { IProductos } from "../models/schemas"
faker.setLocale("es_MX")
faker.seed(245665)

export const mockProductos = (): IProductos[] => {
    const productos: IProductos[] = []
    for (let i = 0; i < 5; i++) {
        productos.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.datatype.uuid(),
            image: faker.image.business(),
            price: parseFloat(faker.commerce.price()).toFixed(2),
            stock: faker.datatype.number({ min: 1, max: 100 }),
            timestamp: faker.date.past(),
        }
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

// export const mockMensajes = (): any[] => {
//     const mensajes: IMensajes[] = []
//     for (let i = 0; i < 100; i++) {
//         mensajes.push({
//             message: faker.lorem.sentence(),
//             //author is a red to an user
//             author: faker.random.arrayElement(test)._id,
//         })
//     }
//     return mensajes
// }

