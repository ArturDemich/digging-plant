import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, connect } from 'react-redux'
import { setNameClient } from '../state/dataSlice'
import { filterPlants } from '../state/dataThunk'

function OrdersScreen({ navigation, filterOrders, currentFild }) {
    console.log('order', currentFild)

    const dispatch = useDispatch()

    function renderOrders({ item }) {
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
                    <Text style={styles.orderShipment}>відправка: {item.dateShipment}</Text>
                    <Text style={styles.orderShipment}>Статус: {item.status}</Text>
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

    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,

    },
    costLineWrapper: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
    },
    orderClient: {
        height: 50,
        lineHeight: 50,
        width: 300,
        flex: 2,
        paddingLeft: 20,
    },
    orderItems: {
        height: 50,
        lineHeight: 50,
        width: 200,
        flex: 2,
    },
    costCategory: {
        height: 50,
        lineHeight: 50,
        flex: 4,
    },
    orderShipment: {
        height: 50,
        lineHeight: 50,
        flex: 3,
        paddingRight: 20,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
})