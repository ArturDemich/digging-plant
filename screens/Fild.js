import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StyleSheet } from 'react-native'
import Order from './Order'
import AllPlants from './AllPlants'
import { connect, useDispatch } from 'react-redux';
import { filterOrders, getOrdersStep, getStep } from '../state/dataThunk';

const Tab = createMaterialTopTabNavigator();


function FildScreen({ route, dataArray, orders }) {
    const dispatch = useDispatch()
    console.log('fild', route)

    useEffect(() => {
        dispatch(filterOrders(dataArray, route.params.title))
    }, [])



    return (
        <Tab.Navigator
            initialRouteName="Замовлення"
            screenOptions={{
                tabBarActiveTintColor: '#ffff',
                tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
                tabBarStyle: { backgroundColor: '#CCC' },
                tabBarIndicatorStyle: { backgroundColor: '#ffff', height: 4, }
            }}
        >
            <Tab.Screen
                name="Замовлення"
                component={Order}
                options={{ tabBarLabel: 'Замовлення' }}
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
            <Tab.Screen
                name="Рослини Замовлення"
                component={AllPlants}
                options={{ tabBarLabel: 'Всі Рослини' }}
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
        </Tab.Navigator>
    )
}
const mapStateToProps = (state) => ({
    dataArray: state.data,
    orders: state.filterOrders
})

export default connect(mapStateToProps)(FildScreen)

