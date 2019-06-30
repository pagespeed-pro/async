/**
 * Async CSS and Script loader
 * Released under the terms of MIT license
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/async
 */

// global key/value compression method
/** @define {number} */
var VAR_OBSERVER=89;

/** @define {number} */
var VAR_INSERT=90;

/** @define {number} */
var VAR_APPENDCHILD=91;

/** @define {number} */
var VAR_INSERTBEFORE=92;

/** @define {number} */
var VAR_ROOTNODES=93;

/** @define {number} */
var VAR_ELEMENT=94;

/** @define {number} */
var VAR_DOCUMENT=95;

/** @define {number} */
var VAR_SUBTREE=96;

/** @define {number} */
var VAR_MODES=97;

/** @define {number} */
var VAR_CONTENTS=98;

/** @define {number} */
var VAR_NODE=99;

/** @define {number} */
var VAR_MATCH_TYPE=100;

/** @define {number} */
var VAR_ACTION=101;

/** @define {number} */
var VAR_SEARCH=102;

/** @define {number} */
var VAR_REPLACE=103;

/** @define {number} */
var VAR_TIMING=104;

/** @define {number} */
var VAR_URL=105;

/** @define {number} */
var VAR_JS=106;

/** @define {number} */
var VAR_REMOVE=107;

/** @define {number} */
var VAR_REWRITE=108;

/** @define {number} */
var VAR_CAPTURE=109;

LOAD_COMPRESSION_INDEX("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",89);