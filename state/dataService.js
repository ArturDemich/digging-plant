import axios from "axios";
import { Buffer } from 'buffer'


const username = 'alex';
const password = '';

const basicAuth = 'Basic ';
const tok = `${username}:${password}`
const encodedToken = Buffer.from(tok).toString('base64')
const data = "85BB86DA0A80D47B39780CDBA04B6BD1"



export class DataService {
    static getData() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/digging-plant/orders')
    }


    static getStepOrders(stepId, storageId, token) {

        let stepOrders = axios.post('http://194.42.196.141:41001/UTPT/hs/api/getStepOrders', {
            token: token,
            stepId: stepId,
            storageId: storageId,
        }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            })

        return stepOrders
    }

    static getStoragesDig(token) {

        return axios.post('http://194.42.196.141:41001/UTPT/hs/api/getStorages', { token: token }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            })
    }

    static getSteps(token) {

        return axios.post('http://194.42.196.141:41001/UTPT/hs/api/getSteps', { token: token }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            })
    }


    static getToken(log, pass) {

        return axios.post('http://194.42.196.141:41001/UTPT/hs/api/getToken', { login: log, password: pass }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            })
    }


    static setNextStep(token, storageId, currentstepId, orderId, productid, characteristicid, unitid, actionqty) {

        let stepOrders = axios.post('http://194.42.196.141:41001/UTPT/hs/api/setNextOrderStep', {
            token: token,
            stepdata: [
                {
                    storageId: storageId,
                    currentstepId: currentstepId,
                    orderId: orderId,
                    productid: productid,
                    characteristicid: characteristicid,
                    unitid: unitid,
                    actionqty: actionqty,
                }
            ]
        }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            })

        return stepOrders
    }

}

