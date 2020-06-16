(function(window, document) {
    'use strict';

    var currentProjectID = 0;
    var semverData       = {};
    var domSemverTitle;
    var domSemverTitleProject;
    var domSemverButtonDeleteProject;
    var domSemverStartScreen;
    var domSemverSecondScreen;
    var domSemverThirdScreen;
    var domSemverButtonToCreateProject;
    var domSemverUpdateButton;
    var domSemverAddButton;
    var domSemverColumn1;
    var domSemverColumn2;
    var domSemverTableBody;
    var domSemverTableBodyTemplate;
    var domSemverFormListBodyVersions;
    var domSemverFormListBodyVersionsTemplate;
    var domSemverAddProjectModalWindowBodyTemplate;

    window.ui = window.ui || {};

    window.ui.events = {
        onAfterLoadingDocument             : function() {
            return {};
        },
        onAfterSubmittingAddProjectForm    : function(data) {
            return {};
        },
        onAfterSubmittingVersionUpdateForm : function(data) {
            return {};
        },
        onAfterClickBtnDeleteProject       : function(data) {
            return {};
        }
    };

    window.addEventListener('load', function(ev) {
        semverData = window.ui.events.onAfterLoadingDocument();

        initDomElements();
        initHandlers();
        render();
    });

    function initDomElements() {
        domSemverTitle                             = document.querySelector('[data-semver="title"]');
        domSemverTitleProject                      = document.querySelector('[data-semver="title-project"]');
        domSemverButtonDeleteProject               = document.querySelector('[data-semver="button-delete-project"]');
        domSemverStartScreen                       = document.querySelector('[data-semver="start-screen"]');
        domSemverSecondScreen                      = document.querySelector('[data-semver="second-screen"]');
        domSemverThirdScreen                       = document.querySelector('[data-semver="third-screen"]');
        domSemverButtonToCreateProject             = document.querySelector('[data-semver="button-to-create-project"]');
        domSemverUpdateButton                      = document.querySelector('[data-semver="update-button"]');
        domSemverAddButton                         = document.querySelector('[data-semver="add-button"]');
        domSemverColumn1                           = document.querySelector('[data-semver="column-1"]');
        domSemverColumn2                           = document.querySelector('[data-semver="column-2"]');
        domSemverTableBody                         = document.querySelector('[data-semver="table-body"]');
        domSemverTableBodyTemplate                 = document.querySelector('[data-semver="table-body-template"]');
        domSemverFormListBodyVersions              = document.querySelector('[data-semver="form-list-body-versions"]');
        domSemverFormListBodyVersionsTemplate      = document.querySelector('[data-semver="form-list-body-versions-template"]');
        domSemverAddProjectModalWindowBodyTemplate = document.querySelector('[data-semver="add-project-modal-window-body-template"]');
    }

    function initHandlers() {
        Form.initForm('add-project', function(data) {
            if(typeof data === 'object' && data['PROJECT_NAME']) {
                Modal.close();

                if(typeof window.ui.events.onAfterSubmittingAddProjectForm === 'function') {
                    semverData = window.ui.events.onAfterSubmittingAddProjectForm({
                        'PROJECT_NAME' : data['PROJECT_NAME']
                    });
                }

                setTimeout(render, 24);
            }
        });

        Form.initForm('update-version', function(data) {
            if(typeof data === 'object' && data['VERSION'] && currentProjectID) {
                if(typeof window.ui.events.onAfterSubmittingVersionUpdateForm === 'function') {
                    semverData = window.ui.events.onAfterSubmittingVersionUpdateForm({
                        'VERSION'    : data['VERSION'],
                        'PROJECT_ID' : currentProjectID
                    });
                }

                setTimeout(render, 24);
            }
        });

        domSemverButtonToCreateProject && (domSemverButtonToCreateProject.onclick = function(ev) {
            ev.preventDefault();

            Modal.options.focus = '[name="PROJECT_NAME"]';
            Modal.open(domSemverAddProjectModalWindowBodyTemplate, 'inline');
        });

        domSemverButtonDeleteProject && (domSemverButtonDeleteProject.onclick = function(ev) {
            ev.preventDefault();

            if(currentProjectID) {
                if(typeof window.ui.events.onAfterClickBtnDeleteProject === 'function') {
                    semverData = window.ui.events.onAfterClickBtnDeleteProject({'PROJECT_ID' : currentProjectID});
                }
            }

            setTimeout(render, 24);
        });
    }

    function render() {
        domSemverTitle && domSemverTitle.setInnerText(messages['CAPTIONS']['TITLE']);
        domSemverButtonToCreateProject && domSemverButtonToCreateProject.setInnerText(messages['BUTTONS']['ADD_PROJECT']);
        domSemverUpdateButton && domSemverUpdateButton.setInnerText(messages['BUTTONS']['UPDATE']);
        domSemverAddButton && domSemverAddButton.setInnerText(messages['BUTTONS']['ADD']);
        domSemverColumn1 && domSemverColumn1.setInnerText(messages['CAPTIONS']['DATE']);
        domSemverColumn2 && domSemverColumn2.setInnerText(messages['CAPTIONS']['VERSION']);

        domSemverAddProjectModalWindowBodyTemplate && domSemverAddProjectModalWindowBodyTemplate.setInnerHTML(renderTemplate(['{{PROJECT_NAME}}'], [messages['CAPTIONS']['PROJECT']], domSemverAddProjectModalWindowBodyTemplate.getInnerHTML()));

        if(semverData['PROJECT_ID']) {
            currentProjectID = semverData['PROJECT_ID'];

            domSemverTitleProject && domSemverTitleProject.setInnerText(semverData['PROJECT_NAME']);

            domSemverStartScreen && domSemverStartScreen.hide();
            domSemverSecondScreen && domSemverSecondScreen.show();
            domSemverThirdScreen && domSemverThirdScreen.show();
            domSemverButtonDeleteProject && domSemverButtonDeleteProject.show();

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
        else {
            domSemverTitleProject && domSemverTitleProject.setInnerText(window.demoProject._currentProjectName);

            domSemverStartScreen && domSemverStartScreen.show();
            domSemverSecondScreen && domSemverSecondScreen.hide();
            domSemverThirdScreen && domSemverThirdScreen.hide();
            domSemverButtonDeleteProject && domSemverButtonDeleteProject.hide();

            renderTemplateTableBody([{
                version : '0.1.0'
            }]);
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
        // var date         = new Date();
        // var dateData     = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
        var templates;
        var values;
        var templateData = '';

        if(template && data && data instanceof Array) {
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    if(typeof data[key] === 'object') {
                        if(data[key].version) {
                            templates = ['{{VERSION}}', /* '{{DATE}}', */ '{{CLASS_NAME}}'];
                            values    = [data[key].version, /* dateData , */
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
        var template     = domSemverFormListBodyVersionsTemplate && domSemverFormListBodyVersionsTemplate.getInnerHTML();
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
                domSemverFormListBodyVersions && domSemverFormListBodyVersions.setInnerHTML(templateData);
            }
        }
    }
})(window, document);
