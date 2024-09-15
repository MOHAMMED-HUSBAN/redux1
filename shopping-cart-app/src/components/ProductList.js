import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cartSlice';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const jsonData = `[
    {
      "id": 1,
      "name": "Product 1",
      "price": 10.99
    },
    {
      "id": 2,
      "name": "Product 2",
      "price": 15.99
    },
    {
      "id": 3,
      "name": "Product 3",
      "price": 7.99
    },
    {
      "id": 4,
      "name": "Product 4",
      "price": 20.99
    }
  ]`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulating API response with jsonData
        const data = JSON.parse(jsonData);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
