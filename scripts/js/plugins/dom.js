(function(window, document) {
    'use strict';

    var Element = window.Element;

    Element.prototype.setInnerText = function(text) {
        if(text) {
            if(this && this instanceof HTMLElement) {
                if(typeof this.innerText !== 'undefined') {
                    this.innerText = text;
                }
            }
        }
    };

    Element.prototype.setInnerHTML = function(HTML) {
        if(HTML) {
            if(this && this instanceof HTMLElement) {
                if(typeof this.innerHTML !== 'undefined') {
                    this.innerHTML = HTML;
                }
            }
        }
    };

    Element.prototype.getInnerText = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.innerText !== 'undefined' && this.innerText) {
                return this.innerText;
            }
        }
    };

    Element.prototype.getInnerHTML = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.innerHTML !== 'undefined' && this.innerHTML) {
                return this.innerHTML;
            }
        }
    };

    Element.prototype.hide = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.style !== 'undefined') {
                if(this.style.display !== 'none') {
                    this.style.display = 'none';
                }
            }
        }
    };

    Element.prototype.show = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.style !== 'undefined') {
                if(this.style.display === 'none') {
                    this.style.display = null;
                }
            }
        }
    };
})(window, document);
