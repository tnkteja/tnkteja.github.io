(function () {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('UserManagementDeleteController', UserManagementDeleteController);

    UserManagementDeleteController.$inject = ['$uibModalInstance', 'entity', 'User', 'Critic', 'CriticRemove'];

    function UserManagementDeleteController($uibModalInstance, entity, User, Critic, CriticRemove) {
        var vm = this;

        vm.user = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete(login) {
            Critic.query(function (data) {
                $.each(data, function (i, v) {
                    if (vm.user.id === v.userId) {
                        CriticRemove.update({criticId: v.id}, function(){
                            $uibModalInstance.close(true);
                        });
                    }
                });
            });
            // User.delete({login: login},
            //     function () {
            //         $uibModalInstance.close(true);
            //     });
        }
    }
})();
