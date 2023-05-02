import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux'
import ButtonsBar from '../components/ButtonsBar'
import NextStepButton from '../components/NextStepButton'
import RenderOrders from '../components/RenderOrders'
import { getOrdersStep } from '../state/dataThunk'

function OrdersScreen({ orders, route, steps }) {
    console.log('order:', route)
    const { storageId, token } = route.params
    const dispatch = useDispatch()

    let productQty = 0
    orders.forEach(elem => elem.products.forEach(el => productQty += el.qty))
    console.log('prqty', productQty)
    useEffect(() => {
        if (steps.length >= 1) {
            dispatch(getOrdersStep(steps[0], storageId, token.token))
        }
    }, [steps])

    return (
        <SafeAreaView style={styles.container} >
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
                    renderItem={(orders) => <RenderOrders orders={orders} />}
                    keyExtractor={item => item.orderId.toString()}
                />
            }
            <NextStepButton path={route.name} />
            <ButtonsBar storageId={storageId} token={token} />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
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
    noneData: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 900,
        color: 'gray',
    },
})