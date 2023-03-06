import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Productc.css';
import Market from '../assets/market.jpg'

export default function List() {

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
     return(
            <div className='outer'>
                {
            products.map((product)=>(
                <div className='col-12 col-sm-6 col-lg-4 mb_80' key={product.productId} >
                <div className="card" style={{width: "18rem",backgroundColor: "#beeeca"}} >
                    <div className='product_img'>
                        <img src={Market} className="card-img-top" alt={product.productTitle}/>
                    </div>
                    <div className="card-body p-3">
                        <div className='product_title'>
                            <Link className="card-title"  to={`/product/get/${product.productId}`} >{product.productTitle}</Link>
                        </div>
                        <div className='product_desc'>
                            <p className="card-text">In stock : {product.availableStock} (kg)</p>
                        </div>
                        <div className='product_price'>
                           <p   className="card-text card_price">MRP : Rs.{product.price}</p>
                        </div>
                     </div>
                     <div className="col-lg-4 col-sm-12 quantity" style={{ height: "75px" }}>
                                    
                                        <ul className="pagination mt-1 mb-1">
                                            <h5>Quantity(kg):</h5>
                                            <div className='plus'>
                                            <li className="page-item"><button className="btn btn-secondary ml-5" style={{ height: "30px"}}onClick={()=>setQuantityState(++quantityState)}><i className="bi bi-plus-lg"></i></button></li>
                                            <li className="page-item"><input type="number" name="Quantity"   value= {quantityState}  style={{width:"40px",height:"30px",textAlign:'center'}}></input></li>
                                            <li className="page-item"><button className="btn btn-secondary" style={{ height: "30px"}} onClick={()=>{if(quantityState>1)setQuantityState(--quantityState)}}><i className="bi bi-dash-lg"></i></button></li>
                                            </div>                                        
                                        </ul>
                    </div>
                    <div className='cta-group'>
                        <div className='btn-atc'>
                            
                             <Link   className="btn-atc text-decoration-none" onClick={() => addToCart(product)}>Add To Cart</Link>
                        </div>
                    </div>
                    <div>
                    {/* <Reveiw /> */}
                    </div>
                 </div>
            </div>
            ))
}
            </div>
           
       ) }