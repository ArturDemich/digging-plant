import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StyleSheet } from 'react-native'
import Order from './Order'
import AllPlants from './AllPlants'
import { connect, useDispatch } from 'react-redux';
import { filterOrders } from '../state/dataThunk';

const Tab = createMaterialTopTabNavigator();


function FildScreen({ route, dataArray, orders }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(filterOrders(dataArray, route.params.title))
    }, [])

    console.log('Fild', orders)

    return (
        <Tab.Navigator
            initialRouteName="Замовлення"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#CCC' },
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
})