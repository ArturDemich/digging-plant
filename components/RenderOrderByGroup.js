import { useEffect, useState, forwardRef, useImperativeHandle, useRef, useCallback, memo } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { connect, useDispatch } from "react-redux"


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

function RenderOrderByGroup({ order, modalInput, currentStep, token, currentStorageId }) {
    const { orderNo, customerName, qty, shipmentDate, shipmentMethod } = order

    return (
        <View style={styles.infoBlock}>
            <View style={styles.orderInfoBlock}>
                <View style={styles.orderNames}>
                    <Text style={styles.textNumOrder}>{orderNo}</Text>
                    <Text style={styles.textClient}>{customerName}</Text>
                    <Text style={styles.textClient}>{shipmentMethod}</Text>
                    <Text style={styles.textClient}>{shipmentDate}</Text>
                </View>
                <Text style={styles.qtyInfo}>- {qty} шт</Text>
            </View>

            <TextInput
                style={styles.input}
                //onChangeText={checkInput}
                //value={String(qtyInput)}
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

        </View>
    )
}

const mapStateToProps = state => ({
    token: state.token,
    currentStep: state.currentStep,
    currentStorageId: state.currentStorageId,
    modalInput: state.modalInput

})

export default connect(mapStateToProps)(RenderOrderByGroup)