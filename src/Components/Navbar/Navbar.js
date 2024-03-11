// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import Cart from '../../Assets/cart.png';

function Navbar({ type, count, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt='Logo' style={{ width: '50px', height: 'auto' }} />
          &nbsp;&nbsp;ShopperStop!
        </Link>

        {type === 'beforeLogin' && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        )}

        {type === 'afterLogin' &&  (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <input
                  type='text'
                  placeholder='Search Products'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </li>
              &nbsp;&nbsp;
              <li className="nav-item">
                <button>
                <Link className="nav-link" to="/cart">
                <img src={Cart} alt='Cart' style={{ width: '30px', height: 'auto' }} />
                  {count}
                </Link>
                </button>
              </li>
              <li>
              <Link className="nav-link" to="/login">Log-Out</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
