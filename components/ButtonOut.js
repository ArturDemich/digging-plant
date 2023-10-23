import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { cleanState } from '../state/dataSlice'
import { Feather } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import useDeviceToken from '../hooks/useDeviceToken'


const styles = StyleSheet.create({    
    buttonStep: {
        justifyContent: 'center',
        width: 30,
        paddingLeft: 5
        
    },
})

function ButtonOut({ navigation, token }) {
    const dispatch = useDispatch()
    const {registerDeviceToken} = useDeviceToken()
    

    const deleteToken = async() => {
        if(Platform.OS === 'web') {
            await localStorage.removeItem('token')
        } else {
            await SecureStore.deleteItemAsync('token')
        }
       // await registerDeviceToken(token[0].token, false)
    }
 
    return (
        <TouchableOpacity
            style={[styles.buttonStep]}
            onPress={() => {
                deleteToken()
                dispatch(cleanState())
                
            }}
        >
            <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default ButtonOut

