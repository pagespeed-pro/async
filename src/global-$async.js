/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

// public object
$async = function() {
    var then = APPLY(LOAD_CSS || LOAD_JS, arguments);
    if (IS_FUNCTION(then)) {
        $async.then = then;
    }
    return $async;
};

// window.$async
w.$async = $async;

if (DEBUG) {

    $async.toString = function() {
        return '$async';
    }
    w.perfMark = PERFORMANCE_MARK;

    // print debug notice
    CONSOLE_WARN('debug', $async);
}