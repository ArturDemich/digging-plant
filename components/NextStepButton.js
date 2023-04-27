import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getGroupOrdersThunk, setNextStepGroupThunk } from '../state/dataThunk'


const styles = StyleSheet.create({
    textBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 900,
        alignSelf: 'center',
    },
    buttonStep: {
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#45aa45",
        width: 150,
        height: 40,
        textAlignVertical: 'center',
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 10,
    },
})

function NextStepButton({ currentStorageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()
    const sendData = async () => {
        await dispatch(setNextStepGroupThunk(token[0].token, dataChange))
        await dispatch(getGroupOrdersThunk(currentStep, currentStorageId, token[0].token))
    }
    console.log('ButtonBar', currentStep)

    return (
        <View>
            {dataChange.length > 0 ? <View >
                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => sendData()}
                >
                    <Text 
                    style={styles.textBtn} 
                    allowFontScaling={true} 
                    maxFontSizeMultiplier={1}
                    > {currentStep.nextStepName} </Text>
                </TouchableHighlight>
            </View> : null}
        </View>
    )
}

const mapStateToProps = (state) => ({
    currentStep: state.currentStep,
    dataChange: state.dataChange,
    token: state.token,
    currentStorageId: state.currentStorageId
})

export default connect(mapStateToProps)(NextStepButton)

