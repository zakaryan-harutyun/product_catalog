import React from "react";

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {product.rating} ★</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
