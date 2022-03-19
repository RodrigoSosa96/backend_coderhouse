import { prop } from "@typegoose/typegoose";



enum Tipo {
    usuario = "usuario",
    sistema = "sistema"
}
// Unico Chat con todos los usuarios
export class Mensaje {
    @prop({ required: true })
    public email!: string;
    
    @prop({ required: true })
    public fecha!: Date;
    
    @prop({ required: true })
    public body!: string;
    
    @prop({ enum: Tipo })
    public tipo!: Tipo;
    
}

