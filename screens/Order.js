import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, connect } from 'react-redux'
import { setNameClient } from '../state/dataSlice'
import { filterPlants } from '../state/dataThunk'

function OrdersScreen({ navigation, filterOrders, currentFild }) {
    console.log('order', filterOrders.orderItems)

    const dispatch = useDispatch()

    function renderOrders({ item }) {
        console.log('order', item.orderItems.length)
        return (
            <TouchableHighlight
                onPress={() => {
                    navigation.navigate('Рослини', { title: currentFild, clientName: item.nameClient, })
                    dispatch(filterPlants(filterOrders, currentFild, item.nameClient))

                }}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={styles.costLineWrapper}>
                    <Text style={styles.orderClient}>{item.nameClient}</Text>
                    <Text style={styles.orderShipment}>Тип відправлення: {item.shippingMethod}</Text>
                    <Text style={styles.orderShipment}>Дата відгрузки: {item.dateShipment}</Text>
                    <Text style={styles.orderShipment}>К-сть рослин: {item.orderItems.length}</Text>
                    <Text style={styles.orderShipment}>Статус: {item.status[1]}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (

        <SafeAreaView style={styles.container} >
            <Text title='Замовлення з поля' style={styles.text}> Замовлення з поля {currentFild} </Text>
            <FlatList
                data={filterOrders}
                renderItem={renderOrders}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        filterOrders: state.filterOrders,
        currentFild: state.currentFild
    }
}
export default connect(mapStateToProps, null)(OrdersScreen)



const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,

    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
    },
    orderClient: {
        height: 'auto',
        lineHeight: 20,
        //width: 'auto',
        flex: 2,
        //paddingLeft: 0,
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
        flex: 1,
        //paddingRight: 20,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        //borderBottomWidth: 1,
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        boxShadow: '0 7px 7px #0505061a',
        borderRadius: 5,
        margin: 5
    },
})