import { module as _module } from 'angular';
import { findIndex, pull } from 'lodash';

var moduleName = 'drc.services.filter';
export default moduleName;

var filters = [];

_module(moduleName, [])
.factory('filter', ['$rootScope', function ($rootScope) {
    var addFilter = function (name) {
        if(findIndex(filters, {name: name}) !== -1) {
            return findIndex(filters, {name: name});
        }

        filters.push({
            name: name,
            items: []
        });

        return findIndex(filters, {name: name});
    };

    return {
        add: function (collection, item) {
            var collectionIndex = addFilter(collection);

            if(filters[collectionIndex].items.indexOf(item) !== -1) {
                return;
            }

            filters[collectionIndex].items.push(item);
        },
        remove: function (collection, item) {
            var collectionIndex = addFilter(collection);
            pull(filters[collectionIndex].items, item);
        },
        clear: function (collection) {
            var collectionIndex = addFilter(collection);
            filters[collectionIndex].items = [];
        },
        contains: function (collection, condition) {
            var collectionIndex = addFilter(collection);

            return (findIndex(filters[collectionIndex].items, condition) !== -1);
        },
        get: function (collection) {
            var collectionIndex = addFilter(collection);

            return filters[collectionIndex].items;
        }
    };
}]);