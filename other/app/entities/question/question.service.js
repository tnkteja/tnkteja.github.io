(function () {
    'use strict';
    angular
        .module('csc510ProjectApp')
        .factory('Question', Question);

    Question.$inject = ['$resource', '$stateParams'];

    function Question($resource, $stateParams) {
        var resourceUrl = 'api/questions/:id';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    // var answerChoices = JSON.parse(data.answer);
                    //
                    // $.each(answerChoices, function (i, v) {
                    //     $.extend(v, {
                    //         weight: v.weight || 0,
                    //        // selected: false,
                    //         answerCount: v.answerCount || 0
                    //     });
                    // });

                    data = $.extend(data, {
                        parentMovieId: $stateParams.mId,
                      //  answerChoices: answerChoices,
                        selectedAnswer: null,
                    })
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    }
})();
