/**
 * Async Javascript loader - github.com/style-tools/async-js
 * Released under the terms of MIT license
 *
 * Copyright (C) 2018 github.com/style-tools
 */

if (DEBUG) {
    var VAR_JS_PERF = 500;
}
var LOAD_JS_ID = 0;
var SCRIPT_DOM_INSERT_ID = 0;
var SCRIPT_DOM_INSERT_PENDING = {};
var LAST_SCRIPT_ELEMENT;

// compressed vars
var SCRIPT_ELEMENT;
var READYSTATE_VAR = VAR(VAR_READYSTATE);
var SRC_VAR = VAR(VAR_SRC);
var ONERROR_VAR = VAR(VAR_ONERROR);
var ONLOAD_VAR = VAR(VAR_ONLOAD);
var ONREADYSTATECHANGE_VAR = VAR(VAR_ONREADYSTATECHANGE);
var ASYNC_VAR = VAR(VAR_ASYNC);
var DEFER_VAR = VAR(VAR_DEFER);
var LOADED_VAR = VAR(VAR_LOADED);
var LOADING_VAR = VAR(VAR_LOADING);
var COMPLETE_VAR = VAR(VAR_COMPLETE);
var TEXT_VAR = VAR(VAR_TEXT);
var SCRIPT_COUNT = 0;

var REGEX_JS = /\.js(\?.*)?$/;

attrs = {};
attrs[VAR_TYPE] = VAR_TEXT_JAVASCRIPT;
attrs[VAR_CHARSET] = VAR_UTF8;

// mark scripts for capture module
if (CAPTURE) {
    attrs[VAR_DATA_C] = VAR_JS;
}
SCRIPT_ELEMENT = CREATE_ELEMENT(VAR_SCRIPT, attrs);

if (REL_PRELOAD_SUPPORT) {
    attrs = {};
    attrs[VAR_REL] = VAR_PRELOAD;
    attrs[VAR_AS] = VAR_SCRIPT;
    var SCRIPT_PRELOAD_ELEMENT = CREATE_ELEMENT(VAR_LINK, attrs);
}

// script link element
function PRELOAD_JS(url, onload) {
    var preloadEl;
    if (REL_PRELOAD_SUPPORT) {

        attrs = {};
        attrs[VAR_HREF] = url;
        preloadEl = CLONE_ELEMENT(SCRIPT_PRELOAD_ELEMENT, attrs);

        preloadEl[ONLOAD_VAR] = onload;
        preloadEl[ONERROR_VAR] = onload;

        // events
        //ADD_EVENT(VAR_LOAD, onload, preloadEl);
        //ADD_EVENT('error', onload, preloadEl);

        APPEND_CHILD(DOCHEAD(), preloadEl);
    } else {

        // fallback .onerror for old browsers
        var checkComplete = function() {
            if (preloadEl) {
                if (preloadEl.complete) {
                    loadComplete();
                } else {
                    _setTimeout(checkComplete);
                }
            }
        }
        var loadComplete = function() {
            preloadEl = null;
            onload();
        }

        preloadEl = new Image();
        preloadEl[ONLOAD_VAR] = loadComplete;
        preloadEl[ONERROR_VAR] = loadComplete;
        preloadEl[SRC_VAR] = url;

        checkComplete();
    }
}

// based on little-loader by Walmart Labs
// @Link https://github.com/walmartlabs/little-loader
function EXEC_SCRIPT(src, text, attrs, dom_insert_callback, onload, defer) {

    // clone script element
    var script = CLONE_ELEMENT(SCRIPT_ELEMENT, attrs);

    if (text) {
        if (TEXT_VAR in script) {
            script[TEXT_VAR] = text;
        } else {
            APPEND_CHILD(script, doc.createTextNode(text));
        }
    }

    var done;
    var err;
    var _cleanup; // _must_ be set below.

    /**
     * Final handler for error or completion.
     *
     * **Note**: Will only be called _once_.
     *
     * @returns {void}
     */
    var _finish = function() {

        // Only call once.
        if (done) {
            return;
        }
        done = 1;

        // Internal cleanup.
        _cleanup();

        // Callback.
        if (onload) {
            onload(err);
        }
    };

    /**
     * Error handler
     *
     * @returns {void}
     */
    var _error = function(e) {

        err = (e && e.message) ? e.message : '?';

        if (DEBUG) {
            CONSOLE_ERROR('load.exec', LOCAL_URL(src), err, arguments);
        }

        // emit error event
        if (API) {
            ERROR('js.exec', err);
        }

        _finish();
    };

    // old browsers (no async support)
    if (src && script[READYSTATE_VAR] && !(ASYNC_VAR in script)) {

        /*eslint-disable consistent-return*/

        // This section is only for IE<10. Some other old browsers may
        // satisfy the above condition and enter this branch, but we don't
        // support those browsers anyway.

        var id = ++SCRIPT_DOM_INSERT_ID;
        var inserted;

        // Clear out listeners, state.
        _cleanup = function() {
            script[ONREADYSTATECHANGE_VAR] = script[ONERROR_VAR] = null;
            SCRIPT_DOM_INSERT_PENDING[id] = void 0;
        };

        // Attach the handler before setting src, otherwise we might
        // miss events (consider that IE could fire them synchronously
        // upon setting src, for example).
        script[ONREADYSTATECHANGE_VAR] = function() {
            var firstState = script[READYSTATE_VAR];

            // Protect against any errors from state change randomness.
            if (!err) {

                // @todo IE8 compression
                if (!inserted && (firstState === LOADED_VAR || firstState === COMPLETE_VAR)) {
                    inserted = 1;

                    // Append to DOM.
                    MODULE(TIMING, (DEBUG) ? [((defer && TIMING) ? VAR_DOMREADY : 0), ['defer.fallback']] : ((defer && TIMING) ? VAR_DOMREADY : 0), function() {
                        dom_insert_callback(script);
                    });
                }

                // --------------------------------------------------------------------
                //                       GLORIOUS IE8 HACKAGE!!!
                // --------------------------------------------------------------------
                //
                // Oh IE8, how you disappoint. IE8 won't call `script.onerror`, so
                // we have to resort to drastic measures.
                // See, e.g. http://www.quirksmode.org/dom/events/error.html#t02
                //
                // As with all things development, there's a Stack Overflow comment that
                // asserts the following combinations of state changes in IE8 indicate a
                // script load error. And crazily, it seems to work!
                //
                // http://stackoverflow.com/a/18840568/741892
                //
                // The `script.readyState` transitions we're interested are:
                //
                // * If state starts as `loaded`
                // * Call `script.children`, which _should_ change state to `complete`
                // * If state is now `loading`, then **we have a load error**
                //
                // For the reader's amusement, here is HeadJS's catalog of various
                // `readyState` transitions in normal operation for IE:
                // https://github.com/headjs/headjs/blob/master/src/2.0.0/load.js#L379-L419
                if (firstState === LOADED_VAR) {
                    // The act of accessing the property should change the script's
                    // `readyState`.
                    //
                    // And, oh yeah, this hack is so hacky-ish we need the following
                    // eslint disable...
                    /*eslint-disable no-unused-expressions*/
                    script.children;
                    /*eslint-enable no-unused-expressions*/

                    if (script[READYSTATE_VAR] === LOADING_VAR) {
                        // State transitions indicate we've hit the load error.
                        //
                        // **Note**: We are not intending to _return_ a value, just have
                        // a shorter short-circuit code path here.
                        return _error();
                    }
                }

                // It's possible for readyState to be "complete" immediately
                // after we insert (and execute) the script in the branch
                // above. So check readyState again here and react without
                // waiting for another onreadystatechange.
                if (script[READYSTATE_VAR] === COMPLETE_VAR) {
                    _finish();
                }
            }
        };

        // Onerror handler _may_ work here.
        script[ONERROR_VAR] = _error;

        // Since we're not appending the script to the DOM yet, the
        // reference to our script element might get garbage collected
        // when this function ends, without onreadystatechange ever being
        // fired. This has been witnessed to happen. Adding it to
        // `SCRIPT_DOM_INSERT_PENDING` ensures this can't happen.
        SCRIPT_DOM_INSERT_PENDING[id] = script;

        // This triggers a request for the script, but its contents won't
        // be executed until we append it to the DOM.
        script[SRC_VAR] = src;

        // In some cases, the readyState is already "loaded" immediately
        // after setting src. It's a lie! Don't append to the DOM until
        // the onreadystatechange event says so.


    } else {

        // This section is for modern browsers, including IE10+.

        // Clear out listeners.
        _cleanup = function() {
            script[ONLOAD_VAR] = script[ONERROR_VAR] = null;
        };

        if (src) {

            script[ONERROR_VAR] = _error;
            script[ONLOAD_VAR] = _finish;

            if (defer) {
                script[DEFER_VAR] = true;
            } else {
                script[ASYNC_VAR] = true;
            }
            script[SRC_VAR] = src;
        }

        dom_insert_callback(script);

        // inline script
        if (!src) {
            _finish();
        }
    }
};

// load scripts
LOAD_JS = function(script, options, capture, capture_options) {

    // compress script config
    script = COMPRESS_OPTIONS(OBJECT(script, VAR_SRC));

    var scriptEl, // script element
        loading = true,
        loading_state,
        onready,
        src = script[VAR_SRC],
        inline = ITEM_OR_OPTIONS(script, options, VAR_INLINE),
        script_attrs = {},
        custom_attrs = MERGE(OBJECT(options[VAR_ATTRIBUTES]), OBJECT(script[VAR_ATTRIBUTES])),
        defer = ITEM_OR_OPTIONS(script, options, VAR_DEFER),
        target,
        insert_target = ITEM_OR_OPTIONS(script, options, VAR_TARGET),
        insert_target_after,
        insert_after,
        script_id = ++LOAD_JS_ID;

    // onready method
    if (API) {
        var onready_callback;
        onready = function(callback) {
            onready_callback = callback;
        };
    }

    if (DEBUG) {
        script[VAR_JS_PERF] = LOAD_JS_ID;
        PERFORMANCE_MARK('load' + script[VAR_JS_PERF]);
    }

    // rebase module
    MODULE(REBASE, [script, options, src], function(rebased) {
        src = rebased;
    }, 1);

    // timed download
    MODULE(TIMING, (DEBUG) ? [ITEM_OR_OPTIONS(script, options, VAR_LOAD_TIMING), ['download.timing', LOCAL_URL(src)], src] : (
        (API) ? [ITEM_OR_OPTIONS(script, options, VAR_LOAD_TIMING), src] : ITEM_OR_OPTIONS(script, options, VAR_LOAD_TIMING)
    ), function() {

        // use insert target from options
        if (insert_target) {
            insert_target = OBJECT(insert_target, VAR_BEFORE);
            insert_target_after = insert_target[VAR_AFTER];
            insert_target = ELEMENTS_BY_QUERY(insert_target_after || insert_target[VAR_BEFORE]);
            if (insert_target) {
                target = insert_target;
                insert_after = insert_target_after;
            }
        }
        target = target || NEXT(LAST_SCRIPT_ELEMENT);

        // cache module
        MODULE(CACHE, [script, options, VAR_JS, script_attrs, src], function(cached) {

            // insert script element to DOM
            function insertDom(el) {

                scriptEl = el;

                SET_ATTRS(scriptEl, custom_attrs, 1);

                // move script element to target
                if (target) { // insert element to document
                    if (insert_after) {
                        AFTER(target, scriptEl);
                    } else {
                        BEFORE(target, scriptEl);
                    }
                } else {
                    APPEND_CHILD(DOCHEAD(), scriptEl);
                }

                LAST_SCRIPT_ELEMENT = scriptEl;
            }

            // exec
            function execScript() {

                function execDone(error) {

                    if (DEBUG) {

                        var perf = PERFORMANCE_MARK('_exec' + script[VAR_JS_PERF], 'exec' + script[VAR_JS_PERF], 'exec', 'exec');
                        var name = 'exec' + (error) ? ':error' : '';

                        var debug_data = perf;
                        debug_data.el = scriptEl;
                        if (error) {
                            debug_data.error = error;
                        }

                        CONSOLE_LOG(name, LOCAL_URL(src), debug_data);

                        EMIT('perf:' + name, src, perf, cached, error);
                    }

                    if (API) {
                        if (onready_callback) {
                            onready_callback();
                        }
                    }

                    if (EMIT) {
                        loading = false;

                        if (!error) {

                            // onload callback
                            EMIT([VAR_EXEC, src, script[VAR_REF]], script, scriptEl, script_id);
                        }
                    }

                    if (!error) {
                        // inline script module
                        MODULE(INLINE_JS, [script, scriptEl, options, inline]);
                    }
                }

                if (!src) {

                    execDone();

                } else if (loading_state === 1) {

                    // mark exec loading_state
                    loading_state = 2;

                    // cached inline script
                    EXEC_SCRIPT((cached) ? 0 : src, (cached) ? cached[0] : 0, (cached) ? cached[1] : script_attrs, insertDom, execDone, defer);
                }
            }

            // onload callback
            function onload() {

                if (!loading_state) {

                    if (DEBUG) {

                        var debug_data = {};
                        var load_path = '';
                        if (cached) {
                            debug_data['cache'] = cached[2];
                            load_path = '.cache';
                        }

                        var perf = PERFORMANCE_MARK('_load' + script[VAR_JS_PERF], 'load' + script[VAR_JS_PERF], 'load', 'load');
                        debug_data.startTime = perf.startTime;
                        debug_data.duration = perf.duration;

                        CONSOLE_LOG('load' + load_path, LOCAL_URL(src), debug_data);

                        EMIT('perf:load', src, perf, cached);
                    }

                    // mark loading_state
                    loading_state = 1;

                    // dependency module
                    MODULE(DEPENDENCY, [script, ITEM_OR_OPTIONS(script, options, VAR_DEPENDENCIES), VAR_JS, src], function(target) {

                        if (DEBUG) {
                            PERFORMANCE_MARK('exec' + script[VAR_JS_PERF]);
                        }

                        // timed exec
                        MODULE(TIMING, (DEBUG) ? [ITEM_OR_OPTIONS(script, options, VAR_EXEC_TIMING), ['exec.timing', LOCAL_URL(src)], src] : (
                            (API) ? [ITEM_OR_OPTIONS(script, options, VAR_EXEC_TIMING), src] : ITEM_OR_OPTIONS(script, options, VAR_EXEC_TIMING)
                        ), execScript);

                    });

                }
            }

            // cached inline <script>
            if (!src || cached) {
                onload();
            } else {
                PRELOAD_JS(src, onload);
            }
        });
    });

    if (API) {
        return onready;
    }
    return true;
};

JS_LOADER = function(args, callback) {
    var item = args[0],
        options = args[1],
        match;

    if (IS_STRING(item)) {
        if (REGEX_JS.test(item)) {
            item = {
                src: item
            };
            match = true;
        }
    } else if (IS_OBJECT(item) && (item[SRC_VAR] || item[INLINE_VAR])) {
        match = true;
    }

    if (match) {
        callback(LOAD_JS(item, options));
    } else {
        callback(); // stylesheet
    }
}