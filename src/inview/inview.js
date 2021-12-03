/**
 * Async CSS loader - github.com/style-tools/async-css
 * Released under the terms of MIT license
 *
 * Based on @link https://github.com/camwiegert/in-view/
 *
 * Copyright (C) 2018 github.com/style-tools
 */

_mutationObserver = VENDOR_FN('MutationObserver');

function THROTTLE(fn, delay) {
    var lastCall = 0,
        call = function() {
            var now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            if (!lastCall) {
                _setTimeout(function() {
                    APPLY(fn, arguments)
                }, delay);
            }
            lastCall = now;
            return APPLY(fn, arguments);
        };
    return call;
}

// remove event listener
function REMOVE_EVENT(triggers, handler, el) {
    if (!el) {
        el = w;
    }

    triggers = ARRAY(triggers);
    el = ARRAY(el);

    FOREACH(triggers, function(trigger) {

        trigger = VAR(trigger);

        FOREACH(el, function(_el) {

            if (addEventListenerSupported) {
                _el.removeEventListener(trigger, handler, false);
            } else if (el.attachEvent) {
                // IE8
                _el.detachEvent('on' + trigger, handler);
            }
        });
    });

};

// inview module
INVIEW = function(selector, threshold, offset, callback) {

    var elements,
        triggers = ['scroll', 'resize', 'load'],
        observer;

    threshold = threshold || 0;
    offset = OBJECT(offset || 0, VAR_TOP);

    DOMREADY(function() {

        elements = ELEMENTS_BY_QUERY(selector, 0, 1);

        if (elements && LENGTH(elements)) {

            // offset
            FOREACH([VAR_RIGHT, VAR_LEFT, VAR_BOTTOM], function(key) {
                if (IS_UNDEFINED(offset[key])) {
                    offset[key] = offset[VAR_TOP];
                }
            });

            // inview check
            var inview = function(element) {

                // element visible
                if (!( element.offsetWidth || element.offsetHeight || element.getClientRects().length )) {
                    return false;
                }

                var rect = element.getBoundingClientRect(),
                    t = rect.bottom,
                    r = w.innerWidth - rect.left,
                    b = w.innerHeight - rect.top,
                    l = rect.right,
                    x = threshold * rect.width,
                    y = threshold * rect.height;

                return t > (offset[VAR_TOP] + y) &&
                    r > (offset[VAR_RIGHT] + x) &&
                    b > (offset[VAR_BOTTOM] + y) &&
                    l > (offset[VAR_LEFT] + x);
            }

            // throttled
            var is_inview;
            var check = THROTTLE(function() {

                if (!is_inview) {
                    FOREACH(elements, function(el) {

                        if (!is_inview && inview(el)) {
                            is_inview = 1;

                            // trigger callback
                            callback();

                            REMOVE_EVENT(triggers, check);

                            if (observer) {
                                observer.disconnect();
                                observer = false;
                            }
                        }
                    });
                }
            }, 100);

            // watch events
            ADD_EVENT(triggers, check);

            /**
             * If supported, use MutationObserver to watch the
             * DOM and run checks on mutation.
             */
            if (_mutationObserver) {
                if (observer) {
                    observer = new _mutationObserver(check)
                        .observe(doc.body, {
                            attributes: true,
                            childList: true,
                            subtree: true
                        });
                }
            }

            // check
            check();
        }
    });
}