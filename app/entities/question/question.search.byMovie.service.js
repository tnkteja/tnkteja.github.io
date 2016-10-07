(function() {
    'use strict';

    angular
        .module('csc510ProjectApp')
        .factory('QuestionSearch', QuestionSearch);

    QuestionSearch.$inject = ['$resource'];

    function QuestionSearch($resource) {
        var resourceUrl =  'api/_search/questions/x/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
