import http from '../http-common'
import axios from 'axios'

// TODO:
// Refractor all auth access and create a function for each request
// Main Aim is ti try to reduce server requests

class User {
    userId;
    constructor() {

    }
    getLoggedInUser() {
        return http.get(axios.defaults.baseUR+'/user');
    }

    getProfilePics() {

    }

    getEmailConfig()
    {

    }

    checkIfLoggedIn() {
        try {
            let __response = this.getLoggedInUser();

            return true;
        } catch(error) {
            return false;
        }
    }
}

export default new User();