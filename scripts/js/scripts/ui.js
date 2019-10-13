(function(window, document) {
    'use strict';

    var element    = window.Element;
    var semverData = {};
    var domSemverTitle;
    var domSemverProjectCaption;
    var domSemverStartScreen;
    var domSemverSecondScreen;
    var domSemverThirdScreen;
    var domSemverStartButton;
    var domSemverUpdateButton;
    var domSemverAddButton;
    var domSemverColumn1;
    var domSemverColumn2;
    var domSemverTableBody;
    var domSemverTableBodyTemplate;
    var domSemverFormVersionsBody;
    var domSemverFormVersionsBodyTemplate;
    var domSemverModalAddProjectBodyTemplate;

    window.addEventListener('load', function(ev) {
        //semverData['PROJECT_NAME'] = 'PROJECT_NAME';
        //semverData['VERSIONS']     = [{
        //    version : '1.0.0'
        //}, {
        //    version : '1.0.1'
        //}, {
        //    version : '1.0.2'
        //}, {
        //    version : '1.0.3'
        //}];

        initDomElements();
        initHandlers();
        render();
    });

    element.prototype.setInnerText = function(text) {
        if(text) {
            if(this && this instanceof HTMLElement) {
                if(typeof this.innerText !== 'undefined') {
                    this.innerText = text;
                }
            }
        }
    };

    element.prototype.setInnerHTML = function(HTML) {
        if(HTML) {
            if(this && this instanceof HTMLElement) {
                if(typeof this.innerHTML !== 'undefined') {
                    this.innerHTML = HTML;
                }
            }
        }
    };

    element.prototype.getInnerText = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.innerText !== 'undefined' && this.innerText) {
                return this.innerText;
            }
        }
    };

    element.prototype.getInnerHTML = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.innerHTML !== 'undefined' && this.innerHTML) {
                return this.innerHTML;
            }
        }
    };

    element.prototype.hide = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.style !== 'undefined') {
                if(this.style.display !== 'none') {
                    this.style.display = 'none';
                }
            }
        }
    };

    element.prototype.show = function() {
        if(this && this instanceof HTMLElement) {
            if(typeof this.style !== 'undefined') {
                if(this.style.display === 'none') {
                    this.style.display = null;
                }
            }
        }
    };

    function initDomElements() {
        domSemverTitle                       = document.querySelector('[data-semver="title"]');
        domSemverProjectCaption              = document.querySelector('[data-semver="project-caption"]');
        domSemverStartScreen                 = document.querySelector('[data-semver="start-screen"]');
        domSemverSecondScreen                = document.querySelector('[data-semver="second-screen"]');
        domSemverThirdScreen                 = document.querySelector('[data-semver="third-screen"]');
        domSemverStartButton                 = document.querySelector('[data-semver="start-button"]');
        domSemverUpdateButton                = document.querySelector('[data-semver="update-button"]');
        domSemverAddButton                   = document.querySelector('[data-semver="add-button"]');
        domSemverColumn1                     = document.querySelector('[data-semver="column-1"]');
        domSemverColumn2                     = document.querySelector('[data-semver="column-2"]');
        domSemverTableBody                   = document.querySelector('[data-semver="table-body"]');
        domSemverTableBodyTemplate           = document.querySelector('[data-semver="table-body-template"]');
        domSemverFormVersionsBody            = document.querySelector('[data-semver="form-versions-body"]');
        domSemverFormVersionsBodyTemplate    = document.querySelector('[data-semver="form-versions-body-template"]');
        domSemverModalAddProjectBodyTemplate = document.querySelector('[data-semver="modal-add-project-body-template"]');
    }

    function initHandlers() {
        Form.initForm('add-project', function(data) {
            if(typeof data === 'object' && data['PROJECT_NAME']) {
                Modal.close();

                semverData['PROJECT_NAME'] = data['PROJECT_NAME'];
                semverData['VERSIONS']     = [{
                    version : '0.1.0'
                }];

                setTimeout(render, 24);
            }
        });

        Form.initForm('update-version', function(data) {
            if(typeof data === 'object' && data['VERSION']) {
                switch(data['VERSION']) {
                    case 'MAJOR':
                    case 'MINOR':
                    case 'PATCH':

                        setTimeout(render, 24);
                        break;
                    case 'PRERELEASE':
                        break;
                    case 'METADATA':
                        break;
                }
            }
        });

        domSemverStartButton && (domSemverStartButton.onclick = function(ev) {
            ev.preventDefault();

            Modal.options.focus = '[name="PROJECT_NAME"]';
            Modal.open(domSemverModalAddProjectBodyTemplate, 'inline');
        });
    }

    function render() {
        domSemverTitle && domSemverTitle.setInnerText(messages['CAPTIONS']['TITLE']);
        domSemverStartButton && domSemverStartButton.setInnerText(messages['BUTTONS']['ADD_PROJECT']);
        domSemverUpdateButton && domSemverUpdateButton.setInnerText(messages['BUTTONS']['UPDATE']);
        domSemverAddButton && domSemverAddButton.setInnerText(messages['BUTTONS']['ADD']);
        domSemverColumn1 && domSemverColumn1.setInnerText(messages['CAPTIONS']['DATE']);
        domSemverColumn2 && domSemverColumn2.setInnerText(messages['CAPTIONS']['VERSION']);

        domSemverModalAddProjectBodyTemplate && domSemverModalAddProjectBodyTemplate.setInnerHTML(renderTemplate(['{{PROJECT_NAME}}'], [messages['CAPTIONS']['PROJECT']], domSemverModalAddProjectBodyTemplate.getInnerHTML()));

        if(semverData['PROJECT_NAME']) {
            domSemverProjectCaption && domSemverProjectCaption.setInnerText(semverData['PROJECT_NAME']);

            domSemverStartScreen && domSemverStartScreen.hide();
            domSemverSecondScreen && domSemverSecondScreen.show();
            domSemverThirdScreen && domSemverThirdScreen.show();

            if(semverData['VERSIONS'] && semverData['VERSIONS'] instanceof Array && semverData['VERSIONS'].length) {
                renderTemplateTableBody(semverData['VERSIONS'].reverse());

                renderTemplateFormVersionsBody([{
                    versionName        : messages['VERSIONS']['MAJOR'],
                    versionDescription : messages['PROJECT_CHANGES_OPTIONS']['MAJOR_OPTION']['DESCRIPTION'].join('; <br />'),
                    versionOption      : messages['PROJECT_CHANGES_OPTIONS']['MAJOR_OPTION']['NAME'],
                    versionOptionValue : 'MAJOR'
                }, {
                    versionName        : messages['VERSIONS']['MINOR'],
                    versionDescription : messages['PROJECT_CHANGES_OPTIONS']['MINOR_OPTION']['DESCRIPTION'].join('; <br />'),
                    versionOption      : messages['PROJECT_CHANGES_OPTIONS']['MINOR_OPTION']['NAME'],
                    versionOptionValue : 'MINOR'
                }, {
                    versionName        : messages['VERSIONS']['PATCH'],
                    versionDescription : messages['PROJECT_CHANGES_OPTIONS']['PATCH_OPTION']['DESCRIPTION'].join('; <br />'),
                    versionOption      : messages['PROJECT_CHANGES_OPTIONS']['PATCH_OPTION']['NAME'],
                    versionOptionValue : 'PATCH'
                }, {
                    //versionName        : messages['VERSIONS']['PRERELEASE'],
                    //versionDescription : messages['PROJECT_CHANGES_OPTIONS']['PRERELEASE_OPTION']['DESCRIPTION'].join('; <br />'),
                    //versionOption      : messages['BUTTONS']['PRERELEASE'],
                    //versionOptionValue : 'PRERELEASE'
                }, {
                    //versionName        : messages['VERSIONS']['METADATA'],
                    //versionDescription : messages['PROJECT_CHANGES_OPTIONS']['METADATA_OPTION']['DESCRIPTION'].join('; <br />'),
                    //versionOption      : messages['BUTTONS']['METADATA'],
                    //versionOptionValue : 'METADATA'
                }]);
            }
        }
    }

    function renderTemplate(templates, values, data) {
        if(templates && templates instanceof Array && templates.length && values && values instanceof Array && values.length) {
            if(templates.length === values.length) {
                if(data) {
                    for(var key in templates) {
                        if(templates.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                            data = data.replace(templates[key], values[key]);
                        }
                    }
                }
            }
        }

        return data;
    }

    function renderTemplateTableBody(data) {
        var template     = domSemverTableBodyTemplate && domSemverTableBodyTemplate.getInnerHTML();
        var date         = new Date();
        var dateData     = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
        var templates;
        var values;
        var templateData = '';

        if(template && data && data instanceof Array) {
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    if(typeof data[key] === 'object') {
                        if(data[key].version) {
                            templates = ['{{VERSION}}', '{{DATE}}', '{{CLASS_NAME}}'];
                            values    = [data[key].version, dateData,
                                         (key === '0') ? 'semver__content_active-column' : ''];
                            templateData += renderTemplate(templates, values, template);
                        }
                    }
                }
            }

            if(templateData) {
                domSemverTableBody && domSemverTableBody.setInnerHTML(templateData);
            }
        }
    }

    function renderTemplateFormVersionsBody(data) {
        var template     = domSemverFormVersionsBodyTemplate && domSemverFormVersionsBodyTemplate.getInnerHTML();
        var templates;
        var values;
        var templateData = '';

        if(template && data && data instanceof Array) {
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    if(typeof data[key] === 'object') {
                        if(data[key].versionName && data[key].versionDescription && data[key].versionOption && data[key].versionOptionValue) {
                            templates = ['{{VERSION_NAME}}', '{{VERSION_DESCRIPTION}}', '{{VERSION_OPTION}}',
                                         '{{VERSION_OPTION_VALUE}}'];
                            values    = [data[key].versionName, data[key].versionDescription, data[key].versionOption,
                                         data[key].versionOptionValue];
                            templateData += renderTemplate(templates, values, template);
                        }
                    }
                }
            }

            if(templateData) {
                domSemverFormVersionsBody && domSemverFormVersionsBody.setInnerHTML(templateData);
            }
        }
    }
})(window, document);
