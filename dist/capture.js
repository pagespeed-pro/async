var Ob,Pb;function Qb(a,b){a=x(a);b=x(b);q(a,function(a){q(b,function(b){a.removeAttribute(r(b))})})}p("observer,insert,appendChild,insertBefore,rootNodes,Element,Document,subtree,modes,contents,node,match_type,action,search,replace,timing,url,js,remove,rewrite,capture",92);var Rb,Sb,Tb=[],Ub=r(112);function Vb(a,b){la([a,b])}J&&(O[Ub]=Vb);
function Wb(a){q(Tb,function(b){function c(){a.innerHTML="";Qb(a,[e,0]);a.disabled=!0}b=b[0];var d,e,k;if(a&&1===a.nodeType&&!a.hasAttribute(r(19))){var f=a.nodeName.toLowerCase();R(Pb,[a,f],function(a,b){a&&(k=a,d=6,e=b)});R(Ob,[a,f],function(a,b){a&&(k=a,d=109,e=b)})}if(d){var h;q(b,function(b){if(!h){var c=b[2]||7,e=b[103]||108,f=b[90],g=b[91],m=k;if(7===c||c===d)101===e&&(m=a.outerHTML),(f=g?gb(f):f)&&m&&(g?f.test(m)&&(h=b):-1!==m.indexOf(f)&&(h=b))}});if(h)if(f=h[104],110===f[2])c(a,d);else{var g=
f[105],m=f[106],n=f[91];b=f[107];f=Q(f[14]);if(g)if(n)if(n=gb(g))g=k.replace(n,m);else return G&&L("capture."+(109===d?"js":"css"),["invalid regex",g]),a;else g=k.replace(g,m);else g=m;f[e]=g;f[20]=k;if(E&&b){f[19]=d;var A=za(a,f);c(a,d);R(E,G?[b,k]:b,function(){V(a).replaceChild(A,a)})}else T(a,f)}}});return a}la=function(a){var b=t(Q(a[1]));a[0]&&(a=[t(x(a[0])),b],Tb.push(a));R(Rb,b[92],Wb);R(Sb,b[93],Wb)};
