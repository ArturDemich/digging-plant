import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"


const styles = StyleSheet.create({
    input: {
        height: 30,
        width: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#b0acb0',
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
})

function RenderModalOrders({ orders, setCurrentQty }) {
    const item = orders.item
    const qtyInfo = item.qty

    const [qtyInput, setQtyInput] = useState(item.qty)

    const checkInput = (value) => {
        if (Number(value) || value === '') {
            if (Number(value) > Number(qtyInfo)) {
                alert('Кількість рослин не може бути більша ніж в замовленні')
            } else {
                setQtyInput(value)

            }
        } else {
            alert('Введіть кількіть викопаних рослин - цифрами')
        }
    }

    console.log(item)
    setCurrentQty(qtyInput)
    return (
        <View style={styles.infoBlock}>
            <View style={styles.orderInfoBlock}>
                <View style={styles.orderNames}>
                    <Text style={styles.textNumOrder}>{item.orderNo}</Text>
                    <Text style={styles.textClient}>{item.customerName}</Text>
                </View>
                <Text style={styles.qtyInfo}>- {qtyInfo} шт</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={checkInput}
                    value={String(qtyInput)}
                    inputMode='numeric'
                    keyboardType="numeric"
                    selection={{ start: 9, end: 9 }}
                />
            </View>
        </View>
    )
}

export default RenderModalOrders