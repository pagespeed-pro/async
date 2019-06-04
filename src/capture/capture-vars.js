/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_OBSERVER=88;

/** @define {number} */
var VAR_INSERT=89;

/** @define {number} */
var VAR_APPENDCHILD=90;

/** @define {number} */
var VAR_INSERTBEFORE=91;

/** @define {number} */
var VAR_ROOTNODES=92;

/** @define {number} */
var VAR_ELEMENT=93;

/** @define {number} */
var VAR_DOCUMENT=94;

/** @define {number} */
var VAR_SUBTREE=95;

/** @define {number} */
var VAR_MODES=96;

/** @define {number} */
var VAR_CONTENTS=97;

/** @define {number} */
var VAR_NODE=98;

/** @define {number} */
var VAR_MATCH_TYPE=99;

/** @define {number} */
var VAR_ACTION=100;

/** @define {number} */
var VAR_SEARCH=101;

/** @define {number} */
var VAR_REPLACE=102;

/** @define {number} */
var VAR_TIMING=103;

/** @define {number} */
var VAR_URL=104;

/** @define {number} */
var VAR_JS=105;

/** @define {number} */
var VAR_REMOVE=106;

/** @define {number} */
var VAR_REWRITE=107;

/** @define {number} */
var VAR_CAPTURE=108;

LOAD_COMPRESSION_INDEX("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",88);