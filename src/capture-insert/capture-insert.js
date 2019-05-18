/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

var APPEND_CHILD_KEY = VAR(VAR_APPENDCHILD);
var INSERT_BEFORE_KEY = VAR(VAR_INSERTBEFORE);
var CAPTURE_INSERT_SETUP;

// setup capture
CAPTURE_INSERT = function(insert_options, _capture) {
    if (!CAPTURE_INSERT_SETUP) {
        CAPTURE_INSERT_SETUP = 1;

        var methods = [APPEND_CHILD_KEY, INSERT_BEFORE_KEY],
            root_nodes = [VAR(VAR_ELEMENT), VAR(VAR_DOCUMENT)];

        if (IS_OBJECT(insert_options)) {
            if (!insert_options[VAR_APPENDCHILD]) {
                methods[0] = 0;
            }
            if (!insert_options[VAR_INSERTBEFORE]) {
                methods[1] = 0;
            }
            if (insert_options[VAR_ROOTNODES] && IS_ARRAY(insert_options[VAR_ROOTNODES])) {
                root_nodes = insert_options[VAR_ROOTNODES];
            }
        }

        FOREACH(root_nodes, function(nodeName, altName) {
            altName = '_' + nodeName;
            w[altName] = w[altName] || {};

            FOREACH(methods, function(methodName) {

                if (methodName && !w[altName][methodName]) {

                    // store original method
                    w[altName][methodName] = w[nodeName].prototype[methodName];

                    // re-write method
                    w[nodeName].prototype[methodName] = function(node) {

                        arguments[0] = _capture(node);
                        return w[altName][methodName].apply(this, arguments);
                    };
                }
            });
        });

        if (DEBUG) {
            CONSOLE_INFO('capture', 'DOM insert methods setup');
        }
    }

}