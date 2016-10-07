(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('CriticDeleteController',CriticDeleteController);

    CriticDeleteController.$inject = ['$uibModalInstance', 'entity', 'Critic'];

    function CriticDeleteController($uibModalInstance, entity, Critic) {
        var vm = this;
        vm.critic = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Critic.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
