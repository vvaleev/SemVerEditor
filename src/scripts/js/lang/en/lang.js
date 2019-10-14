(function(window, document) {
    'use strict';

    var messages = {
        'CAPTIONS'                : {
            'TITLE'           : 'Project version designer',
            'PROJECT'         : 'Project title',
            'PROJECT_CHANGES' : 'Changes in the project',
            'DATE'            : 'Date',
            'VERSION'         : 'Versions'
        },
        'BUTTONS'                 : {
            'ADD_PROJECT' : 'Add a project',
            'ADD'         : 'Add',
            'EDIT'        : 'Edit',
            'UPDATE'      : 'Update',
            'DELETE'      : 'Remove',
            'PRERELEASE'  : 'Add/Upgrade or change pre-release version',
            'METADATA'    : 'Add/Edit metadata'
        },
        'VERSIONS'                : {
            'MAJOR'      : 'Major version',
            'MINOR'      : 'Minor version',
            'PATCH'      : 'Patch-version',
            'PRERELEASE' : 'Pre-release version',
            'METADATA'   : 'Metadata'
        },
        'PROJECT_CHANGES_OPTIONS' : {
            'MAJOR_OPTION'      : {
                'NAME'        : 'Added a backwards incompatible change',
                'DESCRIPTION' : ['if method names are changed', 'if the project structure or data structure is changed']
            },
            'MINOR_OPTION'      : {
                'NAME'        : 'Added backward compatible changes',
                'DESCRIPTION' : ['if new methods are added', 'if new directories are added in the project structure',
                                 'if new fields are added to the output data structure',
                                 'if any functionality is marked as deprecated (deprecated)',
                                 'if significant improvements have been made to the private code',
                                 'if you have made edits that result in incompatible changes, such as removing outdated (but maybe used by someone) features',
                                 'if you have made edits that have resulted in incompatible changes, such as, for example, expanding the semantics of system components (for example, adding new, mandatory function arguments), etc.']
            },
            'PATCH_OPTION'      : {
                'NAME'        : 'Backward compatible fixes have been made',
                'DESCRIPTION' : ['if you have made changes related to bug fixes (internal changes that correct incorrect behavior, do not break anything, but do not add new features)']
            },
            'PRERELEASE_OPTION' : {
                'NAME'        : '',
                'DESCRIPTION' : ['used instead of tags to " tag " certain milestones in development. Usually these are "alpha”, "beta", " release candidate” ("rc") and derivatives of them']
            },
            'METADATA_OPTION'   : {
                'NAME'        : '',
                'DESCRIPTION' : ['used to specify an Assembly\'s metadata']
            }
        }
    };

    window.messages = window.messages || messages;
})(window, document);
