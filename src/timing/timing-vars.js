/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_LOAD_TIMING=48;

/** @define {number} */
var VAR_RENDER_TIMING=49;

/** @define {number} */
var VAR_RENDERCALLBACK=50;

/** @define {number} */
var VAR_UNRENDERCALLBACK=51;

/** @define {number} */
var VAR_REQUESTANIMATIONFRAME=52;

/** @define {number} */
var VAR_REQUESTIDLECALLBACK=53;

/** @define {number} */
var VAR_DOMREADY=54;

/** @define {number} */
var VAR_INVIEW=55;

/** @define {number} */
var VAR_FRAME=56;

/** @define {number} */
var VAR_TIMEOUT=57;

/** @define {number} */
var VAR_SETTIMEOUT=58;

/** @define {number} */
var VAR_DOMCONTENTLOADED=59;

/** @define {number} */
var VAR_EXEC_TIMING=60;

/** @define {number} */
var VAR_METHOD=61;

/** @define {number} */
var VAR_LAZY=62;

LOAD_COMPRESSION_INDEX("load_timing,render_timing,renderCallback,unrenderCallback,requestAnimationFrame,requestIdleCallback,domReady,inview,frame,timeout,setTimeout,DOMContentLoaded,exec_timing,method,lazy",48);