/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_OBSERVER=90;

/** @define {number} */
var VAR_INSERT=91;

/** @define {number} */
var VAR_APPENDCHILD=92;

/** @define {number} */
var VAR_INSERTBEFORE=93;

/** @define {number} */
var VAR_ROOTNODES=94;

/** @define {number} */
var VAR_ELEMENT=95;

/** @define {number} */
var VAR_DOCUMENT=96;

/** @define {number} */
var VAR_SUBTREE=97;

/** @define {number} */
var VAR_MODES=98;

/** @define {number} */
var VAR_CONTENTS=99;

/** @define {number} */
var VAR_NODE=100;

/** @define {number} */
var VAR_MATCH_TYPE=101;

/** @define {number} */
var VAR_ACTION=102;

/** @define {number} */
var VAR_SEARCH=103;

/** @define {number} */
var VAR_REPLACE=104;

/** @define {number} */
var VAR_TIMING=105;

/** @define {number} */
var VAR_URL=106;

/** @define {number} */
var VAR_JS=107;

/** @define {number} */
var VAR_REMOVE=108;

/** @define {number} */
var VAR_REWRITE=109;

/** @define {number} */
var VAR_CAPTURE=110;

LOAD_COMPRESSION_INDEX("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",90);