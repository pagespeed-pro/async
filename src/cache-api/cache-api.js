/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

/**
 * Cache API key/value store - github.com/optimalisatie/Cache-API-Key-Value-Store
 * Released under the terms of MIT license
 *
 * Copyright (C) 2018 github.com/optimalisatie
 */
var CACHE_API_STORE_NAME = NAMESPACE();

function CACHE_API_OPEN() {
    return w.caches.open(CACHE_API_STORE_NAME);
}

function CACHE_API_STORE_OPEN(key) {
    return CACHE_API_OPEN().then(function(cache) {
        return [cache, new Request(key)];
    })["catch"](function(err) {
        if (DEBUG) {
            CONSOLE_ERROR('Cache-API', 'no access', err);

            if (API) {
                ERROR('cache_api', [key, err]);
            }
        }
        CACHE_API = false;
    });
};

if ("caches" in w) {

    CACHE_API = [
        function(key, callback) { // get
            CACHE_API_STORE_OPEN(key).then(function(cache) {
                cache[0].match(cache[1]).then(function(cachedata) {

                    // expired check
                    if (!cachedata) {
                        callback();
                    } else {
                        cachedata.json().then(function(data) {
                            if (data && data[2] && IS_EXPIRED(data[1], data[2])) {
                                data = CACHE_API[2](key);
                            }
                            callback(data);
                        });
                    }
                });
            })["catch"](function() {
                callback(false, 1);
            });
        },
        function(key, data, expire, last_modified, cors) { // set

            // update timestamp
            if (data === 304) {
                CACHE_API[0](key, function(data) {
                    CACHE_API[1](key, data[0], data[2], data[1], data[4]);
                });
            } else {

                CACHE_API_STORE_OPEN(key).then(function(cache) {
                    var headers = {};
                    // JSON
                    headers['Content-Type'] = 'application/json';

                    data = [data, last_modified || TIMESTAMP(), expire || 0, TIMESTAMP()];
                    if (cors) {
                        PUSH(data, 1);
                    }
                    data = JSON.stringify(data);

                    data = new Response(data, {
                        headers: headers
                    });
                    cache[0].put(cache[1], data);

                    if (DEBUG) {
                        EMIT('cache_api_save', VAR_CACHE_API, key);
                    }
                });
            }
        },
        function(key) { // delete
            CACHE_API_STORE_OPEN(key).then(function(cache) {
                cache[0]["delete"](cache[1]);
            });
        }
    ];
}