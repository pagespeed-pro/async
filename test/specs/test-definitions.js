/** Async CSS Loader Tests */

const SERVER_API = require('./server-api.js'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path');

var TEST_DEFINITIONS = {};

// basic tests
TEST_DEFINITIONS.basic = function(iife_filename) {

    return [
        ['window.$async exists', function(driver, done) {
            SERVER_API.reload(driver, iife_filename).then(function() {
                SERVER_API.exec(driver, 'return typeof $async', function(return_value) {
                    return return_value === 'function';
                }).then(function(return_value) {
                    assert.equal(return_value, 'function');
                    done();
                }).catch(function(err) {
                    done(err);
                });
            });
        }],
        ['load 1 stylesheet via string', function(driver, done) {

            var $async_config = "base.css";

            var $async_options = null;

            var validation = function() {
                return document.styleSheets.length === 1;
            };

            SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                return return_value === true;
            }).then(function() {
                done();
            }).catch(function(err) {
                done(err);
            });
        }],
        ['load 1 stylesheet via array-string with global-set ID attribute', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = ["base.css"];

                var $async_options = {
                    attributes: {
                        id: "sheet-test"
                    }
                };

                var validation = function() {
                    return document.styleSheets.length === 1 &&
                        !!document.getElementById('sheet-test');
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });

            });

        }],
        ['load 1 stylesheet via object with local-set ID attribute', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = {
                    "href": "base.css",
                    "attributes": {
                        "id": "sheet-test"
                    }
                };

                var $async_options = null;

                var validation = function() {
                    return document.styleSheets.length === 1 &&
                        !!document.getElementById('sheet-test');
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });
            });

        }],
        ['load 4 stylesheets via mixed array width 1x local-set id attribute + global set data-attributes', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = [{
                    "href": "base-p1.css",
                    "attributes": {
                        "id": "sheet-test"
                    }
                }, "base-p2.css", {
                    "href": "base-p3.css"
                }, "base-p4.css"];

                var $async_options = {
                    "attributes": {
                        "data-x": "test"
                    }
                };

                var validation = function() {
                    return document.styleSheets.length === 4 &&
                        !!document.getElementById('sheet-test') &&
                        !!document.querySelector('link[data-x=test]');
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });

            });
        }]
    ];
};

// URL rebasing
TEST_DEFINITIONS.rebase = function(iife_filename) {

    return [
        ['rebase 1 href string', function(driver, done) {
            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = "../../../base.css";

                var $async_options = {
                    "base": "/non/existent/path/"
                };

                var validation = function() {
                    return document.styleSheets.length === 1;
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });
            });
        }],
        ['rebase 4 stylesheets', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = [{
                    "href": "../../../base-p1.css",
                    "attributes": {
                        "id": "sheet-test"
                    }
                }, "../../../base-p2.css", {
                    "href": "../../../base-p3.css"
                }, "../../../base-p4.css"];

                var $async_options = {
                    "base": "/non/existent/path/",
                    "attributes": {
                        "data-x": "test"
                    }
                };

                var validation = function() {
                    return document.styleSheets.length === 4 &&
                        !!document.getElementById('sheet-test') &&
                        !!document.querySelector('link[data-x=test]');
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });
            });
        }]
    ];
};

// dependency based loading
TEST_DEFINITIONS.dependencies = function(iife_filename) {

    return [
        ['load 4 sheets with dependencies (ref and href), with custom before and after insert target', function(driver, done) {
            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = [{
                    href: 'base-p1.css',
                    ref: 'x'
                }, {
                    href: 'base-p2.css',
                    dependencies: 'x' // ref based 
                }, {
                    href: 'base-p3.css',
                    dependencies: ['base-p2.css', 'base-p1.css'],
                    target: {
                        after: 'meta[charset]'
                    }
                }, {
                    href: 'base-p4.css',
                    dependencies: 'base-p3.css',
                    target: 'meta[charset]' // before by default
                }];

                var validation = function() {
                    return document.styleSheets.length === 4 &&
                        /base-p2\.css/.test(document.getElementsByTagName("link")[2].nextSibling.href) &&
                        /base-p4\.css/.test(document.querySelector("meta[charset]").previousSibling.href) &&
                        /base-p3\.css/.test(document.querySelector("meta[charset]").nextSibling.href);
                };

                SERVER_API.$async(driver, $async_config, null, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {
                    done();
                }).catch(function(err) {
                    done(err);
                });
            });
        }]
    ];
};

// localstorage tests
TEST_DEFINITIONS.localstorage = function(iife_filename) {

    return [
        ['load 1 stylesheet with localStorage (local-set)', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = {
                    "href": "base.css",
                    "cache": {
                        "type": "localstorage"
                    }
                };

                var $async_options = null;

                var validation = function() {
                    return document.styleSheets.length === 1;
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    // load from cache

                    validation = function() {
                        return !!((!("localStorage" in window) && document.querySelectorAll('link').length === 2) || document.querySelector('style[data-src]'));
                    };

                    // wait for cache to be saved
                    setTimeout(function() {

                        SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                            return return_value === true;
                        }).then(function() {
                            done();

                        }).catch(function(err) {
                            done(err);
                        });

                    }, 2000);

                }).catch(function(err) {
                    done(err);
                });

            });

        }],
        ['load 3 stylesheets with localStorage (global-set)', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = ["base-p1.css", {
                    "href": "base-p2.css"
                }, "base-p3.css"];

                var $async_options = {
                    "cache": {
                        "type": "localstorage"
                    }
                };

                var validation = function() {
                    return document.styleSheets.length === 3;
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    // load from cache

                    validation = function() {
                        return document.querySelectorAll('style[data-src]').length === 3;
                    };

                    // wait for cache to be saved
                    setTimeout(function() {

                        SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                            return return_value === true;
                        }).then(function() {
                            done();

                        }).catch(function(err) {
                            done(err);
                        });

                    }, 2000);

                }).catch(function(err) {
                    done(err);
                });

            });

        }]
    ];

};

// timing tests
TEST_DEFINITIONS.timing = function(iife_filename) {

    return [
        ['download 1 stylesheet with setTimeout', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var start_time = +new Date();

                var $async_config = {
                    "href": "base.css",
                    "load_timing": {
                        "type": "setTimeout",
                        "timeout": 2000
                    }
                };

                var $async_options = null;

                var validation = function() {
                    return document.styleSheets.length === 1;
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    assert.equal((+new Date() - start_time) > 2000, true);

                    done();

                }).catch(function(err) {
                    done(err);
                });
            });


        }],
        ['download 2 stylesheets with requestAnimationFrame and frame target', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var start_time = +new Date();

                var $async_config = [{
                    "href": "base-p1.css",
                    "load_timing": {
                        "type": "requestAnimationFrame",
                        "frame": 5 // sheet will be loaded after base-p2.css
                    }
                }, {
                    "href": "base-p2.css",
                    "load_timing": {
                        "type": "requestAnimationFrame"
                    }
                }];

                var $async_options = null;

                var validation = function() {

                    var has_raf = !!(window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame);

                    return (!has_raf || (document.styleSheets.length === 2 &&
                        /base-p1\.css/.test(document.querySelectorAll('link')[0].nextSibling.href)));
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    done();

                }).catch(function(err) {
                    done(err);
                });
            });
        }],
        ['download 1 stylesheet responsive based on viewport change', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var start_time = +new Date();

                var $async_config = "base.css";

                var $async_options = {
                    "load_timing": {
                        "type": "media",
                        "media": "screen and (max-width: 640px)"
                    }
                };

                var validation = function() {
                    if (!window.load_start) {
                        window.load_start = new Date().getTime();
                    }
                    // wait for 1 second
                    if ((new Date().getTime() - window.load_start) < 1000) {
                        return false;
                    }
                    return (!("matchMedia" in window) || document.styleSheets.length === 0);
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    driver.manage().window().getSize().then(function(original_size) {

                        // set window size
                        driver.manage().window().setSize(640, 480);

                        // verify that stylesheet is loaded
                        SERVER_API.exec(driver, SERVER_API.validation(function() {
                            return document.styleSheets.length === 1;
                        }), function(return_value) {
                            return return_value === true;
                        }).then(function(return_value) {
                            assert.equal(return_value, true);

                            // restore size
                            driver.manage().window().setSize(original_size.width, original_size.height);

                            done();
                        }).catch(function(err) {
                            done(err);
                        });
                    })

                }).catch(function(err) {
                    done(err);
                });
            });


        }],
        ['download 3 stylesheets on domReady and render responsive based on viewport change', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var $async_config = ["base-p1.css", "base-p2.css", "base-p3.css"];

                var $async_options = {
                    "load_timing": {
                        "type": "domReady"
                    },
                    "render_timing": {
                        "type": "media",
                        "media": "screen and (max-width: 640px)"
                    }
                };

                var validation = function() {
                    return (!("matchMedia" in window) || !!(window.innerWidth <= 640) || (document.readyState === "complete" &&
                        (document.styleSheets.length === 0 || document.querySelectorAll('link[media="only x"]').length === 3) &&
                        document.querySelectorAll('link').length === 3));
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function() {

                    driver.manage().window().getSize().then(function(original_size) {

                        // set window size
                        driver.manage().window().setSize(640, 480);

                        // verify that stylesheets are rendered
                        driver.executeAsyncScript(function(callback) {
                            setTimeout(function() {
                                callback(document.styleSheets.length);
                            }, 2000);
                        }).then(function(return_value) {

                            assert.equal(return_value, 3);

                            // restore size
                            driver.manage().window().setSize(original_size.width, original_size.height);

                            done();
                        }).catch(function(err) {
                            done(err);
                        });
                    })

                }).catch(function(err) {
                    done(err);
                });
            });


        }],
        ['download 3 stylesheets when #footer element scrolls into view within 100 pixels', function(driver, done) {

            SERVER_API.reload(driver, iife_filename).then(function() {

                var start_time = +new Date();

                var $async_config = ["base-p1.css", "base-p2.css", "base-p3.css"];

                var $async_options = {
                    "load_timing": {
                        "type": "inview",
                        "selector": "#footer",
                        "offset": -100
                    }
                };

                var validation = function(callback) {
                    return document.readyState === "complete" && document.styleSheets.length === 0; // !!(window.scrolled && window.stylesheets_loaded_before_scroll === 0 && document.styleSheets.length === 3);
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    return return_value === true;
                }).then(function(return_value) {

                    driver.executeAsyncScript(function(callback) {

                        if (document.styleSheets.length > 0) {
                            return callback('stylesheets already loaded');
                        }
                        
                        window.scrollTo(0, document.body.scrollHeight);
                        setTimeout(function() {
                            callback(document.styleSheets.length);
                        }, 2000);
                    }).then(function(return_value) {
                        if (typeof return_value === 'string') {
                            return done(new Error(return_value));
                        }

                        assert.equal(return_value, 3);

                        done();
                    }).catch(function(err) {
                        done(err);
                    });

                }).catch(function(err) {
                    done(err);
                });
            });


        }],
        ['download 3 stylesheets when #footer element scrolls into view within 100 pixels using $lazy module (Intersection Observer)', function(driver, done) {

            $lazy = 'function load_lazy() {' + fs.readFileSync(path.resolve('node_modules/@style.tools/lazy/dist/', 'lazy.js'), 'utf8') + '} $async.js({"src":"", "inline":"load_lazy();", "ref": "lazy"});';

            SERVER_API.reload(driver, iife_filename, false, $lazy).then(function() {

                var start_time = +new Date();

                var $async_config = ["base-p1.css", "base-p2.css", "base-p3.css"];

                var $async_options = {
                    "load_timing": {
                        "type": "lazy",
                        "config": "#footer"
                    }
                };

                var validation = function(callback) {
                    return document.readyState === "complete" && document.styleSheets && document.styleSheets.length === 0; // !!(window.scrolled && window.stylesheets_loaded_before_scroll === 0 && document.styleSheets.length === 3);
                };

                SERVER_API.$async(driver, $async_config, $async_options, validation, function(return_value) {
                    if (typeof return_value === 'string') {
                        return done(new Error(return_value));
                    }
                    return return_value === true;
                }).then(function(return_value) {

                    driver.executeAsyncScript(function(callback) {
                      
                        if (!document.styleSheets) {
                            return callback('no stylesheets');
                        }

                        if (document.styleSheets.length > 0) {
                            return callback('stylesheets already loaded: ' + document.styleSheets.length);
                        }

                        window.scrollTo(0, document.body.scrollHeight);
                        setTimeout(function() {
                            if (document.styleSheets.length === 3) {
                                callback(true);
                            } else {
                                return callback('stylesheets not loaded: ' + document.styleSheets.length);
                            }
                        }, 2000);
                    }).then(function(return_value) {
                        if (typeof return_value === 'string') {
                            return done(new Error(return_value));
                        }

                        assert.equal(return_value, true);

                        done();
                    }).catch(function(err) {
                        done(err);
                    });

                }).catch(function(err) {
                    done(err);
                });
            });


        }]
    ];

};

module.exports = TEST_DEFINITIONS;