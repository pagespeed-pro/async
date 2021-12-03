/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

CAPTURE_CSS = function(args, callback) {
    var node = args[0],
        nodeName = args[1];

    if (nodeName == VAR(VAR_STYLE) ||
        (nodeName == VAR(VAR_LINK) && LOWERCASE(GET_ATTR(node, VAR_REL) || '').trim() == VAR(VAR_STYLESHEET))) {
        callback(GET_ATTR(node, VAR_HREF), VAR_HREF);
    }
}