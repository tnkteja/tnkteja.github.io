(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .factory('CriticSearch', CriticSearch);

    CriticSearch.$inject = ['$resource'];

    function CriticSearch($resource) {
        var resourceUrl =  'api/_search/critics/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
