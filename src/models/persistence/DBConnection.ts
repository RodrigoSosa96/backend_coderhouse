import { Memory, FileSystem, MySql, MongoDB, Firebase } from './index.js';
import { Database } from './_AbstractClass.js';
import { mySqlOptions, sqliteOptions, mongoDbConfigs } from '../../configs';



export default class DBConnection{
    instance:Database;
    constructor(dbType:string) {
        switch (parseInt(dbType)) {
            case 0: 
                this.instance = new Memory();
                break;
            case 1:
                this.instance = new FileSystem("../../../files");
                break;
            case 2:
                this.instance = new MySql(mySqlOptions);
                break;
            case 3:
                this.instance = new MySql(sqliteOptions);
                break;
            case 4:
                this.instance = new MongoDB(mongoDbConfigs.localUrl, mongoDbConfigs.options);
                break;
            case 5:
                this.instance = new MongoDB(mongoDbConfigs.atlasUrl, mongoDbConfigs.options);
                break;
            case 6:
                this.instance = new Firebase();
                break;
            
            default:
                throw new Error('Invalid DB Type');
        }
    }
}

