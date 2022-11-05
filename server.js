import express from 'express'
import products from './routes/products.js'
import handlebars from 'express-handlebars'
import  path from 'path'
import { Server } from "socket.io"
import MessagesService from './utils/messagesService.js'
import ProductsService from './utils/productsService.js'

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars",handlebars.engine());

app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "handlebars");

app.use("/", products) 

io.on("connection",async (socket)=>{
    console.log("nuevo socket o cliente conectado", socket.id);
    socket.emit("messageFromServer","se ha conectado exitosamente")
    const mensajes = await MessagesService.todosLosMensajes();
    const products = await ProductsService.buscarTodos();
    socket.emit("productos",products)
    socket.emit("historico",mensajes)
    socket.on("message",async data=>{
            console.log(data);
            const mensajes = await MessagesService.agregarMensaje(data);
            io.sockets.emit("historico", mensajes);
        })
    socket.on("form",async data =>{
        console.log(data);
        const productos = await ProductsService.agregarProducto(data)
        io.sockets.emit("productos",productos)
    })
    
    
}) 