n("load_timing,render_timing,renderCallback,unrenderCallback,requestAnimationFrame,requestIdleCallback,domReady,inview,frame,timeout,setTimeout,DOMContentLoaded,exec_timing,method,lazy",48);var Bb=0;function W(a,b,c,d){var e=a+ ++Bb;R(e);return function(){d=d||{};d.type=a;var g=R("_"+e,e,a,a);d.startTime=g.startTime;d.duration=g.duration;g=c.slice(0);g[0]+=".exec";g.push(d);O(Qa,g);b(d)}}var Cb=pa("requestAnimationFrame",1);ra=pa("requestIdleCallback");var Db,Eb=[];function Fb(a){if(a||Db||"complete"===A.readyState)for(Db=1,a=Eb.shift();a;)a(),a=Eb.shift()}function Gb(a){Db?a():Eb.push(a)}ya(59,function(){Fb(1)});Fb();function Hb(a,b){b=b||1;Cb(function(){1<b?Hb(a,--b):a()})}
C=function(a,b){var c=L(a[0],2),d=a[1],e=a[2];a=d.slice(0);a[0]+=".start";var g=c?c[2]:0;if(61===g){var f={};f.method=c[61];a.push(f);O(U,a);z[c[61]]=function(){qa(b);D&&e&&(La(e,function(){e=!1}),J.then=function(a){a&&(e?La(e,function(){e=!1;a()}):a());return J});return J};var h=1}52===g&&Cb&&(f={},f.frame=c[56]||1,a.push(f),O(U,a),Hb(W("requestAnimationFrame",b,d,f),c[56]||1),h=1);if(53===g&&ra){if(h=c[57])f={},f.timeout=h,a.push(f);O(U,a);ra(W("requestIdleCallback",b,d,f),h?{timeout:h}:void 0);
h=1}54===g&&(O(U,a),Gb(W("domReady",b,d)),h=1);58===g&&(f={},f.timeout=c[57],a.push(f),O(U,a),qa(W("setTimeout",b,d,f),c[57]),h=1);9===g&&ja&&(f={},f.media=c[9],a.push(f),O(U,a),ja(c[9],W("media",b,d,f)),h=1);55===g&&ka&&(f={},f.selector=c[82],f.threshold=c[83],f.offset=c[84],a.push(f),O(U,a),ka(c[82],c[83],c[84],W("inview",b,d,f)),h=1);62===g&&la&&(f={},f.b=c[89],a.push(f),O(U,a),la(c[89],c[16],W("lazy",b,d,f)),h=1);h||b()};
