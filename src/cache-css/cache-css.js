/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// <style> element
attrs = {}
attrs[VAR_TYPE] = 'text/css';
var STYLE_ELEMENT = CREATE_ELEMENT(VAR_STYLE, attrs);

// retrieve CSS text from cssRules
READ_CSSTEXT = function(assetEl, callback) {

    var sheet = assetEl.sheet,
        rules, text = '';

    // try to access rules
    try {
        rules = sheet ? (sheet.cssRules || sheet.rules) : 0;
    } catch (e) {
        rules = 0;
    }
    if (rules) {
        FORIN(rules, function(rule) {

            // import rule
            // @todo add option to process imports
            //if (rule.type === 3) {

            //}

            text += rule.cssText;
        });

        callback(text);
    }
};

CACHE_CSS = function(args, callback) {
    var asset = args[0],
        attrs = args[1],
        src = args[2],
        text = args[3],
        disabled,
        assetEl;

    attrs[VAR_DATA_SRC] = src;

    // render timing + timing module
    if (TIMING && asset[VAR_RENDER_TIMING]) {

        // disable asset for timed render
        disabled = 1;
        attrs[VAR_MEDIA] = ASYNC_MEDIA;
    }

    // create <style> element
    assetEl = CLONE_ELEMENT(STYLE_ELEMENT, attrs);

    // optionally disable asset for render timing
    DISABLED(assetEl, disabled);

    attrs[VAR_CSSTEXT] = function(assetEl) {
        try {
            assetEl.textContent = text;
        } catch (e) {
            assetEl.styleSheet.cssText = text;
        }
    };

    callback(assetEl, attrs);
}