/**
 * Simple test server
 */

const browserstack = require('browserstack-local'),
    webdriver = require('selenium-webdriver');

var buildDriver = function(caps) {
    return new webdriver.Builder().
    usingServer('https://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(caps).
    build();
};

//describe(TEST_NAME + ' Test for ' + caps.browserName, function() {
var driver, bsLocal = new browserstack.Local();


// starts the Local instance with the required arguments
bsLocal.start({
    'key': '',
    'verbose': true
}, function() {
    console.log("Started BrowserStackLocal");
});

// check if BrowserStack local instance is running
console.log(bsLocal.isRunning());

// stop the Local instance
bsLocal.stop(function() {
    console.log("Stopped BrowserStackLocal");
});

/*
bsLocal.start({
    'key': 'efgarzXeDgfpQGUDrHM9'
}, function(error) {
    console.log(6);

    if (error) done(error);

    driver = buildDriver(caps);
    console.log(8);
    iife.generate(IIFE_MODULES, {
        format: 'wrap',
        output: IIFE_FILE
    }).then(function(code) {
        done();
    });
});
driver.get('http://127.0.0.1:14280/').then(function() {
    console.log(1);
    driver.getPageSource().then(function(source) {
        console.log(2);
        assert(source.match(/Up and running/i) != null);
        done();
    });
});*/