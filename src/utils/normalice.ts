import util from 'util';
import { denormalize, normalize, schema } from "normalizr";

import { mockMensajes } from './mockData';


function print(data: object) {
    console.log(util.inspect(data, false, 12, true));
}


// const test = fakeMensajes()

// const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'mail' })

// const schemaMessages = new schema.Entity("message", { author: schemaAuthor}, { idAttribute: "_id" });
// const normalizeMensajes = normalize(test, [schemaMessages]);
// // print(normalizeMensajes);



const test = mockMensajes()

const user = new schema.Entity("users", {}, { idAttribute: "mail" });
const message = new schema.Entity("messages", { author: user }, { idAttribute: "_id" });
const normalizeMensajes = normalize(test, [message]);

console.log(`
-----------------------------------------------------
longitud antes de normalizar: ${JSON.stringify(test).length}
longitud despues de normalizar: ${JSON.stringify(normalizeMensajes).length}
porcentaje de compresión: ${((-JSON.stringify(normalizeMensajes).length / JSON.stringify(test).length) * 100 + 100) }%
-----------------------------------------------------`);
// print(normalizeMensajes);
const denormalizedMensajes = denormalize(normalizeMensajes.result, [message], normalizeMensajes.entities);
console.log(denormalizedMensajes == test);
// print(denormalizedMensajes);
