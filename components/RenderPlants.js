import React, { useEffect, useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableHighlight, View, FlatList, Pressable, Modal, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, connect } from 'react-redux'
import ButtonsBar from './ButtonsBar'
import shortid from 'shortid'
import { getOrdersStep, setNextStepThunk } from '../state/dataThunk'




function RenderPlants({ product, token, orderId, storageId, currentStep }) {

    let item = product.item
    const dispatch = useDispatch()
    const [qty, setQty] = useState(item.qty)
    useEffect(() => {

    }, [])
    console.log('renderItem: ', item)
    const checkCorrectStep = (productId, characteristicId, unitId) => {
        if (currentStep.rightToChange) {
            dispatch(setNextStepThunk(
                token[0].token,
                storageId,
                currentStep.id,
                orderId,
                productId,
                characteristicId,
                unitId,
                Number(qty)
            ))
            dispatch(getOrdersStep(currentStep, storageId, token[0].token))
        } else {
            alert("Ви не можете змінити цей етап! Змініть користувача")
        }
    }

    return (
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={styles.costLineWrapper}>
                <Text style={styles.plantName}>{item.product.name}</Text>
                <Text style={styles.characteristics}>{item.characteristic.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.quantity}>к-сть: <Text style={styles.textStr}> {item.qty}  шт</Text></Text>
                    {/* <Text style={styles.status}>{item.step.name}</Text> */}
                </View>
                <View style={[styles.changeinfo, !currentStep.rightToChange && { display: 'none' }]}>
                    <View style={styles.changeinfoblock}>
                        <Text style={styles.quantity}>
                            Викопано:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setQty}
                            value={String(qty)}
                            inputMode='numeric'
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableHighlight
                        style={[styles.button]}
                        onPress={() => checkCorrectStep(item.product.id, item.characteristic.id, item.unit.id)} >
                        <Text style={styles.statusDig}>{currentStep.nextStepName}{item.statusDig}</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </TouchableHighlight>
    )
}

const mapStateToProps = state => ({
    token: state.token,
    currentStep: state.currentStep

})

export default connect(mapStateToProps)(RenderPlants)




const styles = StyleSheet.create({
    textStr: {
        fontWeight: 600,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: '#52006A'
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 3,
        paddingRight: 3,
    },
    plantName: {
        height: 'auto',
        width: 'auto',
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 3,
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    info: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',
        paddingBottom: 5

    },
    status: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    changeinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    changeinfoblock: {
        flexDirection: 'row'
    },
    statusDig: {
        height: 'auto',
        textAlignVertical: 'center',
        fontSize: 13,
        color: 'white',
        fontWeight: 700,
        margin: 5
    },
    input: {
        height: 30,
        width: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        alignSelf: 'flex-start',

    },
    button: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#45aa45",
        minWidth: 100,
        textAlignVertical: 'center',
        alignSelf: 'center',
        margin: 2,
        height: 30,
        elevation: 3
    },
    buttonPress: {
        marginRight: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "red",
        minWidth: "10%",
        textAlignVertical: 'center',
        margin: 2
    },
})