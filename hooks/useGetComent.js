import { useEffect, useState } from "react";
import { DataService } from "../state/dataService";



export function useGetComent(token, orderId) {
    const [coment, setComent] = useState('')

    const getComent = async (t, id) => {
        const res = await DataService.getOrderInfo(t, id)
        setComent(res.data[0].comment)
    }
    useEffect(() => {
        getComent(token, orderId)
    }, [])

    return { coment }
}