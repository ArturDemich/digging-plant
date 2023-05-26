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
import Notification from '../components/Notification'
import { View } from 'react-native'



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
            <Stack.Navigator initialRouteName="Вхід"  >
                <Stack.Screen
                    name='Вхід'
                    component={LoginScreen}
                    options={{ title: 'Вхід', headerLeft: () => null }}
                />
                <Stack.Screen
                    name='Поле'
                    component={FildScreen}
                    options={({ route, navigation }) => ({
                        headerLeft: () => (navigation.getState().routes.length === 2 ? null : <HeaderBackButton style={{marginHorizontal: 0,}} onPress={() => goBack(navigation)} />),
                        headerTitle: () => <HeaderTitle title={route.params.title} userName={route.params.token.username} navigation={navigation} />,
                        headerRight: () => {
                            return (
                                <View style={{ flexDirection: 'row', gap: 5 }} >
                                    <Notification />
                                    <ButtonOut navigation={navigation} />
                                </View>
                            )
                        },
                        headerBackVisible: false,
                    })}                   
                />
                <Stack.Screen
                    name='Всі поля'
                    component={FildsScreen}
                    options={({ route, navigation }) => ({
                        headerRight: () => {
                            return (
                                <View style={{ flexDirection: 'row', gap: 5 }} >
                                    <Notification />
                                    <ButtonOut navigation={navigation} />
                                </View>
                            )
                        },
                        headerTitle: () => <HeaderTitle title={route.params.title} userName={route.params.token.username} navigation={navigation} />,
                        headerBackVisible: false,
                        headerTitleAlign: 'left',
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
