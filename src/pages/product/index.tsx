import { useEffect } from "react";
import { GetProductsById } from "../../lib/swr";

import { useParams } from "react-router-dom";


const Product = () => {
    const { id } = useParams<{ id: string }>();
    const { isLoading, products } = GetProductsById(id);

    useEffect(() => {
        console.log(products);
        console.log(id);
    }, [products, id])
    
    if (isLoading) return <p>Loading...</p>;
    return (
        <div>
        <h1>{products?.data.name}</h1>
        <p>{products?.data.description}</p>
        <p>{products?.data.price}</p>
        <p>{products?.data.category}</p>
        </div>
    );
}

export default Product;