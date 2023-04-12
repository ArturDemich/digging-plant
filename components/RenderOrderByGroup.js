import Checkbox from "expo-checkbox"
import { useEffect, useState, forwardRef, useImperativeHandle, useRef, useCallback, memo } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { connect, useDispatch } from "react-redux"
import { clearDataChangeItem, setDataChange } from "../state/dataSlice"


const styles = StyleSheet.create({
    input: {
        height: 30,
        width: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        alignSelf: 'center',
    },
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: '#b0acb0',
    },
    orderInfoBlock: {
        flexDirection: 'row'
    },
    orderNames: {
        alignSelf: 'center',
        width: 200,
        padding: 3,

    },
    qtyInfo: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 700,
    },
    textClient: {
        fontSize: 11,
        fontWeight: 500,
    },
    textNumOrder: {
        fontSize: 12,
        fontWeight: 700,
    },
    checkBox: {
        alignSelf: 'center',
        height: 25,
        width: 25,
    },
})

function RenderOrderByGroup({ order, selectedAll, plant, dataChange, currentStep, token, currentStorageId }) {
    const { orderId, orderNo, customerName, qty, shipmentDate, shipmentMethod } = order
    const { characteristic, product, unit } = plant
    const dispatch = useDispatch()
    const [orderCheckBox, setOrderCheckBox] = useState(selectedAll)
    const [qtyInput, setQtyInput] = useState(qty)


    const setModalState = () => {
        const orders = {
            storageId: currentStorageId,
            currentstepId: currentStep.id,
            orderId: orderId,
            productid: product.id,
            characteristicid: characteristic.id,
            unitid: unit.id,
            qty: Number(qty)
        }
        dispatch(setDataChange(orders))
    }

    const checkInput = (value) => {
        if (Number(value) || value === '') {
            if (Number(value) > Number(qty)) {
                alert('Кількість рослин не може бути більша ніж в замовленні')
            } else {
                setQtyInput(value)
            }
        } else {
            alert('Введіть кількіть викопаних рослин - цифрами')
        }
    }

    useEffect(() => {
        if (selectedAll === true && orderCheckBox === true) {
            setModalState()
        } else if (orderCheckBox === false) {

            dispatch(clearDataChangeItem({
                orderId: orderId,
                productid: product.id,
                characteristicid: characteristic.id,
            }))
        } else if (orderCheckBox === true) {
            setModalState()
        }

    }, [selectedAll, orderCheckBox])

    console.log('rObG', dataChange)
    return (
        <View style={styles.infoBlock}>
            <View style={styles.orderInfoBlock}>
                <View style={styles.orderNames}>
                    <Text style={styles.textNumOrder}>{orderNo}</Text>
                    <Text style={styles.textClient}>{customerName}</Text>
                    <Text style={styles.textClient}>{shipmentMethod}</Text>
                    <Text style={styles.textClient}>Відгрузка: {shipmentDate}</Text>
                </View>
                <Text style={styles.qtyInfo}>- {qty} шт</Text>
            </View>
            <View style={styles.orderInfoBlock}>
                <TextInput
                    style={styles.input}
                    onChangeText={checkInput}
                    value={String(qtyInput)}
                    // defaultValue={String(qtyInput)}
                    inputMode='numeric'
                    keyboardType="numeric"
                    selection={{ start: 9, end: 9 }}
                    /* onBlur={(val) => {
                        setQtyInput(val.target.value)
                        setModalState()
                    }} */
                    autoFocus={false}
                />
                <Checkbox
                    value={orderCheckBox}
                    onValueChange={() => {
                        setOrderCheckBox(!orderCheckBox)
                    }}
                    style={styles.checkBox}
                />
            </View>

        </View>
    )
}

const mapStateToProps = state => ({
    token: state.token,
    currentStep: state.currentStep,
    currentStorageId: state.currentStorageId,
    dataChange: state.dataChange

})

export default connect(mapStateToProps)(RenderOrderByGroup)