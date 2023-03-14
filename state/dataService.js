import axios from "axios";
import { Buffer } from 'buffer'

const headers = {
    "Access-Control-Allow-Origin": "http://localhost:19006",
    'content-type': 'application/json',
    "Authorization": "Basic YWxleDo="
}
var username = 'alex';
var password = '';
//var credentials = btoa(username + ':' + password);
var basicAuth = 'Basic ';
const tok = `${username}:${password}`
const encodedToken = Buffer.from(tok).toString('base64')


var config = {
    method: 'get',
    url: 'http://localhost:19006',
    headers: { 'Authorization': 'Basic ' + encodedToken }
};
export class DataService {
    static getData() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/digging-plant/orders')
    }


    static getStepOrders(stepId, storageId, token) {

        let stepOrders = axios.post('http://194.42.196.141:41001/UTPT/hs/api/getStepOrders', {
            stepId, storageId, token
        })
            .then((response) => response.data)
            .catch(function (error) {
                console.log(error);
            })

        return stepOrders
    }


    static getStoragesDig = async (token) => {

        /*  return axios.post('http://194.42.196.141:41001/UTPT/hs/api/getStorages', { token }, {
             auth: {
                 username: 'alex',
                 password: ''
             }
         }) */


        let response = await fetch(
            "http://194.42.196.141:41001/UTPT/hs/api/getStorages",
            {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'include',
                cache: 'no-cache',
                redirect: 'follow',
                auth: { username: 'alex', password: '' },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + encodedToken,

                },
                body: JSON.stringify({ token: token })
            }
        )
            .then(res => {
                console.log(res)

                return res.text();
            })



    }



    /* static getStoragesDig(token) {

        return axios.get('https://server-plant-git-master-arturdemich.vercel.app/api/getStoragesDig')
            .then((response) => response.data)
            .catch(function (error) {
                console.log(error);
            })
    } */

} 