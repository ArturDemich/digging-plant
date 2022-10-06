import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import FildScreen from '../screens/Fild'
import MainScreen from '../screens/Main'
import OrdersScreen from '../screens/Order'
import PlantsScreen from '../screens/Plants'
import { useDispatch } from 'react-redux'
import { getDataFromEndpoint } from '../state/dataThunk'



const Stack = createNativeStackNavigator()

export default function Navigate() {
    const dispatch = useDispatch()
    dispatch(getDataFromEndpoint())

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Викопка">
                <Stack.Screen
                    name='Викопка'
                    component={MainScreen}
                    option={{ title: 'Виберіть поле' }}
                />
                <Stack.Screen
                    name='Поле'
                    component={FildScreen}
                    option={{ title: 'Поле' }}
                />
                <Stack.Screen
                    name='Замовлення'
                    component={OrdersScreen}
                    option={{ title: 'Замовлення' }}
                />
                <Stack.Screen
                    name='Рослини'
                    component={PlantsScreen}
                    option={{ title: 'Рослини' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
