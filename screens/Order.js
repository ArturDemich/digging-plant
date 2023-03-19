import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux'
import ButtonsBar from '../components/ButtonsBar'
import { setNameClient } from '../state/dataSlice'
import { filterPlants, getOrdersStep } from '../state/dataThunk'

function OrdersScreen({ navigation, filterOrders, currentFild, orders, route, steps }) {
    console.log('order:', orders)
    const { storageId, token } = route.params
    const dispatch = useDispatch()

    let productQty = 0
    orders.forEach(elem => elem.products.forEach(el => productQty += el.qty))
    console.log('prqty', productQty)
    useEffect(() => {
        if (steps.length >= 1) {
            dispatch(getOrdersStep(steps[0].id, storageId, token))
        }

    }, [steps])

    function renderOrders({ item }) {
        let qty = 0
        item.products.forEach(el => qty += el.qty)
        console.log(qty)
        return (
            <TouchableHighlight
                onPress={() => {
                    navigation.navigate('Рослини', {
                        title: currentFild,
                        clientName: item.customerName,
                        token: token,
                        orderId: item.orderId,
                        storageId: storageId
                    })
                    dispatch(filterPlants(filterOrders, currentFild, item.customerName))

                }}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.orderClient}>{item.customerName}</Text>
                    <View style={styles.viewGroup}>
                        <Text style={styles.orderShipment}>Відгрузка: {item.shipmentDate}</Text>
                        <Text style={styles.orderShipment}>К-сть рослин: {qty} шт </Text>
                    </View>
                    <View style={styles.viewGroup}>
                        <Text style={styles.orderShipment}>Спосіб: *</Text>
                        <Text style={styles.orderShipment}>Статус: *</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    return (

        <SafeAreaView style={styles.container} >
            <Text title='Замовлення з поля' style={styles.text}> Замовлення з поля {currentFild} </Text>
            <View style={styles.infoblock}>
                <Text style={styles.textinfo}> всього замовлень: {orders.length} </Text>
                <Text style={styles.textinfo}> всього рослин: {productQty} </Text>
            </View>
            {orders.length === 0 ?
                <View style={styles.costLineWrapper}>
                    <Text style={styles.noneData}>Немає замовлень з таким сатусом</Text>
                </View> :

                <FlatList
                    data={orders}
                    renderItem={renderOrders}
                    keyExtractor={item => item.orderId.toString()}
                />
            }
            <ButtonsBar storageId={storageId} token={token} />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        filterOrders: state.filterOrders,
        currentFild: state.currentFild,
        orders: state.stepOrders,
        steps: state.steps
    }
}
export default connect(mapStateToProps, null)(OrdersScreen)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 1,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginTop: -20,
    },
    textinfo: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    infoblock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5

    },
    orderClient: {
        height: 'auto',
        lineHeight: 20,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#b0acb0'
    },
    viewGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    orderItems: {
        height: 'auto',
        lineHeight: 50,
        width: 200,
        flex: 2,
    },
    costCategory: {
        height: 'auto',
        lineHeight: 50,
        flex: 4,
    },
    orderShipment: {
        height: 'auto',
        lineHeight: 30,
        //flex: 1,
        //paddingRight: 20,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        //width: 'auto',
        marginBottom: 20,
        //boxShadow: '0 7px 7px #0505061a',
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: 'black'
    },
    noneData: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 900,
        color: 'gray',
    },
})