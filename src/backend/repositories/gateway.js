import axios from 'axios';
import { Store } from '@/store'
import {publish} from "@/backend/services/pub-sub";


function getAuth() {
    return Store.state.user.user.token;
}

setProfile('dev')  // cloud, ackoPc

let baseUrl;

function setProfile(profile) {
    if(profile === 'ackoPc') {
        baseUrl = 'http://lazarov.ddns.net:8888/api';
    }
    else if(profile === 'cloud') {
        baseUrl = 'https://tpl-api.thinker.io/api';
    }
    else if(profile === 'local'){
        baseUrl = 'http://localhost:53525/api'
    }
    if(profile === 'dev'){
        baseUrl = 'https://tsp-dev.thinker.io/api'
    }
}

const getBaseUrl = () => baseUrl;

const ApiPost = (resource, data, params) => {
    params =  {
        params,
        headers: {
            Authorization: 'Bearer ' + getAuth(),
        }
    }
    return axios.post(`${getBaseUrl()}/${resource}`, data,  params)
        .then(res => res.data)
        .catch(function(err) {
            if(err.response.status === 401) {
                Store.commit("user/resetState")
            }
            publish('error-message', err.response.data);
            throw (err);
        });
}


const ApiPatch = (resource, data, params) => {
    params =  {
        params,
        headers: {
            Authorization: 'Bearer ' + getAuth(),
        }
    }
    return axios.patch(`${getBaseUrl()}/${resource}`, data,  params)
        .then(res => res.data)
        .catch(function (err) {
            if(err.response.status === 401) {
                Store.commit("user/resetState")
            }
            publish('error-message', err.response.data);
            throw (err);
        });
}


const ApiGet = (resource, params) =>
{
   params =  {
       params,
       headers: {
            Authorization: 'Bearer ' + getAuth()
       }
   }
   return axios.get(`${getBaseUrl()}/${resource}`, params)
       .then(res => res.data)
       .catch(function(err) {
           if(err.response.status === 401) {
               Store.commit("user/resetState")
           }
           publish('error-message', err.response.data);
           throw (err);
       });
}

export {
    ApiPost,
    ApiGet,
    ApiPatch,
}
