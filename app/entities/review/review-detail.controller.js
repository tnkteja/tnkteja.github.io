(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('ReviewDetailController', ReviewDetailController);

    ReviewDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Review', 'Movie', 'Critic'];

    function ReviewDetailController($scope, $rootScope, $stateParams, entity, Review, Movie, Critic) {
        var vm = this;
        vm.review = entity;
        vm.load = function (id) {
            Review.get({id: id}, function(result) {
                vm.review = result;
            });
        };
        var unsubscribe = $rootScope.$on('csc510ProjectApp:reviewUpdate', function(event, result) {
            vm.review = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
