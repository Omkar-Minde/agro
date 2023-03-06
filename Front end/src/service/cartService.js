import httpClient from '../http-common';

// const getAll = () => {
//   return httpClient.get('');
// };

// const create = (data) => {
//   return httpClient.post('/customer/register', data);
// };

// const customerLogin = (data) => {
//     console.log(data);
//     return httpClient.post('/customer/login', data);
//   };

const getAllOrderItems = (cartId) => {
  return httpClient.get(`/order/getorderItems/${cartId}`);
};

const updateOrderItem = (updatedOrderItem) => {
  return httpClient.put('/order/update', updatedOrderItem);
};

const removeOrderItem = (orderItemId) => {
  return httpClient.delete(`/order/delete/${orderItemId}`);
};

const addTowishList=(orderItemId,state)=>{

  return httpClient.post(`/order/addtowishlist/${orderItemId}/${state}`)
}
const updateOrderItemsQuantities=(quantityArray)=>{
  return httpClient.post('/order/updateProductQuantities',quantityArray)
}
const placeOrder=(orderDto)=>{
  return httpClient.post(`/order/place`,orderDto)
}

export default { getAllOrderItems, updateOrderItem,removeOrderItem,addTowishList ,updateOrderItemsQuantities,placeOrder};