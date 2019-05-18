/** Cross Browser Async CSS Loader Tests */

const TESTS = [
    /*{
            name: 'Basic tests',
            modules: ['css-loader'],
            tests: ['basic']
        }, */
    {
        name: 'Advanced',
        modules: ['css-loader', 'dependency', 'rebase', 'localstorage', 'timing', 'inview', 'responsive'],
        tests: ['basic', 'dependencies', 'rebase', 'localstorage',
            'timing'
        ]
    }
    /*, {
        name: 'Async CSS Loader + localStorage cache',
        modules: ['css-loader', 'localstorage', 'xhr'],
        tests: ['basic',
            'localstorage'
        ]
    }*/
];

const iife = require('@style.tools/async-iife'), // IIFE generator
    fs = require('fs'),
    assert = require('assert'),
    path = require('path'),
    browserstack = require('browserstack-local'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    capabilities = require('../conf/browserstack-browsers.js').capabilities,
    TEST_DEFINITIONS = require('./test-definitions.js');

// build selenium driver
var buildDriver = function(caps) {
    return new webdriver.Builder().
    usingServer('https://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(caps).
    build();
};

var iife_files = [];

describe('BrowserStack tests', function() {

    // setup driver
    before(function(done) {

        // create tmp directory
        fs.mkdirSync(path.resolve(__dirname, '../iife/'));

        done();
    });

    // setup tests
    TESTS.forEach(function(test) {

        const iife_filename = test.modules.join('+') + '.js';
        const iife_file = path.resolve(__dirname, '../iife/' + iife_filename);

        describe(test.name + ' (' + iife_filename + ')', function() {

            // generate IIFE
            before(function(done) {
                iife.generate(test.modules, {
                    format: 'wrap',
                    output: iife_file,
                    cache: true,
                    root_path: path.resolve(__dirname, '../../')
                }).then(function() {

                    if (iife_files.indexOf(iife_file) === -1) {
                        iife_files.push(iife_file);
                    }
                    done();
                });
            });

            capabilities.forEach(function(caps) {

                var browserName;
                if (caps.device) {
                    browserName = caps.osName + ' ' + caps.os_version + ' on ' + caps.device;
                } else {
                    browserName = caps.browser + ' ' + caps.browser_version + ' on ' + caps.os + ' ' + caps.os_version;
                }

                describe('Browser: ' + browserName, function() {
                    var driver, bsLocal;

                    this.timeout(0);

                    before(function(done) {

                        bsLocal = new browserstack.Local();

                        bsLocal.start({
                            'key': caps['browserstack.key']
                        }, function(error) {
                            if (error) done(error);

                            driver = buildDriver(caps);
                            done();
                        });
                    });

                    // setup tests
                    test.tests.forEach(function(testname) {
                        TEST_DEFINITIONS[testname](iife_filename).forEach(function(definition) {
                            it(definition[0], function(done) {
                                definition[1](driver, done);
                            });
                        })
                    });

                    after(function(done) {
                        driver.quit().then(function() {
                            bsLocal.stop(function() {
                                done()
                            });
                        });
                    });

                });

            });
        });
    });

    after(function(done) {

        iife_files.forEach(function(file) {
            fs.unlinkSync(file);
        });

        // remove tmp directory
        fs.rmdirSync(path.resolve(__dirname, '../iife/'));

    })
});