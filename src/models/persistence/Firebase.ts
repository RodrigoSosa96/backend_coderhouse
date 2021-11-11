import { Database } from "./_AbstractClass";
import admin, { ServiceAccount } from 'firebase-admin';

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

type tableName = "productos" | "carrito"
export default class Firebase extends Database {
    private firebase  = admin;
    constructor() {
        super();
    }
    async initSchemas() {
        const firebase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: DATABASE_URL,
        });
        
        // return `Conexión exitosa a ${firebase.options.credential.projectId}`;
        return `Conexión exitosa a ${firebase.options.databaseURL}`;
    }
    async getAll(collection: tableName) {
        let data = await this.firebase.firestore().collection(collection).get();
        let result:any = [];
        data.forEach((doc:any) => {
            result.push(doc.data());
        });
        return result;
    }
    async getById(collection: tableName, id: string) {
        let data = await this.firebase.firestore().collection(collection).doc(id).get();
        return data.data();
    }
    async addItem(collection: tableName, data: any) {
        await this.firebase.firestore().collection(collection).add(data);
    }
    async updateItem(collection: tableName, id: string, data: any) {
        await this.firebase.firestore().collection(collection).doc(id).update(data);
    }
    async deleteItem(collection: tableName, id: string) {
        await this.firebase.firestore().collection(collection).doc(id).delete();
    }

}

