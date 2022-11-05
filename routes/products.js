import express from "express"
import ProductsService from "../utils/productsService.js"
const  products = express.Router();

products.get("/", async (request, response)=>{
    response.render("form")
})

products.post("/productos",async(request,response)=>{
    const newProduct = request.body;
    const productos = await ProductsService.agregarProducto(newProduct);
    console.log(productos)
    response.redirect("/")
})
    

export default products