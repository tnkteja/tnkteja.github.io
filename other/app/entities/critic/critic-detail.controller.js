(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('CriticDetailController', CriticDetailController);

    CriticDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Critic', 'User', 'Review'];

    function CriticDetailController($scope, $rootScope, $stateParams, entity, Critic, User, Review) {
        var vm = this;
        vm.critic = entity;
        vm.load = function (id) {
            Critic.get({id: id}, function(result) {
                vm.critic = result;
            });
        };
        var unsubscribe = $rootScope.$on('csc510ProjectApp:criticUpdate', function(event, result) {
            vm.critic = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
