(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('question', {
            parent: 'entity',
            url: '/question',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Questions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/question/questions.html',
                    controller: 'QuestionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('question-detail', {
            parent: 'entity',
            url: '/question/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Question'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/question/question-detail.html',
                    controller: 'QuestionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Question', function($stateParams, Question) {
                    return Question.get({id : $stateParams.id});
                }]
            }
        })
        .state('question.new', {
            parent: 'question',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
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
                                valid: null,
                                answer_type: null,
                                answers: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: true });
                }, function() {
                    $state.go('question');
                });
            }]
        })
        .state('question.edit', {
            parent: 'question',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-dialog.html',
                    controller: 'QuestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Question', function(Question) {
                            return Question.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
            .state('question.editInMovie', {
                parent: 'question',
                url: '/{id}/edit/',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/question/question-dialog.html',
                        controller: 'QuestionDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Question', function(Question) {
                                return Question.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function() {
                        $state.go('question', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
        .state('question.delete', {
            parent: 'question',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-delete-dialog.html',
                    controller: 'QuestionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Question', function(Question) {
                            return Question.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
