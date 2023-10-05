import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'

import FildScreen from '../screens/Fild'
import FildsScreen from '../screens/FildsScreen'
import { useDispatch, useSelector } from 'react-redux'
import LoginScreen from '../screens/Login'
import { setToken } from '../state/dataSlice'
import ButtonOut from '../components/ButtonOut'
import HeaderTitle from '../components/HeaderTitle'
import Notification from '../components/Notification'
import { Platform, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import useCallData from '../hooks/useCallData'





const Stack = createNativeStackNavigator()

export default function Navigate() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);
    const digStorages = useSelector((state) => state.digStorages);
    const {callData} = useCallData()
    const navigation = useNavigation()
       
    const checkToken = async () => {
        let tokenStor 
        if(Platform.OS === 'web') {
            tokenStor = await localStorage.getItem('token')
        } else {
            tokenStor = await SecureStore.getItemAsync('token')
        }
        let token = JSON.parse(tokenStor)       
        if (token) {
           await dispatch(setToken(token))
           await callData(token[0].token)
        }
    }

    useEffect(() => {        
        token.length == 0 ? checkToken() : callData(token[0].token)       
    }, [token]) 

    useEffect(() => {
        if(digStorages.length == 1) {
            navigation.navigate('Поле', {
                title: digStorages[0].name,
                token: token[0],
                storageId: digStorages[0].id
            })
        }
    }, [digStorages.length])

    return (
        <View style={{display: 'flex', flex: 1}} >
        <View style={{maxWidth: 750, minWidth: 250, width: '100%', alignSelf: 'center', flex: 1 }}>        
            <Stack.Navigator 
            screenOptions={{headerStyle: {height: 55}}}
            >
            {token.length > 0 ? (
                <Stack.Group >
                        <Stack.Screen
                            name='Всі поля'
                            component={FildsScreen}
                            options={({ route, navigation }) => ({
                                headerRight: () => {
                                    return (
                                        <View style={{ flexDirection: 'row', gap: 5 }} >
                                            <Notification />
                                            <ButtonOut navigation={navigation} token={token} />
                                        </View>
                                    )
                                },
                                headerTitle: () => <HeaderTitle title={route.name} />,
                                headerBackVisible: false,
                                headerTitleAlign: 'left',
                            })}
                        />
                    
                        <Stack.Screen
                        name='Поле'
                        component={FildScreen}
                        options={({ route, navigation }) => ({
                            headerLeft: () => (navigation.getState().index == 0 ? null : <HeaderBackButton style={{marginHorizontal: 0,}} onPress={() => navigation.goBack()} />),
                            headerTitle: () => <HeaderTitle title={route.params.title} />,
                            headerRight: () => {
                                return (
                                    <View style={{ flexDirection: 'row', gap: 5 }} >
                                        <Notification />
                                        <ButtonOut navigation={navigation} token={token}/>
                                    </View>
                                )
                            },
                            headerBackVisible: false,
                        })}                   
                        />   
                </Stack.Group>
            ) : (
                <Stack.Group >
                    <Stack.Screen
                        name='Вхід'
                        component={LoginScreen}
                        options={{ title: 'Вхід', headerLeft: () => null }}
                    />            
                </Stack.Group>
            )}
            </Stack.Navigator>
            </View>
            </View>
        
    )
}
