var yb=ta("requestAnimationFrame",1);va=ta("requestIdleCallback");var zb,Ab=[];function Bb(a){if(a||zb||-1!==["complete","loaded","interactive"].indexOf(E.readyState))for(zb=1,a=Ab.shift();a;)a(),a=Ab.shift()}function Cb(a){Bb();zb?a():Ab.push(a)}Aa(59,function(){Bb(1)});Bb();function Db(a,b){b=b||1;yb(function(){-1!==b||E.body?1<b?Db(a,--b):a():Db(a,b)})}
J=function(a,b){if(M){var c=S(a[0],2);var d=a[1]}else c=S(a,2);a=c?c[2]:0;if(61===a){D[c[61]]=function(){ua(b);M&&d&&(Ma(d,function(){d=!1}),R.then=function(g){g&&(d?Ma(d,function(){d=!1;g()}):g());return R});return R};var e=1}52===a&&yb&&(Db(b,c[56]||1),e=1);53===a&&va&&(e=c[57],va(b,e?{timeout:e}:void 0),e=1);54===a&&(Cb(b),e=1);58===a&&(ua(b,c[57]),e=1);9===a&&ia&&(ia(c[9],b),e=1);55===a&&ja&&(ja(c[82],c[83],c[84],b),e=1);62===a&&ka&&(ka(c[89],c[16],b),e=1);e||b()};
