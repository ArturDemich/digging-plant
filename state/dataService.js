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

            //console.log('newVersion')
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

            //.log('getStepOrders')
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
            //console.log('getStepOrdersGroup')
        return groupOrders
    }

    static getStoragesDig(token) {
        //console.log('getStorages')

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
// console.log('getSteps')

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
       // console.log('getToken')

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
       // console.log('setNextOrderStep')

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

    /* static getOrderLabels(token, dataOrders) {
        // console.log('getOrderLabels')
 
         return axios.post('http://194.42.196.141:41001/UTP/hs/api/getOrderLabels', { 
            token: token, 
            data: dataOrders 
        }, {
             headers: { 
                'Authorization': 'Basic ' + encodedToken,
                'Accept': 'application/pdf', // Важливо вказати очікуваний формат відповіді (PDF)                
            },
            //responseType: 'blob'
         })
             .then((response) => response)
             .catch((error) => {
                 alert(error.response.data)
                 console.log(error);
             })
     } */

     static async getOrderLabels(token, dataOrders) {
        const apiUrl = 'http://194.42.196.141:41001/UTP/hs/api/getOrderLabels';
        const headers = {
            //'Accept': 'application/pdf',
            'Authorization': 'Basic ' + encodedToken,
            'Content-Type': 'application/json',
        };
    
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                token: token,
                data: dataOrders,
            }),
        };
    
        try {
            const response = await fetch(apiUrl, requestOptions);
            console.log('response', response._bodyBlob)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           
            const blobData = await response;
    
            // Тут ви можете обробити Blob-дані, наприклад, зберегти файл або відобразити їх
            return blobData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getNotifi(token) {
      //  console.log('getNotifications')

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
      //  console.log('updateNotificationStatus')

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
      //  console.log('deleteNotification')

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
      //  console.log('SEVE_TOKEN_URL')
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

