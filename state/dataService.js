import axios from "axios";

export class DataService {
    static getData() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/digging-plant/orders')
    }

    static getStepOrders(stepId) {

        let stepOrders = axios.post('http://localhost:3020/api/getStepOrders', {
            stepId
        })
            .then((response) => response.data)
            .catch(function (error) {
                console.log(error);
            })

        return stepOrders
    }


    static getStoragesDig() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/server-plant/storages')
    }

} 