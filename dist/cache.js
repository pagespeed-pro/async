function W(a){return Math.round((a?new Date(a):new Date).getTime()/1E3)}n("cache,localstorage,cache-api,namespace,max_size,expire,update,interval,cors,proxy,fallback,xhr,source,cssText",62);function tb(a){return r(19)+":"+(a||"")}function ub(a,b){return a&&a+b<W()}var X,Y,vb,wb,xb={},yb,zb,Ab;function Bb(a,b,c){b=T(b,2);var d=b[2],e=b[72],h;63===d&&X?h=X[0]:64===d&&Y&&(h=Y[0]);h?h(a,function(b,h){b&&x(b[0])&&(xb[d]=T(xb[d]),xb[d][a]=1,b=0);b||!e?(b&&(b[9]=d),c(b,h)):Bb(a,e,function(a){c(a)})}):c(0,1)}
function Cb(a,b,c,d,e){b=T(b,2);var h=b[2],f=b[67],k=b[72],g;a in T(xb[h])||(63===h&&X?g=X[1]:64===h&&Y&&(g=Y[1]));g&&(h=c.length,b=!isNaN(b[66])&&b[66]<h,g(a,b?[]:c,f,d,e));k&&Cb(a,k,c,d,e)}
ea=function(a,b){function c(a,b){return m[a]||g[a]||b}function d(a,b){C||(a=function(){function a(a,b,c){"string"===typeof a?Cb(q,m,a,b,c):I&&M("cache",["save",Fa(q)])}var c;p(G,function(d){c||(6===f&&75===d&&U(yb,b,function(b){c=d;a(b)},1),75!==d&&(U(wb,[q,u,K?v:0,70===d],a),c=d))})},U(na,a,a))}var e=a[0],h=a[1],f=a[2],k=T(a[3]),g=T(h[62]),q=a[4],m=T(e[62]||g,2),C,w,H,u=c(73),v=c(70),G=y(c(74,[75,73,70])),K,Ya;p(G,function(a,b){G[b]=a=a in l?l[a]:a;70===a&&(K=1);73===a&&(Ya=1)});q&&m[2]?(Ca(q,d),
Bb(q,m,function(a,c){C=c;a&&(H=a[0],Da(q,d),6===f?U(zb,[e,k,q,H],function(a){w=a},1):U(Ab,[k,q,H],function(a,b){w=a;k=b},1),U(vb,[q,e,m,a,u,K?v:0,!Ya]),a=[w,k]);b(a)})):b()};
