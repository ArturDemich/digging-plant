import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux'
import ButtonsBar from '../components/ButtonsBar'
import NextStepButton from '../components/NextStepButton'
import RenderOrders from '../components/RenderOrders'
import { getOrdersStep } from '../state/dataThunk'

function OrdersScreen({ orders, route, currentStep }) {
    console.log('order:', route)
    const [loading, setLoading] = useState(true)
    const { storageId, token } = route.params
    const dispatch = useDispatch()

    let productQty = 0
    orders.forEach(elem => elem.products.forEach(el => productQty += el.qty))

    const getOrders = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 400))
        await dispatch(getOrdersStep(currentStep, storageId, token.token))
    }

    useFocusEffect(
        useCallback(() => {
            getOrders().then(() => setLoading(false))
        }, [currentStep])
    )

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.infoblock}>
                <Text style={styles.textinfo}> всього замовлень: {orders.length} </Text>
                <Text style={styles.textinfo}> всього рослин: {productQty} </Text>
            </View>
            {loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#45aa45" />
                </View> :
                orders.length === 0 ?
                    <View style={styles.costLineWrapper}>
                        <Text style={styles.noneData}>Немає замовлень з таким сатусом</Text>
                    </View> :
                    <FlatList
                        data={orders}
                        renderItem={(item) => <RenderOrders orders={item} />}
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
        currentStep: state.currentStep
    }
}
export default connect(mapStateToProps)(OrdersScreen)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 1,
    },
    loader: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        flex: 1
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