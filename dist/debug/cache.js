function Tb(a){return Math.round((a?new Date(a):new Date).getTime()/1E3)}p("cache,localstorage,cache-api,namespace,max_size,expire,update,interval,cors,proxy,fallback,xhr,source,cssText",63);function Ub(a){return r(19)+":"+(a||"")}function Vb(a,b){return a&&a+b<Tb()}var W,X,Wb,Xb,Yb={},Zb,$b,ac;function bc(a,b,c){b=M(b,2);var d=b[2],e=b[73],f;64===d&&W?f=W[0]:65===d&&X&&(f=X[0]);f?f(a,function(b,f){b&&x(b[0])&&(Yb[d]=M(Yb[d]),Yb[d][a]=1,b=0);b||!e?(b&&(b[9]=d),c(b,f)):bc(a,e,function(a){c(a)})}):c(0,1)}
function cc(a,b,c,d,e){b=M(b,2);var f=b[2],g=b[68],k=b[73],h;a in M(Yb[f])||(64===f&&W?h=W[1]:65===f&&X&&(h=X[1]));if(h){var l=c.length;if(f=!isNaN(b[67])&&b[67]<l)b={size:Sa(l),"max-size":Sa(b[67])},Ua("cache.max-size","skipped save",U(a),b);h(a,f?[]:c,g,d,e)}k&&cc(a,k,c,d,e)}
fa=function(a,b){function c(a,b){return n[a]||h[a]||b}function d(a,b){C||(a=function(){function a(a,b,c){if("string"===typeof a){var d={size:Sa(a.length)};switch(n[2]){case 64:d.type="localStorage";break;case 65:d.type="cache-api"}V("cache","saved"+(c?" (via CORS proxy)":""),U(l),d);cc(l,n,a,b,c)}else{d={error:"no source"};switch(n[2]){case 64:d.type="localStorage";break;case 65:d.type="cache-api"}t("cache","failed"+(c?" (via CORS proxy)":""),U(l),d);F&&J("cache",["save",l])}}var c;q(la,function(d){c||
(6===g&&76===d&&Q(Zb,b,function(b){c=d;a(b)},1),76!==d&&(Q(Xb,[l,w,N?P:0,71===d],a),c=d))})},Q(wa,a,a))}var e=a[0],f=a[1],g=a[2],k=M(a[3]),h=M(f[63]),l=a[4],n=M(e[63]||h,2),C,u,O,w=c(74),P=c(71),la=y(c(75,[74,71])),N,Z;q(la,function(a,b){la[b]=a=a in m?m[a]:a;71===a&&(N=1);74===a&&(Z=1)});l&&n[2]?(Pa(l,d),bc(l,n,function(a,c){C=c;a&&(O=a[0],Qa(l,d),6===g?Q($b,[e,k,l,O],function(a,b){u=a;k=b},1):Q(ac,[k,l,O],function(a,b){u=a;k=b},1),Q(Wb,[l,e,n,a,w,N?P:0,!Z]),a=[u,k],64===a[1]&&(a[2]="localStorage"),
65===a[1]&&(a[2]="cache-api"));b(a)})):b()};
