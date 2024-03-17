import Navbar from "../../Components/Navbar/Navbar.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countOfItems, setCount] = useState(0);
  const [countMap, setMap] = useState(new Map());
  const [products, setProducts] = useState([]);

  const [redirect, setRedirect] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("")
  const [token, setToken]= useState("")


  useEffect(() => {
    const authToken=sessionStorage.getItem("authToken")
    if (!authToken) {
      setRedirect(true);
    } else {
      setToken(authToken)
      getCart(); 
      fetchUserData();
    }
  }, [userId, token]);

  const fetchUserData = async () => {
    console.log(token)
    try {
      // Retrieve the auth token from session storage
      const authToken = sessionStorage.getItem("authToken");
  
      // If auth token is not available, handle the error
      if (!authToken) {
        console.error("Auth token not found in session storage");
        return;
      }
  
      // Make a POST request to the getUserData endpoint
      const response = await fetch("http://localhost:5000/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the auth token in the headers
        },
      });
  
      // If the request was successful, parse the response JSON
      if (response.ok) {
        const userData = await response.json();
        setUserName(userData.user.name)
        setUserId(userData.user.id)
      } else {
        // If the request failed, log the error message
        const errorData = await response.json();
        console.error("Failed to fetch user data:", errorData.error);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error fetching user data:", error.message);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const getCart = async () => {
    console.log('GET CART')
    console.log(userId)
    console.log(userName)
    try {
      const response = await axios.post("http://localhost:5000/getCart", {
        user_id: userId,
      });

    // Check if the cart is empty
    if (response.data.products.length === 0) {
      console.log('Cart is empty'); // Print a message indicating the cart is empty
    }

      let count = 0;
      const newMap = new Map();
      for (var entry of response.data.products) {
        if (newMap.has(entry.product_id)) {
          const currentQuantity = newMap.get(entry.product_id);
          newMap.set(entry.product_id, currentQuantity + entry.quantity);
        } else {
          newMap.set(entry.product_id, entry.quantity);
        }
        count += newMap.get(entry.product_id);
      }
      setCount(response.data.products.length);
      setMap(newMap);
      getProducts(response.data.products);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const addToCart = async (productId) => {
    // console.log('Adding to Cart')
    try {
      const response = await axios.post("http://localhost:5000/addCartItem", {
        user_id: userId,
        product_id: productId,
      });
      getCart();
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const removeFromCart = async (userId, productId) => {
      try {
        const response = await axios.post("http://localhost:5000/removeCartItem", {
          user_id: userId,
          product_id: productId,
        });
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        setCart(updatedProducts)
        getCart();
      } catch (error) {
        console.log(error.response.data.error);
      }

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, countInCart: product.countInCart + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    setCount(countOfItems + 1);
  };

  const updateQuantity = (productId, operation) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          if (operation === "decrease") {
            removeFromCart(userId,productId)
            if (item.countInCart === 1) {
              return null; // Setting null to remove item from cart
            } else {
              return { ...item, countInCart: item.countInCart - 1 };
            }
          } else if (operation === "increase") {
            addToCart(productId)
            return { ...item, countInCart: item.countInCart + 1 };
          }
        }
        return item;
      })
      .filter(Boolean); // Filter out null values

    // setCart(updatedCart);
  };

  const getProducts = async (products) => {
    for (const product of products) {
      try {

        const prod = await getProduct(product.product_id);

        setCart(prevItems => {
          const existingProductIndex = prevItems.findIndex(item => item.id === prod.id);
      
          if (existingProductIndex !== -1) {
              // If the product already exists, update its quantity
              const updatedItems = prevItems.map((item, index) => {
                  if (index === existingProductIndex) {
                      return { ...item, quantity: item.quantity + prod.quantity };
                  }
                  return item;
              });
              return updatedItems;
          } else {
              // If the product doesn't exist, add it to the cart
              return [...prevItems, prod];
          }
      });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getProduct = async (productId) => {

    try {
      const response = await axios.post("http://localhost:5000/getProduct", {
        product_id: productId,
      });
      return response.data.product;
    } catch (error) {
      console.log(error.response.data.error);
      return null;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  const getTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + parseInt(item.price) * countMap.get(item.id),
      0
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = cart.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <Navbar type="afterLoginInCart" userName={userName} onSearch={handleSearch}/>
      <br />
      <h1 className="text-center mb-4">My Cart!</h1>
      <div className="container mt-5">
        {filteredProducts.length > 0 ? (
          <React.Fragment>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Total Amount</h5>
                <p className="card-text">Total: ₹{getTotalAmount()}</p>
                {/* <button
                  className="btn btn-danger me-2"
                  onClick={clearCart}
                  disabled={orderPlaced}
                >
                  Clear Cart
                </button>
                &nbsp;
                <button
                  className="btn btn-success"
                  onClick={checkout}
                  disabled={orderPlaced}
                >
                  Checkout
                </button> */}
              </div>
            </div>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.imageLink}
                        alt={item.name}
                        style={{ height: "100px", width: "auto" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{countMap.get(item.id)}</td>
                    <td>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => updateQuantity(item.id, "decrease")}
                        disabled={orderPlaced}
                      >
                        -
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(item.id, "increase")}
                        disabled={orderPlaced}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ) : (
          <div className="alert alert-info" role="alert">
            Your cart is empty!
          </div>
        )}
        {orderPlaced && (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Order Placed!</h5>
              <p className="card-text">
                Your order has been successfully placed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
