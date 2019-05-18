/** Async CSS Loader Tests */

var SERVER_API = {};

const assert = require('assert');

// load / reload page
SERVER_API.validation = function(fn) {
    return 'return (' + fn.toString() + ')()';
}

// load / reload page
SERVER_API.reload = function(driver, iife_filename, async, exec, attr_config) {

    var iife = {
        src: iife_filename
    };
    if (async) {
        iife.async = true;
    }
    if (attr_config) {
        iife.attr_config = attr_config;
    }

    return driver.get(SERVER_API.query('/', iife, exec));
}

// exec $async
SERVER_API.$async = function(driver, config, options, validation, condition, interval, max) {

    if (!condition) {
        condition = function(return_value) {
            return return_value === true;
        };
    }

    return new Promise(function(resolve, reject) {

        driver.executeScript('$async(' + JSON.stringify(config) + ((options) ? ',' + JSON.stringify(options) : '') + ');').then(function(return_value) {

            SERVER_API.exec(driver, validation, condition).then(function(return_value) {
                assert.equal(condition(return_value), true);
                resolve(return_value);
            }).catch(function(err) {
                reject(err);
            });
        });
    });
}

// wait for javascript exec to resolve
SERVER_API.exec = function(driver, exec, condition, interval, max) {
    if (!interval) {
        interval = 500;
    }
    if (!max) {
        max = 10;
    }

    if (typeof exec === 'function') {
        exec = SERVER_API.validation(exec);
    }

    return new Promise(function(resolve, reject) {
        // driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        var count = 0;

        function check() {
            return driver.executeScript(exec).then(function(return_value) {
                if (condition(return_value) || count >= max) {
                    resolve(return_value);
                } else {
                    count++;
                    setTimeout(check, interval);
                }
            });
        }
        check();
    });
};

// build query URL
SERVER_API.query = function(template, iife, exec) {
    var server = 'http://127.0.0.1:14280' + template + '?iife=' + encodeURIComponent(JSON.stringify(iife));
    if (exec) {
        server += '&exec=' + encodeURIComponent(JSON.stringify(exec));
    }
    return server;
}

module.exports = SERVER_API;