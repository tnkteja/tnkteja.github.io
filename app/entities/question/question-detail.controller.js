(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Question', 'Movie'];

    function QuestionDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Question, Movie) {
        var vm = this;
        vm.question = entity;
        vm.load = function (id) {
            Question.get({id: id}, function(result) {
                vm.question = result;
            });
        };
        var unsubscribe = $rootScope.$on('csc510ProjectApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
