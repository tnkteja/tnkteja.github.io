(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .factory('BecomeCritic', BecomeCritic);

    BecomeCritic.$inject = ['$resource'];

    function BecomeCritic($resource) {
        var service = $resource('api/account/become_critic', {}, {
        	'update': { method:'PUT' }     
        });

        return service;
    }
})();
