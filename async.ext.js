/*
 * Async CSS loader
 * /

/** @export */
window.$async;
window.$async.load = function() {};
window.$async.on = function() {};
window.$async.once = function() {};
window.$async.then = function() {};
window.$async.time = function() {};
window.$async.dependencies = function() {};
window.perfMark = function() {};


var $lazy = window.$lazy = function(entries) {
    entries[0].isIntersecting = false;
}

window.$async.js = window.$async;

window.caches;
window.matchMedia;
window.msMatchMedia;
window.Promise;

window.CacheApiDB;
window.CacheApiDB.set = function() {};
window.CacheApiDB.get = function() {};
window.CacheApiDB.del = function() {};
window.CacheApiDB.clear = function() {};
window.CacheApiDB.prune = function() {};

window.inview_stat; // testing

window.document;
window.document.documentElement;
window.document.body;
window.document.head;
window.stop;
window.event;
window.event.returnValue;
window.event.returnValue;
window.outerWidth;
window.outerHeight;
window.screenX;
window.screenY;
window.open;
window.PerformanceMeasure;
var PerformanceMeasure;

window.parent;
window.localStorage;

XDomainRequest;

var perfRes = {
    "PerformanceMeasure": ''
};
var debug_data = {
    el: '',
    cache: '',
    startTime: '',
    duration: '',
    type: '',
    size: '',
    "max-size": '',
    unmet: '',
    dependencies: '',
    'rewritten': 1,
    selector: '',
    method: '',
    config: '',
    ref: ''
};
document.createEvent = function() {
    return {
        initMouseEvent: ''
    }
}

HTMLLinkElement.relList = {
    supports: function() {}
}
HTMLLinkElement.classList = {
    add: function() {},
    contains: function() {},
    remove: function() {},
    toggle: function() {}
};

document.createElement = function() {
    return {
        relList: ''
    }
}

function SET_STYLE(el, styles) {
    styles = {
        height: '',
        width: '',
        display: '',
        "min-height": '',
        "min-width": '',
        "max-height": '',
        "max-width": '',
        position: '',
        top: '',
        left: '',
        "z-index": '',
        'transform': ''
    }
}

function GET_COMPUTED_STYLE() {
    return {
        width: ''
    }
}

var headers = {
    "Accept": "",
    "Access-Control-Allow-Origin": "",
    "cache-control": "",
    "expires": "",
    "pragma": "",
    "x-styletools": ""
};

// set multiple attributes
var setAttrs = {
    'rel': '',
    'src': '',
    'href': '',
    'as': '',
    'type': '',
    'media': '',
    'data-src': '',
    'class': '',
    'pattern': '',
    'role': '',
    'style': '',
    'frameborder': '',
    'sandbox': '',
    'disabled': '',
    'onload': '',
    'charset': '',
    'placeholder': '',
    'value': '',
    'async': '',
    'onreadystatechange': '',
    'onerror': '',
    'selected': '',
    'checked': '',
    'data-frame': '',
    'data-i': '',
    'data-media': '',
    'data-href': '',
    'data-o10n': '',
    'for': '',
    'target': '',
    'label': '',
    'hidden': '',
    'alt': '',
    'xmlns': '',
    'size': '',
    'stroke-width': '',
    'origPos': '',
    'origPosAttribute': '',
    'text-anchor': ''
};

var SPECIAL_MAP = {
    disabled: 1,
    checked: 1,
    onload: 1,
    onerror: 1,
    value: 1,
    selected: 1,
    onreadystatechange: 1
};

var requestOptions = {
    mode: '',
    headers: '',
    cache: '',
    credentials: ''
}

function DEBUG_ERROR() {}