/** Async CSS Loader Tests */

var TESTS = [{
    name: 'x',
    modules: ['css-loader', 'dependency', 'rebase', 'localstorage', 'timing', 'inview', 'responsive'],
    tests: [
        'basic', 'dependencies', 'rebase', 'localstorage',
        'timing'
    ]
}];

var COMBINATION_TESTS = [];

// create all possible module combinations
const path = require('path'),
    fs = require('fs');
const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));
const combine = require(path.resolve(__dirname, '../iife-module-combinations.js'));

var module_combinations = combine([
    'css-loader',
    //'js-loader',
    'dependency', ['cache', 'localstorage', 'cache-api', 'xhr', 'cache-update'],
    ['capture', 'capture-observer', 'capture-insert'], //
    ['timing', 'responsive', 'inview'],
    'api',
    'attr-config',
    //'fallback'
]);
// sort by module order
module_combinations.forEach(function(combination, index) {
    var _combination = [];
    pack._modules.forEach(function(mod) {
        if (combination.indexOf(mod[0]) !== -1) {
            _combination.push(mod[0]);
        }
    });
    module_combinations[index] = _combination;
});

// add basic test for all combinations
var remove_from_name = ['event-emitter', 'vendor', 'regex', 'cache-css', 'cache-js', 'capture-css', 'capture-js'];

module_combinations.forEach(function(combination) {

    var name = combination.slice(0);
    remove_from_name.forEach(function(n) {
        var index = name.indexOf(n);
        if (index !== -1) {
            name.splice(index, 1);
        }
    });

    COMBINATION_TESTS.push({
        name: name.join(' + '),
        modules: combination,
        tests: ['basic']
    });
});
COMBINATION_TESTS = [COMBINATION_TESTS[0]];
COMBINATION_TESTS = [COMBINATION_TESTS[0]];

const iife = require('@style.tools/async-css-iife'),
    assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    chrome = require("selenium-webdriver/chrome"),
    chromedriver = require("chromedriver"),
    By = webdriver.By,
    until = webdriver.until,
    TEST_DEFINITIONS = require('./test-definitions.js');

// chrome options
const options = new chrome.Options();
options.addArguments("headless");
options.addArguments("no-sandbox");
options.addArguments("disable-dev-shm-usage");

// build chrome driver
var buildDriver = function(caps) {
    return new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
};

var iife_files = [];

describe('Manual tests', function() {
    var driver;

    // setup driver
    before(function(done) {

        // create tmp directory
        fs.mkdirSync(path.resolve(__dirname, '../iife/'));

        // create driver
        driver = buildDriver();
        done();
    });

    // setup tests
    TESTS.forEach(function(test) {

        const iife_filename = test.modules.join('+') + '.js';
        const iife_file = path.resolve(__dirname, '../iife/' + iife_filename);

        describe('Test: ' + test.name, function() {

            this.timeout(0);

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

            // setup tests
            test.tests.forEach(function(testname) {
                TEST_DEFINITIONS[testname](iife_filename).forEach(function(definition) {
                    it(definition[0], function(done) {
                        definition[1](driver, done);
                    });
                })
            });
        });
    });

    after(function(done) {
        driver.quit().then(function() {
            done();
        });

    });
});


describe('Test all module combinations', function() {
    var driver;

    // setup driver
    before(function(done) {

        // create driver
        driver = buildDriver();
        done();
    });

    // setup tests
    COMBINATION_TESTS.forEach(function(test) {

        const iife_filename = test.modules.join('+') + '.js';
        const iife_file = path.resolve(__dirname, '../iife/' + iife_filename);

        describe('Test: ' + test.name + ' (' + iife_filename + ')', function() {

            this.timeout(0);

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

            // setup tests
            test.tests.forEach(function(testname) {
                TEST_DEFINITIONS[testname](iife_filename).forEach(function(definition) {
                    it(definition[0], function(done) {
                        definition[1](driver, done);
                    });
                })
            });
        });
    });

    after(function(done) {

        iife_files.forEach(function(file) {
            fs.unlinkSync(file);
        });

        // remove tmp directory
        fs.rmdirSync(path.resolve(__dirname, '../iife/'));

        driver.quit().then(function() {
            done();
        });
    })
});