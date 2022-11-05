import Contenedor from "./dbOps.js"
import options from "../options/dbconfig.js"

console.log(options.sqlite)

const MessagesService = {

    async agregarMensaje (obj) {
        let resultado = await Mensajes.save(obj)
        return resultado
    },

    async todosLosMensajes () {
        let arreglo = await Mensajes.getAll()
        // console.log("mensajes", arreglo)
        return arreglo
    }

}

const Mensajes = new Contenedor(options.sqlite, "messages")

export default MessagesService
