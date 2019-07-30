/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */


if (DEBUG) {
    var TIMING_COUNT = 0;
    var TIMING_DEBUG_CALLBACK = function(key, callback, debug_vars, debug_data) {
        var timing_id = key + ++TIMING_COUNT;

        // measure domReady timing
        PERFORMANCE_MARK(timing_id);

        return function() {

            debug_data = debug_data || {};
            debug_data.type = key;

            var perf = PERFORMANCE_MARK('_' + timing_id, timing_id, key, key);
            debug_data.startTime = perf.startTime;
            debug_data.duration = perf.duration;

            var log_args = debug_vars.slice(0);
            log_args[0] += '.exec';
            log_args.push(debug_data);
            APPLY(CONSOLE_INFO, log_args);

            callback(debug_data);
        }
    }
}

// requestAnimationFrame
var _requestAnimationFrame = VENDOR_FN('requestAnimationFrame', 1);

// requestIdleCallback, run tasks in CPU idle time
_requestIdleCallback = VENDOR_FN('requestIdleCallback');

// DOMready
// @todo
var DOM_IS_READY;
var DOMREADY_QUEUE = [];

function DOMREADY_CHECK(e) {
    if (e || DOM_IS_READY || ["complete", "loaded", "interactive"].indexOf(doc.readyState) !== -1) {
        DOM_IS_READY = 1;
        var handler = DOMREADY_QUEUE.shift();
        while (handler) {
            handler();
            handler = DOMREADY_QUEUE.shift();
        }
    }
}

function DOMREADY(handler) {
    DOMREADY_CHECK();
    (DOM_IS_READY) ? handler(): DOMREADY_QUEUE.push(handler);
};
ADD_EVENT(VAR_DOMCONTENTLOADED, function() {
    DOMREADY_CHECK(1);
});
DOMREADY_CHECK();

// requestAnimationFrame
function RAF(cb, frameTarget) {
    frameTarget = frameTarget || 1;
    _requestAnimationFrame(function() {
        if (frameTarget > 1) {
            RAF(cb, --frameTarget);
        } else {
            cb();
        }
    });
};

// timing controller
TIMING = function(args, callback) {

    if (DEBUG) {
        var config = OBJECT(args[0], VAR_TYPE),
            debug_vars = args[1],
            src = args[2],
            debug_data = {},
            log_args = debug_vars.slice(0);
        log_args[0] += '.start';
    } else if (API) {
        var config = OBJECT(args[0], VAR_TYPE),
            src = args[1];
    } else {
        var config = OBJECT(args, VAR_TYPE);
    }

    // timing type
    var type = (config) ? config[VAR_TYPE] : 0;
    var timer_set;

    if (DEBUG) {
        if (type) {
            debug_data.type = VAR(type);
        }
    }

    // custom trigger method
    if (type === VAR_METHOD) {

        if (DEBUG) {
            debug_data.method = config[VAR_METHOD];
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        w[config[VAR_METHOD]] = function() {
            _setTimeout(callback);

            if (API && src) {
                ONCE(src, function() {
                    src = false;
                });
                $async.then = function(callback) {
                    if (callback) {

                        // not loading anything
                        if (!src) {
                            callback();
                        } else {

                            // watch load event
                            ONCE(src, function() {
                                src = false;

                                callback();
                            });
                        }
                    }
                    return $async;
                };
            }
            return $async;
        };
        timer_set = 1;
    }

    // requestAnimationFrame
    if (type === VAR_REQUESTANIMATIONFRAME && _requestAnimationFrame) {

        if (DEBUG) {
            debug_data.frame = config[VAR_FRAME] || 1;
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        RAF((DEBUG) ? TIMING_DEBUG_CALLBACK('requestAnimationFrame', callback, debug_vars, debug_data) : callback, config[VAR_FRAME] || 1);
        timer_set = 1;
    }

    // requestIdleCallback
    if (type === VAR_REQUESTIDLECALLBACK && _requestIdleCallback) {
        var timeout = config[VAR_TIMEOUT];

        if (DEBUG) {
            if (timeout) {
                debug_data.timeout = timeout;
                log_args.push(debug_data);
            }
            APPLY(CONSOLE_LOG, log_args);
        }

        _requestIdleCallback((DEBUG) ? TIMING_DEBUG_CALLBACK('requestIdleCallback', callback, debug_vars, debug_data) : callback, (timeout) ? {
            timeout: timeout
        } : undefined);
        timer_set = 1;
    }

    // domReady
    if (type === VAR_DOMREADY) {

        if (DEBUG) {
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        DOMREADY((DEBUG) ? TIMING_DEBUG_CALLBACK('domReady', callback, debug_vars) : callback);
        timer_set = 1;
    }

    // setTimeout
    if (type === VAR_SETTIMEOUT) {

        if (DEBUG) {
            debug_data.timeout = config[VAR_TIMEOUT];
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        _setTimeout((DEBUG) ? TIMING_DEBUG_CALLBACK('setTimeout', callback, debug_vars, debug_data) : callback, config[VAR_TIMEOUT]);
        timer_set = 1;
    }

    // Media Query / responsive
    if (type === VAR_MEDIA && RESPONSIVE) {

        if (DEBUG) {
            debug_data.media = config[VAR_MEDIA];
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        RESPONSIVE(config[VAR_MEDIA], (DEBUG) ? TIMING_DEBUG_CALLBACK('media', callback, debug_vars, debug_data) : callback);
        timer_set = 1;

        // Chrome doesn't load rel="preload" when the viewport changes
        // add viewport watch to enable responsive loading and disabling of stylesheets
        // @link https://github.com/filamentgroup/loadCSS/issues/254
    }

    // inview / element visibility
    if (type === VAR_INVIEW && INVIEW) {

        if (DEBUG) {
            debug_data.selector = config[VAR_SELECTOR];
            debug_data.threshold = config[VAR_THRESHOLD];
            debug_data.offset = config[VAR_OFFSET];
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        INVIEW(config[VAR_SELECTOR], config[VAR_THRESHOLD], config[VAR_OFFSET], (DEBUG) ? TIMING_DEBUG_CALLBACK('inview', callback, debug_vars, debug_data) : callback);
        timer_set = 1;
    }

    // inview / element visibility
    if (type === VAR_LAZY && LAZY) {

        if (DEBUG) {
            debug_data.config = config[VAR_CONFIG];
            debug_data.ref = config[VAR_REF] || null;
            log_args.push(debug_data);
            APPLY(CONSOLE_LOG, log_args);
        }

        LAZY(config[VAR_CONFIG], config[VAR_REF], (DEBUG) ? TIMING_DEBUG_CALLBACK('lazy', callback, debug_vars, debug_data) : callback);
        timer_set = 1;
    }

    if (!timer_set) {
        callback();
    }
}