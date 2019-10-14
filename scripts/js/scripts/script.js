(function(window, document) {
    'use strict';

    var listOfProjects = {};
    var semverData     = {};

    window.addEventListener('load', function(ev) {
    });

    window.ui.events.onAfterLoadingDocument = function() {
        return getSavedData();
    };

    window.ui.events.onAfterSubmittingAddProjectForm = function(data) {
        var project     = new Project(data['PROJECT_NAME']);
        var projectData = project.getProject();
        var version     = new Version();

        project.versionInit(version);

        listOfProjects[projectData.projectID] = project;

        saveData(projectData.projectID, true);

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

        saveData(projectData.projectID, true);

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

        removeSavedData(data['PROJECT_ID']);

        return {};
    };

    function saveData(projectID, isCurrent) {
        var project     = listOfProjects[projectID];
        var projectData = project.getProject();
        var data        = {};

        if(project) {
            data = {
                'PROJECT_NAME' : projectData.projectName,
                'PROJECT_ID'   : projectData.projectID,
                'VERSIONS'     : project.version.getVersions()
            };

            if(isCurrent === true) {
                data['IS_CURRENT'] = true;
            }
            else {
                data['IS_CURRENT'] = false;
            }

            semverData[projectID] = data;
        }

        LocalStorage.set('SEMVER_DATA', JSON.stringify(semverData));
    }

    function getSavedData() {
        var data               = LocalStorage.get('SEMVER_DATA');
        var project;
        var projectData;
        var version;
        var currentProjectData = {};

        try {
            data = JSON.parse(data);

            for(var projectID in data) {
                if(data.hasOwnProperty(projectID)) {
                    project     = new Project(data[projectID]['PROJECT_NAME']);
                    projectData = project.getProject();
                    version     = new Version(data[projectID]['VERSIONS'][data[projectID]['VERSIONS'].length - 1]);

                    project.versionInit(version);

                    listOfProjects[projectData.projectID] = project;

                    if(data[projectID]['IS_CURRENT']) {
                        currentProjectData = data[projectID];
                    }
                }
            }
        }
        catch(e) {
            data = {};
        }

        return currentProjectData;
    }

    function removeSavedData(projectID) {
        debugger;

        var data = LocalStorage.get('SEMVER_DATA');

        try {
            data = JSON.parse(data);

            if(data[projectID]) {
                delete data[projectID];

                LocalStorage.set('SEMVER_DATA', JSON.stringify(data));
            }
        }
        catch(e) {
        }
    }
})(window, document);
