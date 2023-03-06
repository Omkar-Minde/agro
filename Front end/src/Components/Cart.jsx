import React from 'react';
import { useEffect } from 'react';
import cartService from '../service/cartService';

import OrderItem from "./CartComponent/OrderItem"
import TotalPrice from "./CartComponent/TotalPrice"
import { useState, createContext } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const CartContext = createContext() //not default export
//assumption cart id will be given in router as prop
export const OrderItemContext = createContext()



//props
const Cart = (props) => {



  //cart id will be from props
var cartId = props.cartId;
    var quantityArray=[{}];
    var orderItemArray=[]
   
    const [items, setItems] = useState([{}]);
    
   var [count, setCount] = useState(0);
          
   function handleRemove(id){

    axios.delete(`http://localhost:7070/order/delete/${id}`)
    // cartService.removeOrderItem(props.orderItem.orderItemId)
     .then((res)=>{console.log(res.data)
   // forceUpdate();
   //navigate("")
   cartService.getAllOrderItems(cartId)
          .then(response => {
              console.log("all products", response.data);
              // items=response.data;
              setItems(response.data);
          
          })
          .catch(error => {
              console.log('something went wrong', error);
          })


    })
     .catch(error => {
        console.log('something went wrong', error);
    });
}


    useEffect(() => {
         console.log("in useeffect of cart")
          cartService.getAllOrderItems(cartId)
            .then(response => {
                console.log("all products", response.data);
                // items=response.data;
                setItems(response.data);
              
            })
            .catch(error => {
                console.log('something went wrong', error);
            })
           
          }, []);


               useEffect(() => {
                 var newCount=0; 
               
            console.log("in use effect  for item count")
                 
          items && items.map((orderItem) => {
                console.log('in map of count order item id '+ orderItem.orderItemId +" order id "+orderItem.orderId)
            
                if((orderItem.orderId==0)){
                    newCount++
            //updating order items id in array
            // orderItemArray=[...orderItemArray,orderItem.orderItemId];
                orderItemArray.push(orderItem.orderItemId)
               console.log("pushing orderitemId"+orderItem.orderItemId)
               }
               }
               )

               setCount(newCount);
            }
          , [items])
      
         
         return (
            <> 
                <OrderItemContext.Provider value={[handleRemove,quantityArray,orderItemArray,cartId]} >
                <CartContext.Provider value={items}>
                    <div className="container" style={{backgroundColor: "#e2f2e6"}}>
                        <div className="row   mt-lg-3">
                            <div className="col-lg-8 col-md-12 mx-lg-2 mt-lg-2 border " style={{ height: "90vh", overflow: "scroll" }} >

                                <h3>Your Basket ({count} items)</h3>
                              
                                {
                                    items && items.map((orderItem) => {
                                        if (orderItem.orderId ==0 ) {
                                            return <OrderItem key={orderItem.orderItemId} orderItem={orderItem}   />
                                             
                                        }
                                        else {
                                            // {  console.log("in cart jsx "+orderItem.orderId)}
                                         //  price = price + (orderItem.productPrice * orderItem.productQuantity);
                                         return <></>

                                        }
                                    })

                                }

                            </div>


                            <div className="col-lg mx-lg-2 col-md-12 mt-lg-2 " style={{ height: "50vh" }}>
                                <TotalPrice  />
                            </div>
                        </div>
                    </div>
                </CartContext.Provider>
                </OrderItemContext.Provider>
            </>
        )
    }

export default Cart;
