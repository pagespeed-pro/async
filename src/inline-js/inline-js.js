/**
 * Async CSS loader - github.com / style - tools / async - css
 * Released under the terms of MIT license
 *
 * Copyright (C) 2018 github.com/style-tools
 */

var INLINE_COUNT = 0;
INLINE_VAR = VAR(VAR_INLINE);

INLINE_JS = function(args) {
    var script = args[0],
        scriptEl = args[1],
        options = args[2],
        inline = args[3],
        scriptText, type, ref, count,
        inlineSrcEl, inlineEl;

    if (inline) {
        inline = OBJECT(inline, VAR_SCRIPT);
        scriptText = inline[VAR_SCRIPT];
        type = inline[VAR_TYPE] || VAR_TEXT;
        count = ++INLINE_COUNT;
        inline[VAR_REF] = ref = inline[VAR_REF] || (VAR(VAR_INLINE) + count);

        if (DEBUG) {
            inline[VAR_JS_PERF] = ++LOAD_JS_ID;
        }

        // query selector
        if (type !== VAR_TEXT) {
            inlineSrcEl = ELEMENTS_BY_QUERY(scriptText);
            if (inlineSrcEl) {

                if (type === VAR_CONTAINER) {
                    scriptText = inlineSrcEl.innerHTML;
                } else {
                    scriptText = inlineSrcEl.value;
                }

            } else {

                scriptText = 0;

                if (DEBUG) {
                    CONSOLE_ERROR('inline-js.exec', 'invalid selector', inline);
                }
            }
        }

        if (scriptText) {

            // dependency module
            MODULE(DEPENDENCY, [inline, inline[VAR_DEPENDENCIES], ref], function(target) {

                if (DEBUG) {
                    PERFORMANCE_MARK('exec' + inline[VAR_JS_PERF]);
                }

                // timed exec
                MODULE(TIMING, (DEBUG) ? [inline[VAR_EXEC_TIMING],
                    ['exec.inline.timing', ref]
                ] : ((API) ? [inline[VAR_EXEC_TIMING], ref + count] : inline[VAR_EXEC_TIMING]), function() {

                    // exec script
                    EXEC_SCRIPT(0, scriptText, inline[VAR_ATTRIBUTES], function(_inlineEl) {

                        inlineEl = _inlineEl;

                        // insert after parent script
                        if (scriptEl) {
                            AFTER(scriptEl, _inlineEl);
                        } else {
                            // append to document.head
                            APPEND_CHILD(DOCHEAD(), _inlineEl);
                        }
                    }, function() {

                        if (DEBUG) {

                            var perf = PERFORMANCE_MARK('_exec' + inline[VAR_JS_PERF], 'exec' + inline[VAR_JS_PERF], 'exec', 'exec');

                            var debug_data = perf;
                            debug_data.el = inlineEl;
                            debug_data.text = scriptText;

                            CONSOLE_LOG('exec.inline', debug_data);

                            EMIT('perf:exec-inline', inline, perf);
                        }

                        if (EMIT) {

                            // onload callback
                            EMIT([VAR_EXEC, VAR_EXEC_INLINE, ref], inline, inlineEl);
                        }
                    });
                });

            });
        }
    }
}