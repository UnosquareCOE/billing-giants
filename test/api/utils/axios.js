const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:4000/",
    validateStatus: status => (status >= 200 && status < 500),
    header: {
        "Content-Type": "application/json",
    },
});

module.exports = instance;
