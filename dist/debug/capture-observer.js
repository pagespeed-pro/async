var oc,pc;wa=ta("MutationObserver");ic=function(a,b){pc||(pc=1,wa&&(oc=new wa(function(a){a.forEach(function(a){for(var c=0;c<a.addedNodes.length;c++)b(a.addedNodes[c])})}),oc.observe(A.documentElement,{attributes:!1,childList:!0,subtree:!0,characterData:!1}),Ta("capture","observer setup")))};
