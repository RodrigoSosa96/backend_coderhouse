import faker from "faker"
import { Producto } from "../models/ecommerce/Producto"

faker.setLocale("es_MX")
faker.seed(245665)

export const mockProductos = (): Producto[] => {
    const productos: Producto[] = []
    for (let i = 0; i < 5; i++) {
        productos.push(
            new Producto(
                faker.commerce.productName(),
                faker.commerce.productDescription(),
                faker.datatype.uuid(),
                faker.image.business(),
                parseFloat(faker.commerce.price()).toFixed(2),
                faker.datatype.number({ min: 1, max: 100 })
            )
        )
    }
    return productos
}

// faker.internet.email()
const mockAuthors = (num: number): object[] => {
    const authors: object[] = []
    for (let i = 0; i < num; i++) {
        authors.push({
            mail: faker.internet.email(),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            edad: faker.datatype.number({ min: 18, max: 99 }),
            alias: faker.internet.userName(),
            avatar: faker.image.avatar()
        })
    }
    return authors
}


const test = mockAuthors(3)

export const mockMensajes = (): any[] => {
    const mensajes: any[] = []
    for (let i = 0; i < 100; i++) {
        mensajes.push({
            _id: faker.datatype.uuid(),
            author: test[Math.floor(Math.random() * 2)],
            text: faker.lorem.sentence()
        })
    }
    return mensajes
}

