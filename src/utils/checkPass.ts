import {randomBytes, scrypt, timingSafeEqual} from 'crypto'
import {promisify} from 'util'
import Logger from './logger';



async function hash(password: string): Promise<string> {
    try {
        const salt = randomBytes(127800).toString("hex")
        const derivedKey = await promisify(scrypt)(password, salt, 1024) as Buffer
        return salt + ":" + derivedKey.toString('hex')
    }
    catch (err) {
        throw err
    }
}
async function verify(password: string, hash: string) {
    try {
        const [salt, key] = hash.split(":")
        const derivedKey = await promisify(scrypt)(password, salt, 1024) as Buffer
        // return derivedKey.toString("hex") === key
        return timingSafeEqual(derivedKey, Buffer.from(key, "hex"))


    }
    catch (err) {
        throw err
    }
}
