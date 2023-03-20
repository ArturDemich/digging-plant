import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import FildScreen from '../screens/Fild'
import MainScreen from '../screens/Main'
import FildsScreen from '../screens/FildsScreen'
import OrdersScreen from '../screens/Order'
import PlantsScreen from '../screens/Plants'
import { useDispatch } from 'react-redux'
import { getDataFromEndpoint } from '../state/dataThunk'
import LoginScreen from '../screens/Login'



const Stack = createNativeStackNavigator()

export default function Navigate() {

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Вхід">
                <Stack.Screen
                    name='Вхід'
                    component={LoginScreen}
                    option={{ title: 'Вхід' }}
                />
                <Stack.Screen
                    name='Роль'
                    component={MainScreen}
                    option={{ title: 'Виберіть роль' }}
                />
                <Stack.Screen
                    name='Поле'
                    component={FildScreen}
                    options={({ route }) => ({ title: route.params.title })}
                />
                <Stack.Screen
                    name='Всі поля'
                    component={FildsScreen}
                    options={({ route }) => ({ title: route.params.title })}
                />
                {/*  <Stack.Screen
                    name='Загрузка'
                    component={FildsScreen}
                    option={{ title: 'Виберіть поле' }}
                /> */}

                {/* <Stack.Screen
                    name='Замовлення'
                    component={OrdersScreen}
                    option={{ title: 'Замовлення' }}
                /> */}
                <Stack.Screen
                    name='Рослини'
                    component={PlantsScreen}
                    option={{ title: 'Рослини' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
