(function(window, document) {
    'use strict';

    function Project(projectName, projectID) {
        var self = this;

        self._defaultProjectName = 'Demo';
        self._currentProjectName = self._defaultProjectName;
        self._currentProjectID   = projectID || generateID();
        self._version            = null;

        if(projectName) {
            self._currentProjectName = projectName;
        }

        return self;
    }

    Project.prototype.getProject = function() {
        var self = this;

        return {
            projectName : self._currentProjectName,
            projectID   : self._currentProjectID
        };
    };

    Project.prototype.versionInit = function(version) {
        var self = this;

        if(typeof version === 'object' && typeof version.getVersion === 'function') {
            if((self._version = version.getVersion())) {
                self.version = version;
            }
        }

        return self;
    };

    function generateID() {
        var id = Math.floor(Math.random() * (1000000 - 9999) + 9999);

        return 'id' + id;
    }

    window.Project = window.Project || Project;
})(window, document);
