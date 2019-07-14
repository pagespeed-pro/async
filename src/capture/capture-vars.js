/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_OBSERVER=92;

/** @define {number} */
var VAR_INSERT=93;

/** @define {number} */
var VAR_APPENDCHILD=94;

/** @define {number} */
var VAR_INSERTBEFORE=95;

/** @define {number} */
var VAR_ROOTNODES=96;

/** @define {number} */
var VAR_ELEMENT=97;

/** @define {number} */
var VAR_DOCUMENT=98;

/** @define {number} */
var VAR_SUBTREE=99;

/** @define {number} */
var VAR_MODES=100;

/** @define {number} */
var VAR_CONTENTS=101;

/** @define {number} */
var VAR_NODE=102;

/** @define {number} */
var VAR_MATCH_TYPE=103;

/** @define {number} */
var VAR_ACTION=104;

/** @define {number} */
var VAR_SEARCH=105;

/** @define {number} */
var VAR_REPLACE=106;

/** @define {number} */
var VAR_TIMING=107;

/** @define {number} */
var VAR_URL=108;

/** @define {number} */
var VAR_JS=109;

/** @define {number} */
var VAR_REMOVE=110;

/** @define {number} */
var VAR_REWRITE=111;

/** @define {number} */
var VAR_CAPTURE=112;

LOAD_COMPRESSION_INDEX("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",92);