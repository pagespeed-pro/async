/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_CACHE=63;

/** @define {number} */
var VAR_LOCALSTORAGE=64;

/** @define {number} */
var VAR_CACHE_API=65;

/** @define {number} */
var VAR_NAMESPACE=66;

/** @define {number} */
var VAR_MAX_SIZE=67;

/** @define {number} */
var VAR_EXPIRE=68;

/** @define {number} */
var VAR_UPDATE=69;

/** @define {number} */
var VAR_INTERVAL=70;

/** @define {number} */
var VAR_CORS=71;

/** @define {number} */
var VAR_PROXY=72;

/** @define {number} */
var VAR_FALLBACK=73;

/** @define {number} */
var VAR_XHR=74;

/** @define {number} */
var VAR_SOURCE=75;

/** @define {number} */
var VAR_CSSTEXT=76;

LOAD_COMPRESSION_INDEX("cache,localstorage,cache-api,namespace,max_size,expire,update,interval,cors,proxy,fallback,xhr,source,cssText",63);