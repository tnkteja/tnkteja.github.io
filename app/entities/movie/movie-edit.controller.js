(function () {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('MovieEditController', MovieEditController);

    MovieEditController.$inject = ['$scope', '$stateParams', 'entity', 'Movie', 'QuestionSearch', 'AlertService', 'MovieUpdate', 'Question', 'MovieQuestionaire'];

    function MovieEditController($scope, $stateParams, entity, Movie, QuestionSearch, AlertService, MovieUpdate, Question, MovieQuestionaire) {
        var vm = this;
        vm.movie = entity;
        vm.movieQuestions = [];
        vm.lastQuestion = "";
        vm.load = function (id) {
            Movie.get({id: id}, function (result) {
                vm.movie = result;
            });
        };

        var assignQuestionToMovie = function (movieId) {
            Movie.get({id: movieId}, function (movie) {

                var weightTotal = 0;
                $.each(movie.questions, function (i, q) {
                    weightTotal += q.weight;
                });

                var movieObj = {
                    "id": movie.id,
                    "questions": vm.movieQuestions || []
                }

                MovieQuestionaire.update(movieObj, function (movieRes) {
                    $scope.$emit('csc510ProjectApp:movieUpdate', movieRes);

                    // final save is done so redirect.

                        alert("Movie Saved Successfully.");
                        location.href = "/#/movie/" + movieRes.id + "/edit"
                        vm.isSaving = false;

                });
            });
        };

        var onSaveSuccess = function (result) {
            $.each(vm.movieQuestions, function (i, v) {
                vm.lastQuestion = v.question;
                Question.save(v, function (data) {
                    v.id = data.id;
                    if (vm.lastQuestion === data.question) {
                        assignQuestionToMovie(result.id)
                    }
                }, onSaveError);
            });


        };

        var onSaveError = function (err) {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;

            if (!!vm.movie.id) {
                var weightTotal = 0;
                $.each(vm.movie.questions, function (i, w) {
                    weightTotal += w.weight;
                });

                if (weightTotal !== 100 && (vm.movie.questions !== null && vm.movie.questions.length > 0)) {
                    alert('The total for the weights must equal 100 before saving!');
                    return;
                }
            } else {
                var createAnswerChoice = function (text, score) {
                    return {
                        represent: text,
                        score: score,
                        value: text
                    };
                };

                var createQuestion = function (question, answerChoices, weight, answer_type) {
                    return {
                        //  answer_choice: "string",
                        answer_type: answer_type,
                        question: question,
                        answers: answerChoices,
                        weight: weight,
                        valid: true
                    };
                };

                // create default questions
                var questions = [];
                var answerChoiceOptions = [];

                answerChoiceOptions.push(createAnswerChoice("I found it very compelling.", 100));
                answerChoiceOptions.push(createAnswerChoice("It kept my attention.", 75));
                answerChoiceOptions.push(createAnswerChoice("It was hit-or-miss.", 50));
                answerChoiceOptions.push(createAnswerChoice("I lost my focus during the movie.", 25));
                answerChoiceOptions.push(createAnswerChoice("I fell asleep.", 0));
                questions.push(createQuestion("Was the movie entertaining and/or informative?", answerChoiceOptions, "25.0", 1));

                answerChoiceOptions = [];
                answerChoiceOptions.push(createAnswerChoice("This was a perfect ensemble cast.", 100));
                answerChoiceOptions.push(createAnswerChoice("I liked the cast", 75));
                answerChoiceOptions.push(createAnswerChoice("They were ok.", 50));
                answerChoiceOptions.push(createAnswerChoice("Not the greatest choice for the roles.", 25));
                answerChoiceOptions.push(createAnswerChoice("Trained monkeys would have been better!", 0));
                questions.push(createQuestion("What did you think of the actors in this movie?", answerChoiceOptions, "30.0", 1));

                answerChoiceOptions = [];
                answerChoiceOptions.push(createAnswerChoice("I would highly recommend it!", 100));
                answerChoiceOptions.push(createAnswerChoice("It was pretty good.", 75));
                answerChoiceOptions.push(createAnswerChoice("I might.", 50));
                answerChoiceOptions.push(createAnswerChoice("I probably would not.", 25));
                answerChoiceOptions.push(createAnswerChoice("I definitely would not recommend it!", 0));
                questions.push(createQuestion("Would you recommend this movie?", answerChoiceOptions, "45.0", 1));


                vm.movieQuestions = questions;
            }

            if (vm.movie.id !== null) {
                MovieUpdate.update(vm.movie, onSaveSuccess, onSaveError);
            } else {
                MovieUpdate.save(vm.movie, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            location.href = "/#/movie"
        };
    }
})();
