function W(a){return Math.round((a?new Date(a):new Date).getTime()/1E3)}p("cache,localstorage,cache-api,namespace,max_size,expire,update,interval,cors,proxy,fallback,xhr,source,cssText",63);function yb(a){return r(19)+":"+(a||"")}function zb(a,b){return a&&a+b<W()}var X,Y,Ab,Bb,Cb={},Db,Eb,Fb;function Gb(a,b,c){b=Q(b,2);var d=b[2],e=b[73],k;64===d&&X?k=X[0]:65===d&&Y&&(k=Y[0]);k?k(a,function(b,k){b&&u(b[0])&&(Cb[d]=Q(Cb[d]),Cb[d][a]=1,b=0);b||!e?(b&&(b[9]=d),c(b,k)):Gb(a,e,function(a){c(a)})}):c(0,1)}
function Hb(a,b,c,d,e){b=Q(b,2);var k=b[2],f=b[68],h=b[73],g;a in Q(Cb[k])||(64===k&&X?g=X[1]:65===k&&Y&&(g=Y[1]));g&&(k=c.length,b=!isNaN(b[67])&&b[67]<k,g(a,b?[]:c,f,d,e));h&&Hb(a,h,c,d,e)}
fa=function(a,b){function c(a,b){return n[a]||g[a]||b}function d(a,b){A||(a=function(){function a(a,b,c){"string"===typeof a?Hb(m,n,a,b,c):G&&L("cache",["save",m])}var c;q(S,function(e){c||(6===f&&76===e&&R(Db,b,function(b){c=e;a(b)},1),76!==e&&(R(Bb,[m,w,ba?C:0,71===e],a),c=e))})},R(qa,a,a))}var e=a[0],k=a[1],f=a[2],h=Q(a[3]),g=Q(k[63]),m=a[4],n=Q(e[63]||g,2),A,v,I,w=c(74),C=c(71),S=x(c(75,[76,74,71])),ba,bb;q(S,function(a,b){S[b]=a=a in l?l[a]:a;71===a&&(ba=1);74===a&&(bb=1)});m&&n[2]?(Da(m,d),
Gb(m,n,function(a,c){A=c;a&&(I=a[0],Ea(m,d),6===f?R(Eb,[e,h,m,I],function(a,b){v=a;h=b},1):R(Fb,[h,m,I],function(a,b){v=a;h=b},1),R(Ab,[m,e,n,a,w,ba?C:0,!bb]),a=[v,h]);b(a)})):b()};
