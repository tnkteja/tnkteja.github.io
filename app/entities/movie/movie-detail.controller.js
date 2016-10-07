(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('MovieDetailController', MovieDetailController);

    MovieDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Movie', 'Question'];

    function MovieDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Movie, Question) {
        var vm = this;
        vm.movie = entity;
      //vm.reviews = ReviewForMovie.get({id:vm.movie.id});
        vm.load = function (id) {
            Movie.get({id: id}, function(result) {
                vm.movie = result;
            });
        };
        var unsubscribe = $rootScope.$on('csc510ProjectApp:movieUpdate', function(event, result) {
            vm.movie = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
