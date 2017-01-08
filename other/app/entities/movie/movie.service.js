(function() {
    'use strict';
    angular
        .module('csc510ProjectApp')
        .factory('Movie', Movie);

    Movie.$inject = ['$resource'];

    function Movie ($resource) {
        var resourceUrl =  'api/movies/public/:id';

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
    };

    angular
        .module('csc510ProjectApp')
        .factory('MovieUpdate', MovieUpdate);

    MovieUpdate.$inject = ['$resource'];

    function MovieUpdate ($resource) {
        var resourceUrl =  'api/movies/:id';

        return $resource(resourceUrl, {}, {
            'update': { method:'PUT' }
        });
    };



    angular
        .module('csc510ProjectApp')
        .factory('MovieQuestionaire', MovieQuestionaire);

    MovieQuestionaire.$inject = ['$resource'];

    function MovieQuestionaire($resource) {
        var service = $resource('api/movies/submitQuestionaire', {}, {
            'update': { method:'POST' }
        });

        return service;
    }
})();
