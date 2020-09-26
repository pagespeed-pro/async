/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// script reference
var ASYNC_CONFIG, ASYNC_JS_CONFIG;
var CONFIG_PARAM = VAR(VAR_DATA_C);
var STYLETOOLS_SCRIPT = doc.currentScript || ELEMENTS_BY_QUERY('script[' + CONFIG_PARAM + ']', DOCHEAD());
if (STYLETOOLS_SCRIPT) {

    // extract config from data-optimization parameter
    ASYNC_CONFIG = GET_ATTR(STYLETOOLS_SCRIPT, CONFIG_PARAM);

    // decompress null, false and true char
    //CONFIG = CONFIG.replace(/ø/g, 'null').replace(/¬/g, 'false').replace(/µ/g, 'true');

    try {
        ASYNC_CONFIG = JSON.parse(ASYNC_CONFIG);
    } catch (err) {
        if (IS_STRING(ASYNC_CONFIG)) {
            ASYNC_CONFIG = SPLIT(ASYNC_CONFIG);
        }
    }

    // direct string/object input
    if (ASYNC_CONFIG && !IS_ARRAY(ASYNC_CONFIG)) {
        ASYNC_CONFIG = [ASYNC_CONFIG];
    }
}

// css loader
if (LOAD_CSS && ASYNC_CONFIG) {
    APPLY(LOAD_CSS, ASYNC_CONFIG);
}