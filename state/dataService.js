import axios from "axios";

export class DataService {
    static getData() {

        return axios.get('https://my-json-server.typicode.com/ArturDemich/digging-plant/orders') // test endpoint
    }

} 