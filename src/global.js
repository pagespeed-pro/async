/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

var w = window;

/** @define {boolean} */
var DEBUG = false;

var doc = w.document;

var REL_PRELOAD_SUPPORT;
var LINK_ELEMENT;
var attrs;

// modules
var CACHE;
var TIMING;
var DEPENDENCY;
var MATCH_MEDIA;
var RESPONSIVE;
var INVIEW;
var LAZY;
var CAPTURE;
var API;
var LOAD_CSS, CAPTURE_CSS;
var LOAD_JS, CAPTURE_JS;
var JS_LOADER;
var ERROR;
var REBASE;
var EMIT;
var INLINE_JS;
var INLINE_VAR;
var INSERT_TARGET;

var VENDORS;
var VENDOR_FN;

var $async;

// setTimeout
var _setTimeout = setTimeout;
var _requestIdleCallback;
var _mutationObserver;

var addEventListenerSupported = (doc.addEventListener);

var STR_querySelector = VAR(VAR_QUERYSELECTOR);

// value matching
function IS(mixed, value) {
    return mixed === value;
}

// compressed type checking
function IS_TYPE(mixed, type) {
    return typeof mixed === type;
}

function IS_INSTANCE(mixed, type) {
    return mixed instanceof type;
}

function IS_STRING(str) {
    return IS_TYPE(str, 'string');
}

function IS_OBJECT(str, noArray) {
    return IS_TYPE(str, 'object') ? (!noArray || !IS_ARRAY(str)) : false;
}

function IS_FUNCTION(str) {
    return IS_TYPE(str, 'function');
}

function IS_UNDEFINED(mixed) {
    return IS_TYPE(mixed, 'undefined');
}

function IS_ARRAY(arr) {
    return IS_INSTANCE(arr, Array);
}

function OBJECT(obj, str_param, str, _obj) {
    if (!IS_OBJECT(obj) || IS_ARRAY(obj) || obj === null) {
        _obj = {};
        if (str_param) {
            _obj[str_param] = obj;
        }
    }
    return _obj || obj;
}

function ARRAY(arr) {
    if (!IS_ARRAY(arr)) {
        arr = [arr];
    }
    return arr;
}

function TRUE(bool) {
    return bool === true;
}

function LENGTH(mixed) {
    return mixed.length;
}

function PUSH(arr, value) {
    return arr.push(value);
}

// strings
function LOWERCASE(str) {
    return str.toLowerCase();
}

function STRING(str) {
    return str.toString();
}

function IS_INT(num) {
    return !isNaN(num);
}

function FOREACH(arr, callback) {

    if (DEBUG) {
        if (!callback && _console) {
            _console.error('foreach', 'no callback', arr);
        }
    }
    for (var i = 0, l = LENGTH(arr); i < l; i++) {
        callback(arr[i], i);
    }
}

function FORIN(obj, callback, var_method) {
    var value;
    for (var key in obj) {
        if (HAS_PROP(obj, key)) {
            value = obj[key];
            if (var_method) {
                key = VAR(key);
                value = VAR(value);
            }
            callback(value, key);
        }
    }
}

// add event listener
function ADD_EVENT(triggers, handler, el) {
    if (!el) {
        el = w;
    }

    triggers = ARRAY(triggers);
    el = ARRAY(el);
    FOREACH(triggers, function(trigger) {

        trigger = VAR(trigger);

        FOREACH(el, function(_el) {
            if (addEventListenerSupported) {
                _el.addEventListener(trigger, handler, false);
            } else if (_el.attachEvent) {
                // IE8
                if (trigger === VAR(VAR_DOMCONTENTLOADED)) {
                    trigger = VAR(VAR_LOAD);
                    _el = w;
                }
                _el.attachEvent('on' + trigger, handler);
            } else {
                try {
                    _el['on' + trigger] = handler;
                } catch (e) {}
            }
        });
    });

};

// return timestamp
function TIMESTAMP(t) {
    return Math.round((t ? new Date(t) : new Date).getTime() / 1000);
}

function SPLIT(str, sep) {
    sep = sep || ',';
    return str.split(sep);
}

// load module if available
function MODULE(module, module_args, callback, skip_no_module) {
    if (IS_FUNCTION(module)) {
        APPLY(module, [module_args, callback]);
    } else if (callback && !skip_no_module) {
        callback();
    }
}

function APPLY(fn, args) {
    return fn.apply(null, args);
}

function DISABLED(el, enable) {
    el.disabled = !enable;
}

function MERGE(obj1, obj2) {
    var obj = {};
    for (var key in obj1) obj[key] = obj1[key];
    for (var key in obj2) obj[key] = obj2[key];
    return obj;
}

// item or options
function ITEM_OR_OPTIONS(sheet, options, key, alt, s, o) {
    s = sheet[key];
    o = options[key];
    return (!IS_UNDEFINED(s)) ? s : ((!IS_UNDEFINED(o)) ? o : alt);
};