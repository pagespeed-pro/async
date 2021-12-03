/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

if (DEBUG) {
    var LOAD_ID = 0;
    var VAR_PERF = 500;
}

// reference of last loaded sheet
var LAST_SHEET_ELEMENT;
var ASYNC_MEDIA = VAR(VAR_ONLY_X);

attrs = {};
if (REL_PRELOAD_SUPPORT) {
    attrs[VAR_REL] = VAR_PRELOAD;
    attrs[VAR_AS] = VAR_STYLE;
} else {
    attrs[VAR_REL] = VAR_STYLESHEET;
    attrs[VAR_MEDIA] = ASYNC_MEDIA;
}
SET_ATTRS(LINK_ELEMENT, attrs);

// load stylesheets
LOAD_CSS = function(sheets, options, capture, capture_options) {

    // .then method
    var then;

    if (sheets) {

        // convert to array
        sheets = ARRAY(sheets);

        // compress options
        options = COMPRESS_OPTIONS(OBJECT(options));

        var loading = LENGTH(sheets);

        if (API) {

            // .then method
            then = function(callback, off) {
                if (callback) {

                    // not loading anything
                    if (!loading) {
                        callback();
                    } else {

                        // watch load event
                        off = ON([VAR_LOAD, VAR_EXEC], function() {
                            if (!loading) {
                                callback();

                                // unregister event
                                off();
                            }
                        });
                    }
                }
                return $async;
            }

        }

        // load sheets
        FOREACH(sheets, function(sheet) {

            var script_loaded;

            // try script loader
            MODULE(JS_LOADER, [sheet, options], function(onready) {
                if (onready) {
                    script_loaded = true;
                    if (API) {
                        onready(function() {
                            loading--;
                        });
                    }
                }
            });

            if (script_loaded) {
                return;
            }

            // compress sheet config
            sheet = COMPRESS_OPTIONS(OBJECT(sheet, VAR_HREF));

            var sheetEl, // stylesheet element
                loading_state,
                href = sheet[VAR_HREF],
                media = ITEM_OR_OPTIONS(sheet, options, VAR_MEDIA, VAR(VAR_ALL)),
                sheet_attrs = {},
                custom_attrs = MERGE(OBJECT(options[VAR_ATTRIBUTES]), OBJECT(sheet[VAR_ATTRIBUTES])),
                target,
                insert_target = ITEM_OR_OPTIONS(sheet, options, VAR_TARGET),
                insert_target_after,
                insert_target_global = !sheet[VAR_TARGET],
                insert_after;

            // attr-config module based insert target
            if (INSERT_TARGET) {
                if (!insert_target && !LAST_SHEET_ELEMENT) {
                    target = INSERT_TARGET;
                    insert_target_global = true;
                    insert_after = true;
                }
            }

            if (DEBUG) {
                sheet[VAR_PERF] = ++LOAD_ID;
                PERFORMANCE_MARK('load' + sheet[VAR_PERF]);
            }

            // mark stylesheets for capture module
            if (CAPTURE) {
                sheet_attrs[VAR_DATA_C] = VAR_CSS;
            }

            // rebase module
            MODULE(REBASE, [sheet, options, href], function(rebased) {
                href = rebased;
            }, 1);

            // responsive download start
            MODULE(RESPONSIVE, media, function() {

                // timed download
                MODULE(TIMING, (DEBUG) ? [ITEM_OR_OPTIONS(sheet, options, VAR_LOAD_TIMING), ['download.timing', LOCAL_URL(href)], href] : (
                    (API) ? [ITEM_OR_OPTIONS(sheet, options, VAR_LOAD_TIMING), href] : ITEM_OR_OPTIONS(sheet, options, VAR_LOAD_TIMING)
                ), function() {

                    // use insert target from options
                    if (insert_target && !insert_target_global) {
                        insert_target = OBJECT(insert_target, VAR_BEFORE);
                        insert_target_after = insert_target[VAR_AFTER];
                        insert_target = ELEMENTS_BY_QUERY(insert_target_after || insert_target[VAR_BEFORE]);
                        if (insert_target) {
                            target = insert_target;
                            insert_after = insert_target_after;
                        }
                    }
                    target = target || NEXT(LAST_SHEET_ELEMENT);

                    // cache module
                    MODULE(CACHE, [sheet, options, VAR_CSS, sheet_attrs, href], function(cached) {

                        // render
                        function renderStylesheet() {

                            if (loading_state === 1) {

                                // mark render loading_state
                                loading_state = 2;

                                sheet_attrs = {};

                                // media query
                                sheet_attrs[VAR_MEDIA] = media;

                                if (!CACHE || !cached) {

                                    // rel="preload"
                                    if (REL_PRELOAD_SUPPORT) {
                                        sheet_attrs[VAR_REL] = VAR_STYLESHEET;
                                    }
                                }

                                // set attributes
                                SET_ATTRS(sheetEl, custom_attrs, 1);
                                SET_ATTRS(sheetEl, sheet_attrs);

                                if (CACHE) {
                                    if (cached) {

                                        // enable cached <style>
                                        DISABLED(sheetEl, 1);

                                        // set cssText after DOM insert for old browsers
                                        cached[1][VAR_CSSTEXT](sheetEl);
                                    }
                                }

                                if (DEBUG) {

                                    var perf = PERFORMANCE_MARK('_render' + sheet[VAR_PERF], 'render' + sheet[VAR_PERF], 'render', 'render');
                                    CONSOLE_LOG('render', LOCAL_URL(href), perf);

                                    EMIT('perf:render', href, perf, cached);
                                }

                                if (EMIT) {
                                    loading--;

                                    // onload callback
                                    EMIT([VAR_LOAD, href, sheet[VAR_REF]], sheet, sheetEl, !loading);
                                }
                            }
                        }

                        // onload callback
                        function onload() {

                            if (!loading_state) {

                                if (DEBUG) {

                                    var debug_data = {
                                        el: sheetEl
                                    };
                                    var load_path = '';
                                    if (cached) {
                                        debug_data['cache'] = cached[2];
                                        load_path = '.cache';
                                    }

                                    var perf = PERFORMANCE_MARK('_load' + sheet[VAR_PERF], 'load' + sheet[VAR_PERF], 'load', 'load');
                                    debug_data.startTime = perf.startTime;
                                    debug_data.duration = perf.duration;

                                    CONSOLE_LOG('load' + load_path, LOCAL_URL(href), debug_data);

                                    EMIT('perf:load', href, perf, cached);
                                }

                                // mark download loading_state
                                loading_state = 1;

                                // dependency module
                                MODULE(DEPENDENCY, [sheet, ITEM_OR_OPTIONS(sheet, options, VAR_DEPENDENCIES), href], function(target) {

                                    if (DEBUG) {
                                        PERFORMANCE_MARK('render' + sheet[VAR_PERF]);
                                    }

                                    // timed render
                                    MODULE(TIMING, (DEBUG) ? [ITEM_OR_OPTIONS(sheet, options, VAR_RENDER_TIMING), ['render.timing', LOCAL_URL(href)], href] : (
                                        (API) ? [ITEM_OR_OPTIONS(sheet, options, VAR_RENDER_TIMING), href] : ITEM_OR_OPTIONS(sheet, options, VAR_RENDER_TIMING)
                                    ), renderStylesheet);

                                });

                            }
                        }

                        // cached <style>
                        if (cached) {
                            sheet[VAR_LINK] = sheetEl = cached[0];
                        } else {

                            // load stylesheet via <link>
                            sheet_attrs[VAR_HREF] = href;
                            sheetEl = CLONE_ELEMENT(LINK_ELEMENT, sheet_attrs);

                            sheet[VAR_LINK] = sheetEl;

                            // use fallback via document.styleSheets for old browsers
                            if (!REL_PRELOAD_SUPPORT) {

                                // a backup method that mimics onload by polling until doc.styleSheets until it includes the new sheet.
                                var onloadFallback = function(callback) {

                                    // loading_state
                                    if (!loading_state) {

                                        var sheets = doc.styleSheets;

                                        var i = LENGTH(sheets);
                                        while (i-- && !loading_state) {

                                            // stylesheet loaded
                                            if (sheets[i].href === sheetEl.href) {
                                                return callback();
                                            }
                                        }
                                        _setTimeout(onloadFallback, 0, callback);
                                    }
                                };

                                // onload fallback handler
                                onloadFallback(onload);
                            }

                            // onload handler
                            ADD_EVENT(VAR_LOAD, onload, sheetEl);
                        }

                        // insert element to document
                        if (target) {
                            if (insert_after) {
                                AFTER(target, sheetEl);

                                // continue after last inserted sheet
                                if (insert_after === 1) {
                                    insert_after = false;
                                }
                            } else {
                                BEFORE(target, sheetEl);
                            }
                        } else {
                            APPEND_CHILD(DOCHEAD(), sheetEl);
                        }

                        LAST_SHEET_ELEMENT = sheetEl;

                        // instantly loaded via cache (<style>)
                        if (cached) {
                            onload();
                        }
                    });
                });

            });
        });
    }

    // capture module
    MODULE(CAPTURE, [capture, capture_options]);

    if (API) {
        return then;
    }
};