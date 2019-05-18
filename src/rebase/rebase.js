/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

var ABSOLUTE_REGEX = /^((http(s)?)?:)?\/\//i; // absolute URL: xxx:/ or :// or /

REBASE = function(args, callback) {
    var asset = args[0],
        options = args[1],
        src = args[2],
        base = asset[VAR_BASE] || options[VAR_BASE]; // base from asset or global options

    // detect relative URL
    if (base && !ABSOLUTE_REGEX.test(src)) {
        callback(base + src);
    }
}