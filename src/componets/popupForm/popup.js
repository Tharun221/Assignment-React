import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';

const PopupForm = ({ togglePopup }) => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit the form data
      const response = await axios.post('http://localhost:5000/products', formData);
      alert('Product added successfully');
      togglePopup();
      // Store the submitted data in state
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Image Upload:
            <input type="file" name="image" onChange={handleChange} accept="image/*" required />
          </label>
          <label>
            Product Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </label>
          <label>
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </label>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={togglePopup}>Close</button>
          </div>
        </form>
        {submittedData && ( // Render submitted data if available
          <div>
            <h2>Submitted Data</h2>
            <p>Product Name: {submittedData.name}</p>
            <p>Description: {submittedData.description}</p>
            <p>Price: {submittedData.price}</p>
            <p>Quantity: {submittedData.quantity}</p>
            {/* You can display more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupForm;
