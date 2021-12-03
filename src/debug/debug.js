/**
 * Async CSS loader - github.com/style-tools/async-css
 * Released under the terms of MIT license
 *
 * Compressed event emitter
 * Inspired by @link https://github.com/scottcorgan/tiny-emitter
 *
 * Copyright (C) 2018 github.com/style-tools
 */

// return human file size
var FILE_SIZE = function(a, b, c, d, e) {
    return (b = Math, c = b.log, d = 1e3, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) +
        ' ' + (e ? 'kMGTPEZY' [--e] + 'B' : 'Bytes');
}
var LOCAL_URL = function(url) {
    var attrs = {};
    attrs[VAR_HREF] = doc.location.href;
    var a = CREATE_ELEMENT('a', attrs);
    var r = new RegExp("^(http(s)?:)?//" + a.hostname);
    return (url) ? url.replace(r, '') : '';
}

// reference to Console object
var _console = w.console;

// print output to console
var CONSOLE_PRINT = function(type, args, color, icon) {

    // convert arguments to array
    args = Array.prototype.slice.call(args);

    // console not supported
    if (!_console) {
        if (type === 'error') {
            throw new Error(args.join(' - '));
        }
        return;
    }

    // extract path from first argument
    var path = args.shift();

    // add icon
    if (path) {
        args.unshift("color:#555;font-size:8px;line-height:14px;");
    }
    args.unshift("color:" + color + ";margin-right:2px;");
    args.unshift('%c🔬st' + ((path) ? '%c' + path : ''));

    switch (type) {
        case "ok":
            //args.unshift("font-size:14px;font-weight:bold;color:green;margin-right:2px;");
            //icon = '%c✔';
            type = 'log';
            break;
        case "warn":
            type = 'log';
            break;
        default:
            icon = '';
            break;
    }

    if (!_console[type]) {
        type = 'log';
    }
    try {
        _console[type].apply(this, args);
    } catch (e) {
        if (type === 'error' || type === 'warn') {
            throw new Error(args.join(' - '));
        }
    }
};

// console methods
var CONSOLE_LOG = function() {
    CONSOLE_PRINT('log', arguments, '#4488bb');
};

var CONSOLE_OK = function() {
    CONSOLE_PRINT('ok', arguments, '#079c2d');
};

var CONSOLE_INFO = function() {
    CONSOLE_PRINT('info', arguments, '#4285f4');
};

var CONSOLE_WARN = function() {
    CONSOLE_PRINT('warn', arguments, '#fbbc05');
};

var CONSOLE_ERROR = function() {
    CONSOLE_PRINT('error', arguments, '#ea4335');
};

// web performance
var PERFORMANCE = (w.performance && w.performance.mark) ? w.performance : false;
var PERFORMANCE_MARKS = {};
var PERFORMANCE_MEASURE_COUNT = {};

// mark performance timing
var PERFORMANCE_MARK = function(name, startMark, measureName, perfName) {
    if (PERFORMANCE) {
        PERFORMANCE.mark(name);
        PERFORMANCE_MARKS[name] = 1;

        if (startMark && startMark in PERFORMANCE_MARKS) {

            if ((measureName in PERFORMANCE_MEASURE_COUNT)) {
                measureName += ++PERFORMANCE_MEASURE_COUNT[measureName];
            } else {
                PERFORMANCE_MEASURE_COUNT[measureName] = 1;
            }

            PERFORMANCE.measure(measureName, startMark, name);

            // return result
            var perfResult = PERFORMANCE.getEntriesByName(measureName);
            if (perfResult) {
                if (!perfName) {
                    perfName = 'Perf';
                }
                var result;
                FOREACH(perfResult, function(res) {
                    if (!result && res instanceof PerformanceMeasure) {
                        result = res;
                    }
                });
                if (result) {
                    return PERFORMANCE_RESULT(perfName, result);
                }
            }
        }
    }
    return {};
}
w.perfMark = PERFORMANCE_MARK;

// return performance result
var PERFORMANCE_RESULT = function(name, perfResult) {
    return {
        startTime: perfResult.startTime,
        duration: perfResult.duration
    };
}

// print debug notice
CONSOLE_WARN('debug', $async);