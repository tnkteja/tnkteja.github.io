(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('review', {
            parent: 'entity',
            url: '/review',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Reviews'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/review/reviews.html',
                    controller: 'ReviewController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('review-detail', {
            parent: 'entity',
            url: '/review/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Review'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/review/review-detail.html',
                    controller: 'ReviewDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Review', function($stateParams, Review) {
                    return Review.get({id : $stateParams.id});
                }]
            }
        })
        .state('review.new', {
            parent: 'review',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/review/review-dialog.html',
                    controller: 'ReviewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                aggregate: null,
                                answers: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('review', null, { reload: true });
                }, function() {
                    $state.go('review');
                });
            }]
        })
        .state('review.edit', {
            parent: 'review',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/review/review-dialog.html',
                    controller: 'ReviewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Review', function(Review) {
                            return Review.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('review', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('review.delete', {
            parent: 'review',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/review/review-delete-dialog.html',
                    controller: 'ReviewDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Review', function(Review) {
                            return Review.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('review', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
