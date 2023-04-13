import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect, useDispatch } from 'react-redux'


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
        // marginRight: 5,
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#45aa45",
        width: 150,
        height: 40,
        textAlignVertical: 'center',
        alignSelf: 'center',
        // margin: 2,
        elevation: 3,
        justifyContent: 'center',
        marginBottom: 5,
    },
    buttonStepView: {

    },
})

function NextStepButton({ steps, storageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()

    console.log('ButtonBar', steps, storageId, token)

    return (
        <View>
            {dataChange.length > 0 ? <View style={styles.buttonStepView}>
                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => console.log('okey', currentStep)}
                >
                    <Text style={styles.textBtn}> {currentStep.nextStepName} </Text>
                </TouchableHighlight>
            </View> : null}
        </View>
    )
}

const mapStateToProps = (state) => ({
    steps: state.steps,
    currentStep: state.currentStep,
    dataChange: state.dataChange
})

export default connect(mapStateToProps)(NextStepButton)

