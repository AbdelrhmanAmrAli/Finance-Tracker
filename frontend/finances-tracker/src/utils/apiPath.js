// Load environment variables from .env if available
export const BASE_URL = import.meta.env.VITE_API_URL;

// utils/apiPath.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "api/v1/auth/login",
        SIGNUP: "api/v1/auth/register",
        GET_USER_INFO: "api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "api/v1/dashboard",
    },
    INCOME: {
        GET_ALL: "api/v1/income/get",
        ADD: "api/v1/income/add",
        DELETE: "api/v1/income",
    },
    EXPENSE: {
        GET_ALL: "api/v1/expense/get",
        ADD: "api/v1/expense/add",
        DELETE: "api/v1/expense",
    },
    CONVERT: {
        GET: "/api/v1/convert"
    },

};  