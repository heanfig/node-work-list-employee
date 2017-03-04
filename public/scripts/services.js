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
	}]).factory('user', ['$http','$q',function($http, $q) {
		return {
			LogIn : function($userdata) {
			   var $that = this;
			   var deferred = $q.defer();
			   $http.post('/api/login',$userdata)
			   .success(function(data) { 
			   		if(data.status){
		          		deferred.resolve(data);
			   		}else{
		          		deferred.reject(msg);
			   		}
		       }).error(function(msg, code) {
		          deferred.reject(msg);
		       });
			   return deferred.promise;
			},
			clear: function() {
				store.set('user', {});
			},
			Log: function( obj ) {
				console.log( obj );
			},
			setToken: function(token) {
				var user = _.isUndefined(store.get('user')) ? {} : store.get('user');
				user.token = btoa(token);
				store.set('user', user);
			},
			setID: function(id) {
				var user = _.isUndefined(store.get('user')) ? {} : store.get('user');
				user.id = id;
				store.set('user', user);
			},
			loggedIn: function() {
				var user = _.isUndefined(store.get('user')) ? {} : store.get('user');
				return !_.isEmpty(user) && !_.isEmpty(user.token) && !_.isUndefined(user.token);
			},
		}
}]);