import { PermissionsAndroid } from 'react-native';
//import { PERMISSIONS, requestMultiple } from 'react-native-permissions'

export const useBluetoothPermissions = async () => {   
    try {
        console.log('useBluetoothPermissions')
       /*  const result = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]); */
        const bluetoothPermissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];

        const result = await PermissionsAndroid.requestMultiple(bluetoothPermissions);
        return result
    } catch (error) {
        console.error('Error requesting Bluetooth permissions:', error);
    }   
};