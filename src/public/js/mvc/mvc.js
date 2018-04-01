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
/******/ 	__webpack_require__.p = "/js/mvc";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
module.exports = __webpack_require__(10);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.controller('beveragesCtrl', ['$scope', function ($scope) {}]);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.controller('foodsCtrl', ['$scope', 'ProductService', function ($scope, ProductService) {}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.controller('HomeCtrl', ['$scope', function ($scope) {

  $scope.currentLocation = '';
  //$scope.currentLocation = "Damak -11 , Jhapa, Nepal";


  $scope.detectCurrentLocation = function () {
    console.log("Detecting current Location");
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("GeoLocation is not supported by the browser");
      return;
    }
    function showPosition(position) {
      location.latitude = position.coords.latitude;
      location.longitude = position.coords.longitude;

      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(location.latitude, location.longitude);
      $("#location").geocomplete({
        bounds: true,
        LatLngBounds: latLng
      });

      if (geocoder) {
        geocoder.geocode({
          'latLng': latLng
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].formatted_address);
            $scope.currentLocation = results[0].formatted_address;
          } else {
            console.log("Geocoding failed: " + status);
            $scope.currentLocation = '';
          }
        }); //geocoder.geocode()
      }
    }
  };
  $scope.detectCurrentLocation();
}]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.controller('navCtrl', ['$scope', 'authService', '$state', function ($scope, authService, $state) {

  $scope.isLoggedIn = authService.isLoggedIn();

  $scope.login = function () {
    if (!$scope.username || !$scope.password) {
      console.log("Fill all the fields.");
      return;
    }

    var userCred = {
      username: $scope.username,
      password: $scope.password
    };
    authService.logIn(userCred).then(function (res) {
      console.log("Successfully logged in ");
      console.log(res.data.token);
      authService.saveToken(res.data.token);
      $scope.isLoggedIn = authService.isLoggedIn();
      $state.go('home', {}, { reload: true });
      $('#loginModal').modal('hide');
    }, function (err) {
      console.log("Error while logging in ");
      console.error(err);
    });
  };
}]);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.controller('shopCtrl', ['$scope', function ($scope) {}]);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.factory('authService', ['$http', '$window', function ($http, $window) {

  var auth = {};

  auth.saveToken = function (token) {
    $window.localStorage['doorbell'] = token;
  };

  auth.getToken = function () {
    return $window.localStorage['doorbell'];
  };

  auth.isLoggedIn = function () {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      console.log("Not logged In");
      return false;
    }
  };

  auth.currentUser = function () {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function (user) {
    return $http.post('/register', user).success(function (data) {
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function (user) {
    return $http.post('/login', user);
  };

  auth.logOut = function () {
    $window.localStorage.removeItem('doorbell');
  };
  return auth;
}]);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.factory('ProductSerivce', ['$http', function ($http) {
    var obj = {
        products: []
    };

    obj.getAll = function (productname) {
        return $http.get('/product/' + productname).then(function (res) {
            return res.data;
        }, function (err) {
            return err.data;
        });
    };

    return obj;
}]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


app.factory('HomeSerivce', ['$http', function ($http) {}]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzE4NzFkNGJhNTZlNzY2NjM4NzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1YmxpYy9qcy9tdmMvY29udHJvbGxlcnMvYmV2ZXJhZ2VzQ3RybC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2pzL212Yy9jb250cm9sbGVycy9mb29kc0N0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1YmxpYy9qcy9tdmMvY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1YmxpYy9qcy9tdmMvY29udHJvbGxlcnMvbmF2Q3RybC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2pzL212Yy9jb250cm9sbGVycy9zaG9wQ3RybC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2pzL212Yy9mYWN0b3JpZXMvYXV0aFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1YmxpYy9qcy9tdmMvZmFjdG9yaWVzL2Zvb2RzU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2pzL212Yy9mYWN0b3JpZXMvaG9tZVNlcnZpY2UuanMiXSwibmFtZXMiOlsiYXBwIiwiY29udHJvbGxlciIsIiRzY29wZSIsIlByb2R1Y3RTZXJ2aWNlIiwiY3VycmVudExvY2F0aW9uIiwiZGV0ZWN0Q3VycmVudExvY2F0aW9uIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwic2hvd1Bvc2l0aW9uIiwiYWxlcnQiLCJwb3NpdGlvbiIsImxvY2F0aW9uIiwibGF0aXR1ZGUiLCJjb29yZHMiLCJsb25naXR1ZGUiLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdExuZyIsIkxhdExuZyIsIiQiLCJnZW9jb21wbGV0ZSIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiR2VvY29kZXJTdGF0dXMiLCJPSyIsImZvcm1hdHRlZF9hZGRyZXNzIiwiYXV0aFNlcnZpY2UiLCIkc3RhdGUiLCJpc0xvZ2dlZEluIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidXNlckNyZWQiLCJsb2dJbiIsInRoZW4iLCJyZXMiLCJkYXRhIiwidG9rZW4iLCJzYXZlVG9rZW4iLCJnbyIsInJlbG9hZCIsIm1vZGFsIiwiZXJyIiwiZXJyb3IiLCJmYWN0b3J5IiwiJGh0dHAiLCIkd2luZG93IiwiYXV0aCIsImxvY2FsU3RvcmFnZSIsImdldFRva2VuIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsImV4cCIsIkRhdGUiLCJub3ciLCJjdXJyZW50VXNlciIsInJlZ2lzdGVyIiwidXNlciIsInBvc3QiLCJzdWNjZXNzIiwibG9nT3V0IiwicmVtb3ZlSXRlbSIsIm9iaiIsInByb2R1Y3RzIiwiZ2V0QWxsIiwicHJvZHVjdG5hbWUiLCJnZXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLElBQUlDLFVBQUosQ0FBZSxlQUFmLEVBQStCLENBQUMsUUFBRCxFQUFXLFVBQVNDLE1BQVQsRUFBZ0IsQ0FDekQsQ0FEOEIsQ0FBL0IsRTs7Ozs7Ozs7O0FDQUFGLElBQUlD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QUQsRUFBTztBQUNyRCxtQkFBT0EsSUFBSUMsSUFBWDtBQUNILFNBRk0sRUFFSixVQUFDTSxHQUFELEVBQU87QUFDTixtQkFBT0EsSUFBSU4sSUFBWDtBQUNILFNBSk0sQ0FBUDtBQUtILEtBTkQ7O0FBUUEsV0FBTzZCLEdBQVA7QUFDRCxDQWQ0QixDQUE3QixFOzs7Ozs7Ozs7QUNBQXpFLElBQUlvRCxPQUFKLENBQVksYUFBWixFQUEwQixDQUFDLE9BQUQsRUFBVSxVQUFTQyxLQUFULEVBQWUsQ0FFbEQsQ0FGeUIsQ0FBMUIsRSIsImZpbGUiOiJtdmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvbXZjXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzE4NzFkNGJhNTZlNzY2NjM4NzUiLCJhcHAuY29udHJvbGxlcignYmV2ZXJhZ2VzQ3RybCcsWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xufV0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHVibGljL2pzL212Yy9jb250cm9sbGVycy9iZXZlcmFnZXNDdHJsLmpzIiwiYXBwLmNvbnRyb2xsZXIoJ2Zvb2RzQ3RybCcsWyckc2NvcGUnLCdQcm9kdWN0U2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgUHJvZHVjdFNlcnZpY2Upe1xuXG59XSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHVibGljL2pzL212Yy9jb250cm9sbGVycy9mb29kc0N0cmwuanMiLCJcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJyxbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG5cblxuICAkc2NvcGUuY3VycmVudExvY2F0aW9uID0gJyc7XG4gIC8vJHNjb3BlLmN1cnJlbnRMb2NhdGlvbiA9IFwiRGFtYWsgLTExICwgSmhhcGEsIE5lcGFsXCI7XG5cblxuICAkc2NvcGUuZGV0ZWN0Q3VycmVudExvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRGV0ZWN0aW5nIGN1cnJlbnQgTG9jYXRpb25cIik7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJHZW9Mb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgIGxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgbG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcblxuICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICB2YXIgbGF0TG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICQoXCIjbG9jYXRpb25cIikuZ2VvY29tcGxldGUoe1xuICAgICAgICBib3VuZHM6dHJ1ZSxcbiAgICAgICAgTGF0TG5nQm91bmRzOiBsYXRMbmdcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZ2VvY29kZXIpIHtcbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7XG4gICAgICAgICAgJ2xhdExuZyc6IGxhdExuZ1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcyk7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudExvY2F0aW9uID0gIHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZW9jb2RpbmcgZmFpbGVkOiBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudExvY2F0aW9uID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTsgLy9nZW9jb2Rlci5nZW9jb2RlKClcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG4gICRzY29wZS5kZXRlY3RDdXJyZW50TG9jYXRpb24oKTtcblxufV0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3B1YmxpYy9qcy9tdmMvY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJhcHAuY29udHJvbGxlcignbmF2Q3RybCcsIFsnJHNjb3BlJywgJ2F1dGhTZXJ2aWNlJywnJHN0YXRlJywgZnVuY3Rpb24gKCRzY29wZSwgYXV0aFNlcnZpY2UsJHN0YXRlKSB7XG5cbiAgJHNjb3BlLmlzTG9nZ2VkSW4gPSBhdXRoU2VydmljZS5pc0xvZ2dlZEluKCk7XG5cbiAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghJHNjb3BlLnVzZXJuYW1lIHx8ICEkc2NvcGUucGFzc3dvcmQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiRmlsbCBhbGwgdGhlIGZpZWxkcy5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIHZhciB1c2VyQ3JlZCA9IHtcbiAgICAgIHVzZXJuYW1lOiAkc2NvcGUudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXG4gICAgfTtcbiAgICBhdXRoU2VydmljZS5sb2dJbih1c2VyQ3JlZCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gXCIpO1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEudG9rZW4pO1xuICAgICAgYXV0aFNlcnZpY2Uuc2F2ZVRva2VuKHJlcy5kYXRhLnRva2VuKTtcbiAgICAgICRzY29wZS5pc0xvZ2dlZEluID0gYXV0aFNlcnZpY2UuaXNMb2dnZWRJbigpO1xuICAgICAgJHN0YXRlLmdvKCdob21lJyx7fSx7cmVsb2FkOnRydWV9KTtcbiAgICAgICQoJyNsb2dpbk1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9LGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgbG9nZ2luZyBpbiBcIik7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuXG59XSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wdWJsaWMvanMvbXZjL2NvbnRyb2xsZXJzL25hdkN0cmwuanMiLCJhcHAuY29udHJvbGxlcignc2hvcEN0cmwnLFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbn1dKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wdWJsaWMvanMvbXZjL2NvbnRyb2xsZXJzL3Nob3BDdHJsLmpzIiwiYXBwLmZhY3RvcnkoJ2F1dGhTZXJ2aWNlJywgWyckaHR0cCcsICckd2luZG93JywgZnVuY3Rpb24gKCRodHRwLCAkd2luZG93KSB7XG5cbiAgdmFyIGF1dGggPSB7fTtcblxuICBhdXRoLnNhdmVUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICR3aW5kb3cubG9jYWxTdG9yYWdlWydkb29yYmVsbCddPSB0b2tlbjtcbiAgfVxuXG4gIGF1dGguZ2V0VG9rZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICR3aW5kb3cubG9jYWxTdG9yYWdlWydkb29yYmVsbCddO1xuICB9XG5cbiAgYXV0aC5pc0xvZ2dlZEluID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b2tlbiA9IGF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHZhciBwYXlsb2FkID0gSlNPTi5wYXJzZSgkd2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuXG4gICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIEluXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBhdXRoLmN1cnJlbnRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhdXRoLmlzTG9nZ2VkSW4oKSkge1xuICAgICAgdmFyIHRva2VuID0gYXV0aC5nZXRUb2tlbigpO1xuICAgICAgdmFyIHBheWxvYWQgPSBKU09OLnBhcnNlKCR3aW5kb3cuYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG5cbiAgICAgIHJldHVybiBwYXlsb2FkLnVzZXJuYW1lO1xuICAgIH1cbiAgfTtcblxuICBhdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gJGh0dHAucG9zdCgnL3JlZ2lzdGVyJywgdXNlcikuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgYXV0aC5zYXZlVG9rZW4oZGF0YS50b2tlbik7XG4gICAgfSk7XG4gIH07XG5cbiAgYXV0aC5sb2dJbiA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIHVzZXIpO1xuICB9O1xuXG4gIGF1dGgubG9nT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Rvb3JiZWxsJyk7XG4gIH1cbiAgcmV0dXJuIGF1dGg7XG59XSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHVibGljL2pzL212Yy9mYWN0b3JpZXMvYXV0aFNlcnZpY2UuanMiLCJhcHAuZmFjdG9yeSgnUHJvZHVjdFNlcml2Y2UnLFsnJGh0dHAnICxmdW5jdGlvbigkaHR0cCl7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICAgIHByb2R1Y3RzOltdXG4gIH07XG5cbiAgb2JqLmdldEFsbCA9IGZ1bmN0aW9uKHByb2R1Y3RuYW1lKXtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoYC9wcm9kdWN0LyR7cHJvZHVjdG5hbWV9YCkudGhlbiggKHJlcyk9PntcbiAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICB9LCAoZXJyKT0+e1xuICAgICAgICAgIHJldHVybiBlcnIuZGF0YVxuICAgICAgfSlcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHVibGljL2pzL212Yy9mYWN0b3JpZXMvZm9vZHNTZXJ2aWNlLmpzIiwiYXBwLmZhY3RvcnkoJ0hvbWVTZXJpdmNlJyxbJyRodHRwJyAsZnVuY3Rpb24oJGh0dHApe1xuXG59XSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHVibGljL2pzL212Yy9mYWN0b3JpZXMvaG9tZVNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9