n("selector,threshold,offset,top,left,right,bottom",82);va=sa("MutationObserver");function Lb(a){var b=0;return function(){var c=(new Date).getTime();if(!(100>c-b))return b||ta(function(){Q(a,arguments)},100),b=c,Q(a,arguments)}}function Mb(a,b){var c;c||(c=z);a=y(a);c=y(c);p(a,function(a){a=r(a);p(c,function(d){wa?d.removeEventListener(a,b,!1):c.attachEvent&&d.detachEvent("on"+a,b)})})}
ka=function(a,b,c,d){var e,f=["scroll","resize","load"];b=b||0;c=O(c||0,85);var g;Jb(function(){if((e=Ea(a,0,1))&&e.length){p([87,86,88],function(a){ya(c[a])&&(c[a]=c[85])});var k,h=Lb(function(){k||p(e,function(a){var e;if(e=!k)if(a.offsetWidth||a.offsetHeight||a.getClientRects().length){a=a.getBoundingClientRect();e=z.innerWidth-a.left;var l=z.innerHeight-a.top,u=a.right,L=b*a.width,x=b*a.height;e=a.bottom>c[85]+x&&e>c[87]+L&&l>c[88]+x&&u>c[86]+L}else e=!1;e&&(k=1,d(),Mb(f,h),g&&(g.disconnect(),
g=!1))})});Aa(f,h);va&&g&&(g=(new va(h)).observe(A.body,{attributes:!0,childList:!0,subtree:!0}));h()}})};
