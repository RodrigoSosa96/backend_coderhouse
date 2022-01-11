import { randomBytes, scrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'



export async function hash(password: string): Promise<string> {
    try {
        const salt = randomBytes(16).toString("hex")
        const derivedKey = await promisify(scrypt)(password, salt, 64) as Buffer
        return salt + ":" + derivedKey.toString('hex')
    }
    catch (err) {
        throw err
    }
}
export async function verify(password: string, hash: string) {
    try {
        const [salt, key] = hash.split(":")
        const derivedKey = await promisify(scrypt)(password, salt, 64) as Buffer
        return timingSafeEqual(derivedKey, Buffer.from(key, "hex"))


    }
    catch (err) {
        throw err
    }
}
