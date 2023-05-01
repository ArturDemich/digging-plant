import Checkbox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableHighlight, View } from 'react-native'
import { useDispatch, connect } from 'react-redux'
import { clearDataChangeItem, setDataChange } from '../state/dataSlice'
import { getOrdersStep, setNextStepThunk } from '../state/dataThunk'




function RenderPlants({ currentStorageId, orderId, selectedAll, prodactElem, token, currentStep, orders }) {
    const { characteristic, lastChange, product, qty, unit } = prodactElem
    const dispatch = useDispatch()
    const [plantCheckBox, setPlantCheckBox] = useState(selectedAll)
    const [qtyState, setQty] = useState(qty)

    const checkInput = (value) => {
        if (Number(value) || value === '') {
            if (Number(value) > Number(qty)) {
                alert('Кількість рослин не може бути більша ніж в замовленні')
            } else {
                setQty(value)
            }
        } else {
            alert('Введіть кількіть викопаних рослин - цифрами')
        }
    }

    console.log('renderItem: ', prodactElem)
    /* const checkCorrectStep = (productId, characteristicId, unitId) => {
        if (currentStep.rightToChange) {
            dispatch(setNextStepThunk(
                token[0].token,
                storageId,
                currentStep.id,
                orderId,
                productId,
                characteristicId,
                unitId,
                Number(qtyState)
            ))
            dispatch(getOrdersStep(currentStep, storageId, token[0].token))
        } else {
            alert("Ви не можете змінити цей етап! Змініть користувача")
        }
    } */

    const setModalState = () => {
        const orders = {
            storageId: currentStorageId,
            currentstepId: currentStep.id,
            orderId: orderId,
            productid: product.id,
            characteristicid: characteristic.id,
            unitid: unit.id,
            actionqty: Number(qtyState)
        }
        dispatch(setDataChange(orders))
    }

    const inputOnBlur = () => {
        if (qtyState === '') {
            setQty(qty)
        } else {
            setModalState()
            setPlantCheckBox(true)
        }
    }

    useEffect(() => {
        if (selectedAll === true && plantCheckBox === true) {
            setModalState()
        } else if (plantCheckBox === false) {

            dispatch(clearDataChangeItem({
                orderId: orderId,
                productid: product.id,
                characteristicid: characteristic.id,
            }))
        } else if (plantCheckBox === true) {
            setModalState()
        }

    }, [selectedAll, plantCheckBox, orders])

    return (
        <View style={styles.infoBlock}>
            <View style={styles.costLineWrapper}>
                <Text style={styles.plantName}>{product.name}</Text>
                <Text style={styles.characteristics}>{characteristic.name}</Text>

                <View style={styles.info}>
                    <Text style={styles.quantity}>к-сть: <Text style={styles.textStr}> {qty}  шт</Text></Text>

                    <View style={[styles.changeinfo, !currentStep.rightToChange && { display: 'none' }]}>
                        <View style={styles.changeinfoblock}>
                            <Text style={styles.quantity}>
                                Викопано:
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={checkInput}
                                value={String(qtyState)}
                                inputMode='numeric'
                                keyboardType="numeric"
                                onBlur={(val) => inputOnBlur()}
                                autoFocus={false}
                                onFocus={() => setQty('')}
                            />
                        </View>
                        <Checkbox
                            value={plantCheckBox}
                            onValueChange={() => {
                                setPlantCheckBox(!plantCheckBox)
                            }}
                            style={styles.checkBox}
                        />
                        {/* <TouchableHighlight
                        style={[styles.button]}
                        onPress={() => checkCorrectStep(product.id, characteristic.id, unit.id)} >
                        <Text style={styles.statusDig}>{currentStep.nextStepName}{'item.statusDig'}</Text>
                    </TouchableHighlight> */}
                    </View>
                </View>
            </View>


        </View>
    )
}

const mapStateToProps = state => ({
    token: state.token,
    currentStep: state.currentStep,
    orders: state.stepOrders,
    currentStorageId: state.currentStorageId,
})
export default connect(mapStateToProps)(RenderPlants)


const styles = StyleSheet.create({
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: '#b0acb0',
        marginTop: 10,
        // #ededed
    },


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
        //paddingBottom: 3,
        paddingTop: 5,
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
        // paddingBottom: 5,
    },
    info: {
        flexDirection: 'row',
        //paddingBottom: 5,
        justifyContent: 'space-between'
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
        height: 28,
        width: 40,
        margin: 7,
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
    checkBox: {
        alignSelf: 'center',
        height: 28,
        width: 28,
    },
})