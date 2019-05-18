/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 📐 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_TEXT=24;

/** @define {number} */
var VAR_TEXT_JAVASCRIPT=25;

/** @define {number} */
var VAR_UTF8=26;

/** @define {number} */
var VAR_SCRIPT=27;

/** @define {number} */
var VAR_CHARSET=28;

/** @define {number} */
var VAR_READYSTATE=29;

/** @define {number} */
var VAR_ONREADYSTATECHANGE=30;

/** @define {number} */
var VAR_ONLOAD=31;

/** @define {number} */
var VAR_ONERROR=32;

/** @define {number} */
var VAR_ASYNC=33;

/** @define {number} */
var VAR_DEFER=34;

/** @define {number} */
var VAR_LOADED=35;

/** @define {number} */
var VAR_COMPLETE=36;

/** @define {number} */
var VAR_LOADING=37;

/** @define {number} */
var VAR_EXEC=38;

LOAD_COMPRESSION_INDEX("text,text/javascript,utf8,script,charset,readyState,onreadystatechange,onload,onerror,async,defer,loaded,complete,loading,exec",24);