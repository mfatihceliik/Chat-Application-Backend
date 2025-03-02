/*const firebase = require("firebase-admin")
const firebaseConfig = {
    apiKey: "AIzaSyCmYJ1Z8SomyhXi16rRsWtCqmyZcdvKjT4",
    authDomain: "chatapplication-c107c.firebaseapp.com",
    projectId: "chatapplication-c107c",
    storageBucket: "chatapplication-c107c.appspot.com",
    messagingSenderId: "45203847908",
    appId: "1:45203847908:web:507ef51cc43f1d60f18af1",
    measurementId: "G-RG602BV3JY"
  };

firebase.initializeApp(firebaseConfig)

*/


var admin = require("firebase-admin");
var serviceAccount = require("../firebase/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



module.exports = { admin }