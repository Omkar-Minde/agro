import React from 'react';
import Market from "../assets/market.jpg";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const ProductDetails = () => {

    const { id } = useParams();

    console.log(id);

    const [product, setProduct] = useState([]);
    const [reviews, setReview] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/product/get/${id}`)
                .then(response => {
                    console.log("product fetched successfully", response.data);
                    setProduct(response.data);
                    // navigate('/');
                })
                .catch(error => {
                    console.log('something went wrong', error);
                })

            axios.get(`http://localhost:8080/review/get/${id}`)
                .then(response => {
                    console.log("review fetched successfully", response.data);
                    setReview(response.data);
                    // navigate('/');
                })
                .catch(error => {
                    console.log('something went wrong', error);
                })
        }

    }, []);


    const[products,setProducts] = useState([]);

    var cartId ;



    var[quantityState,setQuantityState]= useState(1);

    const customerId = sessionStorage.getItem("customerLoginId");

    useEffect(()=>{
        console.log("in use effect");
        loadProducts()
     },[]);


    const loadProducts=async()=>{
        const result = await axios.get("http://localhost:8080/product");
        // console.log(result.data);
        setProducts(result.data);
        console.log("array of products"+result.data)
        console.log("tushar"+products);
    };

    var cartDto={};

    var addToCart =async(product)=>{

       

    // const cartId = sessionStorage.getItem("genratedCartId");
    await axios.get(`http://localhost:8080/cart/get/${customerId}`)
    .then((respnse) =>{
        console.log("get cart id",respnse.data)
        sessionStorage.setItem("cartId",respnse.data)
    }
    
    ).catch((err) =>{
        sessionStorage.setItem("cartId","null")
    }
   
    )
     cartId = sessionStorage.getItem("cartId");

     if(cartId == 0){
        console.log("product card else"+product.productId)
    
        cartDto = {  
       "cartId":null,
       "customerId": customerId,
       "productId": product.productId,
       "productQuantity":quantityState,
        "productPrice":product.price
       }

       console.log("cart dto in else" + cartDto.cartId)
     }
     else{
        console.log("product card else"+product.productId)
    
        cartDto = {  
       "cartId":cartId,
       "customerId": customerId,
       "productId": product.productId,
       "productQuantity":quantityState,
        "productPrice":product.price
       }

       console.log("cart dto in else" + cartDto.cartId)
     }
        await axios.post("http://localhost:8080/order/add",cartDto)
        .then((response) => {
       
        console.log("add to cart response"+response.data)})

    }

    // const  array = Object.keys(products)
    // console.log(array)

    return (
        <div style={{backgroundColor: "#e2f2e6"}}>
            {/* {products && products.map((product) => ( */}
                <div className="container mt-4 mb-4">
                    <div className="row justify-content-center" key={product.productId}>
                        <div className="col-8">
                            <div className="row justify-content-center">

                                <div className="col-6">
                                    <img src={Market} className="rounded" alt="..." style={{ width: "16rem", height: "16rem" }} />
                                </div>
                                <div className="col-6">
                                    <div className="mb-2">
                                        <h3>{product.productTitle}</h3>

                                    </div>
                                    <div className="price mb-2">
                                        <span className="fw-bold fs-4">Price:Rs.{product.price}</span><span className="text-danger ps-3">(10% off)</span>
                                    </div>
                                    <div className="Quantity mb-2">
                                        <label className="me-5 fw-bold mb-2" >Quantity Available: {product.availableStock}(kg) </label>
                                    <div>
                                    <label className="me-5 fw-bold mb-2" >Select Quantity: </label>
                                    <input type="Number" name="stock" id="stock" style={{ width: "4rem",height:"1.5rem" }} placeholder="0" />
                                    </div>
                                    </div>
                                    <div className="services mb-2">
                                        <label className="me-5 fw-bold" >Services: Cash on delivery available</label>
                                        <span ></span>
                                    </div>
                                    <div className="seller mb-2">
                                        <label className="me-5 fw-bold" >Seller: TheIndianFarmer</label>
                                        <span></span>
                                    </div>

                                    <div className="mt-4">
                                    <Link   className="btn-atc text-decoration-none" onClick={() => addToCart(product)}>Add To Cart</Link>

                                        <Link className="btn btn-primary mx-2" to={`/product/${product.productId}`}>Add review</Link>
                                        {/* <button className="btn btn-primary mx-2">Buy Now</button> */}
                                    </div>

                                </div>
                            </div>
                            <div className="row mt-5">
                                <h3>Description</h3>
                                <p>{product.ProductDetails}</p>
                            </div>

                        </div>
                    </div>
                </div>

            {/* ))} */}
            <div>
                {reviews.map((review) => 
                {
                    
                  return  <div className="row mt-3">
                        <h2>Reviews</h2>

                        <div className="reviewCard my-3">
                            <div className="title" >
                                <h4>{review.reviewTitle}</h4>
                                {/* <div className="my-2">
                                <span >Review By <span style={{ color: 'red' }}>Akshay</span> </span>
                            </div> */}
                            </div>
                            <div>
                                <p>{review.reviewContent}</p>
                            </div>
                        </div>
                       
                    </div>
                })}
            </div>
        </div>

    );
}

export default ProductDetails;
