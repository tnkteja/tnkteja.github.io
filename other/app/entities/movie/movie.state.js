(function () {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('movie', {
                parent: 'entity',
                url: '/movie',
                data: {
                    authorities: [],
                    pageTitle: 'Movies'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movies.html',
                        controller: 'MovieController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {}
            })
            .state('movie-detail', {
                parent: 'entity',
                url: '/movie/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Movie'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-detail.html',
                        controller: 'MovieDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', 'ReviewForMovie', function ($stateParams, $state, Movie, Question, ReviewForMovie) {
                        return Movie.get({id: $stateParams.id}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            ReviewForMovie.get({id: movie.id},
                                function (data) {
                                    $.extend(movie, {review: data});
                                },
                                function (data) {
                                    $.extend(movie, {review: {id: null}});
                                });


                            return movie;
                        });
                    }]
                }
            })
            // .state('movie.new', {
            //     parent: 'movie',
            //     url: '/new',
            //     data: {
            //         authorities: ['ROLE_USER']
            //     },
            //     onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
            //         $uibModal.open({
            //             templateUrl: 'app/entities/movie/movie-dialog.html',
            //             controller: 'MovieDialogController',
            //             controllerAs: 'vm',
            //             backdrop: 'static',
            //             size: 'lg',
            //             resolve: {
            //                 entity: function () {
            //                     return {
            //                         title: null,
            //                         image: null,
            //                         approval: null,
            //                         description: null,
            //                         weights: [],
            //                         reviewReady: true,
            //                         id: null
            //                     };
            //                 }
            //             }
            //         }).result.then(function () {
            //             $state.go('movie', null, {reload: true});
            //         }, function () {
            //             $state.go('movie');
            //         });
            //     }]
            // })
            .state('movie.edit', {
                parent: 'entity',
                url: '/movie/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Movie'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-edit.html',
                        controller: 'MovieEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        if ($stateParams.id !== "0") {
                            return Movie.get({id: $stateParams.id}, function (movie) {
                                if (!!movie.questions.length) {
                                    $.each(movie.questions, function (i, v) {
                                        Question.get({id: v.id}, function (question) {
                                            $.extend(v, {question: question.question});
                                        });
                                    });
                                } else {

                                }
                                return movie;
                            });
                        }
                        else {
                            return {
                                title: null,
                                image: null,
                                approval: null,
                                description: null,
                                weights: [],
                                reviewReady: true,
                                id: null
                            };
                        }
                    }]
                }
            })

            .state('movie.reviewInMovie', {
                parent: 'entity',
                url: '/movie/{mId}/review/{id}',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-detail.html',
                        controller: 'MovieDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        var movieId = $stateParams.mId || $stateParams.id;
                        return Movie.get({id: movieId}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            return movie;
                        });
                    }]
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/review/review-dialog.html',
                        controller: 'ReviewDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Question', 'Review', function (Question, Review) {

                                if ($stateParams.id === "new" || $stateParams.id === "newReview") {
                                    return {
                                        movieId: parseInt($stateParams.mId),
                                        aggregate: null,
                                        answers: null,
                                        id: null
                                    };
                                } else {
                                    var q = Question.get({id: $stateParams.id}, function (s) {
                                        if (s.answer_type === "YES_NO") {
                                            s.answer_type = 0;
                                        }
                                        if (s.answer_type === "RECOMMENDATION") {
                                            s.answer_type = 1;
                                        }
                                    });

                                    return q;
                                }
                            }]
                        }
                    }).result.then(function () {
                        $state.go('movie-detail', {id: $state.params.mId}, {reload: true});
                    }, function () {
                        $state.go('movie-detail', {id: $state.params.mId});
                    });
                }]
            })


            .state('movie.editInMovie', {
                parent: 'entity',
                url: '/movie/{mId}/edit/question/{id}',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-edit.html',
                        controller: 'MovieEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        var movieId = !!$stateParams.mId ? $stateParams.mId : $stateParams.id;
                        return Movie.get({id: movieId}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            return movie;
                        });
                    }]
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    if ($stateParams.id === 'newReview') {
                        $uibModal.open({
                            templateUrl: 'app/entities/review/review-dialog.html',
                            controller: 'ReviewDialogController',
                            controllerAs: 'vm',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                entity: ['Question', 'Review', function (Question, Review) {
                                    if ($stateParams.id === "new" || $stateParams.id === "newReview") {
                                        return {
                                            movieId: parseInt($stateParams.mId),
                                            aggregate: null,
                                            answers: null,
                                            id: null
                                        };
                                    } else {
                                        var q = Review.get({id: $stateParams.id}, function (s) {

                                        });

                                        return q;
                                    }
                                }]
                            }
                        }).result.then(function () {
                            $state.go('movie-detail', {id: $state.params.mId}, {reload: true});
                        }, function () {
                            $state.go('movie-detail', {id: $state.params.mId});
                        });
                    } else {
                        $uibModal.open({
                            templateUrl: 'app/entities/question/question-dialog.html',
                            controller: 'QuestionDialogController',
                            controllerAs: 'vm',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                entity: ['Question', 'Review', function (Question, Review) {
                                    if ($stateParams.id === "new" || $stateParams.id === "newQuestion") {
                                        return {
                                            question: null,
                                            answer_type: null,
                                            valid: true,
                                            answers: [],
                                            parentMovieId: $state.params.mId,
                                            id: null
                                        };
                                    } else {
                                        var q = Question.get({id: $stateParams.id}, function (s) {
                                            if (s.answer_type === "YES_NO") {
                                                s.answer_type = 0;
                                            }
                                            if (s.answer_type === "RECOMMENDATION") {
                                                s.answer_type = 1;
                                            }
                                        });

                                        return q;
                                    }
                                }]
                            }
                        }).result.then(function () {
                            $state.go('movie.edit', {id: $state.params.mId}, {reload: true});
                        }, function () {
                            $state.go('movie.edit', {id: $state.params.mId});
                        });
                    }
                }]
            })

            .state('movie.newInMovie', {
                parent: 'entity',
                url: '/movie/{mId}/edit/newQuestion',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-edit.html',
                        controller: 'MovieEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        return Movie.get({id: $stateParams.mId}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            return movie;
                        });
                    }]
                },
                onEnter: ['$stateParams', '$state', 'Movie', '$uibModal', function ($stateParams, $state, Movie, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/question/question-dialog.html',
                        controller: 'QuestionDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    question: null,
                                    answer_type: null,
                                    valid: true,
                                    answers: [],
                                    parentMovieId: $stateParams.mId,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function () {
                        $state.go('movie.edit', {id: $state.params.mId}, {reload: true});
                    }, function () {
                        $state.go('movie.edit', {id: $state.params.mId});
                    });
                }]

            })


            .state('movie.deleteQuestionInMovie', {
                parent: 'entity',
                url: '/movie/{mId}/edit/question/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-edit.html',
                        controller: 'MovieEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        return Movie.get({id: $stateParams.mId}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            return movie;
                        });
                    }]
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/question/question-delete-dialog.html',
                        controller: 'QuestionDeleteController',
                        controllerAs: 'vm',
                        size: 'md',
                        resolve: {
                            entity: ['Question', function (Question) {
                                return Question.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function () {
                        $state.go('movie.edit', {id: $state.params.mId}, {reload: true});
                    }, function () {
                        $state.go('movie.edit', {id: $state.params.mId});
                    });
                }]
            })

            .state('movie.answerInMovie', {
                parent: 'entity',
                url: '/movie/{mId}/question/{id}',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/movie/movie-detail.html',
                        controller: 'MovieDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', '$state', 'Movie', 'Question', function ($stateParams, $state, Movie, Question) {
                        return Movie.get({id: $stateParams.mId}, function (movie) {
                            $.each(movie.questions, function (i, v) {
                                Question.get({id: v.id}, function (question) {
                                    $.extend(v, {question: question.question});
                                });
                            });
                            return movie;
                        });
                    }]
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/question/question-dialog.html',
                        controller: 'QuestionDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Question', 'Critic', function (Question, Critic) {
                                if ($stateParams.id === "new") {
                                    return {
                                        question: null,
                                        answer_type: null,
                                        valid: true,
                                        answers: [],
                                        parentMovieId: $stateParams.mId,
                                        id: null
                                    };
                                } else {
                                    var q = Question.get({id: $stateParams.id}, function (s) {
                                        if (s.answer_type === "YES_NO") {
                                            s.answer_type = 0;
                                        }
                                        if (s.answer_type === "RECOMMENDATION") {
                                            s.answer_type = 1;
                                        }
                                    });

                                    return q;
                                }
                            }]
                        }
                    }).result.then(function () {
                        $state.go('movie-detail', {id: $state.params.mId}, {reload: true});
                    }, function () {
                        $state.go('movie-detail', {id: $state.params.mId});
                    });
                }]
            })


            .state('movie.delete', {
                parent: 'movie',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/movie/movie-delete-dialog.html',
                        controller: 'MovieDeleteController',
                        controllerAs: 'vm',
                        size: 'md',
                        resolve: {
                            entity: ['Movie', function (Movie) {
                                return Movie.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function () {
                        $state.go('movie', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
