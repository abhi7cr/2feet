var TwoFeet =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return browse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return onFileUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return uploadToFirebase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAllVideos; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login__ = __webpack_require__(1);

let i = 0
function browse() {
    document.getElementById('file').click();
}
function onFileUpload(dbVideo) {
    var fragment = document.createDocumentFragment();
    var col = document.createElement('div')
    //Preview Mode
    if (!dbVideo) {
        let f = document.getElementById("file");
        var fileURL = URL.createObjectURL(f.files[0])
        col.id = 'colPreview'
        col.classList.add('item');
        col.style.width = '100%'
        var label = document.createElement('span');
        label.innerText = 'Preview: ' + f.files[0].name;
        col.appendChild(label)
        var video = document.createElement('video');
        video.id = 'videoPreview'
        video.style.width = '50%'
        video.style.alignSelf = 'center'
        video.src = fileURL;
        video.style.display = "block";
        var btn = document.createElement('button')
        btn.addEventListener('click', uploadToFirebase)
        btn.id = 'uploadBtn'
        btn.classList.add('uploadBtn')
        btn.innerText = 'Upload'
        col.appendChild(btn)
        col.appendChild(video)
        fragment.appendChild(col)
        document.getElementById('wrapper').appendChild(fragment)
        document.getElementById('videoPreview').setAttribute('controls', 'controls')
    }
    //Uploaded videos
    else {
        col.id = 'col_' + i
        col.classList.add('item');
        col.style.width = '40%'
        var label = document.createElement('span');
        label.innerText = dbVideo.name;
        col.appendChild(label)
        var video = document.createElement('video');
        video.id = 'video_' + i
        video.style.width = '90%'
        video.src = dbVideo.url;
        video.style.display = "block";
        col.appendChild(video)
        fragment.appendChild(col)
        document.getElementById('wrapper').appendChild(fragment)
        document.getElementById('video_' + i).setAttribute('controls', 'controls')
        i++;
    }
}
function uploadToFirebase(e) {
    var uid = Object(__WEBPACK_IMPORTED_MODULE_0__login__["c" /* getUserInfo */])().uid;
    var f = document.getElementById("file").files[0];
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var videoRef = storageRef.child(uid + '/' + f.name);
    videoRef.put(f).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
        alert('file uploaded successfully!')
        // Initialize Cloud Firestore through Firebase
        var db = firebase.firestore();
        db.collection("videos_" + uid).add({
            url: snapshot.downloadURL,
            name: f.name,
            uid: uid
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    });
}
function removeContainer() {
    let container = document.getElementById("wrapper");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}
function getAllVideos() {
    i = 0
    removeContainer()
    var user = Object(__WEBPACK_IMPORTED_MODULE_0__login__["c" /* getUserInfo */])()
    var db = firebase.firestore();
    var docRef = db.collection("videos_" + user.uid);
    docRef.where('uid', '==', user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            onFileUpload(doc.data())
        })
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var ref = storage.ref(user.uid);
    re
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fbLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getUserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fbLogout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fileOps_js__ = __webpack_require__(0);

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
        Object(__WEBPACK_IMPORTED_MODULE_0__fileOps_js__["b" /* getAllVideos */])()
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fileOps_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "browse", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "onFileUpload", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fbLogin", function() { return __WEBPACK_IMPORTED_MODULE_1__login_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fbLogout", function() { return __WEBPACK_IMPORTED_MODULE_1__login_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uploadToFirebase", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["e"]; });




/***/ })
/******/ ]);