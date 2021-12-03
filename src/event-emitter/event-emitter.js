/**
 * Async CSS loader - github.com/style-tools/async-css
 * Released under the terms of MIT license
 *
 * Compressed event emitter
 * Inspired by @link https://github.com/scottcorgan/tiny-emitter
 *
 * Copyright (C) 2018 github.com/style-tools
 */

var E = {};

EMIT = function(names) {
    var data = [].slice.call(arguments, 1);
    names = ARRAY(names);

    FOREACH(names, function(name) {
        if (name) {
            name = VAR(name);

            var evtArr = (E[name] || []).slice();

            FOREACH(evtArr, function(evt) {
                APPLY(evt, data);
            });
        }
    });
}

function ONCE(name, callback) {

    function listener() {
        OFF(name, listener);
        APPLY(callback, arguments);
    };

    listener._ = callback
    return ON(name, listener);
}

function ON(names, callback) {
    names = ARRAY(names);
    FOREACH(names, function(name) {
        name = VAR(name);
        PUSH(E[name] || (E[name] = []), callback);
    });

    return function() {
        OFF(names, callback);
    }
}

function OFF(names, callback) {
    names = ARRAY(names);
    FOREACH(names, function(name) {
        name = VAR(name);
        var evts = E[name];
        var liveEvents = [];

        if (evts && callback) {
            FOREACH(evts, function(evt) {
                if (evt !== callback && evt._ !== callback) {
                    liveEvents.push(evt);
                }
            });
        }
        (liveEvents.length) ?
        E[name] = liveEvents: delete E[name];
    });
}