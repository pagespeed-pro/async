/**
 * Async CSS loader - github.com/style-tools/async-css
 * Released under the terms of MIT license
 *
 * Based on @link https://github.com/camwiegert/in-view/
 *
 * Copyright (C) 2018 github.com/style-tools
 */

// $lazy based inview module
// @link https://github.com/style-tools/lazy
var lazy_queue = [];
LAZY = function(config, ref, callback) {

    if (IS_UNDEFINED(w.$lazy)) {
        w.$lazy = function() {
            lazy_queue.push([].slice.call(arguments));
        }
        if (DEPENDENCY) {
            DEPENDENCY([0,'$z',VAR_JS], function() {
                var item;
                while((item = lazy_queue.shift())) {
                    $lazy.apply(null, item);
                }
            });
        } else {
            if (DEBUG) {
                CONSOLE_ERROR('load.timing.lazy', '$lazy not ready and dependency module not loaded');
            }
        }
    }

    function setup_lazy() {
        var loaded;
        $lazy(config, function(entry) {
            if (!loaded) {
                if (!("isIntersecting" in entry) || entry.isIntersecting) {
                    loaded = 1;
                    callback();
                }
            }
        });
    }

    if (ref && DEPENDENCY) {
        DEPENDENCY([{}, ref, ref, ref], setup_lazy);
    } else {
        DOMREADY(setup_lazy);
    }
}