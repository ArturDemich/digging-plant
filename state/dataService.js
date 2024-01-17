import axios from "axios";
import { Buffer } from 'buffer'

const username = 'alex';
const password = '';
const tok = `${username}:${password}`
const encodedToken = Buffer.from(tok).toString('base64')


const NOTIFICATIONS_URL = 'https://landshaft.info/modules/viber/digger4.php'
const SEVE_TOKEN_URL = 'https://us-central1-digger-3000.cloudfunctions.net/saveToken'
const NEW_V_URL = 'https://digger-3000-default-rtdb.europe-west1.firebasedatabase.app/newVersion.json?print=pretty'

export class DataService {

    static getNewVersion() {
        let newVersion = axios.get(NEW_V_URL)
            .then((response) => response.data)            
            .catch((error) => {
                alert(error)
                console.log(error);
            })
        return newVersion
    }

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

     static getOrderLabels(token, dataOrders) {
        return axios.post('https://convertpdfto.azurewebsites.net/convert', {
            URL: 'http://194.42.196.141:41001/UTP/hs/api/getOrderLabels',
            encodedToken: encodedToken,
            data: {
                token: token,
                data: dataOrders
            }
        },        
        {headers: {'Content-Type': 'application/json'}}
        )
        .then((response) => response)
        .catch((error) => {
            alert('Помилка отримання етикеток', error)
            console.log('getOrderLabelsError', error);
        })       
    }



    static getNotifi(token) {
        return axios.post(NOTIFICATIONS_URL, { method: 'getNotifications', token: token },
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
        return axios.post(NOTIFICATIONS_URL, {
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
        return axios.post(NOTIFICATIONS_URL, {
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

    static sendTokenDevice = (userTok, deviceTok, log) => {
        axios.post(SEVE_TOKEN_URL, {
             userToken: userTok,
             deviceToken: deviceTok,
             loged: log
         })
         .then((response) => console.log(response.data))
         .catch(error => {
             if (error.response) {
               console.error('Статус відповіді:', error.response.status);
               console.error('Дані відповіді:', error.response.data);
               console.error('Заголовки відповіді:', error.response.headers);
             } else if (error.request) {
               console.error('Запит відправлений, але не отримано відповіді:', error.request);
             } else {
               console.error('Сталася помилка при виконанні запиту:', error.message);
             }
           });              
       }

}

