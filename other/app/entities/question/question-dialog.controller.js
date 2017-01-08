(function () {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('QuestionDialogController', QuestionDialogController);

    QuestionDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Question', 'Movie', 'Principal', 'Review', 'Critic', 'MovieQuestionaire'];

    function QuestionDialogController($scope, $stateParams, $uibModalInstance, entity, Question, Movie, Principal, Review, Critic, MovieQuestionaire) {

        var vm = this;
        vm.question = entity;
        vm.movies = Movie.query();
       // vm.critics = Critic.query();
        vm.parentMovieId;
        vm.load = function (id) {
            Question.get({id: id}, function (result) {
                vm.question = result;
            });
        };

        vm.addAnswerChoice = function () {
            vm.question.answers.push({
             //   index: vm.question.answers.length + 1,
                represent: "",
                value: "",
                text: "",
                score: 0,
                selected: false,
                answerCount: 0
            });
        };
        vm.removeAnswerChoice = function (answer) {
            var answers = [];
            $.each(vm.question.answers, function (i, v) {
                if (v.represent !== answer.represent) {
                    answers.push(v);
                }
            });
            vm.question.answers = answers;
        };

        // who is the user
        vm.currentUser = "";
        vm.isAdmin = false;
        vm.isCritic = false;
        Principal.identity().then(function (account) {
            $.each(account.authorities, function (i, v) {
                if (v === "ROLE_ADMIN") {
                    vm.isAdmin = true;
                }
                if (v === "ROLE_CRITIC") {
                    vm.isCritic = true;
                }
            });
            vm.currentUser = account;
        });

        vm.answerTypeOptions = [
            {
                value: null,
                text: "Please Select..."
            },
            {
                value: 0,
                text: "Yes/No"
            },
            {
                value: 1,
                text: "Recommendation"
            }
        ];
        var createAnswerChoice = function (text, score) {
            return {
                represent: text,
                score: score,
                value: text,
                selected: false,
                answerCount: 0
            };
        };
        vm.changeAnswerType = function () {
            var answerChoiceOptions = [];
            if (vm.question.answer_type === 0) {
                answerChoiceOptions.push(createAnswerChoice("Yes", 100));
                answerChoiceOptions.push(createAnswerChoice("Maybe", 50));
                answerChoiceOptions.push(createAnswerChoice("No", 0));
            } else if (vm.question.answer_type === 1) {
                answerChoiceOptions.push(createAnswerChoice("Highly Recommend", 100));
                answerChoiceOptions.push(createAnswerChoice("Recommend", 75));
                answerChoiceOptions.push(createAnswerChoice("Maybe", 50));
                answerChoiceOptions.push(createAnswerChoice("Probably Not", 25));
                answerChoiceOptions.push(createAnswerChoice("No", 0));
            }
            vm.question.answers = answerChoiceOptions;
        };

        var onSaveSuccess = function (result) {
            var updateQuestion = function () {
                $scope.$emit('csc510ProjectApp:questionUpdate', result);
                $uibModalInstance.close(result);
                vm.isSaving = false;
            }
            // add this question to a movie
            if (vm.question.id === null && vm.question.parentMovieId != null) {
                Movie.get({id: vm.question.parentMovieId}, function (movie) {
                    vm.question.id = result.id;

                    var weightTotal = 0;
                    $.each(movie.questions, function (i, q){
                       weightTotal += q.weight;
                    });

                    var movieObj = {
                        "id": movie.id,
                        "questions": movie.questions || []
                    }

                    var answers = [];
                    $.each(vm.question.answers, function (i, v){
                       answers.push({
                           represent: v.represent,
                           value: v.value,
                           score: v.score + ".0"
                       });
                    });

                    movieObj.questions.push({
                        answers: answers,
                        id: result.id,
                        weight: 100 - weightTotal
                    });
                    var test = JSON.stringify(movieObj);
                    MovieQuestionaire.update(movieObj, function (movieRes) {
                        $scope.$emit('csc510ProjectApp:movieUpdate', movieRes);
                        updateQuestion();
                    });
                });
            } else {
                updateQuestion();
            }

        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {

            vm.isSaving = true;

            var valid = true;
            if (vm.question.answers.length === 0) {
                alert('Question must contain at least one answer.');
                valid = false;
            }

            var answers = [];
            $.each(vm.question.answers, function (i, v) {
                if (v.value === "") {
                    alert('Answer choices cannot be blank.');
                    valid = false;
                }
                answers.push({
                    represent: v.represent,
                    value: v.value,
                    score: v.score
                });
            });

            var questionDto = {
            //    id: vm.question.id,
                answer_choice: "string",
                answer_type: vm.question.answer_type,
                answers: answers,
                question: vm.question.question,
                valid: vm.question.valid
            }

            if (vm.question.id !== null){
                $.extend(questionDto, {id: vm.question.id});
            }

            if (!!valid) {
                if (vm.question.id !== null) {
                    Question.update(questionDto, onSaveSuccess, onSaveError);
                } else {
                    Question.save(questionDto, onSaveSuccess, onSaveError);
                }
            }
            // }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // vm.openFile = DataUtils.openFile;
        // vm.byteSize = DataUtils.byteSize;
    }
})();
