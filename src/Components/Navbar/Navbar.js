import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import Cart from "../../Assets/cart.png";
import { Navigate } from "react-router-dom";

function Navbar({ type, count, onSearch, userName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [redirect, setRedirect] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Use reverse geocoding to get the state from the latitude and longitude
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude+' '+longitude)
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const state = data.principalSubdivision;
              setUserLocation(state);
            })
            .catch((error) => {
              console.error("Error fetching user location:", error);
            });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLogout = () => {
    // Remove session token from session storage
    sessionStorage.removeItem("authToken");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "auto" }}
          />
          &nbsp;&nbsp;ShopperStop!
        </Link>
        <p className="ml-5 mt-2"><b>{userLocation}</b>, India</p>
        {type === "beforeLogin" && (
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link btn-dark text-light" to="/login">
                Login/Signup
              </Link>
            </li>
          </ul>
        </div>
        
        )}

        {type === 'afterLoginInCart' && (
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li>
              <p className="ml-5 mt-2">Hello, <b>{userName}</b></p>
            </li>
            &nbsp; &nbsp;
            <li className="nav-item">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control rounded-pill mr-2 text-center"
              />
            </li>
            &nbsp;&nbsp;
            <li className="nav-item">
              <button className="form-control rounded-pill mr-2 d-flex align-items-center">
                <Link className="nav-link" to="/shop">
                <span className="mx-auto">Shop</span>
                </Link>
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary rounded-pill ml-2"
                onClick={handleLogout}
              >
                Log-Out
              </button>
            </li>
          </ul>
        </div>
        )}

        {type === "afterLogin" && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li>
                <p className="ml-5 mt-2">Hello, <b>{userName}</b></p>
              </li>
              &nbsp; &nbsp;
              <li className="nav-item">
                <input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="form-control rounded-pill mr-2 text-center"
                />
              </li>
              &nbsp;&nbsp;
              <li className="nav-item">
                <button className="form-control rounded-pill mr-2 d-flex align-items-center">
                  <Link className="nav-link" to="/cart">
                    <img
                      src={Cart}
                      alt="Cart"
                      style={{
                        width: "30px",
                        height: "auto",
                        marginRight: "5px",
                      }}
                    />
                    <span className="d-none d-sm-inline">{count}</span>
                  </Link>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-outline-primary rounded-pill ml-2"
                  onClick={handleLogout}
                >
                  Log-Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
