var Ib,Jb;function Kb(a,b){a=y(a);b=y(b);p(a,function(a){p(b,function(b){a.removeAttribute(q(b))})})}n("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",89);var Lb,Mb,Nb=[],Ob=q(109);function Pb(a,b){G([a,b])}J&&(O[Ob]=Pb);K&&(P[Ob]=Pb);
function Qb(a){p(Nb,function(b){function c(){a.innerHTML="";Kb(a,[e,0]);a.disabled=!0}b=b[0];var d,e,g;if(a&&1===a.nodeType&&!a.hasAttribute(q(19))){var f=a.nodeName.toLowerCase();T(Jb,[a,f],function(a,b){a&&(g=a,d=6,e=b)});T(Ib,[a,f],function(a,b){a&&(g=a,d=106,e=b)})}if(d){var k;p(b,function(b){if(!k){var c=b[2]||7,e=b[100]||105,f=b[87],h=b[88],m=g;if(7===c||c===d)98===e&&(m=a.outerHTML),(f=h?cb(f):f)&&m&&(h?f.test(m)&&(k=b):-1!==m.indexOf(f)&&(k=b))}});if(k)if(f=k[101],107===f[2])c(a,d);else{var h=
f[102],m=f[103],t=f[88];b=f[104];f=S(f[14]);if(h)if(t)if(t=cb(h))h=g.replace(t,m);else return H&&L("capture."+(106===d?"js":"css"),["invalid regex",h]),a;else h=g.replace(h,m);else h=m;f[e]=h;f[20]=g;if(F&&b){f[19]=d;var w=wa(a,f);c(a,d);T(F,b,function(){xa(a).replaceChild(w,a)})}else U(a,f)}}});return a}G=function(a){var b=u(S(a[1]));a[0]&&(a=[u(y(a[0])),b],Nb.push(a));T(Lb,b[89],Qb);T(Mb,b[90],Qb)};
