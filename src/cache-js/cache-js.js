/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

CACHE_JS = function(args, callback) {
    var attrs = args[0],
        src = args[1],
        text = args[2];

    attrs[VAR_DATA_SRC] = src;

    /*assetEl = CLONE_ELEMENT(SCRIPT_ELEMENT, attrs);

    if ('text' in assetEl) {
        assetEl.text = text;
    } else {
        APPEND_CHILD(assetEl, doc.createTextNode(text));
    }*/

    callback(text, attrs);
}