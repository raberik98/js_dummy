import express from "express"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser';

import config from "./config/config.js";
import {
    GetAllProducts,
    GetProductById,
    CreateProduct,
    DeleteProduct,
    UpdateProduct
} from "./controllers/product.controller.js"
import { AuthHandler } from "./services/auth.service.js";

const app = express()
const { CON_STRING, PORT } = config
const ROUTE_PREFIX = "/api/store/v1"

app.use(express.json())
app.use(cookieParser());

app.get(ROUTE_PREFIX+"/products", GetAllProducts)
app.get(ROUTE_PREFIX+"/product/:id", GetProductById)

app.post(ROUTE_PREFIX+"/product", AuthHandler, CreateProduct)
app.put(ROUTE_PREFIX+"/product/:id", AuthHandler, UpdateProduct)
app.delete(ROUTE_PREFIX+"/product/:id", AuthHandler, DeleteProduct)

async function main() {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(CON_STRING)
        console.log("Successfully connected to the Databse.");

        app.listen(PORT)
        console.log(`Server is running at http://localhost:${PORT}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()