app.factory('ProductService',['$http','AuthService' ,function($http, AuthService){
  const obj = {
      products:[]
  };

  obj.getAll = function(productname){
      return $http.get(`/product/${productname}`, `Authorization: Bearer ${AuthService.getToken()}`).then( (res)=>{
          return res.data;
      }, (err)=>{
          return err.data
      })
  }

  return obj;
}]);
