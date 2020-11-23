import React from 'react';
import axios from 'axios';

export function axiosHelper(method, url, data, fun) {
    const API_URL = 'http://localhost:8000'
    return axios(
        {
            method,
            url: API_URL + url,
            data
        }
    )
    .then(res => fun(res.data))
    .catch(e => console.log(e));
}