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
LAZY = function(config, ref, callback) {

    function setup_lazy() {
        var loaded;
        $lazy(config, function(entries) {
            if (!loaded) {
                for (var i = 0, l = entries.length; i < l; i++) {
                    if (!("isIntersecting" in entries[i]) || entries[i].isIntersecting) {
                        loaded = 1;
                        callback();
                        break;
                    }
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