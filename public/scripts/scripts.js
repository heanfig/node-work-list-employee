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
                text: "Overview",
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
                text: "Reports",
                visible: true
            }
        }
    },
    {
        name: 'logout',
        state: {
            url: '/login',
            data: {
                text: "Logout",
                visible: true
            }
        }
    }
];
   
angular.module('yapp', [
                'ui.router',
                'snap',
                'ngAnimate',
                'oitozero.ngSweetAlert'
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
  .controller('LoginCtrl', ["$scope", "$location", function($scope, $location) {

    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
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
                                  $location.url("/login");
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
