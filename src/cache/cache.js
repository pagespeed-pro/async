/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

function NAMESPACE(key) {
    return VAR(VAR_DATA_C) + ':' + (key || '');
}

function IS_EXPIRED(date, expire) {
    return date && ((date + expire) < TIMESTAMP());
}

var LOCALSTORAGE;
var CACHE_API;
var CACHE_UPDATE;
var XHR;
var MAX_SIZE_NO_SAVE = {};
var READ_CSSTEXT;
var CACHE_CSS;
var CACHE_JS;

// get css from cache
function CACHE_GET(src, config, callback) {
    config = OBJECT(config, VAR_TYPE);
    var type = config[VAR_TYPE];
    var namespace = config[VAR_NAMESPACE];
    var fallback = config[VAR_FALLBACK];
    var method;

    // localStorage module
    if (type === VAR_LOCALSTORAGE && LOCALSTORAGE) {
        method = LOCALSTORAGE[0];
    } else if (type === VAR_CACHE_API && CACHE_API) { // cache api
        method = CACHE_API[0];
    }

    if (method) {

        method(src, function(cached, method_disabled) {

            // max size limit
            if (cached && IS_ARRAY(cached[0])) {

                MAX_SIZE_NO_SAVE[type] = OBJECT(MAX_SIZE_NO_SAVE[type]);
                MAX_SIZE_NO_SAVE[type][src] = 1;
                cached = 0;
            }

            if (cached || !fallback) {
                if (cached) {
                    cached[9] = type;
                }
                callback(cached, method_disabled);
            } else {
                CACHE_GET(src, fallback, function(res) {
                    callback(res);
                });
            }
        });
    } else {
        callback(0, 1);
    }
}

// get css from cache
function CACHE_SAVE(src, config, text, last_modified, viaCORS) {
    config = OBJECT(config, VAR_TYPE);
    var type = config[VAR_TYPE],
        expire = config[VAR_EXPIRE],
        namespace = config[VAR_NAMESPACE],
        fallback = config[VAR_FALLBACK],
        method, len, over_max_size;

    if (src in OBJECT(MAX_SIZE_NO_SAVE[type])) {
        // max size, use fallback
    } else {

        // localStorage module
        if (type === VAR_LOCALSTORAGE && LOCALSTORAGE) {
            method = LOCALSTORAGE[1];
        } else if (type === VAR_CACHE_API && CACHE_API) { // cache api
            method = CACHE_API[1];
        }
    }

    if (method) {

        // over max size = [-1]
        len = LENGTH(text);
        over_max_size = (IS_INT(config[VAR_MAX_SIZE]) && config[VAR_MAX_SIZE] < len);

        if (DEBUG) {
            if (over_max_size) {
                var debug_data = {
                    size: FILE_SIZE(len),
                    "max-size": FILE_SIZE(config[VAR_MAX_SIZE])
                };
                CONSOLE_INFO('cache.max-size', 'skipped save', LOCAL_URL(src), debug_data);
            }
        }
        method(src, over_max_size ? [] : text, expire, last_modified, viaCORS);
    }

    // save in fallback cache
    if (fallback) {
        CACHE_SAVE(src, fallback, text, last_modified, viaCORS);
    }
}

CACHE = function(args, callback) {

    function cache_or_options(key, alt) {
        return cache[key] || cache_options[key] || alt;
    }

    function save_asset(asset, assetEl) {

        if (!cache_method_disabled) {

            // use requestIdleCallback if available via timed loading module
            var save_callback = function() {

                function save(text, last_modified, viaCORS) {

                    if (IS_STRING(text)) {
                        if (DEBUG) {
                            var debug_data = {
                                size: FILE_SIZE(LENGTH(text))
                            };
                            switch (cache[VAR_TYPE]) {
                                case VAR_LOCALSTORAGE:
                                    debug_data.type = 'localStorage';
                                    break;
                                case VAR_CACHE_API:
                                    debug_data.type = 'cache-api';
                                    break;
                            }
                            CONSOLE_LOG('cache', 'saved' + ((viaCORS) ? ' (via CORS proxy)' : ''), LOCAL_URL(src), debug_data);
                        }

                        // save
                        CACHE_SAVE(src, cache, text, last_modified, viaCORS);

                    } else {
                        if (DEBUG) {

                            // report request error

                            var debug_data = {
                                error: 'no source'
                            };
                            switch (cache[VAR_TYPE]) {
                                case VAR_LOCALSTORAGE:
                                    debug_data.type = 'localStorage';
                                    break;
                                case VAR_CACHE_API:
                                    debug_data.type = 'cache-api';
                                    break;
                            }
                            CONSOLE_ERROR('cache', 'failed' + ((viaCORS) ? ' (via CORS proxy)' : ''), LOCAL_URL(src), debug_data);

                        }

                        if (API) {
                            ERROR('cache', ['save', src]);
                        }
                    }
                }

                var rules, text = '',
                    textRetrieved;

                FOREACH(sources, function(source) {

                    if (!textRetrieved) {

                        if (asset_type === VAR_CSS && source === VAR_CSSTEXT) {

                            // cache-css module
                            MODULE(READ_CSSTEXT, assetEl, function(text) {
                                textRetrieved = source;
                                save(text);
                            }, 1);
                        }

                        // CORS or XHR
                        if (source !== VAR_CSSTEXT) {

                            // XHR module to retrieve asset source
                            MODULE(XHR, [src,
                                xhr_options, // xhr settings
                                sources_cors ? cors_options : 0, // cors proxy
                                source === VAR_CORS // force cors
                            ], save);
                            textRetrieved = source;
                        }
                    }
                });

            }

            // requestIdleCallback
            MODULE(_requestIdleCallback, save_callback, save_callback);
        }
    }

    var cached,
        asset = args[0],
        options = args[1],
        asset_type = args[2],
        attrs = OBJECT(args[3]),
        cache_options = OBJECT(options[VAR_CACHE]),
        src = args[4],
        cache = OBJECT(asset[VAR_CACHE] || cache_options, VAR_TYPE),
        disabled,
        cache_method_disabled,
        assetEl,
        skip_cache_save_max_size, // skip cache save when previously skipped due to max size
        text,
        xhr_options = cache_or_options(VAR_XHR),
        cors_options = cache_or_options(VAR_CORS),
        // VAR_CSSTEXT, 
        sources = ARRAY(cache_or_options(VAR_SOURCE, [VAR_XHR, VAR_CORS])),
        sources_cors, sources_xhr;

    // @todo (IE8 fix)
    FOREACH(sources, function(source, i) {
        sources[i] = source = VAR_INDEX(source);
        if (source === VAR_CORS) {
            sources_cors = 1;
        }
        if (source === VAR_XHR) {
            sources_xhr = 1;
        }
    });

    // get from cache
    if (src && cache[VAR_TYPE]) {

        // cache after render
        ONCE(src, save_asset);

        CACHE_GET(src, cache, function(cached, method_disabled) {
            cache_method_disabled = method_disabled;

            if (cached) { // load css via <style>

                text = cached[0];

                // remove save handler
                OFF(src, save_asset);

                // stylesheet
                if (asset_type === VAR_CSS) {

                    MODULE(CACHE_CSS, [asset, attrs, src, text], function(_assetEl, _attrs) {
                        assetEl = _assetEl;
                        attrs = _attrs;
                    }, 1);

                } else { // script

                    MODULE(CACHE_JS, [attrs, src, text], function(_text, _attrs) {
                        assetEl = _text; // exec via little-loader
                        attrs = _attrs;
                    }, 1);
                }

                // update asset in background
                MODULE(CACHE_UPDATE, [
                    src,
                    asset,
                    cache,
                    cached,
                    xhr_options,
                    sources_cors ? cors_options : 0, // cors proxy
                    !sources_xhr // force cors proxy
                ]);

                cached = [assetEl, attrs];

                if (DEBUG) {
                    if (cached[1] === VAR_LOCALSTORAGE) {
                        cached[2] = 'localStorage';
                    }
                    if (cached[1] === VAR_CACHE_API) {
                        cached[2] = 'cache-api';
                    }
                }
            }

            callback(cached);
        });

    } else {
        callback();
    }
}