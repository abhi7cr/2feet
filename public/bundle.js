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
/******/ 	__webpack_require__.p = "/";
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
let files = []
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
        //col.style.width = '100%'
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
        //col.style.width = '40%'
        var label = document.createElement('span');
        label.innerText = dbVideo.name;
        label.id = 'videoName_' + i
        label.classList.add('videoTitle')
        col.appendChild(label)
        var video = document.createElement('video');
        video.id = 'video_' + i
        video.style.width = '100%'
        video.src = dbVideo.url;
        video.style.display = "block";
        var btn = document.createElement('button')
        btn.addEventListener('click', deleteVideo)
        btn.id = 'deleteBtn_' + i
        btn.classList.add('deleteBtn')
        btn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'
        col.appendChild(btn)
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
                getAllVideos()
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
    files = []
    removeContainer()
    var user = Object(__WEBPACK_IMPORTED_MODULE_0__login__["c" /* getUserInfo */])()
    var db = firebase.firestore();
    var docRef = db.collection("videos_" + user.uid);
    docRef.where('uid', '==', user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            files.push(doc.ref.path.split('/')[1])
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
function deleteVideo(e) {
  var uid = Object(__WEBPACK_IMPORTED_MODULE_0__login__["c" /* getUserInfo */])().uid
  var id = e.currentTarget.id.split('_')[1]
  // Create a root reference
  var name = document.getElementById('videoName_' + id).innerText
  var storageRef = firebase.storage().ref();
 // Create a reference to the file to delete
  var desertRef = storageRef.child(uid + '/' + name);
// Delete the file
desertRef.delete().then(() => {
  // File deleted successfully
  alert('File removed successfully!')
  var db = firebase.firestore();
  db.collection("videos_" + uid).doc(files[id]).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
  getAllVideos()
}).catch(function(error) {
  // Uh-oh, an error occurred!
  console.log(error)
});
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
        document.getElementById('wrapper').style.display = "flex";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQyZmExYzY0MTI3YjYzZmYzMDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7QUMxSXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGtEO0FBQ1giLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU0MmZhMWM2NDEyN2I2M2ZmMzAyIiwiaW1wb3J0IHsgZ2V0VXNlckluZm8gfSBmcm9tICcuL2xvZ2luJ1xubGV0IGkgPSAwXG5sZXQgZmlsZXMgPSBbXVxuZnVuY3Rpb24gYnJvd3NlKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJykuY2xpY2soKTtcbn1cbmZ1bmN0aW9uIG9uRmlsZVVwbG9hZChkYlZpZGVvKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHZhciBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vUHJldmlldyBNb2RlXG4gICAgaWYgKCFkYlZpZGVvKSB7XG4gICAgICAgIGxldCBmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlXCIpO1xuICAgICAgICB2YXIgZmlsZVVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZi5maWxlc1swXSlcbiAgICAgICAgY29sLmlkID0gJ2NvbFByZXZpZXcnXG4gICAgICAgIGNvbC5jbGFzc0xpc3QuYWRkKCdpdGVtJyk7XG4gICAgICAgIC8vY29sLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gJ1ByZXZpZXc6ICcgKyBmLmZpbGVzWzBdLm5hbWU7XG4gICAgICAgIGNvbC5hcHBlbmRDaGlsZChsYWJlbClcbiAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW8uaWQgPSAndmlkZW9QcmV2aWV3J1xuICAgICAgICB2aWRlby5zdHlsZS53aWR0aCA9ICc1MCUnXG4gICAgICAgIHZpZGVvLnN0eWxlLmFsaWduU2VsZiA9ICdjZW50ZXInXG4gICAgICAgIHZpZGVvLnNyYyA9IGZpbGVVUkw7XG4gICAgICAgIHZpZGVvLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHZhciBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGxvYWRUb0ZpcmViYXNlKVxuICAgICAgICBidG4uaWQgPSAndXBsb2FkQnRuJ1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgndXBsb2FkQnRuJylcbiAgICAgICAgYnRuLmlubmVyVGV4dCA9ICdVcGxvYWQnXG4gICAgICAgIGNvbC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgIGNvbC5hcHBlbmRDaGlsZCh2aWRlbylcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9QcmV2aWV3Jykuc2V0QXR0cmlidXRlKCdjb250cm9scycsICdjb250cm9scycpXG4gICAgfVxuICAgIC8vVXBsb2FkZWQgdmlkZW9zXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbC5pZCA9ICdjb2xfJyArIGlcbiAgICAgICAgY29sLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nKTtcbiAgICAgICAgLy9jb2wuc3R5bGUud2lkdGggPSAnNDAlJ1xuICAgICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxhYmVsLmlubmVyVGV4dCA9IGRiVmlkZW8ubmFtZTtcbiAgICAgICAgbGFiZWwuaWQgPSAndmlkZW9OYW1lXycgKyBpXG4gICAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3ZpZGVvVGl0bGUnKVxuICAgICAgICBjb2wuYXBwZW5kQ2hpbGQobGFiZWwpXG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHZpZGVvLmlkID0gJ3ZpZGVvXycgKyBpXG4gICAgICAgIHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgICAgIHZpZGVvLnNyYyA9IGRiVmlkZW8udXJsO1xuICAgICAgICB2aWRlby5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2YXIgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlVmlkZW8pXG4gICAgICAgIGJ0bi5pZCA9ICdkZWxldGVCdG5fJyArIGlcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZUJ0bicpXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS10cmFzaC1vXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPidcbiAgICAgICAgY29sLmFwcGVuZENoaWxkKGJ0bilcbiAgICAgICAgY29sLmFwcGVuZENoaWxkKHZpZGVvKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb2wpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb18nICsgaSkuc2V0QXR0cmlidXRlKCdjb250cm9scycsICdjb250cm9scycpXG4gICAgICAgIGkrKztcbiAgICB9XG59XG5mdW5jdGlvbiB1cGxvYWRUb0ZpcmViYXNlKGUpIHtcbiAgICB2YXIgdWlkID0gZ2V0VXNlckluZm8oKS51aWQ7XG4gICAgdmFyIGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVcIikuZmlsZXNbMF07XG4gICAgLy8gQ3JlYXRlIGEgcm9vdCByZWZlcmVuY2VcbiAgICB2YXIgc3RvcmFnZVJlZiA9IGZpcmViYXNlLnN0b3JhZ2UoKS5yZWYoKTtcbiAgICB2YXIgdmlkZW9SZWYgPSBzdG9yYWdlUmVmLmNoaWxkKHVpZCArICcvJyArIGYubmFtZSk7XG4gICAgdmlkZW9SZWYucHV0KGYpLnRoZW4oZnVuY3Rpb24gKHNuYXBzaG90KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGxvYWRlZCBhIGJsb2Igb3IgZmlsZSEnKTtcbiAgICAgICAgYWxlcnQoJ2ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5IScpXG4gICAgICAgIC8vIEluaXRpYWxpemUgQ2xvdWQgRmlyZXN0b3JlIHRocm91Z2ggRmlyZWJhc2VcbiAgICAgICAgdmFyIGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XG4gICAgICAgIGRiLmNvbGxlY3Rpb24oXCJ2aWRlb3NfXCIgKyB1aWQpLmFkZCh7XG4gICAgICAgICAgICB1cmw6IHNuYXBzaG90LmRvd25sb2FkVVJMLFxuICAgICAgICAgICAgbmFtZTogZi5uYW1lLFxuICAgICAgICAgICAgdWlkOiB1aWRcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkb2NSZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvY3VtZW50IHdyaXR0ZW4gd2l0aCBJRDogXCIsIGRvY1JlZi5pZCk7XG4gICAgICAgICAgICAgICAgZ2V0QWxsVmlkZW9zKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyBkb2N1bWVudDogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ29udGFpbmVyKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXJcIik7XG4gICAgd2hpbGUgKGNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5sYXN0Q2hpbGQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEFsbFZpZGVvcygpIHtcbiAgICBpID0gMFxuICAgIGZpbGVzID0gW11cbiAgICByZW1vdmVDb250YWluZXIoKVxuICAgIHZhciB1c2VyID0gZ2V0VXNlckluZm8oKVxuICAgIHZhciBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgIHZhciBkb2NSZWYgPSBkYi5jb2xsZWN0aW9uKFwidmlkZW9zX1wiICsgdXNlci51aWQpO1xuICAgIGRvY1JlZi53aGVyZSgndWlkJywgJz09JywgdXNlci51aWQpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHF1ZXJ5U25hcHNob3QpIHtcbiAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgICAgICBmaWxlcy5wdXNoKGRvYy5yZWYucGF0aC5zcGxpdCgnLycpWzFdKVxuICAgICAgICAgICAgb25GaWxlVXBsb2FkKGRvYy5kYXRhKCkpXG4gICAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBkb2N1bWVudDpcIiwgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENyZWF0ZSBhIHJlZmVyZW5jZSB3aXRoIGFuIGluaXRpYWwgZmlsZSBwYXRoIGFuZCBuYW1lXG4gICAgdmFyIHN0b3JhZ2UgPSBmaXJlYmFzZS5zdG9yYWdlKCk7XG4gICAgdmFyIHJlZiA9IHN0b3JhZ2UucmVmKHVzZXIudWlkKTtcbiAgICByZVxufVxuZnVuY3Rpb24gZGVsZXRlVmlkZW8oZSkge1xuICB2YXIgdWlkID0gZ2V0VXNlckluZm8oKS51aWRcbiAgdmFyIGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkLnNwbGl0KCdfJylbMV1cbiAgLy8gQ3JlYXRlIGEgcm9vdCByZWZlcmVuY2VcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9OYW1lXycgKyBpZCkuaW5uZXJUZXh0XG4gIHZhciBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpO1xuIC8vIENyZWF0ZSBhIHJlZmVyZW5jZSB0byB0aGUgZmlsZSB0byBkZWxldGVcbiAgdmFyIGRlc2VydFJlZiA9IHN0b3JhZ2VSZWYuY2hpbGQodWlkICsgJy8nICsgbmFtZSk7XG4vLyBEZWxldGUgdGhlIGZpbGVcbmRlc2VydFJlZi5kZWxldGUoKS50aGVuKCgpID0+IHtcbiAgLy8gRmlsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseVxuICBhbGVydCgnRmlsZSByZW1vdmVkIHN1Y2Nlc3NmdWxseSEnKVxuICB2YXIgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgZGIuY29sbGVjdGlvbihcInZpZGVvc19cIiArIHVpZCkuZG9jKGZpbGVzW2lkXSkuZGVsZXRlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRvY3VtZW50IHN1Y2Nlc3NmdWxseSBkZWxldGVkIVwiKTtcbn0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlbW92aW5nIGRvY3VtZW50OiBcIiwgZXJyb3IpO1xufSk7XG4gIGdldEFsbFZpZGVvcygpXG59KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAvLyBVaC1vaCwgYW4gZXJyb3Igb2NjdXJyZWQhXG4gIGNvbnNvbGUubG9nKGVycm9yKVxufSk7XG59XG5leHBvcnQgeyBpLCBicm93c2UsIG9uRmlsZVVwbG9hZCwgdXBsb2FkVG9GaXJlYmFzZSwgZ2V0QWxsVmlkZW9zIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9maWxlT3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Z2V0QWxsVmlkZW9zfSBmcm9tICcuL2ZpbGVPcHMuanMnXG5sZXQgdXNlciA9IHt9XG5mdW5jdGlvbiBmYkxvZ2luKCkge1xuICAgIHZhciBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkZhY2Vib29rQXV0aFByb3ZpZGVyKCk7XG4gICAgcHJvdmlkZXIuYWRkU2NvcGUoJ3VzZXJfYmlydGhkYXknKTtcbiAgICBmaXJlYmFzZS5hdXRoKCkudXNlRGV2aWNlTGFuZ3VhZ2UoKTtcbiAgICBwcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHtcbiAgICAgICAgJ2Rpc3BsYXknOiAncG9wdXAnXG4gICAgfSk7XG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIC8vIFRoaXMgZ2l2ZXMgeW91IGEgRmFjZWJvb2sgQWNjZXNzIFRva2VuLiBZb3UgY2FuIHVzZSBpdCB0byBhY2Nlc3MgdGhlIEZhY2Vib29rIEFQSS5cbiAgICAgICAgdmFyIHRva2VuID0gcmVzdWx0LmNyZWRlbnRpYWwuYWNjZXNzVG9rZW47XG4gICAgICAgIC8vIFRoZSBzaWduZWQtaW4gdXNlciBpbmZvLlxuICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW5CdG4nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvdXRCdG4nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlck5hbWUnKS5pbm5lclRleHQgPSAnV2VsY29tZSwgJyArIHVzZXIuZGlzcGxheU5hbWU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlUGljJykuc3JjID0gdXNlci5waG90b1VSTDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVQaWMnKS5zdHlsZS53aWR0aCA9ICcxNSUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZVBpYycpLnN0eWxlLmhlaWdodCA9ICcxNSUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlck5hbWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlUGljJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jyb3dzZScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHZhciBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIikuZG9jKHVzZXIudWlkKS5zZXQoe1xuICAgICAgICAgICAgbmFtZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGlkOiB1c2VyLnVpZCxcbiAgICAgICAgICAgIHBob3RvVVJMOiB1c2VyLnBob3RvVVJMLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWRkZWQgdXNlciB0byBzdG9yZScpXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgfSlcbiAgICAgICAgZ2V0QWxsVmlkZW9zKClcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxuICAgICAgICB2YXIgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cbiAgICAgICAgdmFyIGVtYWlsID0gZXJyb3IuZW1haWw7XG4gICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cbiAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xuICAgICAgICAvLyAuLi5cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZiTG9nb3V0KCkge1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbkJ0bicpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvdXRCdG4nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlck5hbWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVQaWMnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicm93c2UnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbn1cbmZ1bmN0aW9uIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB1c2VyXG59XG5leHBvcnQgeyBmYkxvZ2luLCBnZXRVc2VySW5mbywgZmJMb2dvdXQgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xvZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7aSwgYnJvd3NlLCBvbkZpbGVVcGxvYWQsIHVwbG9hZFRvRmlyZWJhc2V9IGZyb20gJy4vZmlsZU9wcy5qcydcbmltcG9ydCB7ZmJMb2dpbiwgZ2V0VXNlckluZm8sIGZiTG9nb3V0fSBmcm9tICcuL2xvZ2luLmpzJ1xuZXhwb3J0IHtpLCBicm93c2UsIG9uRmlsZVVwbG9hZCwgZmJMb2dpbiwgZmJMb2dvdXQsIHVwbG9hZFRvRmlyZWJhc2V9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9