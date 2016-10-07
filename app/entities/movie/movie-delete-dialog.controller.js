(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('MovieDeleteController',MovieDeleteController);

    MovieDeleteController.$inject = ['$uibModalInstance', 'entity', 'MovieUpdate'];

    function MovieDeleteController($uibModalInstance, entity, MovieUpdate) {
        var vm = this;
        vm.movie = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            MovieUpdate.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
