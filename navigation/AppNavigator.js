import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import FildScreen from '../screens/Fild'
import FildsScreen from '../screens/FildsScreen'
import { useDispatch } from 'react-redux'
import LoginScreen from '../screens/Login'
import { cleanState } from '../state/dataSlice'
import ButtonOut from '../components/ButtonOut'
import HeaderTitle from '../components/HeaderTitle'



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
                    options={{ title: 'Вхід', headerLeft: () => null }}
                />
                <Stack.Screen
                    name='Поле'
                    component={FildScreen}
                    options={({ route, navigation }) => ({
                        headerLeft: () => <HeaderBackButton onPress={() => goBack(navigation)} />,
                        headerTitle: () => <HeaderTitle title={route.params.title} userName={route.params.token.username} navigation={navigation} />,
                        headerRight: () => <ButtonOut navigation={navigation} />,
                        headerBackVisible: false,
                        headerTitleStyle: {
                            fontSize: 13,
                           
                        },
                    })}
                />
                <Stack.Screen
                    name='Всі поля'
                    component={FildsScreen}
                    options={({ route, navigation }) => ({
                        headerTitle: () => <HeaderTitle title={route.params.title} userName={route.params.token.username} navigation={navigation} />,
                        headerLeft: () => <HeaderBackButton onPress={() => goBack(navigation)} />,
                        headerRight: () => <ButtonOut navigation={navigation} />,
                        headerTitleStyle: {
                            fontSize: 13,
                            flex:1
                        },
                        headerBackVisible: false
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
