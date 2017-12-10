import {getAllVideos} from './fileOps.js'
let user = {}
function fbLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        document.getElementById('wrapper').style.display = "block";
        document.getElementById('loginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "block";
        document.getElementById('userName').innerText = 'Welcome, ' + user.displayName;
        document.getElementById('profilePic').src = user.photoURL;
        document.getElementById('profilePic').style.width = '15%';
        document.getElementById('profilePic').style.height = '15%';
        document.getElementById('userName').style.display = "block"
        document.getElementById('profilePic').style.display = "block";
        document.getElementById('browse').style.display = "block";
        var db = firebase.firestore();
        db.collection("users").doc(user.uid).set({
            name: user.displayName,
            id: user.uid,
            photoURL: user.photoURL,
            email: user.email
        }).then(function (res) {
            console.log('added user to store')
        }).catch(function (err) {
            console.log(err)
        })
        getAllVideos()
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
function fbLogout() {
    firebase.auth().signOut().then(function (res) {
        document.getElementById('loginBtn').style.display = "block";
        document.getElementById('logoutBtn').style.display = "none";
        document.getElementById('wrapper').style.display = "none";
        document.getElementById('userName').style.display = "none"
        document.getElementById('profilePic').style.display = "none";
        document.getElementById('browse').style.display = "none";
    }).catch(function (err) {
        console.log(err)
    })
}
function getUserInfo() {
    return user
}
export { fbLogin, getUserInfo, fbLogout }