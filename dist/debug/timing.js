n("load_timing,render_timing,renderCallback,unrenderCallback,requestAnimationFrame,requestIdleCallback,domReady,inview,frame,timeout,setTimeout,DOMContentLoaded,exec_timing,method",48);var Ab=0;function Bb(a,b,c,d){var e=a+ ++Ab;R(e);return function(){d=d||{};d.type=a;var g=R("_"+e,e,a,a);d.startTime=g.startTime;d.duration=g.duration;g=c.slice(0);g[0]+=".exec";g.push(d);P(Pa,g);b(d)}}var Cb=oa("requestAnimationFrame",1);qa=oa("requestIdleCallback");var Db,Eb=[];function Fb(a){if(a||Db||"complete"===A.readyState)for(Db=1,a=Eb.shift();a;)a(),a=Eb.shift()}function Gb(a){Db?a():Eb.push(a)}xa(59,function(){Fb(1)});Fb();function Hb(a,b){b=b||1;Cb(function(){1<b?Hb(a,--b):a()})}
C=function(a,b){var c=M(a[0],2),d=a[1],e=a[2];a=d.slice(0);a[0]+=".start";var g=c?c[2]:0;if(61===g){var f={};f.method=c[61];a.push(f);P(U,a);z[c[61]]=function(){pa(b);D&&e&&(Ka(e,function(){e=!1}),J.then=function(a){a&&(e?Ka(e,function(){e=!1;a()}):a());return J});return J};var k=1}52===g&&Cb&&(f={},f.frame=c[56]||1,a.push(f),P(U,a),Hb(Bb("requestAnimationFrame",b,d,f),c[56]||1),k=1);if(53===g&&qa){if(k=c[57])f={},f.timeout=k,a.push(f);P(U,a);qa(Bb("requestIdleCallback",b,d,f),k?{timeout:k}:void 0);
k=1}54===g&&(P(U,a),Gb(Bb("domReady",b,d)),k=1);58===g&&(f={},f.timeout=c[57],a.push(f),P(U,a),pa(Bb("setTimeout",b,d,f),c[57]),k=1);9===g&&ja&&(f={},f.media=c[9],a.push(f),P(U,a),ja(c[9],Bb("media",b,d,f)),k=1);55===g&&ka&&(f={},f.selector=c[81],f.threshold=c[82],f.offset=c[83],a.push(f),P(U,a),ka(c[81],c[82],c[83],Bb("inview",b,d,f)),k=1);k||b()};
