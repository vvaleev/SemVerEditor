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

    Form.prototype.initAjaxForm = function(idForm, callback) {
        if(typeof idForm !== 'string' || typeof callback !== 'function') {
            return false;
        }

        var self = this;
        var formElement;
        var $btnSubmit;
        var formUrl;

        $(doc).on('submit', '[data-ajax-form="' + idForm + '"]', function(e) {
            e.preventDefault();

            formElement = this;

            if(!self.formValidate(formElement)) {
                return false;
            }

            $btnSubmit = $(formElement).find('[data-loading-text]');
            formUrl    = (typeof formElement.action !== 'undefined') ? formElement.action : null;

            Message.messageBoxHide(idForm + ':info');
            Message.messageBoxHide(idForm + ':success');
            Message.messageBoxHide(idForm + ':danger');

            if(formUrl) {
                $btnSubmit.button('loading');

                $.ajax({
                    url         : formUrl,
                    data        : new FormData(formElement),
                    dataType    : 'json',
                    type        : 'post',
                    timeout     : 15000,
                    cache       : false,
                    contentType : false,
                    processData : false
                }).done(function(response) {
                    $btnSubmit.button('reset');

                    if(typeof response === 'object' && typeof response['RESPONSE'] === 'object' && Object.keys(response['RESPONSE']).length) {
                        if(Array.isArray(response['RESPONSE']['ERROR_MESSAGES']) && response['RESPONSE']['ERROR_MESSAGES'].length) {
                            Message.messageBoxShow(response['RESPONSE']['ERROR_MESSAGES'].join('<br />'), idForm + ':danger');
                        }
                        else {
                            if(response['RESPONSE']['ERROR_MESSAGE']) {
                                Message.messageBoxShow(response['RESPONSE']['ERROR_MESSAGE'], idForm + ':danger');
                            }
                            else {
                                if(response['RESPONSE']['SUCCESS_MESSAGE']) {
                                    Message.messageBoxShow(response['RESPONSE']['SUCCESS_MESSAGE'], idForm + ':success');
                                }
                                else {
                                    if(response['RESPONSE']['INFO_MESSAGE']) {
                                        Message.messageBoxShow(response['RESPONSE']['INFO_MESSAGE'], idForm + ':info');
                                    }
                                }
                            }
                        }
                    }

                    callback(response, formElement);
                });
            }
        });
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
