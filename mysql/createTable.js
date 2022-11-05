import options from "../options/dbconfig.js"
import knex from "knex";

console.log(options)

const dbmysql = knex(options.sql);
const dbSqlite = knex(options.sqlite);

const createTables = async()=>{
    try {

        const tableProductsExists = await dbmysql.schema.hasTable("products");
        if(tableProductsExists){
            await dbmysql.schema.dropTable("products")
        }
        await dbmysql.schema.createTable("products",table=>{
            table.increments("id");
            table.string("title",40).nullable(false);
            table.integer("price");
            table.string("thumbnail",255);
        });
        console.log("tabla productos creada");
        dbmysql.destroy();

        const tableMessagesExists = await dbSqlite.schema.hasTable("messages");
        if(tableMessagesExists){
            await dbSqlite.schema.dropTable("messages")
        }
        await dbSqlite.schema.createTable("messages", table=>{
            table.increments("id");
            table.string("username",30);
            table.string("date", 15);
            table.string("message",200);
        });
        console.log("tabla mensajes creada");
        dbSqlite.destroy();
    } catch (error) {
        console.log(error)
    }
}

createTables();