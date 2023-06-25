import axios from "axios";

const baseURL = axios.defaults.baseURL;

// check if token is store as loca Storage 
let __token = localStorage.getItem('token');

let headers = {};
if ( __token !== undefined && __token !== '' ) {
  headers = {
    'Authorization': 'Bearer ' + __token,
    'Accept': 'application/json',
    'Content-type': 'appication/json'
  }
}
else {
  headers = {
    'Accept': 'application/json',
    'Content-type': 'appication/json'
  }
}



export default axios.create({
  baseURL: baseURL,
  headers: headers
});