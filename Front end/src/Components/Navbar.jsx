import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo2.png";
import agroService from "../service/agroService"
import customerService from "../service/customerService"
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import axios from "axios";

export default function Navbar() {

  var abc = "";

  const navigate = useNavigate();
  var isFarmer = false;
  var isCustomer = false;
  var isAdmin = false;

  // const[email, setEmail] = useState('');
  // const[password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(isFarmer);


    const temp = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    // e.preventDefault();
    // console.log("After")
    // userlogin.validateUser(data1).then((res) => {
    //     console.log(res.data);
    //     setRole(res.data.role)
    //     console.log(res.data.role)
    //     sessionStorage.setItem("role", res.data.role);
    //     sessionStorage.setItem("tokenId", res.data.token);
    //     sessionStorage.setItem("email", name);

    if (isFarmer) {

      console.log("i m here in farmer ");
      agroService.farmerLogin(temp)
        .then(response => {
          console.log("farmer Logged in successfully", response.data);
          sessionStorage.setItem("farmerId",response.data.farmerId)
          navigate('/farmer/farmerHome');
        })
        .catch(error => {
          console.log("i am here in catch block");
          document.getElementById('invalidMsg').innerHTML = "Invalid cred"
          // abc = "Incorrect credentials !!!"
          console.log('something went wrong - farmer section', error);

        })
    } else if (isCustomer) {
      customerService.customerLogin(temp)
        .then(response => {
          console.log("customer Logged in successfully", response.data);
          sessionStorage.setItem("customerLoginId",response.data.customerId);
          navigate("/customer/customerHome");
        })
        .catch(error => {
          console.log('something went wrong - customer ', error);
        })
    } else {
     agroService.adminLogin(temp)
        .then(response => {
          console.log("admin Logged in successfully", response.data);
          navigate("/admin/login");
        })
        .catch(error => {
          console.log('something went wrong', error);
        })
    }
  }

  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> */}
              <img
                src={Logo}
                className="img-thumbnail"
                alt="..."
                style={{ width: "70px", height: "70px" }}
              />
            </a>

            <a
              href="#"
              className="nav-link px-4 text-success fw-bold"
              style={{ fontSize: "2rem" }}
            >
              Taste's Origin
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <li>
                <a
                  href="#"
                  className="nav-link px-2 text-success fw-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  Agro-One
                </a>
              </li> */}
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Home
                </a>
              </li>
              <li>
                <Link to="/about" className="nav-link px-2 text-white">
                  About
                </Link>
              </li>
              <li>
                <Link className="nav-link px-2 text-white" to="/customer/customerHome/cart">
                  Test
                </Link>
              </li>

            </ul>
            <li>

            <div id="google_translate_element" className="btnStyle"></div>

            </li>

            {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            </form> */}
            <div className="btnStyle" style={{ display: 'flex' }} >
              {/* <div className="text-end"> */}
              {/* <button type="button" className="btn btn-outline-light me-2">Login</button> */}
              {/* <Link className="btn btn-info" to={`/farmer/register`}>Register</Link> */}
              <div className="dropdown mx-3" >
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link
                      className="dropdown-item active"
                      to="/farmer/register"
                    >
                      Farmer Register
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/register">
                      Customer Register
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalSignin">SignUp</button> */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <a
                      className="dropdown-item active"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSignin"
                      onClick={() => { isFarmer = true }}
                    >
                      Farmer Login
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSignin"
                      onClick={() => { isCustomer = true }}
                    >
                      Customer Login
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSignin"
                      onClick={() => { isAdmin = true }}
                    >
                      Admin Login
                    </a>
                  </li>
                </ul>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* modal */}


      <div className="modal " tabIndex="-1" role="dialog" id="modalSignin" >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-5 shadow "  style={{backgroundColor: "#e2f2e6"}}>
            <div className="modal-header p-5 pb-4 border-bottom-0">
              {/* <h5 className="modal-title">Modal title</h5> */}
              <h2 className="fw-bold mb-0">Log in</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-4"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-4"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                  type="submit"
                >
                  Login
                </button>
                <div className="text-align-center">
                  <span id="invalidMsg">
                    
                  </span>
                  <br />
                  <br />
                  <small className="text-muted">
                    By clicking Login you agree to the terms of use.
                  </small>
                </div>

                <hr className="my-4" />
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
