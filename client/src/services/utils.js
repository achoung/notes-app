let BASE_API_URL;

if (process.env.NODE_ENV === 'production') {
    // TODO: update this later when this is deployable in production
    BASE_API_URL = process.env.BASE_API_URL;
} else {
    BASE_API_URL = 'http://localhost:4000';
}

module.exports = {
    API: {
        // User APIs
        CREATE_USER: `${BASE_API_URL}/api/users/create`,
        LOG_IN_USER: `${BASE_API_URL}/api/users/login`,
        LOG_OUT_USER: `${BASE_API_URL}/api/users/logout`,
        IS_USER_LOGGED_IN: `${BASE_API_URL}/api/users/isLoggedIn`,

        // Notes APIs
        NOTES: `${BASE_API_URL}/api/notes`,
    },
    generateAuthHeader() {
        return { Authorization: localStorage.getItem('tokenStore') };
    },
};
