import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { connect, useDispatch } from "react-redux"
import { DataService } from "../state/dataService"
import { clearDataChangeItem, setDataChange } from "../state/dataSlice"


const styles = StyleSheet.create({
    viewContainer: {
        marginBottom: 5
    },
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
        flexDirection: 'row',
        paddingRight: 5,
        paddingBottom: 2,
        paddingTop: 2,
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
    infoComent: {
        flexDirection: 'row',
        width: '100%'
    },
    textClient: {
        fontSize: 11,
        fontWeight: 500,
    },
    textDataChange: {
        fontSize: 11,
        fontWeight: 900,
        color: '#c5c5c5'
    },
    textStrong: {
        fontSize: 13,
        fontWeight: 700,
    },
    checkBox: {
        alignSelf: 'center',
        height: 28,
        width: 28,
    },
})

function RenderOrderByGroup({ order, selectedAll, groupOrders, plant, currentStep, currentStorageId, token }) {
    const dispatch = useDispatch()
    const { orderId, orderNo, customerName, qty, shipmentDate, shipmentMethod, lastChange } = order
    const { characteristic, product, unit } = plant    
    const [orderCheckBox, setOrderCheckBox] = useState(selectedAll)
    const [qtyInput, setQtyInput] = useState(qty)
    const [comentInfo, setComentInfo] = useState('')

    const getInfo = async () => {
        const res = await DataService.getOrderInfo(token, orderId)
        setComentInfo(res.data[0].comment)        
    }

    const setModalState = () => {
        const orders = {
            storageId: currentStorageId,
            currentstepId: currentStep.id,
            orderId: orderId,
            productid: product.id,
            characteristicid: characteristic.id,
            unitid: unit.id,
            actionqty: Number(qtyInput)
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

    const inputOnBlur = () => {
        if (qtyInput === '') {
            setQtyInput(qty)
        } else {
            setModalState()
            setOrderCheckBox(true)
        }
    }

    useEffect(() => {
        getInfo()
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
    }, [selectedAll, orderCheckBox, groupOrders])

    
    return (
        <View style={styles.viewContainer}>
            <View style={styles.infoBlock}>
                <View style={styles.orderInfoBlock}>
                    <View style={styles.orderNames}>
                        <Text style={styles.textStrong}>{shipmentMethod}</Text>
                        <Text style={styles.textClient}>{customerName}</Text>
                        <Text style={styles.textClient}>{orderNo}</Text>
                        <Text style={styles.textClient}>Відгрузка: {shipmentDate}</Text>
                    </View>
                    <Text style={styles.qtyInfo}> {qty} шт</Text>
                </View>
                <View>
                    <View style={[styles.orderInfoBlock, !currentStep.rightToChange && { display: 'none' }]}>
                        <TextInput
                            style={styles.input}
                            onChangeText={checkInput}
                            value={String(qtyInput)}
                            inputMode='numeric'
                            keyboardType="numeric"
                            onBlur={(val) => inputOnBlur()}
                            autoFocus={false}
                            onFocus={() => setQtyInput('')}
                        />
                        <Checkbox
                            value={orderCheckBox}
                            color='#45aa45'
                            onValueChange={() => {
                                setOrderCheckBox(!orderCheckBox)
                            }}
                            style={styles.checkBox}
                        />
                    </View>
                    <Text style={styles.textDataChange}
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                    >змінено: {lastChange} </Text>
                </View>
            </View>
            <View style={styles.infoComent}>
                {comentInfo.length > 0 ?
                    <Text style={styles.textClient}>Коментар: <Text style={{ fontWeight: 800 }}> {comentInfo} </Text></Text> :
                    null
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    currentStep: state.currentStep,
    currentStorageId: state.currentStorageId,
    token: state.token,
    groupOrders: state.groupOrders
})

export default connect(mapStateToProps)(RenderOrderByGroup)