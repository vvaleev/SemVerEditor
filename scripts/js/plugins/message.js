(function(win, doc, $) {
    'use strict';

    if(typeof $ !== 'function') {
        return false;
    }

    function Message() {}

    Message.prototype.Init = function() {
        var self = this;

        self.messageBox      = $('[data-message-box="message-box"]');
        self.messageBoxValue = $('[data-message-box-value="message-box-value"]');
    };

    Message.prototype.messageBoxShow = function(value, id) {
        var self = this;

        if(!value || !id || typeof self.messageBox !== 'object' || typeof self.messageBoxValue !== 'object' || !self.messageBox.length || !self.messageBoxValue.length || self.messageBox.length !== self.messageBoxValue.length) {
            return false;
        }

        self.messageBoxValue.each(function() {
            var $this = $(this);

            if($this.data('message-box-id') === id && $this.html() !== value) {
                $this.html(value);
            }
        });

        self.messageBox.each(function() {
            var $this = $(this);

            if($this.data('message-box-id') === id && $this.hasClass('hidden')) {
                $this.removeClass('hidden');
            }
        });
    };

    Message.prototype.messageBoxHide = function(id) {
        var self = this;

        if(!id || typeof self.messageBox !== 'object' || typeof self.messageBoxValue !== 'object' || !self.messageBox.length || !self.messageBoxValue.length || self.messageBox.length !== self.messageBoxValue.length) {
            return false;
        }

        self.messageBoxValue.each(function() {
            var $this = $(this);

            if($this.data('message-box-id') === id && $this.html()) {
                $this.html(null);
            }
        });

        self.messageBox.each(function() {
            var $this = $(this);

            if($this.data('message-box-id') === id && !$this.hasClass('hidden')) {
                $this.addClass('hidden');
            }
        });
    };

    win.Message = win.Message || new Message;
})(window, document, jQuery);
