(function(window, document) {
    'use strict';

    var listOfProjects = {};
    var semverData     = {};

    window.addEventListener('load', function(ev) {
    });

    window.ui.events.onAfterLoadingDocument = function() {
        var data = getSavedData();

        var project     = new Project(data['PROJECT_NAME'], data['PROJECT_ID']);
        var projectData = project.getProject();
        var version     = new Version();
        var listVersions;

        version.setVersions(data['VERSIONS']);
        listVersions = version.getVersions();
        version.setVersion(listVersions[listVersions.length - 1].version);
        project.versionInit(version);

        listOfProjects[projectData.projectID] = project;

        return data;
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
        var project      = listOfProjects[data['PROJECT_ID']];
        var projectData  = {};
        var listVersions = [];

        if(project) {
            projectData = project.getProject();

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

            listVersions = [].concat(project.version.getVersions());

            saveData(projectData.projectID, true);
        }

        return {
            'PROJECT_NAME' : projectData.projectName,
            'PROJECT_ID'   : projectData.projectID,
            'VERSIONS'     : listVersions
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
        var project = listOfProjects[projectID];
        var projectData;
        var data    = {};

        if(project) {
            projectData = project.getProject();
            data        = {
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

            for(var pID in semverData) {
                if(semverData.hasOwnProperty(pID)) {
                    if(pID !== projectID) {
                        semverData[pID]['IS_CURRENT'] = !isCurrent;
                    }
                }
            }
        }

        LocalStorage.set('SEMVER_DATA', JSON.stringify(semverData));
    }

    function getSavedData() {
        var data               = LocalStorage.get('SEMVER_DATA');
        var currentProjectData = {};

        try {
            data = JSON.parse(data);

            for(var projectID in data) {
                if(data.hasOwnProperty(projectID)) {
                    semverData[projectID] = {
                        'PROJECT_NAME' : data[projectID]['PROJECT_NAME'],
                        'PROJECT_ID'   : data[projectID]['PROJECT_ID'],
                        'VERSIONS'     : data[projectID]['VERSIONS'],
                        'IS_CURRENT'   : data[projectID]['IS_CURRENT']
                    };

                    if(semverData[projectID]['IS_CURRENT']) {
                        currentProjectData = semverData[projectID];
                    }
                }
            }
        }
        catch(e) {
        }

        return currentProjectData;
    }

    function removeSavedData(projectID) {
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
