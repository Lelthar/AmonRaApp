import {
    ToastAndroid,
  } from 'react-native';

const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
      return null;
    }
    return null;
};

export default Toast;
