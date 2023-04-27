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
    textBtnBar: {
        color: 'white',
        fontSize: 13.5,
        fontWeight: 700,
    },
})

function ButtonsBar({ steps, storageId, token, currentStep }) {
    const dispatch = useDispatch()

    console.log('ButtonBar', steps, storageId, token)

    return (
        <View style={styles.statusBar}>
            {steps.map((step) => (
                <TouchableHighlight
                    key={step.id}
                    style={[styles.buttonsBar, currentStep.id === step.id && styles.selectedButtons]}
                    onPress={() => dispatch(getOrdersStep(step, storageId, token.token))}
                >
                    <Text
                        style={styles.textBtnBar}
                        allowFontScaling={true}
                        maxFontSizeMultiplier={1}
                    > {step.name} </Text>
                </TouchableHighlight>
            ))}
        </View>
    )
}

const mapStateToProps = (state) => ({
    steps: state.steps,
    currentStep: state.currentStep
})

export default connect(mapStateToProps)(ButtonsBar)

