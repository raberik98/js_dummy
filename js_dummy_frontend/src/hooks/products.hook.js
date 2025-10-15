import { useState, useEffect } from "react";
import GetProducts from "../api/products.api.js";

export function useProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        GetProducts().then(data => setProducts(data.products)).catch(err => console.error(err))
    }, [])

    return [products, setProducts]
}