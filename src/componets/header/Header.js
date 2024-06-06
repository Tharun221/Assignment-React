import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './header.css';
import PopupForm from '../popupForm/popup';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
   <>
     <nav className="navbar">
      <div className="nav-right">
        <div className="nav-logo">
          <img src="https://seeklogo.com/images/E/e-commerce-logo-B0AE7EE720-seeklogo.com.png" alt="Logo" />
        </div>
      </div>
      <div className="nav-center">
        {/* <input type="text" placeholder="Search..." /> */}
        <button className="search-button" onClick={togglePopup}>Add Product</button>
      </div>
      {isPopupOpen && <PopupForm togglePopup={togglePopup} />}
    </nav>
    
   </>
  );
};

export default NavBar;
