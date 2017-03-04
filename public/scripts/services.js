angular.module('yapp')
	.factory('Employee', ['$http','$q',function($http, $q) {
		return {
			get : function() {
			   var deferred = $q.defer();
			   $http.get('/api/employee',{})
			   .success(function(data) { 
		          deferred.resolve(data);
		       }).error(function(msg, code) {
		          deferred.reject(msg);
		       });
			   return deferred.promise;
			},
			create : function(todoData) {
			   var deferred = $q.defer();
			   $http.post('/api/employee',{
			            name: todoData.name,
			            surname: todoData.surname,
			            email: todoData.email,
			            phone: todoData.phone
			   }).success(function(data) { 
		          deferred.resolve(data);
		       }).error(function(msg, code) {
		          deferred.reject(msg);
		       });
			   return deferred.promise;
			},
			delete : function(id) {
			   var deferred = $q.defer();
			   $http.delete('/api/employee/' + id,{})
			   .success(function(data) { 
		          deferred.resolve(data);
		       }).error(function(msg, code) {
		          deferred.reject(msg);
		       });
			   return deferred.promise;
			}
		}
	}]);