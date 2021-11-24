import { Schema, model } from 'mongoose';

export interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}
const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});
export default model<User>('user', UserSchema);