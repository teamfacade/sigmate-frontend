import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5100/api/v1',
});

export default Axios;
