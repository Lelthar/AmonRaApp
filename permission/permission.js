import { PermissionsAndroid } from 'react-native';

export async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA
        ]).then((result) => {
            console.log('result', result);
        })

    } catch (err) {
        console.warn(err)
    }
}
