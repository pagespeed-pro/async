/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_CACHE=62;

/** @define {number} */
var VAR_LOCALSTORAGE=63;

/** @define {number} */
var VAR_CACHE_API=64;

/** @define {number} */
var VAR_NAMESPACE=65;

/** @define {number} */
var VAR_MAX_SIZE=66;

/** @define {number} */
var VAR_EXPIRE=67;

/** @define {number} */
var VAR_UPDATE=68;

/** @define {number} */
var VAR_INTERVAL=69;

/** @define {number} */
var VAR_CORS=70;

/** @define {number} */
var VAR_PROXY=71;

/** @define {number} */
var VAR_FALLBACK=72;

/** @define {number} */
var VAR_XHR=73;

/** @define {number} */
var VAR_SOURCE=74;

/** @define {number} */
var VAR_CSSTEXT=75;

LOAD_COMPRESSION_INDEX("cache,localstorage,cache-api,namespace,max_size,expire,update,interval,cors,proxy,fallback,xhr,source,cssText",62);