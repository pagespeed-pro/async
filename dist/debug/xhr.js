var ac=z.XDomainRequest,bc=/\u00b5/;
Qb=function(a,b){var c=a[0],d=L(a[2],72),e=a[3],g=a[4],f=d[72]||"",h,k;if(!c||e&&!d)b();else{f=e?f&&bc.test(f)?f.replace(bc,c):f+c:c;var m=function(){e||(a[3]=e=1,Qb(a,b))};!e||wa(ac)?h=new XMLHttpRequest:h=new ac;h.open(g?"HEAD":"GET",f,!0);h.setRequestHeader("cache-control","no-cache, must-revalidate, post-check=0, pre-check=0");h.setRequestHeader("cache-control","max-age=0");h.setRequestHeader("pragma","no-cache");h.onreadystatechange=function(){if(4===h.readyState){var c=h.status;(k=h.getResponseHeader("Last-Modified"))&&
(k=Mb(k));g?(k&&k<Mb(r)&&(c=304),200===c?Qb([a[0],a[1]],b):304===c?b(c,k,e):m()):200===c?b(h.responseText,k,e):200!==c&&m()}};h.onerror=function(a){V("cors",g?"HEAD":"GET",f,a);D&&G("cors",[g?"HEAD":"GET",f,a]);m()};if(g){var r=new Date(1E3*g);h.setRequestHeader("If-Modified-Since",r.toUTCString())}h.send()}};
