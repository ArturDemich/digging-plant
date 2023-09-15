import { StackActions } from '@react-navigation/native'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { cleanState } from '../state/dataSlice'
import { Feather } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import useDeviceToken from '../hooks/useDeviceToken'


const styles = StyleSheet.create({
    textBtn: {
        color: 'snow',
        fontSize: 12,
        fontWeight: 600,
        alignSelf: 'center',
    },
    buttonStep: {
        borderRadius: 5,
        textAlign: "center",
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 25,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
})

function ButtonOut({ navigation, token }) {
    const dispatch = useDispatch()
    const {registerDeviceToken} = useDeviceToken()
    
console.log(navigation)
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
                //navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Вхід')
                deleteToken()
                dispatch(cleanState())
                
            }}
        >
            <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default ButtonOut

