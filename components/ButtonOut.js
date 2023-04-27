import { StackActions } from '@react-navigation/native'
import { Text, StyleSheet, TouchableHighlight } from 'react-native'
import { useDispatch } from 'react-redux'
import { cleanState } from '../state/dataSlice'


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
        backgroundColor: "#cacaca",
        width: 50,
        height: 30,
        textAlignVertical: 'center',
        alignSelf: 'center',
        elevation: 7,
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent: 'center',
    },
})

function NextStepButton({ navigation }) {
    const dispatch = useDispatch()

    return (
        <TouchableHighlight
            style={[styles.buttonStep]}
            onPress={() => {
                navigation.dispatch(StackActions.popToTop())
                dispatch(cleanState())
            }}
        >
            <Text 
            style={styles.textBtn}
            allowFontScaling={true} 
            maxFontSizeMultiplier={1}
            >Вийти</Text>
        </TouchableHighlight>
    )
}

export default NextStepButton

