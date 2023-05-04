import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Order from './Order'
import AllPlants from './AllPlants'
import { useDispatch } from 'react-redux';
import { setStorageId } from '../state/dataSlice';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();


function FildScreen({ route }) {
    const dispatch = useDispatch()
    console.log('fild', route)

    useEffect(() => {
        dispatch(setStorageId(route.params.storageId))
    }, [])



    return (
        <Tab.Navigator
            initialRouteName="Рослини Замовлення"
            screenOptions={{
                tabBarActiveTintColor: '#ffff',
                tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
                tabBarStyle: { backgroundColor: '#CCC', elevation: 5 },
                tabBarIndicatorStyle: { backgroundColor: '#ffff', height: 4, }
            }}
        >
            <Tab.Screen
                name="Рослини Замовлення"
                component={AllPlants}
                options={{ tabBarLabel: 'Всі Рослини' }}
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
            <Tab.Screen
                name="Замовлення"
                component={Order}
                options={{ tabBarLabel: 'Замовлення' }}
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
        </Tab.Navigator>
    )
}

export default FildScreen

