import axios from "axios";
import { Buffer } from 'buffer'

const username = 'alex';
const password = '';
const tok = `${username}:${password}`
const encodedToken = Buffer.from(tok).toString('base64')

export class DataService {

    static getStepOrders(stepId, storageId, token) {
        let stepOrders = axios.post('http://194.42.196.141:41001/UTP/hs/api/getStepOrders', {
            token: token,
            stepId: stepId,
            storageId: storageId,
        }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })
        return stepOrders
    }

    static getGroupOrders(stepId, storageId, token) {
        let groupOrders = axios.post('http://194.42.196.141:41001/UTP/hs/api/getStepOrders', {
            token: token,
            stepId: stepId,
            storageId: storageId,
            groupByOrder: false
        }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })
        return groupOrders
    }

    static getStoragesDig(token) {

        return axios.post('http://194.42.196.141:41001/UTP/hs/api/getStorages', { token: token }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })
    }

    static getSteps(token) {

        return axios.post('http://194.42.196.141:41001/UTP/hs/api/getSteps', { token: token }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })
    }


    static getToken(log, pass) {

        return axios.post('http://194.42.196.141:41001/UTP/hs/api/getToken', { login: log, password: pass }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error.response.data)
                console.log(error);
            })
    }

    static getOrderInfo(token, orderId) {

        return axios.post('http://194.42.196.141:41001/UTP/hs/api/getOrderInfo', { token: token, orderid: orderId }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error.response.data)
                console.log(error);
            })
    }


    static setNextStepGroup(token, dataOrders) {

        let stepOrders = axios.post('http://194.42.196.141:41001/UTP/hs/api/setNextOrderStep', {
            token: token,
            stepdata: dataOrders
        }, {
            headers: { 'Authorization': 'Basic ' + encodedToken }
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })

        return stepOrders
    }

    static getNotifi(token) {

        return axios.post('https://landshaft.info/modules/viber/digger4.php', { method: 'getNotifications', token: token },
            {
                headers: { 'Accept': '*/*' }
            })
            .then((response) => response.data)
            .catch((error) => {
                alert(error)
                console.log(error);
            })
    }
    static updateNotifi(token, messageid, mstatus) {

        return axios.post('https://landshaft.info/modules/viber/digger4.php', {
            method: 'updateNotificationStatus',
            token: token,
            messageid: messageid,
            status: mstatus,
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error.response.data)
                console.log(error);
            })
    }

    static deleteNotifi(token, messageid) {

        return axios.post('https://landshaft.info/modules/viber/digger4.php', {
            method: 'deleteNotification',
            token: token,
            messageid: messageid,
        })
            .then((response) => response.data)
            .catch((error) => {
                alert(error.response.data)
                console.log(error);
            })
    }

}

