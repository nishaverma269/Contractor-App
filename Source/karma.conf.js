// Karma configuration
// Generated on Sun Apr 02 2017 13:33:37 GMT-0400 (EDT)
module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '', // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'], // list of files / patterns to load in the browser
        files: [
          'app/bower_components/angular/angular.js'
        , 'app/bower_components/angular-mocks/angular-mocks.js'
        , 'app/bower_components/angular-route/angular-route.js'
        , 'app/bower_components/ng-csv/src/ng-csv/ng-csv.js'
        , 'app/bower_components/angular-sanitize/angular-sanitize.js'
        , 'app/bower_components/angular-sanitize/angular-sanitize.min.js'
        , 'app/bower_components/angular-bootstrap/ui-bootstrap.js'
        , 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
        , 'app/bower_components/angular-bootstrap/ui-bootstrap.min.js'
        , 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        , 'app/bower_components/moment/moment.js'
        , 'app/bower_components/moment/min/moment.min.js'
        , 'app/bower_components/angular-moment/angular-moment.js'
        , 'app/bower_components/angular-moment/angular-moment.min.js'
        , 'node_modules/ng-flat-datepicker/src/js/datepicker.directive.js'
        , 'node_modules/ng-flat-datepicker/src/js/dateCalculator.factory.js'
        , 'app/bower_components/angularfire/dist/angularfire.min.js'
        , 'app/bower_components/angularfire/dist/angularfire.js'
        , 'app/bower_components/firebase/firebase.js'
        , 'app/home/*.js'
        , 'app/register/*.js'
        , 'app/welcome/*.js'
        , 'app/addPost/*.js'
        , 'app/contractorAdmin/*.js'
        , 'app/adminSettings/*.js'
        , 'app/reports/*.js'
        , 'app/showContractors/*.js'
        , 'app/addContractor/*.js'
        , 'app/addCompany/*.js'
        , 'app/contractorLogin/*.js'
        , 'app/safetyTraining/*.js'
        , 'app/*.js'
        , 'tests/unit/*.js'
    ], // list of files to exclude
        exclude: [
    ], // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {}, // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'], // web server port
        port: 9876, // enable / disable colors in the output (reporters and logs)
        colors: true, // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO, // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true, // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'], // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false, // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}