(function(window, document) {
    'use strict';

    var listOfProjects = {};

    window.addEventListener('load', function(ev) {
    });

    window.ui.events.onAfterSubmittingAddProjectForm = function(data) {
        var project     = new Project(data['PROJECT_NAME']);
        var projectData = project.getProject();
        var version     = new Version();

        project.versionInit(version);

        listOfProjects[projectData.projectID] = project;

        return {
            'PROJECT_NAME' : projectData.projectName,
            'PROJECT_ID'   : projectData.projectID,
            'VERSIONS'     : [{
                version : project.version.getVersion()
            }]
        };
    };

    window.ui.events.onAfterSubmittingVersionUpdateForm = function(data) {
        var project     = listOfProjects[data['PROJECT_ID']];
        var projectData = project.getProject();

        switch(data['VERSION']) {
            case 'MAJOR':
                project.version.major();
                break;
            case 'MINOR':
                project.version.minor();
                break;
            case 'PATCH':
                project.version.patch();
                break;
            case 'PRERELEASE':
                break;
            case 'METADATA':
                break;
        }

        return {
            'PROJECT_NAME' : projectData.projectName,
            'PROJECT_ID'   : projectData.projectID,
            'VERSIONS'     : project.version.getVersions()
        };
    };

    window.ui.events.onAfterClickBtnDeleteProject = function(data) {
        if(listOfProjects[data['PROJECT_ID']]) {
            delete listOfProjects[data['PROJECT_ID']];
        }

        return {};
    };
})(window, document);
