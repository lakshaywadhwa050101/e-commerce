import React from "react";
import Navbar from '../../Components/Navbar/Navbar'
function Home(props) {
  return (
    <div>
    <Navbar type='beforeLogin'/>
    <div className="container">
      
      <section className="jumbotron text-center bg-primary text-light">
        <div className="container">
          <h1 className="display-4">Welcome to ShopperStop</h1>
          <p className="lead">
            Happy Shopping!
          </p>
        </div>
      </section>

      <section className="row mb-5">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-dark">Easy Shopping Experience</h3>
              <p className="card-text">
                Shop hassle-free with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-dark">Wide Range of Products</h3>
              <p className="card-text">
                Explore thousands of products from various categories.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-dark">Secure Payment Options</h3>
              <p className="card-text">
                Enjoy secure payment methods for a worry-free shopping
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

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
