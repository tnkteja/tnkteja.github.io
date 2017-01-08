(function() {
    'use strict';
    angular
        .module('csc510ProjectApp')
        .factory('Review', Review);

    Review.$inject = ['$resource'];

    function Review ($resource) {
        var resourceUrl =  'api/reviews/:id';

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
        .factory('ReviewForMovie', ReviewForMovie);

    ReviewForMovie.$inject = ['$resource'];

    function ReviewForMovie ($resource) {
        var resourceUrl =  'api/reviews/movie/:id';

        return $resource(resourceUrl, {id: '@id'}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (!!data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }
})();
