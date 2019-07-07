/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_ON=76;

/** @define {number} */
var VAR_ONCE=77;

/** @define {number} */
var VAR_OFF=78;

/** @define {number} */
var VAR_ERROR=79;

/** @define {number} */
var VAR_TIME=80;

LOAD_COMPRESSION_INDEX("on,once,off,error,time",76);