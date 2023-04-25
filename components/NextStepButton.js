import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getGroupOrdersThunk, setNextStepGroupThunk } from '../state/dataThunk'


const styles = StyleSheet.create({
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonsBar: {
        borderRadius: 3,
        backgroundColor: "#7b7b7b",
        minWidth: "18%",
        height: 60,
        margin: 4,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 3,
        elevation: 2,
        shadowColor: '#52006A',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flex: 3,

    },
    selectedButtons: {
        backgroundColor: '#cacaca',
        borderColor: '#f8f8f8',
        borderWidth: 1
    },
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
    },
    buttonStepView: {

    },
})

function NextStepButton({ currentStorageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()

    console.log('ButtonBar', currentStep)

    return (
        <View>
            {dataChange.length > 0 ? <View style={styles.buttonStepView}>
                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => {
                        dispatch(setNextStepGroupThunk(token[0].token, dataChange))
                        dispatch(getGroupOrdersThunk(currentStep, currentStorageId, token[0].token))
                    }}
                >
                    <Text style={styles.textBtn}> {currentStep.nextStepName} </Text>
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

