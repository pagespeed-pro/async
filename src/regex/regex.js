/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

var REGEX_MATCH_PATTERN = /^\/(.*)\/([gimuy]+)?$/;

// parse regex from string
function REGEX(string) {
    var match = string.match(REGEX_MATCH_PATTERN);
    if (!match) {
        return;
    }
    try {
        var regex = new RegExp(match[1], match[2]);
    } catch (err) {}
    return regex || false;
}