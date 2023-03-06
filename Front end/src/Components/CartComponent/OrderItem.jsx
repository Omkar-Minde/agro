import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { useNavigate, useForceUpdate} from 'react-router-dom';
import Market from "../../assets/grains.jpg"
import cartService from '../../service/cartService';
import { CartContext, OrderItemContext } from '../Cart';

export default function OrderItem(props) {
  // const navigate= useNavigate();
  // const forceUpdate = useForceUpdate();

  const [wishListed, setWishListed] = useState(props.orderItem.wishListed);
var[quantityState,setQuantityState]= useState(props.orderItem.productQuantity);

    console.log(quantityState);
  

    const[ handleRemove,quantityArray] = useContext(OrderItemContext)
   function handleWishListClick( ){

          cartService.addTowishList(props.orderItem.orderItemId,!(wishListed))
          .then((res)=>{
            
            setWishListed(res.data)
          }
          )
          .catch((error)=>{
              console.log('something went wrong', error); 
             
          })
   }


function  handleBlur(){
    //(quantityArray)=>[...quantityArray,{orderItemId:props.orderItem.orderItemId,productQuantity:quantityState}]
    quantityArray.push({orderItemId:props.orderItem.orderItemId,productQuantity:quantityState})
}



    return (
        <div onBlur={handleBlur}>
            <div className="card mb-3">
                <div className="row g-0 container">
                    <div className="col-md-4 border my-auto mx-auto" style={{ maxHeight: "250px" }} >
                   { props.orderItem.profilePic ? <img src={props.orderItem.profilePic} className="img-fluid rounded-start" style={{ maxheight: "100%" }}/>:<img src={Market} className="img-fluid rounded-start" style={{ maxheight: "100%" }} />}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body  border">

                            <div className="row">
                                <div className="col-lg-8 col-sm-12 border" style={{ height: "175px" }}>
                                <div className="col-lg-12 border mt-1">
                                    <h2 className=" productName card-title" >{props.orderItem.title}</h2>
                                </div> 
                                <div className="col-lg-12  mt-5" style={{ marginBottom:"3px"}}>
                                    {/* <p className="" style={{ lineHeight: "0.3rem" }}>{props.orderItem.productDetails}</p> */}
                                    <p className="" style={{ lineHeight: "0.3rem" }}>added date:{props.orderItem.cartAddedDate}</p>
                                    <p  className="" style={{ lineHeight: "0.3rem" }}>expiry date:{props.orderItem.expiryDate}</p>
                                </div> 
                                </div>
                                <div className="col-lg-4 col-sm-12 border text-align-center justify-content-center " style={{ height: "75px" }}>
                                    <nav aria-label="Page navigation align-item-center">
                                        <ul className="pagination mt-1 mb-1">
                                            <li className="page-item">   
                                            </li>
                                            <li className="page-item"><button className="btn btn-secondary" onClick={()=>setQuantityState(++quantityState)}><i className="bi bi-plus-lg"></i></button></li>
                                            <li className="page-item"><input type="number" name="Quantity" value= {quantityState}  style={{width:"50px",height:"37px",textAlign:'center'}}></input></li>
                                            <li className="page-item"><button className="btn btn-secondary" onClick={()=>{if(quantityState>1)setQuantityState(--quantityState)}}><i className="bi bi-dash-lg"></i></button></li>
                                        </ul>
                                           <span className="mt-1">(unit:/kg)</span>
                                    </nav>
                                </div>
                                <div className="col-lg-4 col-sm-12 mt-lg-2 border" >
                                <button type="button"   style={{width:"30px",height:"30px"}} onClick={()=>handleRemove(props.orderItem.orderItemId)}><i className="bi bi-trash"></i></button><span className="ms-lg-3 " style={{fontSize:"0.8rem"}}>REMOVE</span>
                                </div>
                                <div className="col-lg-4 col-sm-12 mt-lg-2 border" >
                                <button type="button" onClick={handleWishListClick} style={{border:'none',background:'none'}}><i className="bi bi-heart-fill" style={{ color: (props.orderItem.wishListed || wishListed)?`#E52B50`:`black`}}></i></button><span className="ms-lg-2" style={{fontSize:"0.8rem"}}>ADD TO WISHLIST</span>
                                </div>
                                <div className="col-lg-4 col-sm-12 mt-lg-2 border" style={{fontWeight:'bold'}}>
                                 price:{props.orderItem.productPrice*quantityState}  &#8377;
                                </div>

                            </div>

                            {/* <li> product details lsadfhkjdhfahsdk;fja;sdfk;as</li>
         <li>organic </li>
         <li>expiry date</li> */}

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card p-4">
 <div classname="row border border-4">
                                      
 <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-item-center shadow productImage border border-4" >

     <img src={Market} className="img-fluid" alt="cart -img"></img>
 </div>
 
 <div className="col-md-7 col-11 mx-auto px-4 mt-2 shadow">
     <div className="row">
        
         <div className="col-6 productTitle card-title">
             <h1 className="mb-4 productName">title</h1>
             <p className="mb-2">product details</p>
             <p className="mb-2">organic</p>
             <p className="mb-2">expiry date</p>
         </div>
     

     </div>
 </div>
</div>

</div> */}

        </div>
    )
}

