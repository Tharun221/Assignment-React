import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({ name: product.name, description: product.description, price: product.price, image: product.image });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${editProduct.id}`, formData);
      setProducts((prevProducts) => prevProducts.map(product => 
        product.id === editProduct.id ? response.data : product
      ));
      setEditProduct(null);
      setFormData({ name: '', description: '', price: '', image: '' });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2><strong>Product name:</strong> {product.name}</h2>
              Description: <strong>{product.description}</strong>
              <p className="price">Price: {product.price}</p>
              <button className="buy-button">Buy Now</button>
              <button className="edit-button" onClick={() => handleEditClick(product)}>
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {editProduct && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Home;
