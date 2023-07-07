import { StackActions } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity } from 'react-native'
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
        flexDirection: 'row'
    },
})

function ButtonOut({ navigation, token }) {
    const dispatch = useDispatch()
    const {registerDeviceToken} = useDeviceToken()
    

    const deleteToken = async() => {
        await SecureStore.deleteItemAsync('token')
        console.log('out', token)
        await registerDeviceToken(token, false)
    }
 
    return (
        <TouchableOpacity
            style={[styles.buttonStep]}
            onPress={() => {
                navigation.dispatch(StackActions.popToTop())
                dispatch(cleanState())
                deleteToken()
            }}
        >
            <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default ButtonOut

