/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

CACHE_UPDATE = function(args) {

    var src = args[0],
        asset = args[1],
        cache = args[2],
        cached = args[3],
        xhr_options = args[4],
        cors_options = args[5],
        force_cors = args[6] || cached[4],
        update = OBJECT(cache[VAR_UPDATE], VAR_INTERVAL);

    if (IS_EXPIRED(cached[3], update[VAR_INTERVAL] || 3600)) {

        if (DEBUG) {
            if (!XHR) {
                CONSOLE_WARN('update', 'XHR module is required for background update');
            }
        }

        // use XHR module for background update
        MODULE(XHR, [src,
            xhr_options, // xhr settings
            cors_options, // cors proxy
            force_cors, // force cors
            cached[1]
        ], function(text, last_modified, viaCORS) {

            if (DEBUG) {
                if (text !== 304) {
                    CONSOLE_LOG('update', src, 'updated', FILE_SIZE(LENGTH(text)));
                } else {
                    CONSOLE_LOG('update', src, 304);
                }
            }

            // asset updated
            CACHE_SAVE(src, cache, text, last_modified, viaCORS);
        });
    }

}