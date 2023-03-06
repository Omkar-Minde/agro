import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const create = (data) => {
  return httpClient.post('/customer/register', data);
};

const customerLogin = (data) => {
    console.log(data);
    return httpClient.post('/customer/login', data);
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


export default { getAll, create, get, update, remove , customerLogin };