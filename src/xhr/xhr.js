/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */
var _XDomainRequest = w.XDomainRequest,
    proxy_url_token = /µ/;

// XHR request module
XHR = function(args, callback) {

    function set_request_header(key, value) {
        xhr.setRequestHeader(key, value);
    }

    var href = args[0],
        xhr_config = args[1],
        cors = OBJECT(args[2], VAR_PROXY),
        use_cors_proxy = args[3],
        head_update = args[4],
        head_update_date,
        proxy = cors[VAR_PROXY] || '',
        xhr,
        last_modified, fallback_to_proxy;

    if (!href || (use_cors_proxy && !cors)) {
        callback();
    } else {

        // proxify URL
        proxy = !use_cors_proxy ? href : (proxy && proxy_url_token.test(proxy) ? proxy.replace(proxy_url_token, href) : proxy + href);

        // use CORS proxy as fallback
        fallback_to_proxy = function() {
            if (!use_cors_proxy) {
                args[3] = use_cors_proxy = 1;
                XHR(args, callback);
            }
        }

        // XHR for Chrome/Firefox/Opera/Safari.
        if (!use_cors_proxy || IS_UNDEFINED(_XDomainRequest)) {
            xhr = new XMLHttpRequest();
        } else {

            // XDomainRequest for IE.
            // @todo test CORS
            xhr = new _XDomainRequest();
        }
        xhr.open(head_update ? 'HEAD' : 'GET', proxy, true);

        // bypass browser cache
        set_request_header('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
        set_request_header('cache-control', 'max-age=0');
        set_request_header('pragma', 'no-cache');

        // Setup our listener to process compeleted requests
        xhr.onreadystatechange = function() {

            // Only run if the request is complete
            if (xhr.readyState === 4) {
                var status = xhr.status;

                // read last modified header
                last_modified = xhr.getResponseHeader("Last-Modified");
                if (last_modified) {
                    last_modified = TIMESTAMP(last_modified);
                }

                if (head_update) {
                    if (last_modified && last_modified < TIMESTAMP(head_update_date)) {
                        status = 304;
                    }

                    if (status === 200) {

                        // GET
                        XHR([args[0], args[1]], callback);
                    } else if (status === 304) {
                        callback(status, last_modified, use_cors_proxy);
                    } else {

                        // try again with CORS proxy
                        fallback_to_proxy();
                    }
                } else if (status === 200) {
                    callback(xhr.responseText, last_modified, use_cors_proxy);
                } else if (status !== 200) {
                    fallback_to_proxy();
                }
            }
        };

        xhr.onerror = function(err) {
            if (DEBUG) {
                CONSOLE_ERROR('cors', head_update ? 'HEAD' : 'GET', proxy, err);
            }
            if (API) {
                ERROR('cors', [head_update ? 'HEAD' : 'GET', proxy, err]);
            }

            fallback_to_proxy();
        };

        if (head_update) {
            head_update_date = new Date(head_update * 1000);
            set_request_header("If-Modified-Since", head_update_date.toUTCString());
        }

        xhr.send();
    }

};