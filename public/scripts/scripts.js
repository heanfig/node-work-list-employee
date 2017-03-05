'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [{
        name: 'login',
        state: {
            url: '/login',
            parent: 'base',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            data: {
                text: "Login",
                visible: false
            }
        }
    },
    {
        name: 'base',
        state: {
            abstract: true,
            url: '',
            templateUrl: 'views/base.html',
            data: {
                text: "Base",
                visible: false
            }
        }
    },
    {
        name: 'dashboard',
        state: {
            url: '/dashboard',
            parent: 'base',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            data: {
                text: "Dashboard",
                visible: false
            }
        }
    },
    {
        name: 'overview',
        state: {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html',
            data: {
                text: "Registro Empleado",
                visible: true
            }
        }
    },
    {
        name: 'reports',
        state: {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html',
            data: {
                text: "Ver Empleados",
                visible: true
            }
        }
    },
    {
        name: 'logout',
        state: {
            url: '/login',
            data: {
                text: "Cerrar Sesión",
                visible: true
            }
        }
    }
];
   
angular.module('yapp', [
                'ui.router',
                'ngAnimate',
                'oitozero.ngSweetAlert',
                'snap',
            ])
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/dashboard', '/dashboard/overview');
            $urlRouterProvider.otherwise('/login');
            
            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        }]);

'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', ["$scope", "$location","user","SweetAlert", function($scope, $location, user,SweetAlert) {
    $scope.user = {};
    $scope.submit = function() {
        user.LogIn($scope.user).then(function (response) {
            if(response.status){
                if(response.user.length == 0){
                    SweetAlert.swal({
                       title: "Error",
                       text: "Contraseña Incorrecta",
                       type: "error"
                    });
                }else{
                    user.setID(response.user._id);
                    user.setToken(response.user._id);
                    $location.path('/dashboard');
                }
            }
        });            
    }

  }]);

'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', ["$scope", "$state", function($scope, $state) {
    $scope.$state = $state;

    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({name: item.name, text: item.data.text});
        }
    });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
.controller('rootController', ["$scope", "$state","$timeout","user", function($scope, $state, $timeout, user) {
    $scope.changeRoute = function(){
      if($state.current.name != "login"){
        $timeout(function() {
          location.reload();
        },1000);
      }
    };
    $scope.closeSession = function(){
      user.clearAll();
      $state.go("login"); 
    }
}]);

'use strict';
/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('registerEmployeeController', ["$scope", "$state","SweetAlert","Employee","$location",function($scope, $state, SweetAlert,Employee,$location) {
        $scope.user = {};

        $scope.submitForm=function($valid,$event){
            event.preventDefault();
            if($valid){
                SweetAlert.swal({
                   title: "¿Estas Seguro?",
                   text: "Se agregará un empleado",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "Si, Agregalo",
                   closeOnConfirm: false}, 
                function(){ 
                    Employee.create($scope.user).then(function (response) {
                        if(response.status){
                            SweetAlert.swal({
                               title: "ÉXITO",
                               text: "Tu Registro se creó correctamente",
                               type: "success",
                               confirmButtonColor: "#DD6B55",
                               confirmButtonText: "Ver Empleados",
                               closeOnConfirm: true,
                               closeOnCancel: false 
                            }, 
                            function(isConfirm){ 
                               if (isConfirm) {
                                  $location.url("/dashboard/reports");
                               }
                            });
                        }else{
                            SweetAlert.swal("Error", "Hay campos vacios", "error");
                        }
                    });
                });
            }else{
                SweetAlert.swal("Error", "Hay campos vacios", "error");
            }
        }
  }]);


'use strict';
/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .run(["$rootScope", "$location","user","SweetAlert","$state", function($rootScope, $location, user,SweetAlert,$state) {
      $rootScope.$on('$stateChangeStart', function(event, current, toParams, next, fromParams) { 
          var requireLogin = ["reports","overview"];
          if(current.name == "login"){
              if( user.loggedIn() ){
                event.preventDefault();
                $state.go('overview');
              }else{
                console.log("continue");
              }
          }else{
              if( user.loggedIn() && ~requireLogin.indexOf(current.name)){
                console.log("continue");
              }else{
                event.preventDefault();
                $state.go('login');
              }
          }
      });
  }]);

'use strict';
/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('viewAllEmployeeController', ["$scope", "$state","SweetAlert","Employee","$location",function($scope, $state, SweetAlert,Employee,$location) {

    Employee.get().then(function (response) {
        /*if(response.status){
            
        }else{
            SweetAlert.swal("Error", "Hay campos vacios", "error");
        }*/
        $scope.employess = response;
    });

    $scope.removeEmployee = function($id){

        SweetAlert.swal({
           title: "¿Estas Seguro?",
           text: "Se eliminará un empleado",
           type: "warning",
           showCancelButton: false,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, Elimarlo",
           closeOnConfirm: false}, 
        function(){ 
            Employee.delete($id).then(function (response) {
                //if(response.status){
                    SweetAlert.swal({
                       title: "ÉXITO",
                       text: "Tu Registro se eliminó correctamente",
                       type: "success",
                       confirmButtonColor: "#DD6B55",
                       confirmButtonText: "Cerrar",
                       closeOnConfirm: true,
                       closeOnCancel: false 
                    }, 
                    function(isConfirm){ 
                       if (isConfirm) {
                          $scope.employess = response;
                       }
                    });
                /*}else{
                    SweetAlert.swal("Error", "Hay campos vacios", "error");
                }*/
            });
        });

    };

}]);
