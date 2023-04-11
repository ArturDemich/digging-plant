import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getOrdersStep } from '../state/dataThunk'


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
    textBtnBar: {
        color: 'white',
        fontSize: 13,
        fontWeight: 700,
    },
    buttonStep: {
        marginRight: 5,
        borderRadius: 2,
        textAlign: "center",
        backgroundColor: "#45aa45",
        width: 150,
        height: 40,
        textAlignVertical: 'center',
        alignSelf: 'center',
        margin: 2,
        elevation: 3,
    },
    buttonStepView: {
        background: 'rgba(76, 175, 80, 0.1)'
    },
})

function ButtonsBar({ steps, storageId, token, currentStep, dataChange }) {
    const dispatch = useDispatch()

    console.log('ButtonBar', steps, storageId, token)

    return (
        <View>
            {dataChange.length > 0 ? <View style={styles.buttonStepView}>
                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => console.log('okey')}
                >
                    <Text style={styles.textBtnBar}> {currentStep.name} </Text>
                </TouchableHighlight>
            </View> : null}
            <View style={styles.statusBar}>
                {steps.map((step) => (
                    <TouchableHighlight
                        key={step.id}
                        style={[styles.buttonsBar, currentStep.id === step.id && styles.selectedButtons]}
                        onPress={() => dispatch(getOrdersStep(step, storageId, token.token))}
                    >
                        <Text style={styles.textBtnBar}> {step.name} </Text>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    steps: state.steps,
    currentStep: state.currentStep,
    dataChange: state.dataChange
})

export default connect(mapStateToProps)(ButtonsBar)

