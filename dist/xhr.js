var Nb=y.XDomainRequest,Ob=/\u00b5/;
Cb=function(a,b){var c=a[0],d=R(a[2],72),e=a[3],k=a[4],f=d[72]||"",h,g;if(!c||e&&!d)b();else{f=e?f&&Ob.test(f)?f.replace(Ob,c):f+c:c;var m=function(){e||(a[3]=e=1,Cb(a,b))};!e||ua(Nb)?h=new XMLHttpRequest:h=new Nb;h.open(k?"HEAD":"GET",f,!0);h.setRequestHeader("cache-control","no-cache, must-revalidate, post-check=0, pre-check=0");h.setRequestHeader("cache-control","max-age=0");h.setRequestHeader("pragma","no-cache");h.onreadystatechange=function(){if(4===h.readyState){var c=h.status;(g=h.getResponseHeader("Last-Modified"))&&
(g=W(g));k?(g&&g<W(n)&&(c=304),200===c?Cb([a[0],a[1]],b):304===c?b(c,g,e):m()):200===c?b(h.responseText,g,e):200!==c&&m()}};h.onerror=function(a){F&&M("cors",[k?"HEAD":"GET",f,a]);m()};if(k){var n=new Date(1E3*k);h.setRequestHeader("If-Modified-Since",n.toUTCString())}h.send()}};
