import express from "express"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser';

import config from "./config/config.js";
import {
    GetAllOrders,
    GetOrderById,
    GetOrdersByUserId,
    CreateOrder,
    AddProductToOrder,
    RemoveProductFromOrder,
    UpdateOrder,
    SubmitOrder,
    DeleteOrder
} from "./controllers/order.controller.js"
import { AuthHandler } from "./services/auth.service.js";

const app = express()
const { CON_STRING, PORT } = config
const ROUTE_PREFIX = "/api/order/v1"

app.use(express.json())
app.use(cookieParser());

app.use(AuthHandler)
app.get(ROUTE_PREFIX+'/orders', GetAllOrders);
app.get(ROUTE_PREFIX+'/orders/:id', GetOrderById);
app.get(ROUTE_PREFIX+'/orders/user', GetOrdersByUserId);
app.post(ROUTE_PREFIX+'/orders', CreateOrder);
app.put(ROUTE_PREFIX+'/orders/:id', UpdateOrder);
app.post(ROUTE_PREFIX+'/orders/:id/products', AddProductToOrder);
app.delete(ROUTE_PREFIX+'/orders/:id/products', RemoveProductFromOrder);
app.post(ROUTE_PREFIX+'/orders/:id/submit', SubmitOrder);
app.delete(ROUTE_PREFIX+'/orders/:id', DeleteOrder);

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