import axios from "axios";

const headers = {
    "Access-Control-Allow-Origin": "http://localhost:19006",
    'content-type': 'application/json'
}
export class DataService {
    static getData() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/digging-plant/orders')
    }


    static getStepOrders(stepId, storageId) {

        let stepOrders = axios.post('https://server-plant-git-master-arturdemich.vercel.app/api/getStepOrders', {
            stepId, storageId
        }, {
            headers: headers
        })
            .then((response) => response.data)
            .catch(function (error) {
                console.log(error);
            })

        return stepOrders
    }


    static getStoragesDig() {

        return axios.get('https://server-plant-git-master-arturdemich.vercel.app/api/getStoragesDig')
    }

} 