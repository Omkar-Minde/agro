import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const create = (data) => {
  return httpClient.post('/farmer/register', data);
};

const farmerLogin = (data) => {
  console.log(data);
  return httpClient.post('/farmer/login', data);
};

const get = (id) => {
  return httpClient.get(`${id}`);
};

const update = (data) => {
  return httpClient.put('', data);
};

const remove = (id) => {
  return httpClient.delete(`/${id}`);
};


const adminLogin = (data) => {
  console.log(data);
  return httpClient.post('/admin/login', data);
};

export default { getAll, create, get, update, remove , farmerLogin,adminLogin};