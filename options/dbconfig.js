import path from 'path';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv' 
dotenv.config()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

const options = {
    sql:{
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            password:process.env.PASSWORD || "",
            database:"ecommerce"
        }
    },
    sqlite:{
        client:"sqlite3",
        connection:{
            filename: path.join(__dirname, "../db/ecommerce.sqlite")
        }
    }
}

export default options