p("load_timing,render_timing,renderCallback,unrenderCallback,requestAnimationFrame,requestIdleCallback,domReady,inview,frame,timeout,setTimeout,DOMContentLoaded,exec_timing,method,lazy",48);var Gb=0;function Hb(a,b,c,d){var e=a+ ++Gb;S(e);return function(){d=d||{};d.type=a;var f=S("_"+e,e,a,a);d.startTime=f.startTime;d.duration=f.duration;f=c.slice(0);f[0]+=".exec";f.push(d);R(Ua,f);b(d)}}var Ib=ua("requestAnimationFrame",1);wa=ua("requestIdleCallback");var Jb,Kb=[];function Lb(a){if(a||Jb||-1!==["complete","loaded","interactive"].indexOf(A.readyState))for(Jb=1,a=Kb.shift();a;)a(),a=Kb.shift()}function Mb(a){Lb();Jb?a():Kb.push(a)}Ca(59,function(){Lb(1)});Lb();
function Nb(a,b){b=b||1;Ib(function(){-1!==b||A.body?1<b?Nb(a,--b):a():Nb(a,b)})}
D=function(a,b){var c=M(a[0],2),d=a[1],e=a[2];a={};var f=d.slice(0);f[0]+=".start";var g=c?c[2]:0;g&&(a.type=r(g));if(61===g){a.method=c[61];f.push(a);R(V,f);z[c[61]]=function(){va(b);F&&e&&(Pa(e,function(){e=!1}),L.then=function(a){a&&(e?Pa(e,function(){e=!1;a()}):a());return L});return L};var k=1}52===g&&Ib&&(a.frame=c[56]||1,f.push(a),R(V,f),Nb(Hb("requestAnimationFrame",b,d,a),c[56]||1),k=1);if(53===g&&wa){if(k=c[57])a.timeout=k,f.push(a);R(V,f);wa(Hb("requestIdleCallback",b,d,a),k?{timeout:k}:
void 0);k=1}54===g&&(f.push(a),R(V,f),Mb(Hb("domReady",b,d)),k=1);58===g&&(a.timeout=c[57],f.push(a),R(V,f),va(Hb("setTimeout",b,d,a),c[57]),k=1);9===g&&ia&&(a.media=c[9],f.push(a),R(V,f),ia(c[9],Hb("media",b,d,a)),k=1);55===g&&ja&&(a.selector=c[82],a.threshold=c[83],a.offset=c[84],f.push(a),R(V,f),ja(c[82],c[83],c[84],Hb("inview",b,d,a)),k=1);62===g&&ka&&(a.config=c[89],a.ref=c[16]||null,f.push(a),R(V,f),ka(c[89],c[16],Hb("lazy",b,d,a)),k=1);k||b()};
