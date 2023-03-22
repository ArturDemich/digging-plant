import React, { useEffect, useState } from 'react'
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
        height: 40,
        margin: 4,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 3,
        elevation: 2,
        flex: 3,

    },
    selectedButtons: {
        backgroundColor: '#afb2ae',

        borderColor: '#f8f8f8',
        borderWidth: 1

    },
    textBtnBar: {
        color: 'white',
        fontSize: 13,
        fontWeight: 700,
    },
})

function ButtonsBar({ steps, storageId, token }) {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()

    useEffect(() => {
        steps.length > 0 ? setSelected(steps[0].id) : null
    }, [steps])

    const changeOrderSteps = (id) => {
        dispatch(getOrdersStep(id, storageId, token))
        setSelected(id)
    }
    console.log('ButtonBar', steps, storageId, token)

    return (

        <View style={styles.statusBar}>
            {steps.map((step) => (
                <TouchableHighlight
                    key={step.id}
                    style={[styles.buttonsBar, selected === step.id && styles.selectedButtons]}
                    onPress={() => changeOrderSteps(step.id)}
                >
                    <Text style={styles.textBtnBar}> {step.name} </Text>
                </TouchableHighlight>
            ))}

            <TouchableHighlight style={styles.buttonsBar} onPress={() => setModalVisible(true)} >
                <Text style={styles.textBtnBar} >Всі </Text>
            </TouchableHighlight>
        </View>
    )
}

const mapStateToProps = (state) => ({
    steps: state.steps
})

export default connect(mapStateToProps)(ButtonsBar)

