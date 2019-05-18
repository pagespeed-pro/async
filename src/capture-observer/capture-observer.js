/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

var OBSERVER;
var CAPTURE_OBSERVER_SETUP;
_mutationObserver = VENDOR_FN('MutationObserver');

// setup capture
CAPTURE_OBSERVER = function(observer, _capture) {
    if (!CAPTURE_OBSERVER_SETUP) {
        CAPTURE_OBSERVER_SETUP = 1;

        if (_mutationObserver) {

            // setup Observer
            OBSERVER = new _mutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        _capture(mutation.addedNodes[i])
                    }
                });
            });

            OBSERVER.observe(doc.documentElement, {
                attributes: false,
                childList: true,
                subtree: true,
                characterData: false
            });

            if (DEBUG) {
                CONSOLE_INFO('capture', 'observer setup');
            }
        }
    }

}