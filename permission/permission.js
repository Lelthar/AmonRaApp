import { PermissionsAndroid } from 'react-native';

export async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA
        ]);
        return true;
    } catch (err) {
        console.warn(err)
    }
    return false;
}
