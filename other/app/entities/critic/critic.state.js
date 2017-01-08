(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('critic', {
            parent: 'entity',
            url: '/critic',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Critics'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/critic/critics.html',
                    controller: 'CriticController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('critic-detail', {
            parent: 'entity',
            url: '/critic/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Critic'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/critic/critic-detail.html',
                    controller: 'CriticDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Critic', function($stateParams, Critic) {
                    return Critic.get({id : $stateParams.id});
                }]
            }
        })
        .state('critic.new', {
            parent: 'critic',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/critic/critic-dialog.html',
                    controller: 'CriticDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                isActive: false,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('critic', null, { reload: true });
                }, function() {
                    $state.go('critic');
                });
            }]
        })
        .state('critic.edit', {
            parent: 'critic',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/critic/critic-dialog.html',
                    controller: 'CriticDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Critic', function(Critic) {
                            return Critic.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('critic', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('critic.delete', {
            parent: 'critic',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/critic/critic-delete-dialog.html',
                    controller: 'CriticDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Critic', function(Critic) {
                            return Critic.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('critic', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
