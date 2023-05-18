import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, connect } from 'react-redux'
import ButtonsBar from '../components/ButtonsBar'
import NextStepButton from '../components/NextStepButton'
import RenderOrders from '../components/RenderOrders'
import { getOrdersStep } from '../state/dataThunk'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function OrdersScreen({ orders, route, currentStep, totalPlantQty, totalOrderQty }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { storageId, token } = route.params

    const getOrders = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 200))
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
                <MaterialCommunityIcons name="pine-tree" size={24} color="black">
                    <MaterialCommunityIcons name="pine-tree" size={18} color="black" />
                    <Text style={styles.textinfo}> всіх рослин: {totalPlantQty} </Text>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black">
                    <Text style={styles.textinfo}> замовлень: {totalOrderQty} </Text>
                </MaterialCommunityIcons>
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
                        renderItem={(item) => <RenderOrders orders={item} rightToChange={currentStep.rightToChange} />}
                        keyExtractor={item => item.orderId.toString()}
                        style={{ marginTop: -10, marginBottom: 10 }}
                        initialNumToRender='4'
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
        currentStep: state.currentStep,
        totalPlantQty: state.totalPlantQty,
        totalOrderQty: state.totalOrderQty,
    }
}
export default connect(mapStateToProps)(OrdersScreen)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 3,
        marginTop: Platform.OS === 'ios' ? -45 : -10,
    },
    loader: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        flex: 1
    },
    textinfo: {
        color: 'black',
        fontSize: 13,
        fontWeight: 700,
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
    noneData: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 900,
        color: 'gray',
    },
})