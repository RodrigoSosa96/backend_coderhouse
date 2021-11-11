import * as fs from "fs/promises";
import * as path from "path";


//!	Arreglar en caso que no exista el archivo
class FileManager {
	private _directory: string = path.resolve(__dirname, "../../files");
	private readonly _file: string;

	constructor(file: string) {
		this._file = path.resolve(this._directory, file);
	}
	private async _checkFile(): Promise<void> {
		await fs.access(this._file);
	}

	async writeFile(dataARRAY: object): Promise<void> {
		//	Ver como atrapar error si no existe el archivo
		try {
			//	await this._checkFile();
			let datosJSON = JSON.stringify(dataARRAY, null, 4);
			await fs.writeFile(this._file, datosJSON);
			console.log("Datos guardados");
		} catch {
			console.error("Error guardando archivo: ");
		}
	}

	async readFile(): Promise<object> {
		try {
			await this._checkFile();
			const datos = await fs.readFile(this._file, "utf-8");
			const datosArmados: Array<object> = JSON.parse(datos);
			return datosArmados;
		} catch {
			return [
				{
					error: -1,
					descripcion: "Error leyendo archivo, comprobar si existe la ruta",
				},
			];
		}
	}
	async deleteFile(): Promise<void> {
		try {
			await this._checkFile();
			await fs.unlink(this._file);
		} catch {
			console.error("Error borrando el archivo, comprobar si ya fue borrado");
		}
	}

	//	!!!No usar
	private async _createFolder(arg:string) {
		try {
			await fs.mkdir(path.resolve(this._directory, arg));
			this._directory=(path.resolve(__dirname, arg))
		} catch (err) {
			console.error(
				"Error creando carpeta, comprobar si posee los permisos necesarios"
			);
		}
	}
}

export const prodHuevos = new FileManager("productos.json");
export const carritoHuevos = new FileManager("carrito.json");
