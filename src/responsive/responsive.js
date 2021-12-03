/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// match media
var matchMedia = VENDOR_FN('matchMedia', 0, 1);

// local cache of match result
var MATCH_MEDIA_CACHE = {};

// match media query
MATCH_MEDIA = function(media) {
    // no media query match support
    if (!matchMedia || !media || LOWERCASE(media) === VAR(VAR_ALL)) {
        return true;
    }
    if (!(media in MATCH_MEDIA_CACHE)) {
        MATCH_MEDIA_CACHE[media] = matchMedia(media);
    }
    return MATCH_MEDIA_CACHE[media];
}

// responsive preload
RESPONSIVE = function(media, callback) {

    function mediaWatcher(e) {
        if (!state && e.matches) {

            // remove listener
            match.removeListener(mediaWatcher);

            state = true;
            callback();
        }
    }

    var state;
    var match = (media) ? MATCH_MEDIA(media) : false;
    if (TRUE(match) || (match && match.matches)) {
        callback();
    } else {

        // add listener to media change
        match.addListener(mediaWatcher);
    }

}