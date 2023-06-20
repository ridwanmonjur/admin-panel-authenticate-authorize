import axios from "axios";
import { getCookie } from 'cookies-next';

export const fetchSSR = ({ req, res }) => {

    const axiosSSR = axios.create({
        baseURL: `${process.env.BACKEND}/api/v1`,
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        // withCredentials: true
    });

    axiosSSR.defaults.timeout = 6000

    axiosSSR.interceptors.request.use(
        async config => {
            if (getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, { req, res }))
                config.headers = {
                    'Authorization': getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, { req, res }),
                }
            return config;
        },
        error => {
            Promise.reject(error)
        });


    axiosSSR.interceptors.response.use(
        (response) => {
            return response.data
        },
    );

    return axiosSSR;
}