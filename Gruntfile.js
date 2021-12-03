/* global module:false */
module.exports = function(grunt) {

    // dependencies
    var merge = require('merge');
    var compressionindex = require('./compression-index.js');
    var KEYS = compressionindex(grunt);

    // closure compiler externs
    var externs = ['async.ext.js'];

    // Closure Compiler
    var CC_MODULES = {
        "async-core": {
            "src": [
                'src/global-vars.js',

                
                'src/css-loader/css-loader-vars.js',
                'src/js-loader/js-loader-vars.js',
                'src/inline-js/inline-js-vars.js',
                'src/rebase/rebase-vars.js',
                'src/regex/regex-vars.js',
                'src/dependency/dependency-vars.js',
                'src/timing/timing-vars.js',
                'src/capture/capture-vars.js',
                'src/api/api-vars.js',
                'src/inview/inview-vars.js',
                'src/lazy/lazy-vars.js',
                'src/cache/cache-vars.js',

                'src/global.js',
                'src/global-\\$async.js',
                'src/global-dom.js'
            ],
            define: merge(KEYS, {
                "DEBUG": false
            })
        },
        "event-emitter": {
            "src": [
                'src/event-emitter/event-emitter.js'
            ],
            "dep": ["async-core"]
        },
        "debug": {
            "src": [
                'src/debug/debug.js'
            ],
            "dep": ["async-core", "event-emitter"]
        },
        "css-loader": {
            "src": [
                'src/css-loader/css-loader.js'
            ],
            "dep": ["async-core"]
        },
        "js-loader": {
            "src": [
                'src/js-loader/js-loader.js'
            ],
            "dep": ["async-core"]
        },
        "inline-js": {
            "src": [
                'src/inline-js/inline-js.js'
            ],
            "dep": ["async-core", "js-loader"]
        },
        "rebase": {
            "src": [
                'src/rebase/rebase.js'
            ],
            "dep": ["async-core"]
        },
        "regex": {
            "src": [
                'src/regex/regex.js'
            ],
            "dep": ["async-core"]
        },
        "vendor": {
            "src": [
                'src/vendor/vendor.js'
            ],
            "dep": ["async-core"]
        },
        "api": {
            "src": [
                'src/api/api.js'
            ],
            "dep": ["async-core", "event-emitter"]
        },
        "dependency": {
            "src": [
                'src/dependency/dependency.js'
            ],
            "dep": ["async-core", "regex"]
        },
        "timing": {
            "src": [
                'src/timing/timing.js'
            ],
            "dep": ["async-core", "vendor"]
        },
        "inview": {
            "src": [
                'src/inview/inview.js'
            ],
            "dep": ["async-core", "timing"]
        },
        "lazy": {
            "src": [
                'src/lazy/lazy.js'
            ],
            "dep": ["async-core", "timing", "dependency"]
        },
        "responsive": {
            "src": [
                'src/responsive/responsive.js'
            ],
            "dep": ["async-core", "timing"]
        },
        "cache": {
            "src": [
                'src/cache/cache.js'
            ],
            "dep": ["async-core", "event-emitter"]
        },
        "cache-css": {
            "src": [
                'src/cache-css/cache-css.js'
            ],
            "dep": ["async-core", "css-loader", "cache"]
        },
        "cache-js": {
            "src": [
                'src/cache-js/cache-js.js'
            ],
            "dep": ["async-core", "js-loader", "cache"]
        },
        "localstorage": {
            "src": [
                'src/localstorage/localstorage.js'
            ],
            "dep": ["async-core", "cache"]
        },
        "cache-api": {
            "src": [
                'src/cache-api/cache-api.js'
            ],
            "dep": ["async-core", "cache"]
        },
        "xhr": {
            "src": [
                'src/xhr/xhr.js'
            ],
            "dep": ["async-core", "cache"]
        },
        "cache-update": {
            "src": [
                'src/cache-update/cache-update.js'
            ],
            "dep": ["async-core", "cache"]
        },
        "capture": {
            "src": [
                'src/capture/capture.js'
            ],
            "dep": ["async-core", "regex", "vendor"]
        },
        "capture-observer": {
            "src": [
                'src/capture-observer/capture-observer.js'
            ],
            "dep": ["async-core", "capture"]
        },
        "capture-insert": {
            "src": [
                'src/capture-insert/capture-insert.js'
            ],
            "dep": ["async-core", "capture"]
        },
        "capture-css": {
            "src": [
                'src/capture-css/capture-css.js'
            ],
            "dep": ["async-core", "css-loader", "capture"]
        },
        "capture-js": {
            "src": [
                'src/capture-js/capture-js.js'
            ],
            "dep": ["async-core", "js-loader", "capture"]
        },
        "attr-config": {
            "src": [
                'src/attr-config/attr-config.js'
            ],
            "dep": ["async-core"]
        }
    };

    var CC_DEBUG_MODULES = {};
    Object.keys(CC_MODULES).forEach(function(key) {
        CC_DEBUG_MODULES[key] = JSON.parse(JSON.stringify(CC_MODULES[key]));
        if (CC_DEBUG_MODULES[key].define && "DEBUG" in CC_DEBUG_MODULES[key].define) {
            CC_DEBUG_MODULES[key].define.DEBUG = true;
        }
    });

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! 🔬 Style.Tools */'
        },

        // closure compiler
        // enhanced with --module / -- chunk
        // @link https://github.com/gmarty/grunt-closure-compiler/pull/61
        "closure-compiler": {

            "css-loader": {
                closurePath: '../../closure-compiler',
                modules: CC_MODULES,
                moduleOutputPath: 'dist/',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    //isolation_mode: 'IIFE',
                    define: ['DEBUG=false']
                }
            },
            "css-loader-debug": {
                closurePath: '../../closure-compiler',
                modules: CC_DEBUG_MODULES,
                moduleOutputPath: 'dist/debug/',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    //isolation_mode: 'IIFE',
                    define: ['DEBUG=true']
                }
            }
        },

        // clear directory
        clean: {
            dist: {
                src: ['dist/**/$weak$.js', 'dist/$weak$.js']
            }
        },

        copy: {
            dist: {
                src: 'dist/*.js',
                dest: '../dev/wp/wp-content/plugins/style-tools-wordpress/vendor/styletools/cms-connector/vendor/styletools/async-css/'
            },
            dist_debug: {
                src: 'dist/debug/*.js',
                dest: '../dev/wp/wp-content/plugins/style-tools-wordpress/vendor/styletools/cms-connector/vendor/styletools/async-css/'
            },
            dist_test: {
                src: 'dist/*.js',
                dest: '/home/optimization/dev/slideheroes.com/httpdocs/wp-content/plugins/style-tools-wordpress/vendor/styletools/cms-connector/vendor/styletools/async-css/'
            },
            dist_test_debug: {
                src: 'dist/debug/*.js',
                dest: '/home/optimization/dev/slideheroes.com/httpdocs/wp-content/plugins/style-tools-wordpress/vendor/styletools/cms-connector/vendor/styletools/async-css/'
            },

            iife: {
                src: 'dist/*.js',
                dest: '../httpdocs/iife/node_modules/@style.tools/async/'
            },
            iife_package: {
                src: 'package.json',
                dest: '../httpdocs/iife/node_modules/@style.tools/async/'
            },
            iife_debug: {
                src: 'dist/debug/*.js',
                dest: '../httpdocs/iife/node_modules/@style.tools/async/'
            },

            cdn: {
                src: 'dist/*.js',
                dest: '../modules/cdn/node_modules/@style.tools/async/'
            },
            cdn_package: {
                src: 'package.json',
                dest: '../modules/cdn/node_modules/@style.tools/async/'
            },
            cdn_debug: {
                src: 'dist/debug/*.js',
                dest: '../modules/cdn/node_modules/@style.tools/async/'
            }
        }
    });

    // Load Dependencies
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('./closure-compiler-modules.js')(grunt);

    grunt.registerTask('build', [
        'closure-compiler:css-loader',
        'clean:dist'
    ]);

    grunt.registerTask('debug', [
        'closure-compiler:css-loader-debug',
        'clean:dist'
    ]);

    grunt.registerTask('copy_iife', [
        'copy:iife',
        'copy:iife_package',
        'copy:iife_debug'
    ]);


    grunt.registerTask('copy_cdn', [
        'copy:cdn',
        'copy:cdn_package',
        'copy:cdn_debug'
    ]);


    grunt.registerTask('default', ['']);
};