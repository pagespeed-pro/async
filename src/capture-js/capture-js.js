/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

CAPTURE_JS = function(args, callback) {
    var node = args[0],
        nodeName = args[1];

    if (nodeName == VAR(VAR_SCRIPT)) {
        callback(GET_ATTR(node, VAR_SRC), VAR_SRC);
    }
}