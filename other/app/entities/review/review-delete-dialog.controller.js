(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .controller('ReviewDeleteController',ReviewDeleteController);

    ReviewDeleteController.$inject = ['$uibModalInstance', 'entity', 'Review'];

    function ReviewDeleteController($uibModalInstance, entity, Review) {
        var vm = this;
        vm.review = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Review.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
