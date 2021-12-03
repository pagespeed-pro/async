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
/** @define {number} */
var VAR_REL=0;

/** @define {number} */
var VAR_AS=1;

/** @define {number} */
var VAR_TYPE=2;

/** @define {number} */
var VAR_HEAD=3;

/** @define {number} */
var VAR_HREF=4;

/** @define {number} */
var VAR_SRC=5;

/** @define {number} */
var VAR_CSS=6;

/** @define {number} */
var VAR_ALL=7;

/** @define {number} */
var VAR_PRELOAD=8;

/** @define {number} */
var VAR_MEDIA=9;

/** @define {number} */
var VAR_LOAD=10;

/** @define {number} */
var VAR_LINK=11;

/** @define {number} */
var VAR_STYLE=12;

/** @define {number} */
var VAR_TARGET=13;

/** @define {number} */
var VAR_ATTRIBUTES=14;

/** @define {number} */
var VAR_DEPENDENCIES=15;

/** @define {number} */
var VAR_REF=16;

/** @define {number} */
var VAR_AFTER=17;

/** @define {number} */
var VAR_BEFORE=18;

/** @define {number} */
var VAR_DATA_C=19;

/** @define {number} */
var VAR_DATA_SRC=20;

/** @define {number} */
var VAR_QUERYSELECTOR=21;

LOAD_COMPRESSION_INDEX("rel,as,type,head,href,src,css,all,preload,media,load,link,style,target,attributes,dependencies,ref,after,before,data-c,data-src,querySelector");

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