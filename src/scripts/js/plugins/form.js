(function(win, doc, $) {
    'use strict';

    if(typeof $ !== 'function') {
        return false;
    }

    function Form() {}

    Form.prototype.formValidate = function(formElement) {
        if(typeof formElement !== 'object' || typeof formElement.nodeName === 'undefined' || formElement.nodeName !== 'FORM') {
            return false;
        }

        var flag = true;
        var $formElement;

        $(formElement).find('[data-required="true"]').each(function() {
            $formElement = $(this);

            if(!$formElement.val()) {
                flag = false;
                $formElement.css({'border' : '1px solid red'});
            }
            else {
                $formElement.css({'border' : ''});
            }
        });

        return flag;
    };

    Form.prototype.initForm = function(idForm, callback) {
        if(typeof idForm !== 'string' || typeof callback !== 'function') {
            return false;
        }

        var self = this;
        var formElement;
        var $btnSubmit;
        var formData;
        var data = {};

        $(doc).on('submit', '[data-form="' + idForm + '"]', function(e) {
            e.preventDefault();

            formElement = this;

            if(!self.formValidate(formElement)) {
                return false;
            }

            $btnSubmit = $(formElement).find('[data-loading-text]');
            formData   = new FormData(formElement);

            $btnSubmit.button('loading');

            setTimeout(function() {
                formData.forEach(function(value, key) {
                    data[key] = value;
                });

                callback(data, formElement);

                $btnSubmit.button('reset');
            }, 24);
        });
    };

    win.Form = win.Form || new Form;
})(window, document, jQuery);
