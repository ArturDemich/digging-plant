import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import FildScreen from '../screens/Fild'
import FildsScreen from '../screens/FildsScreen'
import PlantsScreen from '../screens/Plants'
import { useDispatch } from 'react-redux'
import LoginScreen from '../screens/Login'
import { cleanState } from '../state/dataSlice'
import ButtonOut from '../components/ButtonOut'



const Stack = createNativeStackNavigator()

export default function Navigate() {
    const dispatch = useDispatch()
    const goBack = (navigation) => {
        const { routes } = navigation.getState()
        if (routes.length === 2) {
            dispatch(cleanState())
            navigation.goBack()
        } else if (routes.length > 2) {
            navigation.goBack()
        }
    }
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Вхід" >
                <Stack.Screen
                    name='Вхід'
                    component={LoginScreen}
                    options={{ title: 'Вхід' }}
                />
                <Stack.Screen
                    name='Поле'
                    component={FildScreen}
                    options={({ route, navigation }) => ({
                        title: (route.params.title + ': ' + route.params.token.username),
                        headerLeft: () => (
                            <HeaderBackButton
                                onPress={() => goBack(navigation)}
                            />
                        ),
                        headerRight: () => (
                            <ButtonOut navigation={navigation} />
                        ),
                        headerTitleStyle: {
                            fontSize: 13,
                        },
                    })}
                />
                <Stack.Screen
                    name='Всі поля'
                    component={FildsScreen}
                    options={({ route, navigation }) => ({
                        title: route.params.token.username + ': ' + route.params.title,
                        headerLeft: () => (
                            <HeaderBackButton
                                onPress={() => goBack(navigation)}
                            />
                        ),
                        headerRight: () => (
                            <ButtonOut navigation={navigation} />
                        ),
                        headerTitleStyle: {
                            fontSize: 13,
                        },
                    })}
                />
                <Stack.Screen
                    name='Рослини'
                    component={PlantsScreen}
                    options={({ route, navigation }) => ({
                        title: route.params.token.username + ': ' + route.params.title,
                        headerRight: () => (
                            <ButtonOut navigation={navigation} />
                        ),
                        headerTitleStyle: {
                            fontSize: 13,
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
