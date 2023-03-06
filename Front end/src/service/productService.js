import httpClient from '../http-common';

const get = (id) => {
    return httpClient.get(`/farmer/products/${id}`);
  };

 

const get_product =(id) =>{
    return httpClient.get(`/product/get/${id}`);
}

const update_product =(id,productId,data) =>{
  return httpClient.put(`/product/update/${id}/${productId}`,data)
}


const create =(id,farmerId,data) => {
  return httpClient.post(`/product/add/${id}/${farmerId}`,data)
}

const remove =(id) =>{
  return httpClient.delete(`/product/delete/${id}`)
}


const get_orders =(id) => {
  return httpClient.get(`/farmer/orders/${id}`)
}

  export default { get,get_product,update_product,create,remove,get_orders};