(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider','$httpProvider'];

    function stateConfig($stateProvider,$httpProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'static/app/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ]
            }
        });
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
})();
