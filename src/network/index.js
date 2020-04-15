import axios from 'axios'

export function request(config){
    const instance = axios.create({
       baseURL:'http://127.0.0.1:8080/gssb/',
        timeout:50000

    })
    return instance(config);
}