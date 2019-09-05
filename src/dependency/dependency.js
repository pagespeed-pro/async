/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

if (DEBUG) {
    var DEP_TIMING_COUNT = 0;
    var DEP_TIMING = function(key) {
        var timing_id = key + ++DEP_TIMING_COUNT;

        // measure domReady timing
        PERFORMANCE_MARK(timing_id);

        return function() {
            return PERFORMANCE_MARK('_' + timing_id, timing_id, key, key);
        }
    }
}

if (LOAD_CSS || !LOAD_JS) {
    var LOADED_SHEETS = [];
}
if (LOAD_JS) {
    var LOADED_SCRIPTS = [];
}


var COMPAREDOCUMENTPOSITION_VAR = VAR(VAR_COMPAREDOCUMENTPOSITION);

function IS_AFTER(a, b) {
    return (COMPAREDOCUMENTPOSITION_VAR in a) ? a[COMPAREDOCUMENTPOSITION_VAR](b) & 0x04 : 0;
}

// match dependency configuration against asset
function MATCH_DEPENDENCY(asset, dependency) {
    var dependencies_met = false,
        ref = asset[VAR_REF],
        src = asset[VAR_HREF] || asset[VAR_SRC];

    if (dependency) {
        dependency = OBJECT(dependency, VAR_MATCH);
        var regex = dependency[VAR_REGEX],
            match = dependency[VAR_MATCH];

        // match asset src
        match = (regex) ? REGEX(match) : match;
        if (match) {

            // regular expression match
            if (regex) {
                if ((src && match.test(src)) || (ref && match.test(ref))) {
                    dependencies_met = true;
                }
            } else if ((src && src.indexOf(match) !== -1) || (ref && ref.indexOf(match) !== -1)) {
                dependencies_met = true;
            }
        }
    }
    return dependencies_met;
}

// wait for dependencies and return insert target
DEPENDENCY = function(args, callback) {

    var asset = args[0],
        dependencies = args[1],
        type = args[2],
        src = args[3],
        assetEl = asset[VAR_LINK],
        unmet = [],
        target,
        loaded = (type === VAR_CSS || !LOAD_JS) ? LOADED_SHEETS : LOADED_SCRIPTS;

    // register loaded asset
    if (src) {
        ONCE(src, function(_asset) {
            if (type === VAR_CSS || !LOAD_JS) {
                PUSH(LOADED_SHEETS, _asset);
            } else {
                PUSH(LOADED_SCRIPTS, _asset);
            }
        });
    }

    if (dependencies) {
        dependencies = ARRAY(dependencies);

        FOREACH(dependencies, function(dep) {

            var dependencies_met = false;

            FOREACH(loaded, function(_asset) {
                if (!dependencies_met) {
                    dependencies_met = MATCH_DEPENDENCY(_asset, dep);
                    if (dependencies_met) {
                        if (_asset[VAR_LINK] && (!target || IS_AFTER(target, _asset[VAR_LINK]))) {
                            target = _asset[VAR_LINK]; // el
                        }
                    }
                }
            });

            if (!dependencies_met) {
                PUSH(unmet, dep);
            }
        });
    }

    if (LENGTH(unmet)) {

        if (DEBUG) {
            var debug_data = {
                unmet: unmet,
                dependencies: dependencies
            }

            var timing_completed = DEP_TIMING(src);

            CONSOLE_LOG('dependencies.wait', src, debug_data);
        }

        // wait for unmet dependencies
        ON((type === VAR_CSS) ? VAR_LOAD : ((type === VAR_JS) ? VAR_EXEC : type), function(_asset) {

            if (LENGTH(unmet)) {

                // re-check dependencies
                FOREACH(unmet, function(dep, i) {

                    if (MATCH_DEPENDENCY(_asset, dep)) {
                        unmet.splice(i, 1);
                        if (_asset[VAR_LINK] && (!target || IS_AFTER(target, _asset[VAR_LINK]))) {
                            target = _asset[VAR_LINK]; // el
                        }
                    }
                });

                if (!LENGTH(unmet)) {

                    if (DEBUG) {
                        var debug_data = {
                            dependencies: dependencies
                        }
                        if (timing_completed) {
                            var perf = timing_completed();
                            debug_data.startTime = perf.startTime;
                            debug_data.duration = perf.duration;
                        }
                        CONSOLE_LOG('dependencies.ready', src, debug_data);
                    }

                    // asset does not have custom target
                    if (target && assetEl && !asset[VAR_TARGET]) {

                        // move asset element after dependency target
                        AFTER(target, assetEl);
                    }

                    callback(target);
                }
            }
        });

    } else {
        callback();
    }

}