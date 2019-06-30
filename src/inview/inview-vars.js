/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_SELECTOR=80;

/** @define {number} */
var VAR_THRESHOLD=81;

/** @define {number} */
var VAR_OFFSET=82;

/** @define {number} */
var VAR_TOP=83;

/** @define {number} */
var VAR_LEFT=84;

/** @define {number} */
var VAR_RIGHT=85;

/** @define {number} */
var VAR_BOTTOM=86;

LOAD_COMPRESSION_INDEX("selector,threshold,offset,top,left,right,bottom",80);