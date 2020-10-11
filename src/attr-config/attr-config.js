/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// script reference
var ASYNC_CONFIG, CRITICAL_CSS;
var CONFIG_PARAM = VAR(VAR_DATA_C);
var STYLETOOLS_SCRIPT = doc.currentScript || ELEMENTS_BY_QUERY('script[' + CONFIG_PARAM + ']', DOCHEAD());

if (STYLETOOLS_SCRIPT) {

    // extract config from data-optimization parameter
    ASYNC_CONFIG = GET_ATTR(STYLETOOLS_SCRIPT, CONFIG_PARAM);

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

    CRITICAL_CSS = GET_ATTR(STYLETOOLS_SCRIPT, 'data-x');
}

// css loader
if (LOAD_CSS && ASYNC_CONFIG) {

    INSERT_TARGET = STYLETOOLS_SCRIPT;

    if (CRITICAL_CSS) {

        // critical CSS
        LOAD_CSS({
            "4": CRITICAL_CSS,
            "49": 52,
            "63": 64
        });

        INSERT_TARGET = NEXT(STYLETOOLS_SCRIPT);
    }

    APPLY(LOAD_CSS, ASYNC_CONFIG);
}