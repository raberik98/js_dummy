import express from "express"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser';

import config from "./config/config.js";
import {
    Register,
    Login,
    Logout,
    Authenticate
} from "./controllers/users.controller.js"


const app = express()
const { CON_STRING, PORT } = config
const ROUTE_PREFIX = "/api/auth/v1"

app.use(express.json())
app.use(cookieParser());

app.post(ROUTE_PREFIX+"/register", Register)
app.post(ROUTE_PREFIX+"/login", Login)
app.post(ROUTE_PREFIX+"/logout", Logout)
app.post(ROUTE_PREFIX+"/authenticate", Authenticate)


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