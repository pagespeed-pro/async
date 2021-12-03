/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// compressed vendor prefixes
VENDOR_FN = function(name, ucfirstPrefix) {
    VENDORS = VENDORS || SPLIT(',Moz,WebKit,Ms,O');

    var prefix, fn, fn_name, vendor_fn;
    FOREACH(VENDORS, function(prefix) {
        if (!vendor_fn) {

            if (ucfirstPrefix && prefix) {
                fn_name = name[0].toUpperCase() + name.slice(1);
            } else {
                fn_name = name;
            }

            fn = w[prefix + fn_name] || w[LOWERCASE(prefix) + fn_name];
            if (IS_FUNCTION(fn)) {
                vendor_fn = fn;
            }
        }
    });
    return vendor_fn;
}