import axios from 'axios';

export function axiosHelper({ method = 'get', url, data = {}, bearer, fun }) {
    const API_URL = 'https://cors-anywhere.herokuapp.com/https://clubhubfc.herokuapp.com/';
    // const API_URL = 'http://localhost:8000';
    return axios(
        {
            method,
            url: API_URL + url,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Accept": "application/json",
                'Authorization': 'Bearer ' + bearer
            },
            data
        }).then(res => {
            if (fun) {
                fun(res.data)
            }
        })
        .catch(err => console.log('error: ', err));
}
