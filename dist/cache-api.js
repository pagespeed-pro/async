var Gb=ub();function Hb(a){return z.caches.open(Gb).then(function(b){return[b,new Request(a)]})["catch"](function(){Y=!1})}
"caches"in z&&(Y=[function(a,b){Hb(a).then(function(c){c[0].match(c[1]).then(function(c){c?c.json().then(function(c){c&&c[2]&&vb(c[1],c[2])&&(c=Y[2](a));b(c)}):b()})})["catch"](function(){b(!1,1)})},function(a,b,c,d,e){if(304===b)Y[0](a,function(b){Y[1](a,b[0],b[2],b[1],b[4])});else Hb(a).then(function(a){b=[b,d||W(),c||0,W()];e&&b.push(1);b=JSON.stringify(b);b=new Response(b,{headers:{"Content-Type":"application/json"}});a[0].put(a[1],b)})},function(a){Hb(a).then(function(a){a[0]["delete"](a[1])})}]);
