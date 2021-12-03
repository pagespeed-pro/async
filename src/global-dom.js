/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */


function DOCHEAD() {
    return doc.head || ELEMENTS_BY_TAGNAME(VAR_HEAD)[0];
}

function ELEMENTS_BY_QUERY(selector, target, all) {
    if (!target) {
        target = doc;
    }
    return target[STR_querySelector + ((all) ? 'All' : '')](selector);
};

// return elements by tagname
function ELEMENTS_BY_TAGNAME(tagname, el) {
    el = el || doc;
    return el.getElementsByTagName(VAR(tagname));
}

function CREATE_ELEMENT(type, setAttrs) {
    var el = doc.createElement(VAR(type));
    if (setAttrs) {
        SET_ATTRS(el, setAttrs);
    }

    return el;
}

// return element clone
function CLONE_ELEMENT(el, setAttrs) {
    var clone = el.cloneNode(true);
    if (setAttrs) {
        SET_ATTRS(clone, setAttrs);
    }
    return clone;
}

function APPEND_CHILD(target, el) {
    el = ARRAY(el);
    FOREACH(el, function(_el) {
        target.appendChild(_el);
    });
}

function SET_ATTRS(el, setAttrs, no_var_index) {
    var param, del;
    el = ARRAY(el);
    FOREACH(el, function(_el) {
        FORIN(setAttrs, function(attr_value, attr) {
            _el.setAttribute(attr, attr_value);
        }, !no_var_index);
    });

};

// get attributes
function GET_ATTR(el, attr) {
    return el.getAttribute(VAR(attr));
};

// check for multiple attributes
function HAS_ATTR(el, attr) {
    return el.hasAttribute(VAR(attr));
};

// check for multiple attributes
function IS_ATTR(el, attr, value) {
    attr = GET_ATTR(el, attr);
    return (attr) ? LOWERCASE(attr) === VAR(value) : false;
};

// check for multiple attributes
function REMOVE_ATTR(el, attr) {
    el = ARRAY(el);
    attr = ARRAY(attr);
    FOREACH(el, function(_el) {
        FOREACH(attr, function(_attr) {
            _el.removeAttribute(VAR(_attr));
        });
    });
};

function HAS_PROP(item, key) {
    return item.hasOwnProperty(key);
}

function BEFORE(target, el) {
    PARENT(target).insertBefore(el, target);
}

function PARENT(el, n, parent) {
    n = n || 1;
    parent = el.parentElement;
    while (n > 1) {
        return PARENT(parent, --n);
    }
    return parent;
}

function AFTER(target, el) {
    if (NEXT(target)) {
        return BEFORE(NEXT(target), el);
    } else {
        return APPEND_CHILD(PARENT(target), el);
    }
}

function FIRST(el) {
    return el.firstChild;
}

function NEXT(el, n, next) {
    n = n || 1;
    next = el && el.nextSibling;
    while (next && n > 1) {
        return NEXT(next, --n);
    }
    return next;
}

// stylesheet link element
LINK_ELEMENT = CREATE_ELEMENT(VAR_LINK);

// detect rel preload support
try {
    REL_PRELOAD_SUPPORT = LINK_ELEMENT.relList.supports(VAR(VAR_PRELOAD));
} catch (e) {}