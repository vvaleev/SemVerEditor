(function(win, doc, $) {
    'use strict';

    if(typeof $ !== 'function' || typeof $.magnificPopup !== 'object') {
        return false;
    }

    function Modal() {
        var self = this;

        self.options = {};
    }

    Modal.prototype.init = function(selector, type) {
        if(!selector || !type) {
            return false;
        }

        var self    = this;
        var options = {
            type : type
        };

        if(typeof self.options === 'object') {
            options = $.extend(options, self.options);
        }

        $(selector).magnificPopup(options);
    };

    Modal.prototype.open = function(selector, type) {
        if(!selector || !type) {
            return false;
        }

        var self    = this;
        var options = {
            items : {
                src  : selector,
                type : type
            }
        };

        if(typeof self.options === 'object') {
            options = $.extend(options, self.options);
        }

        $.magnificPopup.open(options);
    };

    Modal.prototype.loadAjax = function(url, ajaxContentAddedCallBack) {
        if(!url) {
            return false;
        }

        var self    = this;
        var options = {
            items     : {
                src  : url,
                type : 'ajax'
            },
            callbacks : {
                'ajaxContentAdded' : function() {
                    if(typeof ajaxContentAddedCallBack === 'function') {
                        ajaxContentAddedCallBack();
                    }
                }
            }
        };

        if(typeof self.options === 'object') {
            options = $.extend(options, self.options);
        }

        $.magnificPopup.open(options);
    };

    win.Modal = win.Modal || new Modal;
})(window, document, jQuery);
