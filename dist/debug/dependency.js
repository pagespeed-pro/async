p("compareDocumentPosition",47);var ub=0;function vb(a){var b=a+ ++ub;R(b);return function(){return R("_"+b,b,a,a)}}if(E)var wb=[];if(F)var xb=[];var yb=r(47);function zb(a,b){var c=!1,d=a[16];a=a[4]||a[5];if(b){b=M(b,88);var e=b[89];b=b[88];if(b=e?rb(b):b)if(e){if(a&&b.test(a)||d&&b.test(d))c=!0}else if(a&&-1!==a.indexOf(b)||d&&-1!==d.indexOf(b))c=!0}return c}
ha=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[3],f=c[11],k=[],h,n=6===e?wb:xb;Ka(g,function(a){6===e?wb.push(a):xb.push(a)});d&&(d=y(d),q(d,function(a){var b=!1;q(n,function(c){b||(b=zb(c,a),!b||c[11]&&(!h||yb in h&&h[yb](c[11])&4)&&(h=c[11]))});b||k.push(a)}));if(k.length){a={unmet:k,dependencies:d};var l=vb(g);U("dependencies.wait",g,a);Ma(6===e?10:38,function(a){if(k.length&&(q(k,function(b,c){zb(a,b)&&(k.splice(c,1),!a[11]||h&&!(yb in h&&h[yb](a[11])&4)||(h=a[11]))}),!k.length)){var e={dependencies:d};
if(l){var n=l();e.startTime=n.startTime;e.duration=n.duration}U("dependencies.ready",g,e);h&&f&&!c[13]&&Ha(h,f);b(h)}})}else b()};
