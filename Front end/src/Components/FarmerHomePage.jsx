import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import productService from "../service/productService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import agroService from "../service/agroService";
import axios from 'axios';
// import { useContext } from "react";
// import { FarmerContext } from "./context";

// import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';


const FarmerHomePage = () => {

  const[productId] = useState('');
  const[productTitle, setProductTitle] = useState('');
  const[price, setPrice] = useState('');
  const[expiryDate, setExpiryDate] = useState('');
  const[availableStock, setAvailableStock] = useState('');

  const [product, setProduct] = useState([]);
  const[orders,setOrders] = useState([]);

  // var [farmerLogin , setFarmerLogin] = useContext(FarmerContext)

  // var farmId = farmerLogin.farmerId;
  

  var farmerId = sessionStorage.getItem("farmerId");

  const init = () => {
    console.log("hi akshay here");
    productService.get(farmerId)
    .then((response)=> 
    setProduct(response.data))


    productService.get_orders(farmerId)
    .then((response) =>{
      setOrders(response.data)
    })

    // await axios.get(`http://localhost:7070/farmer/products/`)
    //   .then((response) => {
    //     console.log("Printing products data", response.data);
    //     // setProduct(response.data);
    //   })
    //   .catch((error) => {

    //     console.log("Something went wrong", error);
    //   });
  };

  useEffect(()=>{
    init()
  },[])

  const handleDelete = (productId) => {
    console.log("Printing id", productId);
    productService
      .remove(productId)
      .then((response) => {
        console.log("Product deleted successfully", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });  
  };


  
  const handleOrderDelete = (orderId) => {
    console.log("Printing id", orderId);
   axios.delete(`http://localhost:7070/order/delete/${orderId}`)
      .then((response) => {
        console.log("Order rejected successfully", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });  
  };


  const handleProducts = () => {
     axios.get(`http://localhost:7070/farmer/products/1`)
      .then((response) => {
        console.log("Printing products data", response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });

  }

  const handleLogout =()=>{
    console.log("logged out");
    agroService.logout
      .then((response) => {
        console.log("logged out successfully", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }

//   useEffect(() => {
//     if (productId) {
//         productService.get(productId)
//             .then(product => {
//                 setProductTitle(product.data.productTitle);
//                 setPrice(product.data.price);
//                 setExpiryDate(product.data.expiryDate);
//                 setAvailableStock(product.data.availableStock);
//             })
//             .catch(error => {
//                 console.log('Something went wrong', error);
//             })
//     }
// }, [])

  return (
    // toast.success("Available Products");
    <div style={{backgroundColor: "#e2f2e6"}}>
      <div >
        <div className="head border" style={{backgroundColor: "#beeeca"}}>
        <button
          className="btn btn-success m-4 "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
        > My Utilties
          {/* More Options */}
          <span className="navbar-toggler-icon"></span>
          {/* <i className="fas fa-bars"></i> */}
        </button>

        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

        {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end"> */}
        {/* <button className="btn btn-success m-4 float-end" type="button">
          Logout
        </button> */}
        <Link
                type="button"
                className="btn btn-success m-4 float-end"
                to="/farmer/farmerHome/logout"
                onClick={handleLogout}
              >
                Logout
              </Link>

              <button type="button" className=" mx-3 btn btn-success" onClick={handleProducts}>
                Get Products
              </button>
        {/* <button className="btn btn-success my-4  float-end" type="button">Add new Product</button> */}
        <Link type="button" className="btn btn-success" to="/farmer/farmerHome/addproduct">
          Add new product
        </Link>
        </div>
        {/* </div> */}

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Farmer Utilies
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
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <div className="dropdown mt-3">
              {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul> */}

              <Link
                type="button"
                className="btn btn-success"
                to="/farmer/addproduct"
              >
                Add new product
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

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11">
                
              {/* <Link className="btn btn-info" to={`/farmer/products/${productId}`}>List of Products</Link> */}

              <h3>List Of Products</h3>

              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price (Rs/kg)</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Stock (kg)</th>
                    <th scope="col">Actions</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.productTitle}</td>
                      <td>{product.price}</td>
                      <td>{product.expiryDate}</td>
                      <td>{product.availableStock}</td>
                      <td>
                        <Link
                          className="btn btn-info"
                          to={`/product/update/${product.productId}`}
                        >
                          Update
                        </Link>
                    </td>
                    <td>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            handleDelete(product.productId);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              <h3>List Of Orders</h3>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product</th>
                    <th scope="col">Ordered_Quantity (kg)</th>
                    <th scope="col">Price (Rs/kg)</th>
                    <th scope="col">Order Time</th>
                    {/* <th scope="col">Order Status</th> */}
                    <th scope="col">Actions</th>
                    {/* <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderItemId}>
                      <td>{order.orderItemId}</td>
                      <td>{order.productTitle}</td>
                      <td>{order.productQuantity}</td>
                      <td>{order.productPrice}</td>
                      <td>{order.orderTime}</td>
                      {/* <td>{order.orderStatus}</td> */}
                      
                      {/* <td>
                        <Link
                          className="btn btn-info"
                          to={`/product/update/${product.productId}`}
                        >
                          View
                        </Link>
                    </td> */}
                    <td>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            handleOrderDelete(order.orderItemId);
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerHomePage;
