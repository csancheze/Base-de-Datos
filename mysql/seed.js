
import MessagesService from '../utils/messagesService.js'
import ProductsService from '../utils/productsService.js'

let messages = [
    {
        username: 'john@gmail.com',
        date: '4/11/2022 17:36:50',
        message: 'Hola'
      },
      {
        username: 'cristina@gmail.com',
        date: '4/11/2022 17:37:00',
        message: 'Qué tal'
      },
      {
        username: 'julio@gmail.com',
        date: '4/11/2022 17:38:50',
        message: 'Nada acá'
      }

] 

let products = [
        {
          title: "camisa",
          price: 99,
          thumbnail: "https://http2.mlstatic.com/D_NQ_NP_990732-MCO31098832042_062019-W.jpg"
        },
        {
          title: "maleta",
          price: 300,
          thumbnail: "https://panamericana.vteximg.com.br/arquivos/ids/261725-1080-1080/cuaderno-5-materias-argollado-incolors-de-hojas-cuadriculadas-7707668554700.jpg?v=636383267550730000"
        }
]



const seedTables = async()=>{

    try {

        await MessagesService.agregarMensaje(messages[0])
        await MessagesService.agregarMensaje(messages[1])
        await MessagesService.agregarMensaje(messages[2])

        await ProductsService.agregarProducto(products[0])
        await ProductsService.agregarProducto(products[1])


    } catch (error) {
        console.log(error)
    }
}

await seedTables();
process.exit(0)