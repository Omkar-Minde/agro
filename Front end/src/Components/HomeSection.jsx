import React from 'react' 
import "../style/carousel.css"
import Market from "../assets/grains.jpg";
import farm from "../assets/farm.jpg";
import products from "../assets/products.jpg";
import { Link } from 'react-router-dom';
import capture from '../assets/Capture.PNG'
import Customer from '../assets/Customer.png'
import rest from '../assets/Rest.PNG'
import farms from '../assets/farms.jpg'
import Cart from '../assets/cart.jpg'

export default function HomeSection() {
    return (
        <div style={{backgroundColor: "#e2f2e6"}}>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active">
                        {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg> */}
                        <img src={Market} style={{ objectFit : "cover" }}/>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Quality products direct from field.</h1>
                                <p>Orders placed will reach farmers directly and fresh product will be deliverd.</p>
                                <p><a className="btn btn-lg btn-success" href="/about">Know More</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>
                        <img src={farm} style={{ objectFit : "cover" }}/>
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Empowering farmers and bringing change in agricultural industry.</h1>
                                <p>Become a seller</p>
                                <p><Link className="btn btn-lg btn-success" to="/farmer/register">Learn More</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>
                        <img src={products} style={{ objectFit : "cover" }}/>
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>Buy products of your choice.</h1>
                                <p>You have option to choose farmer,location,oraganic etc.</p>
                                <p><Link className="btn btn-lg btn-success" to="/customer/customerHome">Browse Products</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>




            <div className="container marketing" >


                <div className="row">
                    <div className="col-lg-4">
                        {/* <svg src={capture} className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
                        <img src ={capture} style={{ borderRadius: "50%",height:"200px"}}></img>
                        <h2>Benefits To Farmer</h2>
                        <p>More Revenue
                        , Easy Payments <br/> Mass Selling , One Point Sell</p>
                    </div>
                    <div className="col-lg-4">
                    <img src ={Customer} style={{ borderRadius: "50%",height:"200px"}}></img>
                        <h2>Benefits To Customer</h2>
                        <p>Fresh Products
                        , Easy Payments <br/> Mass Purchase , Discount Price</p>
                    </div>
                    <div className="col-lg-4">
                    <img src ={rest} style={{ borderRadius: "50%",height:"200px"}}></img>
                        <h2>Benefits To Retailers</h2>
                        <p>Fresh Products
                        , Easy Payments <br/> Bulk Purchase , Fast Delivery</p>
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-5">
                        <h2 className="featurette-heading">Let's give a good price for their priceless service </h2>
                        <p className="lead">Be a part of journey towrads something positive by contributing little</p>
                    </div>
                    <div className="col-md-7">
                        {/* <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg> */}
                        <img src ={farms} style={{height:"400px"}}></img>

                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-5 order-md-2">
                        <h2 className="featurette-heading">Eat it fresh,hygenic and organic</h2>
                        <p className="lead">Keeping your basket full of healthy food is in our hands. Don't let middlemen adulterate it.</p>
                    </div>
                    <div className="col-md-7 order-md-1">
                    <img src ={Cart} style={{height:"400px",width:"600px"}}></img>
                    </div>
                </div>

            </div>


        </div>
    )
}
