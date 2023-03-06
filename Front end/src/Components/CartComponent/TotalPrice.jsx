import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import cartService from '../../service/cartService';
import { CartContext, OrderItemContext } from '../Cart';


export default function TotalPrice() {

    const customerId = sessionStorage.getItem("customerLoginId");

    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState([]);

    const [messge, setMessge] = useState([]);

    const [adds, setAdds] = useState(0);

    const items = useContext(CartContext);

    const [, quantityArray, orderItemArray, cartId] = useContext(OrderItemContext)

    function init() {

        var totalPrice = 0;
        // for( var item in items){
        //     console.log("single item is "+item)
        //     console.log("price is"+price+"product price is "+parseInt(item.productPrice))
        //   price=price+(item.productPrice*item.productQuantity); 
        // }; 
        items && items.map((item) => {
            if (!(item.orderId != null && item.orderId != 0)) {
                totalPrice = totalPrice + (item.productPrice * item.productQuantity);
            }
        })

        setPrice(totalPrice);
        setDiscount(totalPrice * 0.2);
        if (totalPrice == 0) {
            setDeliveryCharges(0);
        }
        else {
            setDeliveryCharges(50);
        }

        setTotal(totalPrice - totalPrice * 0.2 + deliveryCharges);
    }
    useEffect(() => {
        console.log("in total item use effect")
        init()
    }, [items])

    function handleCheckOut() {
        var orderDto = {
            cartId: cartId,
            addressId: adds,
            orderItemsIdArray: orderItemArray
        }


        console.log("orderitem dto is " + orderDto.cartId + "  array is " + orderDto.orderItemsIdArray[0]/*.map((p)=>console.log("in map "+p))*/)
        cartService.updateOrderItemsQuantities(quantityArray)
            .then(() => { console.log("items updated succesfully") })
            .then(() =>//cartService.placeOrder(orderDto)
                axios.post("http://localhost:7070/order/place", orderDto)
                    .then(() => {
                        console.log("items placed succesfully")
                        setMessge("Order placed succefully!!!")
                    }))
            .catch((error) => {
                console.log("error in handle check out", error)
            });
    }

    function handleAddress() {
        axios.get(`http://localhost:7070/customer/address/${customerId}`)
            .then((response) => {
                console.log(response.data)
                setAddress(response.data)
                console.log("address is" + response.data[0].addressId)
            })
            .catch((err) =>
                console.log("something went wrong")
            )
    }

    function setAdresss(addId) {
        setAdds(addId);
        console.log("add is a" + adds)
    }


    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className=" col-lg-12 mt-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2}><h3>Total Price :</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td>Price:</td>
                                    <td>{price}&#8377;</td>
                                </tr>
                                <tr>

                                    <td>Discount:</td>
                                    {/* <td>{props.price*0.2}</td> */}
                                    <td>{discount}&#8377;</td>

                                </tr>
                                <tr>

                                    <td >Delivery charges:</td>
                                    <td>{deliveryCharges}&#8377;</td>
                                </tr>
                                <tr style={{ borderTop: "2px", fontSize: "1.5rem", fontWeight: 'bold' }}>
                                    <td colspan="1">Total:</td>
                                    <td>{total}&#8377;</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="col-lg-12 justify-content-center align-items-center mt-lg-3">




                        <div className="">
                            <button type="button sm" className="btn btn-warning mt-lg-2" onClick={handleAddress}>Select Adrress</button>
                        </div>

                        <div>
                            {address.map(add => {

                                return <div className="form-check border mt-2" key={add.addressId} >
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => setAdresss(add.addressId)} checked />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        {add.adrLine1},
                                        <br />
                                        {add.city},

                                        {add.district},
                                        <br />
                                        {add.state},
                                        {add.pinCode}

                                    </label>
                                </div>
                            })}
                        </div>

                        <div className=" mt-3">
                            <button type="button" className="btn btn-warning mt-lg-2" style={{ height: "40px", width: "200px" }} onClick={handleCheckOut}>CHECKOUT</button>
                        </div>

                        <div className="success messge mt-4">
                            <h2 style={{
                                fontWeight: "bold"
                            }}>{messge}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
