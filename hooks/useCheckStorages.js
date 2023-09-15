import { useNavigation } from "@react-navigation/native"
import useDeviceToken from "./useDeviceToken"

const useCheckStorages = () => {
    const navigation = useNavigation()
    const {registerDeviceToken} = useDeviceToken()
    

    const checkStorages = (digStorages, token ) => {
        if (digStorages.length == 1) {
            navigation.navigate('Поле', {
                title: digStorages[0].name,
                token: token[0],
                storageId: digStorages[0].id
            })

        } else if (digStorages.length > 1) {
            navigation.navigate('Всі поля', {
                title: digStorages[0].name,
                token: token[0]
            })

        }        
        //registerDeviceToken(token[0].token, true)
    }
    return {checkStorages}
}

export default useCheckStorages