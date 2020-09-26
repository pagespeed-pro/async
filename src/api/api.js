/**
 * 🔬 Style.Tools
 * 
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

API = 1;

var _methods = [
    [VAR_LOAD, ],
    [VAR_ON, ON],
    [VAR_ONCE, ONCE],
    [VAR_OFF, OFF]
];

if (TIMING) {
    _methods.push([VAR_TIME, function(config, callback, debug) {
        config = COMPRESS_OPTIONS(OBJECT(config, VAR_TYPE));
        TIMING((DEBUG) ? [config, (debug || [])] : [config], callback);
        return $async;
    }]);
}

if (DEPENDENCY) {
    _methods.push([VAR_DEPENDENCIES, function(dep, callback) {
        DEPENDENCY(dep, callback);
        return $async;
    }]);
}

// assign public methods
FOREACH(_methods, function(method) {
    var _method = VAR(method[0]),
        _fn = method[1],
        _load = method[0] === VAR_LOAD;

    // CSS loader
    if (LOAD_CSS) {
        $async[_method] = _load ? $async : function() {
            var args = arguments;
            if (DEPENDENCY) {
                if (VAR_DEPENDENCIES === method[0]) {
                    args = [
                        [0, args[0], VAR_CSS], args[1]
                    ];
                }
            }
            APPLY(_fn, args);
            return $async;
        };
    }
});

ERROR = function(type, msg) {

    // emit error
    EMIT(VAR_ERROR, type, msg);
}