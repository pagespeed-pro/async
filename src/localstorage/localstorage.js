/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

var _localStorage = w.localStorage;

LOCALSTORAGE = [
    function(key, callback, data) { // get
        key = NAMESPACE(key);
        try {
            data = _localStorage.getItem(key);
        } catch (e) {
            if (DEBUG) {
                CONSOLE_ERROR('localStorage', key, e);
            }
        }
        if (data) {
            data = JSON.parse(data);
        }
        // expired
        if (data && data[2] && IS_EXPIRED(data[1], data[2])) {
            data = LOCALSTORAGE[2](key); // delete
        }
        callback(data);
    },
    function(key, data, expire, last_modified, cors) { // set

        // update timestamp
        if (data === 304) {
            LOCALSTORAGE[0](key, function(data) {
                LOCALSTORAGE[1](key, data[0], data[2], data[1], data[4]);
            });
        } else {
            key = NAMESPACE(key);

            data = [data, last_modified || TIMESTAMP(), expire || 0, TIMESTAMP()];
            if (cors) {
                PUSH(data, 1);
            }
            try {
                _localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                if (DEBUG) {
                    CONSOLE_ERROR('localStorage', key, e);
                    EMIT('localstorage_error', e, key);
                    return;
                }
            }

            if (DEBUG) {
                EMIT('localstorage_save', VAR_LOCALSTORAGE, key);
            }
        }
    },
    function(key) { // delete
        key = NAMESPACE(key);
        try {
            _localStorage.removeItem(key);
        } catch (e) {
            if (DEBUG) {
                CONSOLE_ERROR('localStorage', key, e);
            }
        }
    }
];

try {
    _localStorage.setItem(NAMESPACE(VAR_LOCALSTORAGE), VAR_LOCALSTORAGE);
} catch (e) {
    if (DEBUG) {
        CONSOLE_ERROR('localStorage', 'no access', e);

    }
    if (API) {
        ERROR('localstorage', e);
    }
    LOCALSTORAGE = false;
}