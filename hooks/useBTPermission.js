import { PermissionsAndroid } from 'react-native';

export const useBluetoothPermissions = async () => {   
    try {
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