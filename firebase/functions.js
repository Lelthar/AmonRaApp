import firebase from 'react-native-firebase';
import {AsyncStorage, Alert} from 'react-native';

export function saveDataFirebase (data){
  AsyncStorage.setItem('hasUserRegistered', "if this string exists, then yeah");
  AsyncStorage.setItem('userEmail', data['email']);

  //alert(JSON.stringify(data, null, '  '));
  firebase.database().ref('users/' + data['id']).set({
    method: data['method'],
    name:  data['name'],
    lastname: data['lastName'],
    birthday:  data['birthday'],
    yearOfBirth: data['date'],
    email :  data['email'],
    country: data['country'],
    gender: data['gender'],
    age: data['age']
  });

}

export function addComment (data){
    firebase.database().ref('usersComments').push({
        rate: data['rate'],
        comment: data['comment'],
        email: data['email']
    });
}
