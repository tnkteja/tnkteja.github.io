(function() {
    'use strict';
    angular
        .module('csc510ProjectApp')
        .factory('Critic', Critic);

    Critic.$inject = ['$resource'];

    function Critic ($resource) {
        var resourceUrl =  'api/critics/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }


    angular
        .module('csc510ProjectApp')
        .factory('CriticRemove', CriticRemove);

    CriticRemove.$inject = ['$resource'];

    function CriticRemove($resource) {
        var service = $resource('api/critics/removePrivilege/:id', {id: '@criticId'},
            {
                'update': {method: 'PUT'}
            });

        return service;
    }
})();
