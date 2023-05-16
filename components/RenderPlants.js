import Checkbox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import { useDispatch, connect } from 'react-redux'
import { clearDataChangeItem, setDataChange } from '../state/dataSlice'




function RenderPlants({ currentStorageId, orderId, selectedAllOrder, prodactElem, currentStep, orders }) {
    const dispatch = useDispatch()
    const { characteristic, lastChange, product, qty, unit } = prodactElem    
    const [plantCheckBox, setPlantCheckBox] = useState(selectedAllOrder)
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
        if (selectedAllOrder === true && plantCheckBox === true) {
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
    }, [selectedAllOrder, plantCheckBox, orders])

    return (
        <View style={styles.infoBlock}>
            <View style={styles.costLineWrapper}>
                <Text style={styles.plantName}
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                >{product.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.characteristics}>{characteristic.name}</Text>
                    <Text style={styles.changeDate}>змінено: {lastChange}</Text>
                </View>
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
                            color='#45aa45'
                            onValueChange={() => {
                                setPlantCheckBox(!plantCheckBox)
                            }}
                            style={styles.checkBox}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
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
    },
    textStr: {
        fontWeight: 600,
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
        fontSize: 13,
        fontWeight: '600',
        paddingTop: 5,
        textShadowRadius: 3
    },
    characteristics: {
        height: 'auto',
        fontSize: 13,
        textAlignVertical: 'center',
        paddingLeft: 10,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',
        paddingBottom: 5
    },
    changeinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    changeinfoblock: {
        flexDirection: 'row'
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
    checkBox: {
        alignSelf: 'center',
        height: 28,
        width: 28,
    },
    changeDate: {
        alignSelf: 'flex-end',
        fontSize: 11,
        fontWeight: 900,
        color: '#c5c5c5'
    },
})