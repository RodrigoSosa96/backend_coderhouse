import path from "path"

export const options = {
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: path.resolve(__dirname, "../../mensajes/sqlite.db")
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'coderhouse'
        }
    }
}
