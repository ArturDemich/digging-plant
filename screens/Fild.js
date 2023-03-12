import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StyleSheet } from 'react-native'
import Order from './Order'
import AllPlants from './AllPlants'
import { connect, useDispatch } from 'react-redux';
import { filterOrders, getOrdersStep } from '../state/dataThunk';

const Tab = createMaterialTopTabNavigator();


function FildScreen({ route, dataArray, orders }) {
    const dispatch = useDispatch()
    console.log('fild', route)

    useEffect(() => {
        dispatch(filterOrders(dataArray, route.params.title))
        dispatch(getOrdersStep("80b807a6-aed1-11ed-836a-00c12700489e", "32d5b85f-552a-11e9-81a1-00c12700489e",))
    }, [])

    console.log('Fild', route)

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
            />
            <Tab.Screen
                name="Рослини Замовлення"
                component={AllPlants}
                options={{ tabBarLabel: 'Всі Рослини' }}
            />
        </Tab.Navigator>
    )
}
const mapStateToProps = (state) => ({
    dataArray: state.data,
    orders: state.filterOrders,
    palnts: state.filterPlants
})

export default connect(mapStateToProps)(FildScreen)

