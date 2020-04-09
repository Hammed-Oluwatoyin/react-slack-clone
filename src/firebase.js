import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCsJ-IGnuVhtZ1EgH5etvSaCqASN0zYV6Y",
    authDomain: "react-slack-clone-7412f.firebaseapp.com",
    databaseURL: "https://react-slack-clone-7412f.firebaseio.com",
    projectId: "react-slack-clone-7412f",
    storageBucket: "react-slack-clone-7412f.appspot.com",
    messagingSenderId: "257676756254",
    appId: "1:257676756254:web:9f619fe2dce1856ec2350f",
    measurementId: "G-FJHTG8L9XH"
  };

  firebase.initializeApp(firebaseConfig);
  

  export default firebase; 