import { useState, useEffect } from 'react';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions'
//import { useDispatch } from 'react-redux';

export const useBluetoothPermissions = () => {
   // const dispatch = useDispatch()

    const [btPermissions, setBTPermissions] = useState(null);

    const requestBluetoothPermissions = async () => {
        try {
        const result = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        setBTPermissions(result);
        //dispatch(setBTPermissions(result))
        } catch (error) {
        console.error('Error requesting Bluetooth permissions:', error);
        }
    };

    useEffect(() => {
        requestBluetoothPermissions();
    }, []); 

    return { btPermissions, requestBluetoothPermissions };
};