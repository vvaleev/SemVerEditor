(function(window, document) {
    'use strict';

    var url           = window.location.href;
    var urlData       = {};
    var searchParamsString;
    var searchParamsArray;
    var param;
    var paramName;
    var paramValue;
    var parameters    = {};
    var lang          = 'ru';
    var headElement   = document.head;
    var scriptElement = document.createElement('script');

    if(typeof URL !== 'undefined') {
        urlData = new URL(url);
        param   = urlData.searchParams.get('lang');

        if(param) {
            lang = param;
        }
    }
    else {
        urlData = document.createElement('a');

        urlData.href = url;

        if(urlData.search) {
            searchParamsString = urlData.search.substr(1);
            searchParamsArray  = searchParamsString.split('&');

            for(var key in searchParamsArray) {
                param      = searchParamsArray[key].split('=');
                paramName  = param[0];
                paramValue = param[1];

                parameters[paramName] = paramValue;
            }

            if(parameters['lang']) {
                lang = parameters['lang'];
            }
        }
    }

    scriptElement.src = 'scripts/js/lang/' + lang + '/lang.js';

    if(headElement instanceof HTMLHeadElement) {
        headElement.appendChild(scriptElement);
    }
})(window, document);
