import axios from 'axios';
import { API, generateAuthHeader } from './utils';

const UserService = {
    createUser({ email, password }) {
        return axios.post(API.CREATE_USER, { email, password });
    },

    logInUser({ email, password }) {
        return axios.post(API.LOG_IN_USER, { email, password });
    },

    logOutUser() {
        return axios.post(
            API.LOG_OUT_USER,
            {},
            { headers: generateAuthHeader() }
        );
    },

    isUserLoggedIn() {
        return axios.get(API.IS_USER_LOGGED_IN, {
            headers: generateAuthHeader(),
        });
    },
};

export default UserService;
