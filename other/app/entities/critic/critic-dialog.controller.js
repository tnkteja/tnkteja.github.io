(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('CriticDialogController', CriticDialogController);

    CriticDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Critic', 'User', 'Review'];

    function CriticDialogController ($scope, $stateParams, $uibModalInstance, $q, entity, Critic, User, Review) {
        var vm = this;
        vm.critic = entity;
        vm.users = User.query();
        vm.reviews = Review.query();
        vm.load = function(id) {
            Critic.get({id : id}, function(result) {
                vm.critic = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('csc510ProjectApp:criticUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.critic.id !== null) {
                Critic.update(vm.critic, onSaveSuccess, onSaveError);
            } else {
                Critic.save(vm.critic, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
