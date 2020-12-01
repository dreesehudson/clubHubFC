import React from 'react';
import axios from 'axios';

export function axiosHelper(method, url, headers, data) {
    const API_URL = 'http://localhost:8000';
    return axios(
        {
            method,
            url: API_URL + url,
            headers,
            data
        }
    )
}

