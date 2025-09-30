const config = {
    PORT: process.env.PORT ? process.env.PORT : 8081,
    CON_STRING: process.env.CON_STRING ? process.env.CON_STRING : "mongodb://username:password@localhost:27017/products?authSource=admin",
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ? process.env.AUTH_SERVICE_URL : "http://localhost:8080/api/auth/v1/authenticate",
}

if (config.CON_STRING == "" || config.AUTH_SERVICE_URL == "") {
    console.error("Missing environmental variables! You must provide a CON_STRING and a AUTH_SERVICE_URL.")
    process.exit(2)
}

export default config