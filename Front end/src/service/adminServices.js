import httpClient from '../http-common';


const removeone =(id) =>{
    return httpClient.delete(`/farmer/delete/${id}`)
  }

  const removeonee =(id) =>{
    return httpClient.delete(`/customer/delete/${id}`)
  }

  export default {removeone,removeonee};