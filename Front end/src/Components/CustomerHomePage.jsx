import React from 'react';
import List from './List'
import { Link } from 'react-router-dom';
import cart from '../assets/cart.jpg'
import Market from "../assets/organic.jpg";
import farm from "../assets/hygine.jpg";
import products from "../assets/gresh.jpg";
import './Productc.css'
const CustomerHomePage = () => {

    return (
        // toast.success("Available Products");
        <div style={{backgroundColor: "#e2f2e6"}}>
          <div>
          <div className="head border" style={{backgroundColor: "#beeeca"}}>
            <button
              className="btn btn-success m-4 "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
            >My Utilities
              {/* More Options */}
              <span className="navbar-toggler-icon"></span>
              {/* <i className="fas fa-bars"></i> */}
            </button>

           <Link to= "/customer/customerHome/cart"className="btn btn-success m-4 ">View Cart <i className="fa fa-shopping-cart"></i></Link>

            <Link
                    type="button"
                    className="btn btn-success m-4 float-end"
                    to="/customer/customerHome/logout"
                    /*onClick={handleLogout}*/
                  >
                    Logout
                  </Link>
    
            {/* </div> */}
    </div>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Customer Utilities
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div>
                
                </div>
                <div className="dropdown mt-3">
                  <Link
                    type="button"
                    className="btn btn-success"
                    to="/farmer/addproduct"
                  >
                    Check Offers
                  </Link>
                  <br />
                  <br />
                  <button type="button" className="btn btn-success">
                    Buy insurance
                  </button>
                  <br />
                  <br />
                  <button type="button" className="btn btn-success">
                    Show schemes
                  </button>
                  <br />
                  <br />
                  <button type="button" className="btn btn-success">
                    logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        <div className='product_list_container'>
        
        <div className='outer-box'>
           <div className='box' style={{display:'inline-block'}}>
                <List/>
            </div>
        </div>
     </div>
        </div>
      );
}

export default CustomerHomePage;
