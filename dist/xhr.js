var Mb=y.XDomainRequest,Nb=/\u00b5/;
Bb=function(a,b){var c=a[0],d=Q(a[2],72),e=a[3],k=a[4],f=d[72]||"",h,g;if(!c||e&&!d)b();else{f=e?f&&Nb.test(f)?f.replace(Nb,c):f+c:c;var m=function(){e||(a[3]=e=1,Bb(a,b))};!e||ta(Mb)?h=new XMLHttpRequest:h=new Mb;h.open(k?"HEAD":"GET",f,!0);h.setRequestHeader("cache-control","no-cache, must-revalidate, post-check=0, pre-check=0");h.setRequestHeader("cache-control","max-age=0");h.setRequestHeader("pragma","no-cache");h.onreadystatechange=function(){if(4===h.readyState){var c=h.status;(g=h.getResponseHeader("Last-Modified"))&&
(g=W(g));k?(g&&g<W(n)&&(c=304),200===c?Bb([a[0],a[1]],b):304===c?b(c,g,e):m()):200===c?b(h.responseText,g,e):200!==c&&m()}};h.onerror=function(a){G&&L("cors",[k?"HEAD":"GET",f,a]);m()};if(k){var n=new Date(1E3*k);h.setRequestHeader("If-Modified-Since",n.toUTCString())}h.send()}};
