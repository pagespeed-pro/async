/**
 * IIFE module combination generator
 */
const fs = require('fs');
const md5 = require('md5');
const Combinatorics = require('js-combinatorics');

var cache_modules;
var capture_modules;
var abort;

function COMBINE(arr, root) {
    var combinations = [];

    if (abort) {
        return;
    }

    Combinatorics.power(arr).forEach(function(combination) {

        if (abort) {
            return;
        }

        var ignore;

        if (root && combination[0] !== root) {
            ignore = 1;
        }
        if (!root) {
            if (combination.indexOf('css-loader') === -1 && combination.indexOf('js-loader') === -1) {
                ignore = 1;
            }
        }

        if (!ignore) {
            var _combinations = [];
            var primary_index = 0;
            var root_keys = [];
            if (combination.indexOf('css-loader') !== -1) {
                root_keys.push('css-loader');
            }
            if (combination.indexOf('js-loader') !== -1) {
                root_keys.push('js-loader');
            }
            var sub = false;

            combination.forEach(function(value, index) {
                if (value instanceof Array) {

                    root_keys.push(value[0]);

                    if (value[0] === 'cache') {
                        cache_modules = value.slice(0);
                    }
                    if (value[0] === 'capture') {
                        capture_modules = value.slice(0);
                    }

                    _combinations = _combinations.concat(value);

                    primary_index = _combinations.length;

                    sub = 1;

                } else {

                    var regex_mod, vendor_mod, ee_mod;
                    if (value === 'dependency' || value === 'capture') {
                        regex_mod = 1;
                    }
                    if (value === 'capture-observer' || value === 'timing') {
                        vendor_mod = 1;
                    }
                    if (['api', 'debug', 'dependency', 'cache'].indexOf(value) !== -1) {
                        ee_mod = 1;
                    }

                    if (!_combinations[primary_index]) {
                        _combinations[primary_index] = [];
                    }

                    _combinations[primary_index].push(value);

                    if (regex_mod && _combinations[primary_index].indexOf('regex') === -1) {
                        _combinations[primary_index].push('regex');
                    }
                    if (vendor_mod && _combinations[primary_index].indexOf('vendor') === -1) {
                        _combinations[primary_index].push('vendor');
                    }
                    if (ee_mod && _combinations[primary_index].indexOf('event-emitter') === -1) {
                        _combinations[primary_index].push('event-emitter');
                    }
                }
            });

            if (!sub) {
                var combo = [];
                var skip;
                _combinations.forEach(function(c) {
                    combo = combo.concat(c);
                });
                combinations.push(combo);
            } else {

                var combo = [];
                _combinations.forEach(function(c) {
                    if (typeof c === 'string') {
                        combo.push(c);
                    } else {
                        combo = combo.concat(c);
                    }
                });

                ['regex', 'event-emitter', 'vendor'].forEach(function(dep) {
                    var index = combo.indexOf(dep);
                    if (index !== -1) {
                        combo = combo.splice(index, 1);
                    }
                });

                if (combo.length > 0) {

                    combo = JSON.parse(JSON.stringify(combo));
                    COMBINE(combo).forEach(function(c, i) {

                        var missing_root_key;
                        if (c.indexOf('cache-update') !== -1 && c.indexOf('xhr') === -1) {
                            missing_root_key = 1; // XHR required for update
                        } else if (c.indexOf('cache') !== -1) {

                            // other cache modules?
                            var other = [];
                            cache_modules.forEach(function(key) {
                                if (key !== 'cache' && c.indexOf(key) !== -1) {
                                    other.push(key);
                                }
                            });
                            if (other.length === 0) {
                                missing_root_key = 1; // cache only not required
                            }
                            if (other.length === 1 && other[0] === 'xhr') {
                                missing_root_key = 1; // cache+xhr not required
                            }

                            if (!missing_root_key) {

                                if (c.indexOf('event-emitter') === -1) {
                                    c.push('event-emitter');
                                }

                                if (combination.indexOf('css-loader') !== -1) {
                                    c.push('cache-css');
                                }
                                if (combination.indexOf('js-loader') !== -1) {
                                    c.push('cache-js');
                                }
                            }
                        }

                        if (c.indexOf('capture') !== -1) {

                            // other capture modules?
                            var other = [];
                            capture_modules.forEach(function(key) {
                                if (key !== 'capture' && c.indexOf(key) !== -1) {
                                    other.push(key);
                                }
                            });

                            if (other.length === 0 || (other.indexOf('capture-insert') === -1 && other.indexOf('capture-observer') === -1)) {
                                missing_root_key = 1; // capture only not required
                            }

                            if (!missing_root_key) {

                                if (c.indexOf('regex') === -1) {
                                    //c.push('regex');
                                }
                                if (c.indexOf('vendor') === -1 && other.indexOf('capture-observer') !== -1) {
                                    c.push('vendor');
                                }

                                if (combination.indexOf('css-loader') !== -1) {
                                    c.push('capture-css');
                                }
                                if (combination.indexOf('js-loader') !== -1) {
                                    c.push('capture-js');
                                }
                            }
                        }

                        if (c.indexOf('timing') !== -1) {
                            if (c.indexOf('vendor') === -1) {
                                c.push('vendor');
                            }
                        }

                        root_keys.forEach(function(rk) {
                            if (!missing_root_key) {
                                if (c.indexOf(rk) === -1) {
                                    missing_root_key = 1;
                                }
                            }
                        });

                        if (!missing_root_key) {
                            combinations.push(c);
                        }
                    });

                }

            }
        }
    });

    return combinations;
}

module.exports = function(arr, root) {

    /*var key = md5(JSON.stringify([arr, root]));

    try {
        var cache = fs.readFileSync('iife-combinations-cache.json', 'utf8');
        if (cache) {
            cache = JSON.parse(cache);
            if (typeof cache === 'object' && key in cache) {
                return cache[key];
            }
        }
    } catch (e) {

    }*/

    var combinations = COMBINE(arr, root);
    /*var cache = {};
    cache[key] = combinations;

    fs.writeFileSync('iife-combinations-cache.json', JSON.stringify(cache), 'utf8');*/

    return combinations;
};