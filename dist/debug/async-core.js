var aa=[],m={};function n(a,b){b=b||0;aa.length<b&&(aa.length=b);p(a.split(","),function(a,d){aa[b+d]=a;m[a]=b+d})}n("rel,as,type,head,href,src,css,all,preload,media,load,link,style,target,attributes,dependencies,ref,after,before,data-c,data-src,querySelector");function r(a){try{return(isNaN(a)?a:aa[a]||a).toString()}catch(b){t("VAR",a,b)}}
function v(a){var b=w(a);a=y(a);p(a,function(b,d,e){ba(b,1)&&(e={},ca(b,function(a,b){b=b in m?m[b]:b;a=ba(a)?v(a):a in m?m[a]:a;e[b]=a}),a[d]=e)});return b?a:a[0]};var z=window,A=z.document,da,ea,B,fa,C,D,ha,ia,ka,la,ma,E,F,G,na,H,oa,pa,K,qa,M,ra,sa,N,ta=setTimeout,ua,va,wa=A.addEventListener,xa=r(21);function w(a){return a instanceof Array}function ba(a,b){return"object"===typeof a?!b||!w(a):!1}function ya(a){return"undefined"===typeof a}function O(a,b){if(!ba(a)||w(a)||null===a){var c={};b&&(c[b]=a)}return c||a}function y(a){w(a)||(a=[a]);return a}function p(a,b){!b&&za&&za.error("foreach","no callback",a);for(var c=0,d=a.length;c<d;c++)b(a[c],c)}
function ca(a,b,c){for(e in a)if(a.hasOwnProperty(e)){var d=a[e];if(c){var e=r(e);d=r(d)}b(d,e)}}function Aa(a,b,c){c||(c=z);a=y(a);c=y(c);p(a,function(a){a=r(a);p(c,function(c){if(wa)c.addEventListener(a,b,!1);else if(c.attachEvent)a===r(59)&&(a=r(10),c=z),c.attachEvent("on"+a,b);else try{c["on"+a]=b}catch(f){}})})}function P(a,b,c,d){"function"===typeof a?Q(a,[b,c]):c&&!d&&c()}function Q(a,b){return a.apply(null,b)}function Ba(a,b){var c={},d;for(d in a)c[d]=a[d];for(d in b)c[d]=b[d];return c};N=function(){var a=Q(G||H,arguments);"function"===typeof a&&(N.then=a);return N};z.$async=N;N.toString=function(){return"$async"};z.perfMark=R;Ca("debug",N);function Da(){var a;if(!(a=A.head)){var b=b||A;a=b.getElementsByTagName(r(3))[0]}return a}function Ea(a,b,c){b||(b=A);return b[xa+(c?"All":"")](a)}function Fa(a,b){a=A.createElement(r(a));b&&S(a,b);return a}function Ga(a,b){a=a.cloneNode(!0);b&&S(a,b);return a}function Ha(a,b){b=y(b);p(b,function(b){a.appendChild(b)})}function S(a,b,c){a=y(a);p(a,function(a){ca(b,function(b,c){a.setAttribute(c,b)},!c)})}function Ia(a,b){a=y(a);b=y(b);p(a,function(a){p(b,function(b){a.removeAttribute(r(b))})})}
function Ja(a,b){b=b||1;for(a=a.parentElement;1<b;)return Ja(a,--b);return a}function Ka(a,b){La(a)?(a=La(a),Ja(a).insertBefore(b,a)):Ha(Ja(a),b)}function La(a,b){b=b||1;for(a=a&&a.nextSibling;a&&1<b;)return La(a,--b);return a}ea=Fa(11);try{da=ea.relList.supports(r(8))}catch(a){};
