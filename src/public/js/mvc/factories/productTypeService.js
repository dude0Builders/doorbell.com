app.factory('ProductTypeService',['$http','AuthService' ,function($http, AuthService){
  const obj = {
      products:[]
  };

  obj.getClasses = function(productname){
      return $http.get(`/productType/${productid}/${clas}`, `Authorization: Bearer ${AuthService.getToken()}`).then( (res)=>{
          return res.data;
      }, (err)=>{
          return err.data
      })
  }

  return obj;
}]);
