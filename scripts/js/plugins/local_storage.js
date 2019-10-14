(function(window, document) {
    'use strict';

    function LocalStorage() {
    }

    LocalStorage.prototype.set = function(parameter, value) {
        if(parameter && value) {
            window.localStorage.setItem(parameter, value);
        }
    };

    LocalStorage.prototype.get = function(parameter) {
        if(parameter) {
            return window.localStorage.getItem(parameter);
        }
    };

    LocalStorage.prototype.remove = function(parameter) {
        if(parameter) {
            window.localStorage.removeItem(parameter);
        }
    };

    window.LocalStorage = window.LocalStorage || new LocalStorage;
})(window, document);
