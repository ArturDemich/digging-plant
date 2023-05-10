import { StackActions } from '@react-navigation/native'
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { cleanState } from '../state/dataSlice'
import { Feather } from '@expo/vector-icons';


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
        //backgroundColor: "#cacaca",
        //width: 50,
        //height: 30,
        textAlignVertical: 'center',
        alignSelf: 'center',
        // elevation: 1,
        //shadowColor: '#52006A',
        //shadowOffset: { width: -1, height: 1 },
        //shadowOpacity: 0.2,
        //shadowRadius: 1,
        justifyContent: 'center',
    },
})

function NextStepButton({ navigation }) {
    const dispatch = useDispatch()

    return (
        <TouchableOpacity
            style={[styles.buttonStep]}
            onPress={() => {
                navigation.dispatch(StackActions.popToTop())
                dispatch(cleanState())
            }}
        >
            <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default NextStepButton

