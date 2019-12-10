/**
 * Async CSS loader - github.com / style - tools / async - css
 * Released under the terms of MIT license
 *
 * Copyright (C) 2018 github.com/style-tools
 */

var CAPTURE_OBSERVER;
var CAPTURE_INSERT;
var CAPTURE_LIST = [];
var CAPTURE_SETUP = {};

// public methods
var capture_method = VAR(VAR_CAPTURE);
var PUBLIC_CAPTURE = function(capture, options) {
    CAPTURE([capture, options]);
};
if (LOAD_CSS) {
    $async[capture_method] = PUBLIC_CAPTURE;
}
if (LOAD_JS) {
    $async_js[capture_method] = PUBLIC_CAPTURE;
}

// replace DOM node
function REPLACE(newNode, old) {
    PARENT(old).replaceChild(newNode, old);
}

// capture
function CAPTURE_NODE(node) {

    FOREACH(CAPTURE_LIST, function(args) {
        var capture = args[0],
            options = args[1];

        // remove from DOM
        function remove() {
            node.innerHTML = '';
            REMOVE_ATTR(node, [nodeSrc, VAR_REL]);
            DISABLED(node);
        }

        var nodeCapture, nodeSrc, nodeName,
            src, proxy, rewrite;

        // determine if node is style/sheet
        if (node && node.nodeType === 1 && !HAS_ATTR(node, VAR_DATA_C)) {
            nodeName = LOWERCASE(node.nodeName);

            // capture CSS module
            MODULE(CAPTURE_CSS, [node, nodeName], function(_src, _nodeSrc) {
                if (_src) {
                    src = _src;
                    nodeCapture = VAR_CSS;
                    nodeSrc = _nodeSrc;
                }
            });

            // capture script module
            MODULE(CAPTURE_JS, [node, nodeName], function(_src, _nodeSrc) {
                if (_src) {
                    src = _src;
                    nodeCapture = VAR_JS;
                    nodeSrc = _nodeSrc;
                }
            });
        }

        // capture node
        if (nodeCapture) {

            var captured;

            FOREACH(capture, function(cnf) {
                if (!captured) {

                    var type = cnf[VAR_TYPE] || VAR_ALL,
                        match_type = cnf[VAR_MATCH_TYPE] || VAR_URL,
                        match = cnf[VAR_MATCH],
                        regex = cnf[VAR_REGEX],
                        match_content = src;

                    if (type === VAR_ALL || type === nodeCapture) {

                        // match URL
                        if (match_type === VAR_CONTENTS) {
                            match_content = node.outerHTML;
                        }

                        // match 
                        match = (regex) ? REGEX(match) : match;

                        if (match && match_content) {

                            // regular expression match
                            if (regex) {
                                if (match.test(match_content)) {
                                    captured = cnf;
                                }
                            } else if (match_content.indexOf(match) !== -1) {
                                captured = cnf;
                            }
                        }
                    }
                }
            });

            // asset captured by match policy
            if (captured) {
                var action = captured[VAR_ACTION];

                // remove node
                if (action[VAR_TYPE] === VAR_REMOVE) {

                    // delete
                    remove(node, nodeCapture);

                    if (DEBUG) {

                        var attributes = {};
                        attributes[VAR_DATA_C] = src;

                        // rewrite stylesheet
                        SET_ATTRS(node, attributes);

                        var debug_data = {
                            match: captured,
                            action: 'remove'
                        };
                        CONSOLE_INFO('capture.' + ((nodeCapture === VAR_JS) ? 'js' : 'css'), LOCAL_URL(src), debug_data);
                    }
                } else {

                    var search = action[VAR_SEARCH],
                        replace = action[VAR_REPLACE],
                        search_regex = action[VAR_REGEX],
                        timing = action[VAR_TIMING],
                        attributes = OBJECT(action[VAR_ATTRIBUTES]),
                        rewritten;

                    if (!search) {
                        rewritten = replace;
                    } else {
                        if (search_regex) {
                            search_regex = REGEX(search);
                            if (search_regex) {
                                rewritten = src.replace(search_regex, replace);
                            } else {

                                if (DEBUG) {
                                    CONSOLE_ERROR('capture.' + ((nodeCapture === VAR_JS) ? 'js' : 'css'), 'invalid regex', search);
                                }

                                if (API) {
                                    ERROR('capture.' + ((nodeCapture === VAR_JS) ? 'js' : 'css'), ['invalid regex', search]);
                                }

                                return node;
                            }
                        } else {
                            rewritten = src.replace(search, replace);
                        }
                    }

                    attributes[nodeSrc] = rewritten;
                    attributes[VAR_DATA_SRC] = src;

                    if (DEBUG) {
                        var debug_data = {
                            match: captured,
                            action: 'rewrite',
                            src: src,
                            rewritten: rewritten,
                            el: node
                        };
                    }

                    // timed insert
                    if (TIMING && timing) {

                        attributes[VAR_DATA_C] = nodeCapture;

                        var cloned = CLONE_ELEMENT(node, attributes);

                        // remove node
                        remove(node, nodeCapture);

                        // timing module
                        MODULE(TIMING, (DEBUG) ? [timing, ['capture.timing', LOCAL_URL(src)], src] : (
                            (API) ? [timing, src] : timing
                        ), function() {

                            // replace node with timed node
                            REPLACE(cloned, node);
                        });
                    } else {

                        // rewrite stylesheet
                        SET_ATTRS(node, attributes);

                        if (DEBUG) {
                            CONSOLE_INFO('capture.' + ((nodeCapture === VAR_JS) ? 'js' : 'css'), LOCAL_URL(src), debug_data);
                        }
                    }
                }
            }
        }
    });

    return node;
}

// setup capture
CAPTURE = function(args) {
    
    // compress options
    var options = COMPRESS_OPTIONS(OBJECT(args[1]));

    if (args[0]) {

        PUSH(CAPTURE_LIST, [COMPRESS_OPTIONS(ARRAY(args[0])), options]);
    }
        
    // mutation observer
    MODULE(CAPTURE_OBSERVER, options[VAR_OBSERVER], CAPTURE_NODE);

    // rewrite insert methods
    MODULE(CAPTURE_INSERT, options[VAR_INSERT], CAPTURE_NODE);
}