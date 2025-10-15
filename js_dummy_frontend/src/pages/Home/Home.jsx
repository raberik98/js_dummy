import { useProducts } from "../../hooks/products.hook.js";

export default function Home() {
    const [products, setProducts] = useProducts()

    return (
        <div>
            {
                products.map(product => <div key={product._id}>
                    <h1>{product.name}</h1>
                    <p>
                        {product.description}
                    </p>
                    <h2>{product.price} and {product.quantity}</h2>
                </div>)
            }
        </div>
    )
    
}