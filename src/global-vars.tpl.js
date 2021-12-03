/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

var COMPRESSION_INDEX = [];
var COMPRESSION_REF = {};

// create key/value compression methods
function LOAD_COMPRESSION_INDEX(index_keys, startIndex) {
    startIndex = startIndex || 0;
    if (LENGTH(COMPRESSION_INDEX) < startIndex) {
        COMPRESSION_INDEX.length = startIndex;
    }

    // add keys to index
    FOREACH(SPLIT(index_keys), function(key, i) {
        //COMPRESSION_INDEX.splice(startIndex + i, 0, key);
        COMPRESSION_INDEX[startIndex + i] = key;
        COMPRESSION_REF[key] = startIndex + i;
    });
}

// key/value compression index (inserted by Gruntfile.js)
/** @_vars global */

// return variable by index
function VAR(index) {
    try {
        return STRING(IS_INT(index) ? (COMPRESSION_INDEX[index] || index) : index);
    } catch (e) {
        if (DEBUG) {
            CONSOLE_ERROR('VAR', index, e);
        }
    }
}
// return index by variable
function VAR_INDEX(key) {
    return key in COMPRESSION_REF ? COMPRESSION_REF[key] : key;
}

// decompress configuration options
function COMPRESS_OPTIONS(config, return_array) {

    return_array = IS_ARRAY(config);

    config = ARRAY(config);
    FOREACH(config, function(cfg, index, options) {

        if (IS_OBJECT(cfg, 1)) {

            options = {};
            FORIN(cfg, function(value, key) {
                key = VAR_INDEX(key);

                if (IS_OBJECT(value)) {
                    value = COMPRESS_OPTIONS(value);
                } else {
                    value = VAR_INDEX(value);
                }

                options[key] = value;
            });

            config[index] = options;
        }
    });


    return return_array ? config : config[0];
}