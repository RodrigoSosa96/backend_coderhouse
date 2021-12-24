import { Database, TableName } from "./_AbstractClass";
import { initializeApp, cert , ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const {DATABASE_URL} = process.env;
const serviceAccount  = {
	type: process.env.GOOGLE_APPLICATION_CREDENTIALS_type,
	project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_project_id,
	private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_private_key_id,
	private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_private_key,
	client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_client_email,
	client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_client_id,
	auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_auth_uri,
	token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_token_uri,
	auth_provider_x509_cert_url:
		process.env.GOOGLE_APPLICATION_CREDENTIALS_auth_provider,
	client_x509_cert_url: process.env.GOOGLE_APPLICATION_CREDENTIALS_client,
} as ServiceAccount;
export default class Firebase extends Database {
    private _firestore  = getFirestore;
    constructor() {
        super();
    }
    async initSchemas() {
        const firebase = initializeApp({
            credential: cert(serviceAccount),
            databaseURL: DATABASE_URL,
        });
        return `Conexión exitosa a ${firebase.options.databaseURL}`;
    }
    async getAll(collection: TableName) {
        let data = await this._firestore().collection(collection).get();
        let result:any = [];
        data.forEach((doc:any) => {
            result.push(doc.data());
        });
        return result;
    }
    async getById(collection: TableName, id: string) {
        let data = await this._firestore().collection(collection).doc(id).get();
        return data.data();
    }

    async addItem(collection: TableName, data: any) {
        try {
            if(!data.length) data = [data];
            await data.forEach((item:any) => {
                this._firestore().collection(collection).add({...item});
            });
        } catch (error) {
            return error;
        }
    }
    async updateItem(collection: TableName, id: string, data: any) {
        try {
            await this._firestore().collection(collection).doc(id).update({...data});
            return this.getById(collection, id);
        } catch (error) {
            return;
        }
    }
    async deleteItem(collection: TableName, id: string) {
        await this._firestore().collection(collection).doc(id).delete();
    }

}

