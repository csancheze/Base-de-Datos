import knex from "knex";

export default class Contenedor {

    constructor(options, table){;
        this.table = table;
        this.database = knex(options);
    }

    async save (info) {
        try {
            
            await this.database.from(this.table).insert(info);
            const result = await this.database.from(this.table).select("*");
            const products = result.map(el=>({...el}));
            console.log(products);

            return products

        } catch (error) {
            console.log('No se pudo guardar el elemento.');
            
        }
    }

    async getById (id) {

        try {

            let result = await this.database.from(this.table).where("id",id)
            console.log(result)
            let product = result.row
            return product

        } catch (error) {
            console.log('No se pudo encontrar el elemento.');
            
        }

    }

    async getAll () {
        try {
            const result = await this.database.from(this.table).select("*");
            const results = result.map(el=>({...el}));
            return results
            
        } catch (error) {
            console.log('No se pudieron recuperar los elementos.');
            
        }
    }

    async updateById (id, body) {
        try {

            let result = await this.database.from(this.table).where("id",id).update(body)
            console.log(result)
            let element = result.row
            return element
            
        } catch (error) {
            
        }
    }

    async deleteById (id) {
        try {

            let result = await this.database.from(this.table).where("id",id).del()
            console.log("Archivo borrado. ",result)

        } catch (error) {
            console.log('No se pudo borrar el elemento.' + error);
            
        }
    }
}
