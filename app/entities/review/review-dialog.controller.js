(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('ReviewDialogController', ReviewDialogController);

    ReviewDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Review', 'Movie', 'Critic', 'Principal', 'Question'];

    function ReviewDialogController ($scope, $stateParams, $uibModalInstance, entity, Review, Movie, Critic, Principal, Question) {
        var vm = this;
        vm.review = entity;
        vm.movie = Movie.get({id: $stateParams.mId}, function (mov) {
            var movieQuestions = [];
            $.each(mov.questions, function (i,m) {
                Question.get({id: m.id}, function (q){
                    movieQuestions.push(
                        $.extend(m,
                            {
                                question: q.question,
                                selectedAnswer: null
                            })
                    );
                });
               // var mq = Question.get({id: m.id});
               // movieQuestions.push(mq);
            });
            mov.questions = movieQuestions;
        });

        //vm.critics = Critic.query();
        vm.parentMovieId;
        vm.load = function(id) {
            Review.get({id : id}, function(result) {
                vm.review = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('csc510ProjectApp:reviewUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        // who is the user
        vm.currentUser = "";
        vm.isAdmin = false;
        vm.isCritic = false;
        Principal.identity().then(function(account) {
            $.each(account.authorities, function (i,v){
                if (v === "ROLE_ADMIN"){
                    vm.isAdmin = true;
                }
                if (v === "ROLE_CRITIC"){
                    vm.isCritic = true;
                }
            });
            vm.currentUser = account;
        });

        vm.save = function () {
            var questions = [];
            $.each(vm.movie.questions, function (i, q){

               questions.push({
                   "id": q.id,
                   "score": q.selectedAnswer.score,
                   "weight": q.weight
               }) ;
            });

            var reviewDto = {
              // "id": 0,
                "movie": {
                    "id": vm.review.movieId,
                    "questions": questions
                }
            }

            vm.isSaving = true;
            if (vm.review.id !== null) {
                Review.update(reviewDto, onSaveSuccess, onSaveError);
            } else {
                Review.save(reviewDto, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
