import './assets/css/styles.css'
import axios from 'axios'

// test base URL 
axios.defaults.baseURL = 'http://localhost:8007/api/v1'
// axios.defaults.baseURL = 'https://api-mailer.jobscarriers.com/api/v1'


// Live Base URL 
// axios.defaults.baseURL = 'https://api.regnotradesmailer.com/api/v1'

// import './assets/plugins/tinymce/jquery.tinymce.min.js'
// import './assets/plugins/tinymce/tinymce.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'


let __loggedInToken = localStorage.getItem('token');
if ( __loggedInToken !== undefined ) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + __loggedInToken;
    axios.defaults.headers.common['Accept'] = 'application/json';
}

const app = createApp(App)
app.use(router)
app.mount('#app')