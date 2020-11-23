import React from 'react';
import axios from 'axios';

export default function axiosHelper(method, url, headers, data, fun) {
    const API_URL = 'http://localhost:8000';
    return axios(
        {
            method,
            url: API_URL + url,
            headers,
            data
        }
    )
    .then(res => fun(res.data))
    .catch(e => console.log(e));
}

