(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('MovieDialogController', MovieDialogController);

    MovieDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Movie', 'Question', 'Review', 'MovieUpdate'];

    function MovieDialogController ($scope, $stateParams, $uibModalInstance, DataUtils, entity, Movie, Question, Review, MovieUpdate) {
        var vm = this;
        vm.movie = entity;
        vm.questions = Question.query();
    //    vm.reviews = Review.query();
        vm.load = function(id) {
            Movie.get({id : id}, function(result) {
                vm.movie = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('csc510ProjectApp:movieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.movie.id !== null) {
                MovieUpdate.update(vm.movie, onSaveSuccess, onSaveError);
            } else {
                MovieUpdate.save(vm.movie, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
    }
})();
