import util from 'util';
import { denormalize, normalize, schema } from "normalizr";

import { mockMensajes } from './mockData';
import Logger from './logger';


const test = mockMensajes()

const user = new schema.Entity("users", {}, { idAttribute: "mail" });
const message = new schema.Entity("messages", { author: user }, { idAttribute: "_id" });
const normalizeMensajes = normalize(test, [message]);

Logger.info(`
-----------------------------------------------------
longitud antes de normalizar: ${JSON.stringify(test).length}
longitud despues de normalizar: ${JSON.stringify(normalizeMensajes).length}
porcentaje de compresión: ${((-JSON.stringify(normalizeMensajes).length / JSON.stringify(test).length) * 100 + 100) }%
-----------------------------------------------------`);
const denormalizedMensajes = denormalize(normalizeMensajes.result, [message], normalizeMensajes.entities);
Logger.info(denormalizedMensajes == test);
