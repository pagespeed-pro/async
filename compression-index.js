/**
 * JSON compression index generator
 */

var fs = require('fs');

module.exports = function(grunt) {

    // key/value compression index, enables to compress JSON configuration to reduce size in the HTML document header
    var KEYS = {};
    var COMPRESSION_INDEX = grunt.file.readJSON('src/compression-index.json');
    var COMPRESSION_INDEX_KEYS = Object.keys(COMPRESSION_INDEX);
    var index_count = 0;
    var index_start = {};
    var define_index = {},
        def;
    COMPRESSION_INDEX_KEYS.forEach(function(index_key) {
        index_start[index_key] = index_count;

        define_index[index_key] = [];

        COMPRESSION_INDEX[index_key].forEach(function(key, key_index) {
            // ((index_key !== 'global') ? index_key.toUpperCase().replace(/-/g, '_') + '_' : '') + 
            var var_key = 'VAR_' + key.toUpperCase().replace(/[\s-\/]/g, '_');
            KEYS[var_key] = index_count;

            if (key === 'COMPRESSION_INDEX') {
                def = '';
            } else {
                def = '/** @define {number} */\n';
            }

            define_index[index_key].push(def + 'var ' + var_key + '=' + index_count + ';');

            index_count++;
        });


    });

    // create key/value compression index
    function KEYVAL_METHOD(src_js) {
        return src_js.replace(/\/\*\* \@_vars ([^\s]+) \*\//, function() {
            var key = arguments[1];
            if (!(key in COMPRESSION_INDEX)) {
                throw new Error('vars key ' + key + ' not in index');
            }
            var index = COMPRESSION_INDEX_KEYS.indexOf(key);

            var _define_inde = '';
            // add @define index
            if (key in define_index) {
                _define_index = define_index[key].join('\n\n') + '\n\n';
            }

            return _define_index + 'LOAD_COMPRESSION_INDEX(' + JSON.stringify(COMPRESSION_INDEX[key].join(',')) + '' + ((key !== 'global') ? ',' + index_start[key] : '') + ');';
        });
    }

    // cache vars
    ['global', 'cache/cache', 'api/api', 'inline-js/inline-js', 'rebase/rebase', 
    'css-loader/css-loader', 'js-loader/js-loader', 'regex/regex', 'timing/timing',
     'inview/inview',
      'lazy/lazy', 'dependency/dependency', 'capture/capture'].forEach(function(src) {

        // create cache vars from template
        var VARS = fs.readFileSync('src/' + src + '-vars.tpl.js', 'utf8');

        // add global key/val compression method
        VARS = KEYVAL_METHOD(VARS);

        // write xxx-vars.js
        fs.writeFileSync('src/' + src + '-vars.js', VARS);
    });

    return KEYS;
};