import axios from 'axios';

export const setAuth = (token: any) => {
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
};

const setAuthToken = (token: any) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
