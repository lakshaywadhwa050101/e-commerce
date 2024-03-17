import React, { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import { Navigate } from "react-router-dom";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from "react-router-dom";

function Home(props) {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/shop" />;
  }

  const startShoppingButtonStyle = {
    display: 'inline-block', // Set display to inline-block
    margin: '20px auto', // Center horizontally and add some top margin
    fontSize: '1.25rem', // Increase font size
    padding: '10px 20px', // Add padding
  };

  const carouselContainerStyle = {
    width: '100%',
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '20px', // Add some top margin
  };

  const carouselSlideStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
  };

  // const carouselButtonStyle = {
  //   position: 'absolute',
  //   bottom: '10px',
  //   left: '50%',
  //   transform: 'translateX(-50%)',
  //   zIndex: '2',
  // };

  // const carouselContainerStyle = {
  //   maxWidth: "600px", // Adjust the width as needed
  //   margin: "auto", // Center the carousel
  // };
  
  const carouselSlideStyle1 = {
    backgroundColor: "lightblue", // Background color for the first slide
    padding: "20px", // Add some padding for better visibility
  };
  
  const carouselSlideStyle2 = {
    backgroundColor: "lightgreen", // Background color for the second slide
    padding: "20px", // Add some padding for better visibility
  };
  
  const carouselSlideStyle3 = {
    backgroundColor: "lightcoral", // Background color for the third slide
    padding: "20px", // Add some padding for better visibility
  };
  
  const carouselButtonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color of the navigation buttons if needed
  };
  

  return (
    <div>
      <Navbar type='beforeLogin' />
      <div className="container">

        <section className="jumbotron text-center bg-primary text-light">
          <div className="container">
            <h1 className="display-4">Welcome to ShopperStop</h1>
            <p className="lead">
              Happy Shopping!
            </p>
          </div>
        </section>

      <center>
        <Link
          className="nav-link btn-dark text-light"
          to="/login"
          style={startShoppingButtonStyle} // Apply styles to the button
        >
          Start Shopping!
        </Link>
        </center>

        
    <div style={carouselContainerStyle}>
      <Carousel
        className="carousel"
        autoPlay={true}
        animation="slide"
        indicators={true}
        timeout={50}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: carouselButtonStyle,
        }}
        infiniteLoop={true}
      >
        <div style={carouselSlideStyle1}>
          <h3>Easy Shopping Experience</h3>
          <p>Shop hassle-free with our intuitive interface.</p>
        </div>
        <div style={carouselSlideStyle2}>
          <h3>Wide Range of Products</h3>
          <p>Explore thousands of products from various categories.</p>
        </div>
        <div style={carouselSlideStyle3}>
          <h3>Secure Payment Options</h3>
          <p>Enjoy secure payment methods for a worry-free shopping experience.</p>
        </div>
      </Carousel>
    </div>
  

        <footer className="footer mt-auto py-3 bg-dark text-light">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12 mb-3">
                <p>Contact Us: contact@shopperstop.com</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>&copy; 2024 ShopperStop. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
