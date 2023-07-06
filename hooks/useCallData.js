import { useDispatch } from "react-redux"
import { getDigStorages, getStep } from "../state/dataThunk"


const useCallData = () => {
    const dispatch = useDispatch()

    const callData = async (token) => {
        await dispatch(getDigStorages(token))
        await dispatch(getStep(token))        
    }

    return {callData}
}

export default useCallData