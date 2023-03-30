import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Order from './Order'
import AllPlants from './AllPlants'

const Tab = createMaterialTopTabNavigator();


function FildScreen({ route }) {
    console.log('fild', route)

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
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
            <Tab.Screen
                name="Рослини Замовлення"
                component={AllPlants}
                options={{ tabBarLabel: 'Всі Рослини' }}
                initialParams={{ token: route.params.token, storageId: route.params.storageId }}
            />
        </Tab.Navigator>
    )
}

export default FildScreen

