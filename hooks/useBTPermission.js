import { PERMISSIONS, requestMultiple } from 'react-native-permissions'

export const useBluetoothPermissions = async () => {   
    try {
        const result = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);
        return result
    } catch (error) {
        console.error('Error requesting Bluetooth permissions:', error);
    }   
};