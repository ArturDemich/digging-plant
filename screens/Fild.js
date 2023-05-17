import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Order from './Order'
import AllPlants from './AllPlants'
import { connect, useDispatch } from 'react-redux';
import { setStorageId } from '../state/dataSlice';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

function FildScreen({ route, currentColor }) {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setStorageId(route.params.storageId))
    }, [])

    return (
        <Tab.Navigator
            initialRouteName="Рослини Замовлення"
            screenOptions={{
                tabBarActiveTintColor: '#ffff',
                tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
                tabBarStyle: { backgroundColor: currentColor, marginBottom: -10 },
                tabBarIndicatorStyle: { backgroundColor: '#ffff', height: 4, },
                lazy: true,
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

const mapStateToProps = state => ({
    currentColor: state.currentColorStep,
})

export default connect(mapStateToProps)(FildScreen)

