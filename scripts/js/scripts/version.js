(function(window, document) {
    'use strict';

    var versionPattern  = new RegExp(/(?:(\d+)\.(\d+)\.?(\d+)?)-?(\w[^+=\n\.]+|\w)?\.?(\d+)?\+?(\w[^+=\n]+)?/);
    var versionTemplate = '{{MAJOR}}.{{MINOR}}.{{PATCH}}-{{PRERELEASE}}.{{PRERELEASE_NUMBER}}+{{METADATA}}';

    versionTemplate = '{{MAJOR}}.{{MINOR}}.{{PATCH}}';

    function Version(version) {
        var self = this;

        self._defaultVersion = '0.1.0';
        self._currentVersion = self._defaultVersion;
        self._listVersions   = [];

        if(isValidate(version)) {
            self._currentVersion = getValidData.call(self, version);
        }

        self._listVersions.push({
            version : self._currentVersion
        });

        return self;
    }

    Version.prototype.getVersion = function() {
        return this._currentVersion;
    };

    Version.prototype.getVersions = function() {
        return this._listVersions;
    };

    Version.prototype.major = function() {
        var self = this;

        major.call(self, major.call(self) + 1);
        minor.call(self, 0);
        patch.call(self, 0);

        self._listVersions.push({
            version : self._currentVersion
        });

        return self;
    };

    Version.prototype.minor = function() {
        var self = this;

        minor.call(self, minor.call(self) + 1);
        patch.call(self, 0);

        self._listVersions.push({
            version : self._currentVersion
        });

        return self;
    };

    Version.prototype.patch = function() {
        var self = this;

        patch.call(self, patch.call(self) + 1);

        self._listVersions.push({
            version : self._currentVersion
        });

        return self;
    };

    Version.prototype.prerelease = function(value) {
        var self = this;

        return prerelease.call(self, value);
    };

    Version.prototype.prereleaseNumber = function(value) {
        var self = this;

        return prereleaseNumber.call(self, value);
    };

    Version.prototype.metadata = function(value) {
        var self = this;

        return metadata.call(self, value);
    };

    function isValidate(version) {
        if(version && versionPattern.test(version)) {
            return true;
        }

        return false;
    }

    function getValidData(version) {
        var self        = this;
        var versionData = getVersionData(parseVersion(version));

        versionData['MAJOR']             = major.call(self, versionData['MAJOR']);
        versionData['MINOR']             = minor.call(self, versionData['MINOR']);
        versionData['PATCH']             = patch.call(self, versionData['PATCH']);
        versionData['PRERELEASE']        = prerelease.call(self, versionData['PRERELEASE']);
        versionData['PRERELEASE_NUMBER'] = prereleaseNumber.call(self, versionData['PRERELEASE_NUMBER']);
        versionData['METADATA']          = metadata.call(self, versionData['METADATA']);

        return convertVersionDataToString(versionData);
    }

    function parseVersion(version) {
        var versionData = [];

        if(version) {
            versionData = version.match(versionPattern);
        }

        return versionData;
    }

    function getVersionData(versionData) {
        if(!versionData || !(versionData instanceof Array)) {
            versionData = [];
        }

        return {
            'MAJOR'             : versionData[1],
            'MINOR'             : versionData[2],
            'PATCH'             : versionData[3],
            'PRERELEASE'        : versionData[4],
            'PRERELEASE_NUMBER' : versionData[5],
            'METADATA'          : versionData[6]
        };
    }

    function major(value) {
        var self        = this;
        var versionData = {};

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(typeof value !== 'undefined') {
            versionData['MAJOR'] = Number(value);

            self._currentVersion = convertVersionDataToString(versionData);
        }

        return (versionData['MAJOR']) ? Number(versionData['MAJOR']) : undefined;
    }

    function minor(value) {
        var self        = this;
        var versionData = {};

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(typeof value !== 'undefined') {
            versionData['MINOR'] = Number(value);

            self._currentVersion = convertVersionDataToString(versionData);
        }

        return (versionData['MINOR']) ? Number(versionData['MINOR']) : undefined;
    }

    function patch(value) {
        var self        = this;
        var versionData = {};

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(typeof value !== 'undefined') {
            versionData['PATCH'] = Number(value);

            self._currentVersion = convertVersionDataToString(versionData);
        }

        return (versionData['PATCH']) ? Number(versionData['PATCH']) : undefined;
    }

    function prerelease(value) {
        var self        = this;
        var versionData = {};
        var key;
        var index       = 0;
        var listStages  = ['pre-alpha', 'alpha', 'beta', 'release candidate', 'pa', 'a', 'b', 'rc'];

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(value) {
            for(key in listStages) {
                if(listStages.hasOwnProperty(key)) {
                    if(value === listStages[key]) {
                        index++;
                    }
                }
            }

            if(index === 1) {
                versionData['PRERELEASE'] = String(value);

                self._currentVersion = convertVersionDataToString(versionData);
            }
        }

        return (versionData['PRERELEASE'] && index === 1 || versionData['PRERELEASE'] && !value) ? String(versionData['PRERELEASE']) : undefined;
    }

    function prereleaseNumber(value) {
        var self        = this;
        var versionData = {};

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(value) {
            versionData['PRERELEASE_NUMBER'] = Number(value);

            self._currentVersion = convertVersionDataToString(versionData);
        }

        return (versionData['PRERELEASE_NUMBER']) ? Number(versionData['PRERELEASE_NUMBER']) : undefined;
    }

    function metadata(value) {
        var self        = this;
        var versionData = {};

        if(self._currentVersion) {
            versionData = getVersionData(parseVersion(self._currentVersion));
        }

        if(value) {
            versionData['METADATA'] = String(value);

            self._currentVersion = convertVersionDataToString(versionData);
        }

        return (versionData['METADATA']) ? String(versionData['METADATA']) : undefined;
    }

    function convertVersionDataToString(versionData) {
        var version = versionTemplate;

        if(versionData && typeof versionData === 'object') {
            if(versionData['MAJOR']) {
                version = version.replace('{{MAJOR}}', versionData['MAJOR']);
            }
            else {
                version = version.replace('{{MAJOR}}', 0);
            }

            if(versionData['MINOR']) {
                version = version.replace('{{MINOR}}', versionData['MINOR']);
            }
            else {
                version = version.replace('{{MINOR}}', 0);
            }

            if(versionData['PATCH']) {
                version = version.replace('{{PATCH}}', versionData['PATCH']);
            }
            else {
                version = version.replace('{{PATCH}}', 0);
            }

            if(versionData['PRERELEASE']) {
                version = version.replace('{{PRERELEASE}}', versionData['PRERELEASE']);
            }
            else {
                version = version.replace('{{PRERELEASE}}', 'pre-alpha');
            }

            if(versionData['PRERELEASE_NUMBER']) {
                version = version.replace('{{PRERELEASE_NUMBER}}', versionData['PRERELEASE_NUMBER']);
            }
            else {
                version = version.replace('{{PRERELEASE_NUMBER}}', 1);
            }

            if(versionData['METADATA']) {
                version = version.replace('{{METADATA}}', versionData['METADATA']);
            }
            else {
                version = version.replace('{{METADATA}}', 'SemVerEditor');
            }
        }

        return version;
    }

    window.Version = window.Version || Version;
})(window, document);
