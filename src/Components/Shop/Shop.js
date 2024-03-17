import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsToCart] = useState([]);
  const [countOfItems, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [countMap, setMap] = useState(new Map());

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
      getProducts();
      fetchUserData();
      getCart(); 
    }
  }, [userId, userName, token]);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  const config = {
    headers: { authorization: `Bearer ${token}` }
  };

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

  const getProducts = async () => {
    console.log('Get Products')
    console.log(token)
    try {
      const response = await axios.post("http://localhost:5000/products",{}, config);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getCart = async () => {
    console.log('Getting Cart')
    console.log(userId)
    try { 
      const response = await axios.post("http://localhost:5000/getCart", {
        user_id: userId,
      }, config);
      let count = 0;

      setProductsToCart(response.data.products);
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
    } catch (error) {
      console.log(error.response.data.error);
    }
  };


  const addToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:5000/addCartItem", {
        user_id: userId,
        product_id: productId,
      }, config);
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
        }, config);
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

  const decreaseQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const newCount = product.countInCart - 1;
        if (newCount < 0) {
          return { ...product, countInCart: 0 };
        }
        return { ...product, countInCart: newCount };
      }
      return product;
    });
    setProducts(updatedProducts);
    setCount(countOfItems > 0 ? countOfItems - 1 : 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar
        type="afterLogin"
        count={countOfItems}
        onSearch={handleSearch}
        userName={userName}
      />

      <div className="container">
        <h2 className="text-center mt-3">Explore the Products!</h2>
        <div className="row">
          <div className="col">
            <h2>Men</h2>
            <div className="row">
              {filteredProducts
                .filter((product) => product.category === "Men")
                .map((product) => (
                  <div
                    key={product.id}
                    className="col-sm-6 col-md-4 col-lg-3 mb-3"
                  >
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      decreaseQuantity={decreaseQuantity}
                      countMap={countMap}
                      removeFromCart={removeFromCart}
                      userId={userId}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Women</h2>
            <div className="row">
              {filteredProducts
                .filter((product) => product.category === "Women")
                .map((product) => (
                  <div
                    key={product.id}
                    className="col-sm-6 col-md-4 col-lg-3 mb-3"
                  >
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      decreaseQuantity={decreaseQuantity}
                      countMap={countMap}
                      removeFromCart={removeFromCart}
                      userId={userId}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart, removeFromCart, decreaseQuantity, countMap , userId}) => {
  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const count = countMap.get(product.id) || 0; 
  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={product.imageLink}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        {count > 0 ? (
          <div className="btn-group mt-auto" role="group">
            <button
              className="btn btn-sm btn-secondary me-1"
              onClick={() => removeFromCart(userId,product.id)}
              style={{ fontSize: "0.75rem" }}
            >
              -
            </button>
            <span className="btn btn-sm">{count}</span>
            <button
              className="btn btn-sm btn-secondary ms-1"
              onClick={() => addToCart(product.id)}
              style={{ fontSize: "0.75rem" }}
            >
              +
            </button>
          </div>
        ) : (
        <button
          className="btn btn-sm btn-primary mt-auto"
          onClick={handleAddToCart}
          style={{ width: "fit-content" }}
        >
          Add to Cart
        </button>
        )} 
      </div>
    </div>
  );
};

export default Shop;
