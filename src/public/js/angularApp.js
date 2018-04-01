var app = angular.module('doorbell', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
  $stateProvider.state('home', {
    url:'/home',
    templateUrl:'/home.html',
    controller:'HomeCtrl'
  }).state('foods', {
    url:'/foods',
    templateUrl:'/foods.html',
    controller:'foodsCtrl'
  }).state('beverages',{
    url:'/beverages',
    templateUrl:'/beverages.html',
    controller:'beveragesCtrl'
  })
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $urlRouterProvider.otherwise('home');
}])


// app.directive('autoLocation', function(){
//   return {
//     link : function($scope, element, attrs){
//       autocomplete = new google.maps.places.Autocomplete(
//         /** @type {HTMLInputElement} */
//         element, {
//             types: ['geocode']
//         });

//         google.maps.event.addDomListener(element, 'focus', function (){

//                   if (navigator.geolocation) {
//                       navigator.geolocation.getCurrentPosition(function (position) {

//                           var geolocation = new google.maps.LatLng(
//                           position.coords.latitude, position.coords.longitude);
//                           var circle = new google.maps.Circle({
//                               center: geolocation,
//                               radius: position.coords.accuracy
//                           });
//                           autocomplete.setBounds(circle.getBounds());

//                           // Log autocomplete bounds here
//                           console.log(autocomplete.getBounds());
//                       });
//                   }
//               });
//     }


//   }
// })
app.controller('locationController', ['$scope', function ($scope) {

}]);

