(function () {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('QuestionDeleteController', QuestionDeleteController);

    QuestionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Question', '$stateParams', 'Movie', 'MovieUpdate'];

    function QuestionDeleteController($uibModalInstance, entity, Question, $stateParams, Movie, MovieUpdate) {
        var vm = this;
        vm.question = entity;
        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            var questionId = id;
            Movie.get({id: $stateParams.mId}, function (result) {
                var validQuestions = [];
                var weightsTotal = 0;
                $.each(result.questions, function (i, q) {
                    if (q.id !== questionId) {
                        weightsTotal += q.weight;
                        validQuestions.push(q);
                    }
                });

                // adjust weights
                if (weightsTotal < 100 && validQuestions.length > 0) {
                    $.each(validQuestions, function (i, q) {
                        q.weight += (100 - weightsTotal);
                    });
                }

                result.questions = validQuestions;
                MovieUpdate.update(result, function (data) {
                    location.href = "/#/movie/" + data.id + "/edit";
                    $uibModalInstance.close(true);
                });
            });
        };
    }
})();
