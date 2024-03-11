import React from 'react';
import Navbar from '../../Components/Navbar/Navbar.js'
const Cart = ({ cartItems = [], removeFromCart, checkout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
         <Navbar type='afterLogin'/>
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name} - ${item.price} x {item.quantity}</span>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="fw-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="btn btn-primary" onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
    </div>
  );
};

export default Cart;
