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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fileOps_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "browse", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "onFileUpload", function() { return __WEBPACK_IMPORTED_MODULE_0__fileOps_js__["c"]; });

console.log(__WEBPACK_IMPORTED_MODULE_0__fileOps_js__["b" /* i */])


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return browse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return onFileUpload; });
let i = 0
function browse() {
    document.getElementById('file').click();
}
function onFileUpload() {
    let f = document.getElementById("file");
    var fragment = document.createDocumentFragment();
    var col = document.createElement('div')
    col.id = 'col_' + i
    i++;
    col.classList.add('item');
    col.style.width = '40%'
    var label = document.createElement('span');
    label.innerText = f.files[0].name;
    col.appendChild(label)
    var video = document.createElement('video');
    video.id = 'video_' + i
    video.style.width = '90%'
    var fileURL = URL.createObjectURL(f.files[0]);
    video.src = fileURL;
    video.style.display = "block";
    col.appendChild(video)
    fragment.appendChild(col)
    document.getElementById('wrapper').appendChild(fragment)
    document.getElementById('video_' + i).setAttribute('controls', 'controls')
}


/***/ })
/******/ ]);