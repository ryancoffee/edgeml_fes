(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var l;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function p(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b})}}
p("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,g){this.h=f;ba(this,"description",{configurable:!0,writable:!0,value:g})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
p("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(aa(this))}})}return a});
function ea(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function q(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function ha(a){if(!(a instanceof Array)){a=q(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
var ia="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ja=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ia(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),ka;
if("function"==typeof Object.setPrototypeOf)ka=Object.setPrototypeOf;else{var la;a:{var ma={a:!0},na={};try{na.__proto__=ma;la=na.a;break a}catch(a){}la=!1}ka=la?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var oa=ka;
function r(a,b){a.prototype=ia(b.prototype);a.prototype.constructor=a;if(oa)oa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.aa=b.prototype}
function pa(){this.D=!1;this.l=null;this.i=void 0;this.h=1;this.o=this.m=0;this.A=this.j=null}
function qa(a){if(a.D)throw new TypeError("Generator is already running");a.D=!0}
pa.prototype.u=function(a){this.i=a};
function ra(a,b){a.j={vb:b,zb:!0};a.h=a.m||a.o}
pa.prototype.return=function(a){this.j={return:a};this.h=this.o};
function v(a,b,c){a.h=c;return{value:b}}
pa.prototype.s=function(a){this.h=a};
function sa(a,b,c){a.m=b;void 0!=c&&(a.o=c)}
function ta(a,b){a.h=b;a.m=0}
function ua(a){a.m=0;var b=a.j.vb;a.j=null;return b}
function va(a){a.A=[a.j];a.m=0;a.o=0}
function wa(a){var b=a.A.splice(0)[0];(b=a.j=a.j||b)?b.zb?a.h=a.m||a.o:void 0!=b.s&&a.o<b.s?(a.h=b.s,a.j=null):a.h=a.o:a.h=0}
function xa(a){this.h=new pa;this.i=a}
function ya(a,b){qa(a.h);var c=a.h.l;if(c)return za(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h.return);
a.h.return(b);return Aa(a)}
function za(a,b,c,d){try{var e=b.call(a.h.l,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.D=!1,e;var f=e.value}catch(g){return a.h.l=null,ra(a.h,g),Aa(a)}a.h.l=null;d.call(a.h,f);return Aa(a)}
function Aa(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.D=!1,{value:b.value,done:!1}}catch(c){a.h.i=void 0,ra(a.h,c)}a.h.D=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.zb)throw b.vb;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function Ba(a){this.next=function(b){qa(a.h);a.h.l?b=za(a,a.h.l.next,b,a.h.u):(a.h.u(b),b=Aa(a));return b};
this.throw=function(b){qa(a.h);a.h.l?b=za(a,a.h.l["throw"],b,a.h.u):(ra(a.h,b),b=Aa(a));return b};
this.return=function(b){return ya(a,b)};
this[Symbol.iterator]=function(){return this}}
function Ca(a){function b(d){return a.next(d)}
function c(d){return a.throw(d)}
return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}
f(a.next())})}
function w(a){return Ca(new Ba(new xa(a)))}
function Da(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}
p("Reflect",function(a){return a?a:{}});
p("Reflect.construct",function(){return ja});
p("Reflect.setPrototypeOf",function(a){return a?a:oa?function(b,c){try{return oa(b,c),!0}catch(d){return!1}}:null});
p("Promise",function(a){function b(g){this.h=0;this.j=void 0;this.i=[];this.D=!1;var h=this.l();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(null==this.h){this.h=[];var h=this;this.j(function(){h.o()})}this.h.push(g)};
var e=da.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.o=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(m){this.l(m)}}}this.h=null};
c.prototype.l=function(g){this.j(function(){throw g;})};
b.prototype.l=function(){function g(m){return function(n){k||(k=!0,m.call(h,n))}}
var h=this,k=!1;return{resolve:g(this.S),reject:g(this.o)}};
b.prototype.S=function(g){if(g===this)this.o(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ga(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.L(g):this.m(g)}};
b.prototype.L=function(g){var h=void 0;try{h=g.then}catch(k){this.o(k);return}"function"==typeof h?this.qa(h,g):this.m(g)};
b.prototype.o=function(g){this.u(2,g)};
b.prototype.m=function(g){this.u(1,g)};
b.prototype.u=function(g,h){if(0!=this.h)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.j=h;2===this.h&&this.Z();this.A()};
b.prototype.Z=function(){var g=this;e(function(){if(g.K()){var h=da.console;"undefined"!==typeof h&&h.error(g.j)}},1)};
b.prototype.K=function(){if(this.D)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.j;return k(g)};
b.prototype.A=function(){if(null!=this.i){for(var g=0;g<this.i.length;++g)f.i(this.i[g]);this.i=null}};
var f=new c;b.prototype.ga=function(g){var h=this.l();g.Ka(h.resolve,h.reject)};
b.prototype.qa=function(g,h){var k=this.l();try{g.call(h,k.resolve,k.reject)}catch(m){k.reject(m)}};
b.prototype.then=function(g,h){function k(x,u){return"function"==typeof x?function(C){try{m(x(C))}catch(D){n(D)}}:u}
var m,n,t=new b(function(x,u){m=x;n=u});
this.Ka(k(g,m),k(h,n));return t};
b.prototype.catch=function(g){return this.then(void 0,g)};
b.prototype.Ka=function(g,h){function k(){switch(m.h){case 1:g(m.j);break;case 2:h(m.j);break;default:throw Error("Unexpected state: "+m.h);}}
var m=this;null==this.i?f.i(k):this.i.push(k);this.D=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var m=q(g),n=m.next();!n.done;n=m.next())d(n.value).Ka(h,k)})};
b.all=function(g){var h=q(g),k=h.next();return k.done?d([]):new b(function(m,n){function t(C){return function(D){x[C]=D;u--;0==u&&m(x)}}
var x=[],u=0;do x.push(void 0),u++,d(k.value).Ka(t(x.length-1),n),k=h.next();while(!k.done)})};
return b});
function Ea(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
p("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=q(k);for(var m;!(m=k.next()).done;)m=m.value,this.set(m[0],m[1])}}
function c(){}
function d(k){var m=typeof k;return"object"===m&&null!==k||"function"===m}
function e(k){if(!Ea(k,g)){var m=new c;ba(k,g,{value:m})}}
function f(k){var m=Object[k];m&&(Object[k]=function(n){if(n instanceof c)return n;Object.isExtensible(n)&&e(n);return m(n)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),m=Object.seal({}),n=new a([[k,2],[m,3]]);if(2!=n.get(k)||3!=n.get(m))return!1;n.delete(k);n.set(m,4);return!n.has(k)&&4==n.get(m)}catch(t){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,m){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!Ea(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=m;return this};
b.prototype.get=function(k){return d(k)&&Ea(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&Ea(k,g)&&Ea(k[g],this.h)};
b.prototype.delete=function(k){return d(k)&&Ea(k,g)&&Ea(k[g],this.h)?delete k[g][this.h]:!1};
return b});
p("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var m=h.h;return ea(function(){if(m){for(;m.head!=h.h;)m=m.previous;for(;m.next!=m.head;)return m=m.next,{done:!1,value:k(m)};m=null}return{done:!0,value:void 0}})}
function d(h,k){var m=k&&typeof k;"object"==m||"function"==m?f.has(k)?m=f.get(k):(m=""+ ++g,f.set(k,m)):m="p_"+k;var n=h.data_[m];if(n&&Ea(h.data_,m))for(h=0;h<n.length;h++){var t=n[h];if(k!==k&&t.key!==t.key||k===t.key)return{id:m,list:n,index:h,entry:t}}return{id:m,list:n,index:-1,entry:void 0}}
function e(h){this.data_={};this.h=b();this.size=0;if(h){h=q(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(q([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var m=k.entries(),n=m.next();if(n.done||n.value[0]!=h||"s"!=n.value[1])return!1;n=m.next();return n.done||4!=n.value[0].x||"t"!=n.value[1]||!m.next().done?!1:!0}catch(t){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var m=d(this,h);m.list||(m.list=this.data_[m.id]=[]);m.entry?m.entry.value=k:(m.entry={next:this.h,previous:this.h.previous,head:this.h,key:h,value:k},m.list.push(m.entry),this.h.previous.next=m.entry,this.h.previous=m.entry,this.size++);return this};
e.prototype.delete=function(h){h=d(this,h);return h.entry&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.data_[h.id],h.entry.previous.next=h.entry.next,h.entry.next.previous=h.entry.previous,h.entry.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.data_={};this.h=this.h.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).entry};
e.prototype.get=function(h){return(h=d(this,h).entry)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var m=this.entries(),n;!(n=m.next()).done;)n=n.value,h.call(k,n[1],n[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
function Fa(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
p("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Fa(this,b,"endsWith");b+="";void 0===c&&(c=d.length);c=Math.max(0,Math.min(c|0,d.length));for(var e=b.length;0<e&&0<c;)if(d[--c]!=b[--e])return!1;return 0>=e}});
p("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});
p("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Fa(this,b,"startsWith");b+="";var e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});
function Ga(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
p("Array.prototype.entries",function(a){return a?a:function(){return Ga(this,function(b,c){return[b,c]})}});
p("Object.setPrototypeOf",function(a){return a||oa});
var Ha="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Ea(d,e)&&(a[e]=d[e])}return a};
p("Object.assign",function(a){return a||Ha});
p("Set",function(a){function b(c){this.h=new Map;if(c){c=q(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(q([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype.delete=function(c){c=this.h.delete(c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
p("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Ea(b,d)&&c.push([d,b[d]]);return c}});
p("Array.prototype.keys",function(a){return a?a:function(){return Ga(this,function(b){return b})}});
p("Array.prototype.values",function(a){return a?a:function(){return Ga(this,function(b,c){return c})}});
p("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
p("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
p("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Fa(this,b,"includes").indexOf(b,c||0)}});
p("Array.from",function(a){return a?a:function(b,c,d){c=null!=c?c:function(h){return h};
var e=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if("function"==typeof f){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
p("Number.isNaN",function(a){return a?a:function(b){return"number"===typeof b&&isNaN(b)}});
p("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
p("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)Ea(b,d)&&c.push(b[d]);return c}});
var y=this||self;function z(a,b,c){a=a.split(".");c=c||y;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function A(a,b){a=a.split(".");b=b||y;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function Ia(){}
function Ja(a){a.ma=void 0;a.getInstance=function(){return a.ma?a.ma:a.ma=new a}}
function Ka(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"}
function La(a){var b=Ka(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function Ma(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Na(a){return Object.prototype.hasOwnProperty.call(a,Oa)&&a[Oa]||(a[Oa]=++Pa)}
var Oa="closure_uid_"+(1E9*Math.random()>>>0),Pa=0;function Ra(a,b,c){return a.call.apply(a.bind,arguments)}
function Sa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Ta(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Ta=Ra:Ta=Sa;return Ta.apply(null,arguments)}
function Ua(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function Va(a,b){z(a,b,void 0)}
function Wa(a,b){function c(){}
c.prototype=b.prototype;a.aa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.oo=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Xa(a){return a}
;function Za(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,Za);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));void 0!==b&&(this.Pb=b)}
Wa(Za,Error);Za.prototype.name="CustomError";function $a(a){a=a.url;var b=/[?&]dsh=1(&|$)/.test(a);this.j=!b&&/[?&]ae=1(&|$)/.test(a);this.l=!b&&/[?&]ae=2(&|$)/.test(a);if((this.h=/[?&]adurl=([^&]*)/.exec(a))&&this.h[1]){try{var c=decodeURIComponent(this.h[1])}catch(d){c=null}this.i=c}}
;function ab(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var bb=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},cb=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},db=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},eb=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},fb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
cb(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function gb(a,b){a:{for(var c=a.length,d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]}
function ib(a,b){b=bb(a,b);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}
function jb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(La(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function kb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function lb(a){var b=mb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function nb(a){for(var b in a)return!1;return!0}
function ob(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function pb(){var a=B("PLAYER_VARS",{});return null!==a&&"privembed"in a?a.privembed:!1}
function qb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function rb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function sb(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();if("undefined"!==typeof Map&&a instanceof Map)return new Map(a);if("undefined"!==typeof Set&&a instanceof Set)return new Set(a);var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=sb(a[c]);return b}
var tb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ub(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<tb.length;f++)c=tb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var vb;function wb(){if(void 0===vb){var a=null,b=y.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:Xa,createScript:Xa,createScriptURL:Xa})}catch(c){y.console&&y.console.error(c.message)}vb=a}else vb=a}return vb}
;function xb(a,b){this.j=a===yb&&b||""}
xb.prototype.i=!0;xb.prototype.h=function(){return this.j};
function Ab(a){return new xb(yb,a)}
var yb={};Ab("");var Bb={};function Cb(a){this.j=Bb===Bb?a:"";this.i=!0}
Cb.prototype.h=function(){return this.j.toString()};
Cb.prototype.toString=function(){return this.j.toString()};function Db(a,b){this.j=b===Eb?a:""}
Db.prototype.i=!0;Db.prototype.h=function(){return this.j.toString()};
Db.prototype.toString=function(){return this.j+""};
function Fb(a){if(a instanceof Db&&a.constructor===Db)return a.j;Ka(a);return"type_error:TrustedResourceUrl"}
var Eb={};function Gb(a){var b=wb();a=b?b.createScriptURL(a):a;return new Db(a,Eb)}
;var Hb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};function Ib(a,b){this.j=b===Jb?a:""}
Ib.prototype.i=!0;Ib.prototype.h=function(){return this.j.toString()};
Ib.prototype.toString=function(){return this.j.toString()};
function Kb(a){if(a instanceof Ib&&a.constructor===Ib)return a.j;Ka(a);return"type_error:SafeUrl"}
var Lb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Jb={};function Mb(){var a=y.navigator;return a&&(a=a.userAgent)?a:""}
function E(a){return-1!=Mb().indexOf(a)}
;function Nb(){return(E("Chrome")||E("CriOS"))&&!E("Edge")||E("Silk")}
;var Ob={};function Pb(a){this.j=Ob===Ob?a:"";this.i=!0}
Pb.prototype.h=function(){return this.j.toString()};
Pb.prototype.toString=function(){return this.j.toString()};function Qb(a,b){b instanceof Ib||b instanceof Ib||(b="object"==typeof b&&b.i?b.h():String(b),Lb.test(b)||(b="about:invalid#zClosurez"),b=new Ib(b,Jb));a.href=Kb(b)}
function Rb(a,b){a.rel="stylesheet";a.href=Fb(b).toString();(b=Sb('style[nonce],link[rel="stylesheet"][nonce]',a.ownerDocument&&a.ownerDocument.defaultView))&&a.setAttribute("nonce",b)}
function Tb(){return Sb("script[nonce]",void 0)}
var Ub=/^[\w+/_-]+[=]{0,2}$/;function Sb(a,b){b=(b||y).document;return b.querySelector?(a=b.querySelector(a))&&(a=a.nonce||a.getAttribute("nonce"))&&Ub.test(a)?a:"":""}
;function Vb(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Wb=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xb(a){return a?decodeURI(a):a}
function Yb(a){return Xb(a.match(Wb)[3]||null)}
function Zb(a){var b=a.match(Wb);a=b[5];var c=b[6];b=b[7];var d="";a&&(d+=a);c&&(d+="?"+c);b&&(d+="#"+b);return d}
function $b(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)$b(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function ac(a){var b=[],c;for(c in a)$b(c,a[c],b);return b.join("&")}
function bc(a,b){b=ac(b);if(b){var c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.substr(0,d),e,a.substr(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;b=a[0]+(a[1]?"?"+a[1]:"")+a[2]}else b=a;return b}
var cc=/#|$/;function dc(){return E("iPhone")&&!E("iPod")&&!E("iPad")}
;function ec(a){ec[" "](a);return a}
ec[" "]=Ia;var fc=E("Opera"),gc=E("Trident")||E("MSIE"),hc=E("Edge"),ic=E("Gecko")&&!(-1!=Mb().toLowerCase().indexOf("webkit")&&!E("Edge"))&&!(E("Trident")||E("MSIE"))&&!E("Edge"),jc=-1!=Mb().toLowerCase().indexOf("webkit")&&!E("Edge"),kc=E("Android");function lc(){var a=y.document;return a?a.documentMode:void 0}
var mc;a:{var nc="",oc=function(){var a=Mb();if(ic)return/rv:([^\);]+)(\)|;)/.exec(a);if(hc)return/Edge\/([\d\.]+)/.exec(a);if(gc)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(jc)return/WebKit\/(\S+)/.exec(a);if(fc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
oc&&(nc=oc?oc[1]:"");if(gc){var pc=lc();if(null!=pc&&pc>parseFloat(nc)){mc=String(pc);break a}}mc=nc}var qc=mc,rc;if(y.document&&gc){var sc=lc();rc=sc?sc:parseInt(qc,10)||void 0}else rc=void 0;var tc=rc;var uc=dc()||E("iPod"),vc=E("iPad");!E("Android")||Nb();Nb();var wc=E("Safari")&&!(Nb()||E("Coast")||E("Opera")||E("Edge")||E("Edg/")||E("OPR")||E("Firefox")||E("FxiOS")||E("Silk")||E("Android"))&&!(dc()||E("iPad")||E("iPod"));var xc={},yc=null;
function zc(a,b){La(a);void 0===b&&(b=0);if(!yc){yc={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],e=0;5>e;e++){var f=c.concat(d[e].split(""));xc[e]=f;for(var g=0;g<f.length;g++){var h=f[g];void 0===yc[h]&&(yc[h]=g)}}}b=xc[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(e=f=0;f<a.length-2;f+=3){var k=a[f],m=a[f+1];h=a[f+2];g=b[k>>2];k=b[(k&3)<<4|m>>4];m=b[(m&15)<<2|h>>6];h=b[h&63];c[e++]=""+g+k+m+h}g=0;h=d;switch(a.length-
f){case 2:g=a[f+1],h=b[(g&15)<<2]||d;case 1:a=a[f],c[e]=""+b[a>>2]+b[(a&3)<<4|g>>4]+h+d}return c.join("")}
;var Ac="function"===typeof Uint8Array;var Bc="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol(void 0):void 0;function Cc(a){Object.isFrozen(a)||(Bc?a[Bc]|=1:void 0!==a.h?a.h|=1:Object.defineProperties(a,{h:{value:1,configurable:!0,writable:!0,enumerable:!1}}));return a}
;function Dc(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}
var Ec,Fc=Object.freeze(Cc([])),Gc="undefined"!=typeof Symbol&&"undefined"!=typeof Symbol.hasInstance;function Hc(a,b,c){return-1===b?null:b>=a.l?a.i?a.i[b]:void 0:(void 0===c?0:c)&&a.i&&(c=a.i[b],null!=c)?c:a.N[b+a.j]}
function F(a,b,c,d){b<a.l&&(void 0===d||!d)?a.N[b+a.j]=c:(a.i||(a.i=a.N[a.l+a.j]={}))[b]=c;return a}
function Ic(a,b,c){c=void 0===c?!1:c;var d=Hc(a,b,c);null==d&&(d=Fc);d===Fc&&(d=Cc(d.slice()),F(a,b,d,c));return d}
function Jc(a,b,c,d){(c=Kc(a,c))&&c!==b&&null!=d&&(a.h&&c in a.h&&(a.h[c]=void 0),F(a,c,void 0));return F(a,b,d)}
function Kc(a,b){for(var c=0,d=0;d<b.length;d++){var e=b[d];null!=Hc(a,e)&&(0!==c&&F(a,c,void 0,!1),c=e)}return c}
function Lc(a,b,c,d,e){if(-1===c)return null;a.h||(a.h={});var f=a.h[c];if(f)return f;e=Hc(a,c,void 0===e?!1:e);if(null==e&&!d)return f;b=new b(e);return a.h[c]=b}
function Mc(a,b,c,d){a.h||(a.h={});var e=a.h[c];if(!e){d=Ic(a,c,void 0===d?!1:d);e=[];for(var f=0;f<d.length;f++)e[f]=new b(d[f]);a.h[c]=e}return e}
function G(a,b,c,d){a.h||(a.h={});var e=c?c.N:c;a.h[b]=c;return F(a,b,e,void 0===d?!1:d)}
function Nc(a,b,c){var d=Oc;a.h||(a.h={});var e=c?c.N:c;a.h[b]=c;Jc(a,b,d,e)}
function Pc(a,b,c,d){var e=Mc(a,c,b,void 0===e?!1:e);c=d?d:new c;a=Ic(a,b);e.push(c);a.push(c.N)}
;function Qc(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":if(a&&!Array.isArray(a)&&Ac&&null!=a&&a instanceof Uint8Array)return zc(a)}return a}
;function Rc(a,b){if(null!=a){if(Array.isArray(a))a=Sc(a,b);else if(Dc(a)){var c={},d;for(d in a)c[d]=Rc(a[d],b);a=c}else a=b(a);return a}}
function Sc(a,b){for(var c=a.slice(),d=0;d<c.length;d++)c[d]=Rc(c[d],b);if(Array.isArray(a)){var e;Bc?e=a[Bc]:e=a.h;a=!!((null==e?0:e)&1)}else a=!1;a&&Cc(c);return c}
function Tc(a){if(a&&"object"==typeof a&&a.toJSON)return a.toJSON();a=Qc(a);return Array.isArray(a)?Sc(a,Tc):a}
function Uc(a){return Ac&&null!=a&&a instanceof Uint8Array?new Uint8Array(a):a}
;var Vc;function Wc(a,b,c){var d=Vc;Vc=null;a||(a=d);d=this.constructor.vo;a||(a=d?[d]:[]);this.j=(d?0:-1)-(this.constructor.uo||0);this.h=void 0;this.N=a;a:{d=this.N.length;a=d-1;if(d&&(d=this.N[a],Dc(d))){this.l=a-this.j;this.i=d;break a}void 0!==b&&-1<b?(this.l=Math.max(b,a+1-this.j),this.i=void 0):this.l=Number.MAX_VALUE}if(c)for(b=0;b<c.length;b++)if(a=c[b],a<this.l)a+=this.j,(d=this.N[a])?Array.isArray(d)&&Cc(d):this.N[a]=Fc;else{d=this.i||(this.i=this.N[this.l+this.j]={});var e=d[a];e?Array.isArray(e)&&
Cc(e):d[a]=Fc}}
Wc.prototype.toJSON=function(){var a=this.N;return Ec?a:Sc(a,Tc)};
Wc.prototype.clone=function(){var a=this.constructor,b;Vc=b=Sc(this.N,Uc);a=new a(b);Vc=null;Xc(a,this);return a};
Wc.prototype.toString=function(){return this.N.toString()};
function Yc(a,b){return Qc(b)}
function Xc(a,b){b.o&&(a.o=b.o.slice());var c=b.h;if(c){b=b.i;for(var d in c){var e=c[d];if(e){var f=!(!b||!b[d]),g=+d;if(Array.isArray(e)){if(e.length)for(f=Mc(a,e[0].constructor,g,f),g=0;g<Math.min(f.length,e.length);g++)Xc(f[g],e[g])}else(f=Lc(a,e.constructor,g,void 0,f))&&Xc(f,e)}}}}
;function Zc(){Wc.apply(this,arguments)}
r(Zc,Wc);function $c(){var a={};Object.defineProperties(Zc,(a[Symbol.hasInstance]={value:Object[Symbol.hasInstance],configurable:!1,writable:!1,enumerable:!1},a))}
Gc&&$c();function ad(a,b){var c=this.h;if(this.isRepeated){var d=!0;d=void 0===d?!1:d;if(b){var e=Cc([]);for(var f=0;f<b.length;f++)e[f]=b[f].N;a.h||(a.h={});a.h[c]=b}else a.h&&(a.h[c]=void 0),e=Fc;a=F(a,c,e,d)}else a=G(a,c,b,!0);return a}
;function H(){Zc.apply(this,arguments)}
r(H,Zc);function bd(){var a={};Object.defineProperties(H,(a[Symbol.hasInstance]={value:Object[Symbol.hasInstance],configurable:!1,writable:!1,enumerable:!1},a))}
Gc&&bd();function cd(){var a=this;this.promise=new Promise(function(b,c){a.resolve=b;a.reject=c})}
;function dd(a){this.i=!1;var b=a.program;a=a.globalName;var c=new cd;this.j=c.promise;this.l=q((0,y[a].a)(b,function(d,e){Promise.resolve().then(function(){c.resolve({Ob:d,wc:e})})},!0)).next().value;
this.vc=c.promise.then(function(){})}
dd.prototype.snapshot=function(a){if(this.i)throw Error("Already disposed");return this.j.then(function(b){var c=b.Ob;return new Promise(function(d){c(function(e){d(e)},[a.qb,
a.xc])})})};
dd.prototype.Jb=function(a){if(this.i)throw Error("Already disposed");return this.l([a.qb,a.xc])};
dd.prototype.dispose=function(){this.i=!0;this.j.then(function(a){(a=a.wc)&&a()})};
dd.prototype.h=function(){return this.i};var ed=window;Ab("csi.gstatic.com");Ab("googleads.g.doubleclick.net");Ab("partner.googleadservices.com");Ab("pubads.g.doubleclick.net");Ab("securepubads.g.doubleclick.net");Ab("tpc.googlesyndication.com");/*

 SPDX-License-Identifier: Apache-2.0
*/
var fd={};function gd(){}
function hd(a){this.h=a}
r(hd,gd);hd.prototype.toString=function(){return this.h};
var id=new hd("about:invalid#zTSz",fd);function jd(a){if(a instanceof gd)if(a instanceof hd)a=a.h;else throw Error("");else a=Kb(a);return a}
;function kd(a,b){a.src=Fb(b);var c;b=(a.ownerDocument&&a.ownerDocument.defaultView||window).document;var d=null===(c=b.querySelector)||void 0===c?void 0:c.call(b,"script[nonce]");(c=d?d.nonce||d.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",c)}
;function ld(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
l=ld.prototype;l.clone=function(){return new ld(this.x,this.y)};
l.equals=function(a){return a instanceof ld&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
l.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
l.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
l.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
l.scale=function(a,b){this.x*=a;this.y*="number"===typeof b?b:a;return this};function md(a,b){this.width=a;this.height=b}
l=md.prototype;l.clone=function(){return new md(this.width,this.height)};
l.aspectRatio=function(){return this.width/this.height};
l.isEmpty=function(){return!(this.width*this.height)};
l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
l.scale=function(a,b){this.width*=a;this.height*="number"===typeof b?b:a;return this};function nd(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function od(a){var b=document;a=String(a);"application/xhtml+xml"===b.contentType&&(a=a.toLowerCase());return b.createElement(a)}
function pd(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function qd(a){var b=rd;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a(b[c],c,b)}
function sd(){var a=[];qd(function(b){a.push(b)});
return a}
var rd={Mc:"allow-forms",Nc:"allow-modals",Oc:"allow-orientation-lock",Pc:"allow-pointer-lock",Qc:"allow-popups",Rc:"allow-popups-to-escape-sandbox",Sc:"allow-presentation",Tc:"allow-same-origin",Uc:"allow-scripts",Vc:"allow-top-navigation",Wc:"allow-top-navigation-by-user-activation"},td=ab(function(){return sd()});
function ud(){var a=vd(),b={};cb(td(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
function vd(){var a=void 0===a?document:a;return a.createElement("iframe")}
;function wd(a){this.isValid=a}
function xd(a){return new wd(function(b){return b.substr(0,a.length+1).toLowerCase()===a+":"})}
var yd=[xd("data"),xd("http"),xd("https"),xd("mailto"),xd("ftp"),new wd(function(a){return/^[^:]*([/?#]|$)/.test(a)})];function zd(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Ad=(new Date).getTime();var Bd=new function(a,b){this.flag=a;this.defaultValue=void 0===b?!1:b}(1959);function Cd(a){if(!a)return"";if(/^about:(?:blank|srcdoc)$/.test(a))return window.origin||"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if("http"!==c&&"https"!==c&&"chrome-extension"!==c&&"moz-extension"!==c&&"file"!==c&&"android-app"!==
c&&"chrome-search"!==c&&"chrome-untrusted"!==c&&"chrome"!==c&&"app"!==c&&"devtools"!==c)throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===c&&"80"!==e||"https"===c&&"443"!==e)a=":"+e}return c+"://"+b+a}
;function Dd(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;n=m=0}
function b(t){for(var x=g,u=0;64>u;u+=4)x[u/4]=t[u]<<24|t[u+1]<<16|t[u+2]<<8|t[u+3];for(u=16;80>u;u++)t=x[u-3]^x[u-8]^x[u-14]^x[u-16],x[u]=(t<<1|t>>>31)&4294967295;t=e[0];var C=e[1],D=e[2],K=e[3],N=e[4];for(u=0;80>u;u++){if(40>u)if(20>u){var S=K^C&(D^K);var W=1518500249}else S=C^D^K,W=1859775393;else 60>u?(S=C&D|K&(C|D),W=2400959708):(S=C^D^K,W=3395469782);S=((t<<5|t>>>27)&4294967295)+S+N+W+x[u]&4294967295;N=K;K=D;D=(C<<30|C>>>2)&4294967295;C=t;t=S}e[0]=e[0]+t&4294967295;e[1]=e[1]+C&4294967295;e[2]=
e[2]+D&4294967295;e[3]=e[3]+K&4294967295;e[4]=e[4]+N&4294967295}
function c(t,x){if("string"===typeof t){t=unescape(encodeURIComponent(t));for(var u=[],C=0,D=t.length;C<D;++C)u.push(t.charCodeAt(C));t=u}x||(x=t.length);u=0;if(0==m)for(;u+64<x;)b(t.slice(u,u+64)),u+=64,n+=64;for(;u<x;)if(f[m++]=t[u++],n++,64==m)for(m=0,b(f);u+64<x;)b(t.slice(u,u+64)),u+=64,n+=64}
function d(){var t=[],x=8*n;56>m?c(h,56-m):c(h,64-(m-56));for(var u=63;56<=u;u--)f[u]=x&255,x>>>=8;b(f);for(u=x=0;5>u;u++)for(var C=24;0<=C;C-=8)t[x++]=e[u]>>C&255;return t}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var m,n;a();return{reset:a,update:c,digest:d,Sb:function(){for(var t=d(),x="",u=0;u<t.length;u++)x+="0123456789ABCDEF".charAt(Math.floor(t[u]/16))+"0123456789ABCDEF".charAt(t[u]%16);return x}}}
;function Ed(a,b,c){var d=String(y.location.href);return d&&a&&b?[b,Fd(Cd(d),a,c||null)].join(" "):null}
function Fd(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],cb(d,function(h){e.push(h)}),Gd(e.join(" "));
var f=[],g=[];cb(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];cb(d,function(h){e.push(h)});
a=Gd(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Gd(a){var b=Dd();b.update(a);return b.Sb().toLowerCase()}
;var Hd={};function Id(a){this.h=a||{cookie:""}}
l=Id.prototype;l.isEnabled=function(){if(!y.navigator.cookieEnabled)return!1;if(!this.isEmpty())return!0;this.set("TESTCOOKIESENABLED","1",{Qa:60});if("1"!==this.get("TESTCOOKIESENABLED"))return!1;this.remove("TESTCOOKIESENABLED");return!0};
l.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Co;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Qa}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString();this.h.cookie=a+"="+b+c+g+h+d+(null!=e?";samesite="+
e:"")};
l.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Hb(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
l.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{Qa:0,path:b,domain:c});return d};
l.ab=function(){return Jd(this).keys};
l.isEmpty=function(){return!this.h.cookie};
l.clear=function(){for(var a=Jd(this).keys,b=a.length-1;0<=b;b--)this.remove(a[b])};
function Jd(a){a=(a.h.cookie||"").split(";");for(var b=[],c=[],d,e,f=0;f<a.length;f++)e=Hb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));return{keys:b,values:c}}
var Kd=new Id("undefined"==typeof document?null:document);function Ld(a){return!!Hd.FPA_SAMESITE_PHASE2_MOD||!(void 0===a||!a)}
function Md(a){a=void 0===a?!1:a;var b=y.__SAPISID||y.__APISID||y.__3PSAPISID||y.__OVERRIDE_SID;Ld(a)&&(b=b||y.__1PSAPISID);if(b)return!0;var c=new Id(document);b=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID");Ld(a)&&(b=b||c.get("__Secure-1PAPISID"));return!!b}
function Nd(a,b,c,d){(a=y[a])||(a=(new Id(document)).get(b));return a?Ed(a,c,d):null}
function Od(a){var b=void 0===b?!1:b;var c=Cd(String(y.location.href)),d=[];if(Md(b)){c=0==c.indexOf("https:")||0==c.indexOf("chrome-extension:")||0==c.indexOf("moz-extension:");var e=c?y.__SAPISID:y.__APISID;e||(e=new Id(document),e=e.get(c?"SAPISID":"APISID")||e.get("__Secure-3PAPISID"));(e=e?Ed(e,c?"SAPISIDHASH":"APISIDHASH",a):null)&&d.push(e);c&&Ld(b)&&((b=Nd("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",a))&&d.push(b),(a=Nd("__3PSAPISID","__Secure-3PAPISID","SAPISID3PHASH",a))&&d.push(a))}return 0==
d.length?null:d.join(" ")}
;function Pd(a){a&&"function"==typeof a.dispose&&a.dispose()}
;function Qd(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];La(d)?Qd.apply(null,d):Pd(d)}}
;function I(){this.D=this.D;this.o=this.o}
I.prototype.D=!1;I.prototype.h=function(){return this.D};
I.prototype.dispose=function(){this.D||(this.D=!0,this.H())};
function Rd(a,b){a.D?b():(a.o||(a.o=[]),a.o.push(b))}
I.prototype.H=function(){if(this.o)for(;this.o.length;)this.o.shift()()};function Sd(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.j=!1}
Sd.prototype.stopPropagation=function(){this.j=!0};
Sd.prototype.preventDefault=function(){this.defaultPrevented=!0};function Td(a){var b=A("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||y.$googDebugFname||b}catch(g){e="Not available",c=!0}b=Ud(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,Vd[c])c=Vd[c];else{c=String(c);if(!Vd[c]){var f=/function\s+([^\(]+)/m.exec(c);Vd[c]=f?f[1]:"[Anonymous]"}c=Vd[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return{message:a.message,name:a.name,lineNumber:a.lineNumber,fileName:a.fileName,stack:a.stack}}
function Ud(a,b){b||(b={});b[Wd(a)]=!0;var c=a.stack||"";(a=a.Pb)&&!b[Wd(a)]&&(c+="\nCaused by: ",a.stack&&0==a.stack.indexOf(a.toString())||(c+="string"===typeof a?a:a.message+"\n"),c+=Ud(a,b));return c}
function Wd(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var Vd={};var Xd=function(){if(!y.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{y.addEventListener("test",Ia,b),y.removeEventListener("test",Ia,b)}catch(c){}return a}();function Yd(a,b){Sd.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
Wa(Yd,Sd);var Zd={2:"touch",3:"pen",4:"mouse"};
Yd.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;if(b=a.relatedTarget){if(ic){a:{try{ec(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Zd[a.pointerType]||"";this.state=a.state;
this.i=a;a.defaultPrevented&&Yd.aa.preventDefault.call(this)};
Yd.prototype.stopPropagation=function(){Yd.aa.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
Yd.prototype.preventDefault=function(){Yd.aa.preventDefault.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var $d="closure_listenable_"+(1E6*Math.random()|0);var ae=0;function be(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.Na=e;this.key=++ae;this.Aa=this.Ja=!1}
function ce(a){a.Aa=!0;a.listener=null;a.proxy=null;a.src=null;a.Na=null}
;function de(a){this.src=a;this.listeners={};this.h=0}
de.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=ee(a,b,d,e);-1<g?(b=a[g],c||(b.Ja=!1)):(b=new be(b,this.src,f,!!d,e),b.Ja=c,a.push(b));return b};
de.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=ee(e,b,c,d);return-1<b?(ce(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.h--),!0):!1};
function fe(a,b){var c=b.type;c in a.listeners&&ib(a.listeners[c],b)&&(ce(b),0==a.listeners[c].length&&(delete a.listeners[c],a.h--))}
function ee(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Aa&&f.listener==b&&f.capture==!!c&&f.Na==d)return e}return-1}
;var ge="closure_lm_"+(1E6*Math.random()|0),he={},ie=0;function je(a,b,c,d,e){if(d&&d.once)ke(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)je(a,b[f],c,d,e);else c=le(c),a&&a[$d]?a.W(b,c,Ma(d)?!!d.capture:!!d,e):me(a,b,c,!1,d,e)}
function me(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=Ma(e)?!!e.capture:!!e,h=ne(a);h||(a[ge]=h=new de(a));c=h.add(b,c,d,g,f);if(!c.proxy){d=oe();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Xd||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(pe(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");ie++}}
function oe(){function a(c){return b.call(a.src,a.listener,c)}
var b=qe;return a}
function ke(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)ke(a,b[f],c,d,e);else c=le(c),a&&a[$d]?a.i.add(String(b),c,!0,Ma(d)?!!d.capture:!!d,e):me(a,b,c,!0,d,e)}
function re(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)re(a,b[f],c,d,e);else(d=Ma(d)?!!d.capture:!!d,c=le(c),a&&a[$d])?a.i.remove(String(b),c,d,e):a&&(a=ne(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=ee(b,c,d,e)),(c=-1<a?b[a]:null)&&se(c))}
function se(a){if("number"!==typeof a&&a&&!a.Aa){var b=a.src;if(b&&b[$d])fe(b.i,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(pe(c),d):b.addListener&&b.removeListener&&b.removeListener(d);ie--;(c=ne(b))?(fe(c,a),0==c.h&&(c.src=null,b[ge]=null)):ce(a)}}}
function pe(a){return a in he?he[a]:he[a]="on"+a}
function qe(a,b){if(a.Aa)a=!0;else{b=new Yd(b,this);var c=a.listener,d=a.Na||a.src;a.Ja&&se(a);a=c.call(d,b)}return a}
function ne(a){a=a[ge];return a instanceof de?a:null}
var te="__closure_events_fn_"+(1E9*Math.random()>>>0);function le(a){if("function"===typeof a)return a;a[te]||(a[te]=function(b){return a.handleEvent(b)});
return a[te]}
;function ue(){I.call(this);this.i=new de(this);this.Z=this;this.K=null}
Wa(ue,I);ue.prototype[$d]=!0;ue.prototype.addEventListener=function(a,b,c,d){je(this,a,b,c,d)};
ue.prototype.removeEventListener=function(a,b,c,d){re(this,a,b,c,d)};
function ve(a,b){var c=a.K;if(c){var d=[];for(var e=1;c;c=c.K)d.push(c),++e}a=a.Z;c=b.type||b;"string"===typeof b?b=new Sd(b,a):b instanceof Sd?b.target=b.target||a:(e=b,b=new Sd(c,a),ub(b,e));e=!0;if(d)for(var f=d.length-1;!b.j&&0<=f;f--){var g=b.h=d[f];e=we(g,c,!0,b)&&e}b.j||(g=b.h=a,e=we(g,c,!0,b)&&e,b.j||(e=we(g,c,!1,b)&&e));if(d)for(f=0;!b.j&&f<d.length;f++)g=b.h=d[f],e=we(g,c,!1,b)&&e}
ue.prototype.H=function(){ue.aa.H.call(this);if(this.i){var a=this.i,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,ce(d[e]);delete a.listeners[c];a.h--}}this.K=null};
ue.prototype.W=function(a,b,c,d){return this.i.add(String(a),b,!1,c,d)};
function we(a,b,c,d){b=a.i.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Aa&&g.capture==c){var h=g.listener,k=g.Na||g.src;g.Ja&&fe(a.i,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;function xe(a){var b,c;ue.call(this);var d=this;this.A=this.l=0;this.V=null!==a&&void 0!==a?a:{M:function(e,f){return setTimeout(e,f)},
U:clearTimeout};this.j=null!==(c=null===(b=window.navigator)||void 0===b?void 0:b.onLine)&&void 0!==c?c:!0;this.m=function(){return w(function(e){return v(e,ye(d),0)})};
window.addEventListener("offline",this.m);window.addEventListener("online",this.m);this.A||ze(this)}
r(xe,ue);xe.prototype.dispose=function(){window.removeEventListener("offline",this.m);window.removeEventListener("online",this.m);this.V.U(this.A);delete xe.h};
xe.prototype.G=function(){return this.j};
function ze(a){a.A=a.V.M(function(){var b;return w(function(c){if(1==c.h)return a.j?(null===(b=window.navigator)||void 0===b?0:b.onLine)?c.s(3):v(c,ye(a),3):v(c,ye(a),3);ze(a);c.h=0})},3E4)}
function ye(a,b){return a.u?a.u:a.u=new Promise(function(c){var d,e,f;return w(function(g){switch(g.h){case 1:return d=window.AbortController?new window.AbortController:void 0,e=null===d||void 0===d?void 0:d.signal,f=!1,sa(g,2,3),d&&(a.l=a.V.M(function(){d.abort()},b||2E4)),v(g,fetch("/generate_204",{method:"HEAD",
signal:e}),5);case 5:f=!0;case 3:va(g);a.u=void 0;a.l&&(a.V.U(a.l),a.l=0);f!==a.j&&(a.j=f,a.j?ve(a,"networkstatus-online"):ve(a,"networkstatus-offline"));c(f);wa(g);break;case 2:ua(g),f=!1,g.s(3)}})})}
;var Ae={Vn:"WEB_DISPLAY_MODE_UNKNOWN",Rn:"WEB_DISPLAY_MODE_BROWSER",Tn:"WEB_DISPLAY_MODE_MINIMAL_UI",Un:"WEB_DISPLAY_MODE_STANDALONE",Sn:"WEB_DISPLAY_MODE_FULLSCREEN"};function Be(){this.data_=[];this.h=-1}
Be.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.data_[a]!=b&&(this.data_[a]=b,this.h=-1)};
Be.prototype.get=function(a){return!!this.data_[a]};
function Ce(a){-1==a.h&&(a.h=fb(a.data_,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.h}
;function De(){var a={};this.B=function(b,c){return null!=a[b]?a[b]:c}}
;function Ee(a,b){this.j=a;this.l=b;this.i=0;this.h=null}
Ee.prototype.get=function(){if(0<this.i){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function Fe(a,b){a.l(b);100>a.i&&(a.i++,b.next=a.h,a.h=b)}
;var Ge;function He(){var a=y.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!E("Presto")&&(a=function(){var e=od("IFRAME");e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Ta(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!E("Trident")&&!E("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.ob;c.ob=null;e()}};
return function(e){d.next={ob:e};d=d.next;b.port2.postMessage(0)}}return function(e){y.setTimeout(e,0)}}
;function Ie(a){y.setTimeout(function(){throw a;},0)}
;function Je(){this.i=this.h=null}
Je.prototype.add=function(a,b){var c=Ke.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
Je.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var Ke=new Ee(function(){return new Le},function(a){return a.reset()});
function Le(){this.next=this.scope=this.h=null}
Le.prototype.set=function(a,b){this.h=a;this.scope=b;this.next=null};
Le.prototype.reset=function(){this.next=this.scope=this.h=null};function Me(a,b){Ne||Oe();Pe||(Ne(),Pe=!0);Qe.add(a,b)}
var Ne;function Oe(){if(y.Promise&&y.Promise.resolve){var a=y.Promise.resolve(void 0);Ne=function(){a.then(Re)}}else Ne=function(){var b=Re;
"function"!==typeof y.setImmediate||y.Window&&y.Window.prototype&&!E("Edge")&&y.Window.prototype.setImmediate==y.setImmediate?(Ge||(Ge=He()),Ge(b)):y.setImmediate(b)}}
var Pe=!1,Qe=new Je;function Re(){for(var a;a=Qe.remove();){try{a.h.call(a.scope)}catch(b){Ie(b)}Fe(Ke,a)}Pe=!1}
;function Se(a,b){this.h=a[y.Symbol.iterator]();this.i=b;this.j=0}
Se.prototype[Symbol.iterator]=function(){return this};
Se.prototype.next=function(){var a=this.h.next();return{value:a.done?void 0:this.i.call(void 0,a.value,this.j++),done:a.done}};
function Te(a,b){return new Se(a,b)}
;function Ue(){this.blockSize=-1}
;function Ve(){this.blockSize=-1;this.blockSize=64;this.h=[];this.o=[];this.m=[];this.j=[];this.j[0]=128;for(var a=1;a<this.blockSize;++a)this.j[a]=0;this.l=this.i=0;this.reset()}
Wa(Ve,Ue);Ve.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.l=this.i=0};
function We(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.h[0];c=a.h[1];var g=a.h[2],h=a.h[3],k=a.h[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var m=1518500249}else f=c^g^h,m=1859775393;else 60>e?(f=c&g|h&(c|g),m=2400959708):
(f=c^g^h,m=3395469782);f=(b<<5|b>>>27)+f+k+m+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+g&4294967295;a.h[3]=a.h[3]+h&4294967295;a.h[4]=a.h[4]+k&4294967295}
Ve.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.o,f=this.i;d<b;){if(0==f)for(;d<=c;)We(this,a,d),d+=this.blockSize;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.blockSize){We(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){We(this,e);f=0;break}}this.i=f;this.l+=b}};
Ve.prototype.digest=function(){var a=[],b=8*this.l;56>this.i?this.update(this.j,56-this.i):this.update(this.j,this.blockSize-(this.i-56));for(var c=this.blockSize-1;56<=c;c--)this.o[c]=b&255,b/=256;We(this,this.o);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.h[c]>>d&255,++b;return a};function Xe(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function Ye(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function Ze(a,b){a.classList?b=a.classList.contains(b):(a=a.classList?a.classList:Xe(a).match(/\S+/g)||[],b=0<=bb(a,b));return b}
function $e(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):Ze(a,"inverted-hdpi")&&Ye(a,Array.prototype.filter.call(a.classList?a.classList:Xe(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;var af="StopIteration"in y?y.StopIteration:{message:"StopIteration",stack:""};function bf(){}
bf.prototype.da=function(){throw af;};
bf.prototype.next=function(){return cf};
var cf={done:!0,value:void 0};function df(a){return{value:a,done:!1}}
function ef(a){if(a.done)throw af;return a.value}
bf.prototype.T=function(){return this};function ff(a){if(a instanceof gf||a instanceof hf||a instanceof jf)return a;if("function"==typeof a.da)return new gf(function(){return kf(a)});
if("function"==typeof a[Symbol.iterator])return new gf(function(){return a[Symbol.iterator]()});
if("function"==typeof a.T)return new gf(function(){return kf(a.T())});
throw Error("Not an iterator or iterable.");}
function kf(a){if(!(a instanceof bf))return a;var b=!1;return{next:function(){for(var c;!b;)try{c=a.da();break}catch(d){if(d!==af)throw d;b=!0}return{value:c,done:b}}}}
function gf(a){this.h=a}
gf.prototype.T=function(){return new hf(this.h())};
gf.prototype[Symbol.iterator]=function(){return new jf(this.h())};
gf.prototype.i=function(){return new jf(this.h())};
function hf(a){this.h=a}
r(hf,bf);hf.prototype.da=function(){var a=this.h.next();if(a.done)throw af;return a.value};
hf.prototype.next=function(){return this.h.next()};
hf.prototype[Symbol.iterator]=function(){return new jf(this.h)};
hf.prototype.i=function(){return new jf(this.h)};
function jf(a){gf.call(this,function(){return a});
this.j=a}
r(jf,gf);jf.prototype.next=function(){return this.j.next()};function lf(a,b){this.i={};this.h=[];this.ja=this.size=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof lf)for(c=a.ab(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
l=lf.prototype;l.ab=function(){mf(this);return this.h.concat()};
l.has=function(a){return nf(this.i,a)};
l.equals=function(a,b){if(this===a)return!0;if(this.size!=a.size)return!1;b=b||of;mf(this);for(var c,d=0;c=this.h[d];d++)if(!b(this.get(c),a.get(c)))return!1;return!0};
function of(a,b){return a===b}
l.isEmpty=function(){return 0==this.size};
l.clear=function(){this.i={};this.ja=this.size=this.h.length=0};
l.remove=function(a){return this.delete(a)};
l.delete=function(a){return nf(this.i,a)?(delete this.i[a],--this.size,this.ja++,this.h.length>2*this.size&&mf(this),!0):!1};
function mf(a){if(a.size!=a.h.length){for(var b=0,c=0;b<a.h.length;){var d=a.h[b];nf(a.i,d)&&(a.h[c++]=d);b++}a.h.length=c}if(a.size!=a.h.length){var e={};for(c=b=0;b<a.h.length;)d=a.h[b],nf(e,d)||(a.h[c++]=d,e[d]=1),b++;a.h.length=c}}
l.get=function(a,b){return nf(this.i,a)?this.i[a]:b};
l.set=function(a,b){nf(this.i,a)||(this.size+=1,this.h.push(a),this.ja++);this.i[a]=b};
l.forEach=function(a,b){for(var c=this.ab(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
l.clone=function(){return new lf(this)};
l.keys=function(){return ff(this.T(!0)).i()};
l.values=function(){return ff(this.T(!1)).i()};
l.entries=function(){var a=this;return Te(this.keys(),function(b){return[b,a.get(b)]})};
l.T=function(a){mf(this);var b=0,c=this.ja,d=this,e=new bf;e.next=function(){if(c!=d.ja)throw Error("The map has changed since the iterator was created");if(b>=d.h.length)return cf;var g=d.h[b++];return df(a?g:d.i[g])};
var f=e.next;e.da=function(){return ef(f.call(e))};
return e};
function nf(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
;function pf(a){qf();return Gb(a)}
var qf=Ia;function rf(a){var b=[];sf(new tf,a,b);return b.join("")}
function tf(){}
function sf(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),sf(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),uf(d,c),c.push(":"),sf(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":uf(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var vf={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\u000b"},wf=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function uf(a,b){b.push('"',a.replace(wf,function(c){var d=vf[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),vf[c]=d);return d}),'"')}
;function xf(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function yf(a){this.h=0;this.D=void 0;this.l=this.i=this.j=null;this.o=this.m=!1;if(a!=Ia)try{var b=this;a.call(void 0,function(c){zf(b,2,c)},function(c){zf(b,3,c)})}catch(c){zf(this,3,c)}}
function Af(){this.next=this.context=this.onRejected=this.i=this.h=null;this.j=!1}
Af.prototype.reset=function(){this.context=this.onRejected=this.i=this.h=null;this.j=!1};
var Bf=new Ee(function(){return new Af},function(a){a.reset()});
function Cf(a,b,c){var d=Bf.get();d.i=a;d.onRejected=b;d.context=c;return d}
function Df(a){return new yf(function(b,c){c(a)})}
yf.prototype.then=function(a,b,c){return Ef(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
yf.prototype.$goog_Thenable=!0;function Ff(a,b){return Ef(a,null,b,void 0)}
yf.prototype.cancel=function(a){if(0==this.h){var b=new Gf(a);Me(function(){Hf(this,b)},this)}};
function Hf(a,b){if(0==a.h)if(a.j){var c=a.j;if(c.i){for(var d=0,e=null,f=null,g=c.i;g&&(g.j||(d++,g.h==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.h&&1==d?Hf(c,b):(f?(d=f,d.next==c.l&&(c.l=d),d.next=d.next.next):If(c),Jf(c,e,3,b)))}a.j=null}else zf(a,3,b)}
function Kf(a,b){a.i||2!=a.h&&3!=a.h||Lf(a);a.l?a.l.next=b:a.i=b;a.l=b}
function Ef(a,b,c,d){var e=Cf(null,null,null);e.h=new yf(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(m){g(m)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Gf?g(h):f(k)}catch(m){g(m)}}:g});
e.h.j=a;Kf(a,e);return e.h}
yf.prototype.A=function(a){this.h=0;zf(this,2,a)};
yf.prototype.K=function(a){this.h=0;zf(this,3,a)};
function zf(a,b,c){if(0==a.h){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.h=1;a:{var d=c,e=a.A,f=a.K;if(d instanceof yf){Kf(d,Cf(e||Ia,f||null,a));var g=!0}else if(xf(d))d.then(e,f,a),g=!0;else{if(Ma(d))try{var h=d.then;if("function"===typeof h){Mf(d,h,e,f,a);g=!0;break a}}catch(k){f.call(a,k);g=!0;break a}g=!1}}g||(a.D=c,a.h=b,a.j=null,Lf(a),3!=b||c instanceof Gf||Nf(a,c))}}
function Mf(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Lf(a){a.m||(a.m=!0,Me(a.u,a))}
function If(a){var b=null;a.i&&(b=a.i,a.i=b.next,b.next=null);a.i||(a.l=null);return b}
yf.prototype.u=function(){for(var a;a=If(this);)Jf(this,a,this.h,this.D);this.m=!1};
function Jf(a,b,c,d){if(3==c&&b.onRejected&&!b.j)for(;a&&a.o;a=a.j)a.o=!1;if(b.h)b.h.j=null,Of(b,c,d);else try{b.j?b.i.call(b.context):Of(b,c,d)}catch(e){Pf.call(null,e)}Fe(Bf,b)}
function Of(a,b,c){2==b?a.i.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Nf(a,b){a.o=!0;Me(function(){a.o&&Pf.call(null,b)})}
var Pf=Ie;function Gf(a){Za.call(this,a)}
Wa(Gf,Za);Gf.prototype.name="cancel";function J(a){I.call(this);this.u=1;this.l=[];this.m=0;this.i=[];this.j={};this.A=!!a}
Wa(J,I);l=J.prototype;l.subscribe=function(a,b,c){var d=this.j[a];d||(d=this.j[a]=[]);var e=this.u;this.i[e]=a;this.i[e+1]=b;this.i[e+2]=c;this.u=e+3;d.push(e);return e};
function Qf(a,b,c,d){if(b=a.j[b]){var e=a.i;(b=b.find(function(f){return e[f+1]==c&&e[f+2]==d}))&&a.wa(b)}}
l.wa=function(a){var b=this.i[a];if(b){var c=this.j[b];0!=this.m?(this.l.push(a),this.i[a+1]=Ia):(c&&ib(c,a),delete this.i[a],delete this.i[a+1],delete this.i[a+2])}return!!b};
l.ka=function(a,b){var c=this.j[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.A)for(e=0;e<c.length;e++){var g=c[e];Rf(this.i[g+1],this.i[g+2],d)}else{this.m++;try{for(e=0,f=c.length;e<f&&!this.h();e++)g=c[e],this.i[g+1].apply(this.i[g+2],d)}finally{if(this.m--,0<this.l.length&&0==this.m)for(;c=this.l.pop();)this.wa(c)}}return 0!=e}return!1};
function Rf(a,b,c){Me(function(){a.apply(b,c)})}
l.clear=function(a){if(a){var b=this.j[a];b&&(b.forEach(this.wa,this),delete this.j[a])}else this.i.length=0,this.j={}};
l.H=function(){J.aa.H.call(this);this.clear();this.l.length=0};function Sf(a){this.h=a}
Sf.prototype.set=function(a,b){void 0===b?this.h.remove(a):this.h.set(a,rf(b))};
Sf.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Sf.prototype.remove=function(a){this.h.remove(a)};function Tf(a){this.h=a}
Wa(Tf,Sf);function Uf(a){this.data=a}
function Vf(a){return void 0===a||a instanceof Uf?a:new Uf(a)}
Tf.prototype.set=function(a,b){Tf.aa.set.call(this,a,Vf(b))};
Tf.prototype.i=function(a){a=Tf.aa.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Tf.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Wf(a){this.h=a}
Wa(Wf,Tf);Wf.prototype.set=function(a,b,c){if(b=Vf(b)){if(c){if(c<Date.now()){Wf.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}Wf.aa.set.call(this,a,b)};
Wf.prototype.i=function(a){var b=Wf.aa.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())Wf.prototype.remove.call(this,a);else return b}};function Xf(){}
;function Yf(){}
Wa(Yf,Xf);Yf.prototype[Symbol.iterator]=function(){return ff(this.T(!0)).i()};
Yf.prototype.clear=function(){var a=Array.from(this);a=q(a);for(var b=a.next();!b.done;b=a.next())this.remove(b.value)};function Zf(a){this.h=a}
Wa(Zf,Yf);l=Zf.prototype;l.isAvailable=function(){if(!this.h)return!1;try{return this.h.setItem("__sak","1"),this.h.removeItem("__sak"),!0}catch(a){return!1}};
l.set=function(a,b){try{this.h.setItem(a,b)}catch(c){if(0==this.h.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
l.get=function(a){a=this.h.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
l.remove=function(a){this.h.removeItem(a)};
l.T=function(a){var b=0,c=this.h,d=new bf;d.next=function(){if(b>=c.length)return cf;var f=c.key(b++);if(a)return df(f);f=c.getItem(f);if("string"!==typeof f)throw"Storage mechanism: Invalid value was encountered";return df(f)};
var e=d.next;d.da=function(){return ef(e.call(d))};
return d};
l.clear=function(){this.h.clear()};
l.key=function(a){return this.h.key(a)};function $f(){var a=null;try{a=window.localStorage||null}catch(b){}this.h=a}
Wa($f,Zf);function ag(a,b){this.i=a;this.h=null;var c;if(c=gc)c=!(9<=Number(tc));if(c){bg||(bg=new lf);this.h=bg.get(a);this.h||(b?this.h=document.getElementById(b):(this.h=document.createElement("userdata"),this.h.addBehavior("#default#userData"),document.body.appendChild(this.h)),bg.set(a,this.h));try{this.h.load(this.i)}catch(d){this.h=null}}}
Wa(ag,Yf);var cg={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},bg=null;function dg(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return cg[b]})}
l=ag.prototype;l.isAvailable=function(){return!!this.h};
l.set=function(a,b){this.h.setAttribute(dg(a),b);eg(this)};
l.get=function(a){a=this.h.getAttribute(dg(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
l.remove=function(a){this.h.removeAttribute(dg(a));eg(this)};
l.T=function(a){var b=0,c=this.h.XMLDocument.documentElement.attributes,d=new bf;d.next=function(){if(b>=c.length)return cf;var f=c[b++];if(a)return df(decodeURIComponent(f.nodeName.replace(/\./g,"%")).substr(1));f=f.nodeValue;if("string"!==typeof f)throw"Storage mechanism: Invalid value was encountered";return df(f)};
var e=d.next;d.da=function(){return ef(e.call(d))};
return d};
l.clear=function(){for(var a=this.h.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);eg(this)};
function eg(a){try{a.h.save(a.i)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function fg(a,b){this.i=a;this.h=b+"::"}
Wa(fg,Yf);fg.prototype.set=function(a,b){this.i.set(this.h+a,b)};
fg.prototype.get=function(a){return this.i.get(this.h+a)};
fg.prototype.remove=function(a){this.i.remove(this.h+a)};
fg.prototype.T=function(a){var b=this.i.T(!0),c=this,d=new bf;d.next=function(){try{var f=b.da()}catch(g){if(g===af)return cf;throw g;}for(;f.substr(0,c.h.length)!=c.h;)try{f=b.da()}catch(g){if(g===af)return cf;throw g;}return df(a?f.substr(c.h.length):c.i.get(f))};
var e=d.next;d.da=function(){return ef(e.call(d))};
return d};function gg(a){H.call(this,a)}
r(gg,H);gg.prototype.getKey=function(){return Hc(this,1)};
gg.prototype.getValue=function(){return Hc(this,2===Kc(this,hg)?2:-1)};
gg.prototype.setValue=function(a){return Jc(this,2,hg,a)};
var hg=[2,3,4,5,6];function ig(a){H.call(this,a)}
r(ig,H);function jg(a){H.call(this,a)}
r(jg,H);function kg(a){H.call(this,a)}
r(kg,H);function lg(a){H.call(this,a,-1,mg)}
r(lg,H);lg.prototype.getPlayerType=function(){return Hc(this,36)};
lg.prototype.setHomeGroupInfo=function(a){return G(this,81,a)};
var mg=[9,66,24,32,86,100,101];function ng(a){H.call(this,a,-1,og)}
r(ng,H);var og=[15,26,28];function pg(a){H.call(this,a)}
r(pg,H);pg.prototype.setToken=function(a){return F(this,2,a)};function qg(a){H.call(this,a,-1,rg)}
r(qg,H);qg.prototype.setSafetyMode=function(a){return F(this,5,a)};
var rg=[12];function sg(a){H.call(this,a,-1,tg)}
r(sg,H);var tg=[12];function ug(a){H.call(this,a)}
r(ug,H);var vg={rh:0,bh:1,ih:2,jh:4,oh:8,kh:16,lh:32,qh:64,ph:128,eh:256,gh:512,nh:1024,fh:2048,hh:4096,dh:8192,mh:16384};function wg(a){H.call(this,a)}
r(wg,H);function xg(a,b){G(a,1,b)}
wg.prototype.Y=function(a){F(this,2,a)};
function yg(a){H.call(this,a)}
r(yg,H);function zg(a,b){G(a,1,b)}
;function Ag(a){H.call(this,a,-1,Bg)}
r(Ag,H);Ag.prototype.Y=function(a){F(this,1,a)};
function Cg(a,b){G(a,2,b)}
var Bg=[3];function Dg(a){H.call(this,a)}
r(Dg,H);Dg.prototype.Y=function(a){F(this,1,a)};function Eg(a){H.call(this,a)}
r(Eg,H);Eg.prototype.Y=function(a){F(this,1,a)};function Fg(a){H.call(this,a)}
r(Fg,H);Fg.prototype.Y=function(a){F(this,1,a)};function Gg(a){H.call(this,a)}
r(Gg,H);function Hg(a){H.call(this,a)}
r(Hg,H);function Ig(a){H.call(this,a,-1,Jg)}
r(Ig,H);Ig.prototype.getPlayerType=function(){var a=Hc(this,7);return null==a?0:a};
Ig.prototype.setVideoId=function(a){return F(this,19,a)};
function Kg(a){H.call(this,a)}
r(Kg,H);Kg.prototype.getId=function(){var a=Hc(this,2);return null==a?"":a};
var Jg=[83,68];function Lg(a){H.call(this,a)}
r(Lg,H);function Mg(a){H.call(this,a)}
r(Mg,H);function Ng(a){H.call(this,a)}
r(Ng,H);function Og(a){H.call(this,a,424)}
r(Og,H);
var Oc=[23,24,11,6,7,5,2,3,20,21,28,32,37,229,241,45,59,225,288,72,73,78,208,156,202,215,74,76,79,80,111,85,91,97,100,102,105,119,126,127,136,146,157,158,159,163,164,168,176,222,383,177,178,179,411,184,188,189,190,191,193,194,195,196,198,199,200,201,203,204,205,206,258,259,260,261,209,226,227,232,233,234,240,247,248,251,254,255,270,278,291,293,300,304,308,309,310,311,313,314,319,321,323,324,328,330,331,332,337,338,340,344,348,350,351,352,353,354,355,356,357,358,361,363,364,368,369,370,373,374,375,
378,380,381,388,389,403,412,413,414,415,416,417,418,419,420,423,117];function Pg(a){H.call(this,a)}
r(Pg,H);function Qg(a){H.call(this,a)}
r(Qg,H);Qg.prototype.setVideoId=function(a){return Jc(this,1,Rg,a)};
Qg.prototype.getPlaylistId=function(){return Hc(this,2===Kc(this,Rg)?2:-1)};
var Rg=[1,2];function Sg(a){H.call(this,a,-1,Tg)}
r(Sg,H);var Tg=[3];function Ug(a){H.call(this,a,1)}
r(Ug,H);function Vg(a){H.call(this,a)}
r(Vg,H);var Wg;Wg=new function(a,b,c,d){this.h=a;this.fieldName=b;this.isRepeated=d;this.i=ad}(406606992,{so:0},Vg,0);function Xg(){Vg.apply(this,arguments)}
r(Xg,Vg);function Yg(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;var Zg,$g,ah,bh=y.window,ch=(null===(Zg=null===bh||void 0===bh?void 0:bh.yt)||void 0===Zg?void 0:Zg.config_)||(null===($g=null===bh||void 0===bh?void 0:bh.ytcfg)||void 0===$g?void 0:$g.data_)||{},dh=(null===(ah=null===bh||void 0===bh?void 0:bh.ytcfg)||void 0===ah?void 0:ah.obfuscatedData_)||[];function eh(){Ug.apply(this,arguments)}
r(eh,Ug);var fh=new eh(dh),gh=ch.EXPERIMENT_FLAGS;if(!gh||!gh.jspb_i18n_extension){var hh=new Xg;Wg.i(fh,hh)}z("yt.config_",ch,void 0);z("yt.configJspb_",dh,void 0);function ih(){Yg(ch,arguments)}
function B(a,b){return a in ch?ch[a]:b}
function jh(a){return B(a,void 0)}
;function L(a){a=kh(a);return"string"===typeof a&&"false"===a?!1:!!a}
function lh(a,b){a=kh(a);return void 0===a&&void 0!==b?b:Number(a||0)}
function mh(){return B("EXPERIMENTS_TOKEN","")}
function kh(a){var b=B("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:B("EXPERIMENT_FLAGS",{})[a]}
function nh(){var a=[],b=B("EXPERIMENTS_FORCED_FLAGS",{});for(c in b)a.push({key:c,value:String(b[c])});var c=B("EXPERIMENT_FLAGS",{});for(var d in c)d.startsWith("force_")&&void 0===b[d]&&a.push({key:d,value:String(c[d])});return a}
;var oh={appSettingsCaptured:!0,visualElementAttached:!0,visualElementGestured:!0,visualElementHidden:!0,visualElementShown:!0,flowEvent:!0,visualElementStateChanged:!0,playbackAssociated:!0,youThere:!0,accountStateChangeSignedIn:!0,accountStateChangeSignedOut:!0},ph={latencyActionBaselined:!0,latencyActionInfo:!0,latencyActionTicked:!0,bedrockRepetitiveActionTimed:!0,adsClientStateChange:!0,streamzIncremented:!0,mdxDialAdditionalDataUpdateEvent:!0,tvhtml5WatchKeyEvent:!0,tvhtml5VideoSeek:!0,tokenRefreshEvent:!0,
adNotify:!0,adNotifyFilled:!0,tvhtml5LaunchUrlComponentChanged:!0,bedrockResourceConsumptionSnapshot:!0,deviceStartupMetrics:!0,mdxSignIn:!0,tvhtml5KeyboardLogging:!0,tvhtml5StartupSoundEvent:!0,tvhtml5LiveChatStatus:!0,tvhtml5DeviceStorageStatus:!0,tvhtml5LocalStorage:!0,directSignInEvent:!0,finalPayload:!0,tvhtml5SearchCompleted:!0,tvhtml5KeyboardPerformance:!0,adNotifyFailure:!0,latencyActionSpan:!0,tvhtml5AccountDialogOpened:!0,tvhtml5ApiTest:!0};var qh=0,rh=jc?"webkit":ic?"moz":gc?"ms":fc?"o":"";z("ytDomDomGetNextId",A("ytDomDomGetNextId")||function(){return++qh},void 0);var sh=[];function th(a){sh.forEach(function(b){return b(a)})}
function uh(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){vh(b)}}:a}
function vh(a,b,c,d){var e=A("yt.logging.errors.log");e?e(a,"ERROR",b,c,d):(e=B("ERRORS",[]),e.push([a,"ERROR",b,c,d]),ih("ERRORS",e));th(a)}
function wh(a,b,c,d){var e=A("yt.logging.errors.log");e?e(a,"WARNING",b,c,d):(e=B("ERRORS",[]),e.push([a,"WARNING",b,c,d]),ih("ERRORS",e))}
;var xh={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function yh(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.rotation=this.clientY=this.clientX=0;this.scale=1;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in xh||(this[b]=a[b]);this.scale=a.scale;this.rotation=a.rotation;var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;
if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.h=a.pageX;this.i=a.pageY}}catch(e){}}
function zh(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.h=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.i=a.clientY+b}}
yh.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
yh.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
yh.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var mb=y.ytEventsEventsListeners||{};z("ytEventsEventsListeners",mb,void 0);var Ah=y.ytEventsEventsCounter||{count:0};z("ytEventsEventsCounter",Ah,void 0);
function Bh(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return lb(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=Ma(e[4])&&Ma(d)&&qb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
var Ch=ab(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function Dh(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=Bh(a,b,c,d);if(e)return e;e=++Ah.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new yh(h);if(!pd(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new yh(h);
h.currentTarget=a;return c.call(a,h)};
g=uh(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Ch()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);mb[e]=[a,b,c,g,d];return e}
function Eh(a){a&&("string"==typeof a&&(a=[a]),cb(a,function(b){if(b in mb){var c=mb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Ch()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete mb[b]}}))}
;var Fh=window.ytcsi&&window.ytcsi.now?window.ytcsi.now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function Gh(a,b){"function"===typeof a&&(a=uh(a));return window.setTimeout(a,b)}
function Hh(a){window.clearTimeout(a)}
;function Ih(a){this.K=a;this.i=null;this.m=0;this.A=null;this.u=0;this.j=[];for(a=0;4>a;a++)this.j.push(0);this.l=0;this.S=Dh(window,"mousemove",Ta(this.Z,this));a=Ta(this.L,this);"function"===typeof a&&(a=uh(a));this.ga=window.setInterval(a,25)}
Wa(Ih,I);Ih.prototype.Z=function(a){void 0===a.h&&zh(a);var b=a.h;void 0===a.i&&zh(a);this.i=new ld(b,a.i)};
Ih.prototype.L=function(){if(this.i){var a=Fh();if(0!=this.m){var b=this.A,c=this.i,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.m);this.j[this.l]=.5<Math.abs((d-this.u)/this.u)?1:0;for(c=b=0;4>c;c++)b+=this.j[c]||0;3<=b&&this.K();this.u=d}this.m=a;this.A=this.i;this.l=(this.l+1)%4}};
Ih.prototype.H=function(){window.clearInterval(this.ga);Eh(this.S)};function Jh(){}
function Kh(a,b){return Lh(a,0,b)}
Jh.prototype.M=function(a,b){return Lh(a,1,b)};
function Mh(a,b){Lh(a,2,b)}
function Nh(a){var b=A("yt.scheduler.instance.addImmediateJob");b?b(a):a()}
;function Oh(){Jh.apply(this,arguments)}
r(Oh,Jh);function Ph(){Oh.h||(Oh.h=new Oh);return Oh.h}
function Lh(a,b,c){void 0!==c&&Number.isNaN(Number(c))&&(c=void 0);var d=A("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):Gh(a,c||0)}
Oh.prototype.U=function(a){if(void 0===a||!Number.isNaN(Number(a))){var b=A("yt.scheduler.instance.cancelJob");b?b(a):Hh(a)}};
Oh.prototype.start=function(){var a=A("yt.scheduler.instance.start");a&&a()};
Oh.prototype.pause=function(){var a=A("yt.scheduler.instance.pause");a&&a()};var Qh=Ph();var Rh={};
function Sh(a){var b=void 0===a?{}:a;a=void 0===b.fc?!1:b.fc;b=void 0===b.Ub?!0:b.Ub;if(null==A("_lact",window)){var c=parseInt(B("LACT"),10);c=isFinite(c)?Date.now()-Math.max(c,0):-1;z("_lact",c,window);z("_fact",c,window);-1==c&&Th();Dh(document,"keydown",Th);Dh(document,"keyup",Th);Dh(document,"mousedown",Th);Dh(document,"mouseup",Th);a?Dh(window,"touchmove",function(){Uh("touchmove",200)},{passive:!0}):(Dh(window,"resize",function(){Uh("resize",200)}),b&&Dh(window,"scroll",function(){Uh("scroll",200)}));
new Ih(function(){Uh("mouse",100)});
Dh(document,"touchstart",Th,{passive:!0});Dh(document,"touchend",Th,{passive:!0})}}
function Uh(a,b){Rh[a]||(Rh[a]=!0,Qh.M(function(){Th();Rh[a]=!1},b))}
function Th(){null==A("_lact",window)&&Sh();var a=Date.now();z("_lact",a,window);-1==A("_fact",window)&&z("_fact",a,window);(a=A("ytglobal.ytUtilActivityCallback_"))&&a()}
function Vh(){var a=A("_lact",window);return null==a?-1:Math.max(Date.now()-a,0)}
;function Wh(){var a=Xh;A("yt.ads.biscotti.getId_")||z("yt.ads.biscotti.getId_",a,void 0)}
function Yh(a){z("yt.ads.biscotti.lastId_",a,void 0)}
;var Zh=/^[\w.]*$/,$h={q:!0,search_query:!0};function ai(a,b){b=a.split(b);for(var c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(1==f.length&&f[0]||2==f.length)try{var g=bi(f[0]||""),h=bi(f[1]||"");g in c?Array.isArray(c[g])?jb(c[g],h):c[g]=[c[g],h]:c[g]=h}catch(t){var k=t,m=f[0],n=String(ai);k.args=[{key:m,value:f[1],query:a,method:ci==n?"unchanged":n}];$h.hasOwnProperty(m)||wh(k)}}return c}
var ci=String(ai);function di(a){var b=[];kb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];cb(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function ei(a){"?"==a.charAt(0)&&(a=a.substr(1));return ai(a,"&")}
function fi(a){return-1!=a.indexOf("?")?(a=(a||"").split("#")[0],a=a.split("?",2),ei(1<a.length?a[1]:a[0])):{}}
function gi(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=ei(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return bc(a,e)+d}
function hi(a){if(!b)var b=window.location.href;var c=a.match(Wb)[1]||null,d=Yb(a);c&&d?(a=a.match(Wb),b=b.match(Wb),a=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4]):a=d?Yb(b)==d&&(Number(b.match(Wb)[4]||null)||null)==(Number(a.match(Wb)[4]||null)||null):!0;return a}
function bi(a){return a&&a.match(Zh)?a:decodeURIComponent(a.replace(/\+/g," "))}
;function ii(a){var b=ji;a=void 0===a?A("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=Ad;e.flash="0";a:{try{var f=b.h.top.location.href}catch(hb){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);try{e.u_tz=-(new Date).getTimezoneOffset();var g=void 0===g?ed:g;try{var h=g.history.length}catch(hb){h=0}e.u_his=h;var k;e.u_h=null==(k=ed.screen)?void 0:k.height;var m;e.u_w=null==(m=ed.screen)?void 0:m.width;var n;e.u_ah=null==(n=ed.screen)?void 0:n.availHeight;var t;e.u_aw=
null==(t=ed.screen)?void 0:t.availWidth;var x;e.u_cd=null==(x=ed.screen)?void 0:x.colorDepth}catch(hb){}h=b.h;try{var u=h.screenX;var C=h.screenY}catch(hb){}try{var D=h.outerWidth;var K=h.outerHeight}catch(hb){}try{var N=h.innerWidth;var S=h.innerHeight}catch(hb){}try{var W=h.screenLeft;var Qa=h.screenTop}catch(hb){}try{N=h.innerWidth,S=h.innerHeight}catch(hb){}try{var zb=h.screen.availWidth;var P=h.screen.availTop}catch(hb){}u=[W,Qa,u,C,zb,P,D,K,N,S];try{var Y=(b.h.top||window).document,fa="CSS1Compat"==
Y.compatMode?Y.documentElement:Y.body;var Ya=(new md(fa.clientWidth,fa.clientHeight)).round()}catch(hb){Ya=new md(-12245933,-12245933)}Y=Ya;Ya={};fa=new Be;y.SVGElement&&y.document.createElementNS&&fa.set(0);C=ud();C["allow-top-navigation-by-user-activation"]&&fa.set(1);C["allow-popups-to-escape-sandbox"]&&fa.set(2);y.crypto&&y.crypto.subtle&&fa.set(3);y.TextDecoder&&y.TextEncoder&&fa.set(4);fa=Ce(fa);Ya.bc=fa;Ya.bih=Y.height;Ya.biw=Y.width;Ya.brdim=u.join();b=b.i;Y="ma";De.ma&&De.hasOwnProperty(Y)?
Y=De.ma:(fa=new De,De.ma=fa,De.hasOwnProperty(Y),Y=fa);b=(Ya.vis=Y.B(Bd.flag,Bd.defaultValue)&&b.prerendering?3:{visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,Ya.wgl=!!ed.WebGLRenderingContext,Ya);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var ji=new function(){var a=window.document;this.h=window;this.i=a};
z("yt.ads_.signals_.getAdSignalsString",function(a){return di(ii(a))},void 0);Date.now();var ki="XMLHttpRequest"in y?function(){return new XMLHttpRequest}:null;
function li(){if(!ki)return null;var a=ki();return"open"in a?a:null}
function mi(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;var ni={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL",
"X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},oi="app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(ha("client_dev_mss_url client_dev_regex_map client_dev_root_url client_rollout_override expflag jsfeat jsmode mods".split(" "))),pi=!1;
function qi(a,b){b=void 0===b?{}:b;var c=hi(a),d=L("web_ajax_ignore_global_headers_if_set"),e;for(e in ni){var f=B(ni[e]);!f||!c&&Yb(a)||d&&void 0!==b[e]||(b[e]=f)}if(c||!Yb(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(c||!Yb(a)){try{var g=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(h){}g&&(b["X-YouTube-Time-Zone"]=g)}if(c||!Yb(a))b["X-YouTube-Ad-Signals"]=di(ii(void 0));return b}
function ri(a){var b=window.location.search,c=Yb(a);L("debug_handle_relative_url_for_query_forward_killswitch")||c||!hi(a)||(c=document.location.hostname);var d=Xb(a.match(Wb)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=ei(b),f={};cb(oi,function(g){e[g]&&(f[g]=e[g])});
return gi(a,f||{},!1)}
function si(a,b){var c=b.format||"JSON";a=ti(a,b);var d=ui(a,b),e=!1,f=vi(a,function(k){if(!e){e=!0;h&&Hh(h);var m=mi(k),n=null,t=400<=k.status&&500>k.status,x=500<=k.status&&600>k.status;if(m||t||x)n=wi(a,c,k,b.convertToSafeHtml);if(m)a:if(k&&204==k.status)m=!0;else{switch(c){case "XML":m=0==parseInt(n&&n.return_code,10);break a;case "RAW":m=!0;break a}m=!!n}n=n||{};t=b.context||y;m?b.onSuccess&&b.onSuccess.call(t,k,n):b.onError&&b.onError.call(t,k,n);b.onFinish&&b.onFinish.call(t,k,n)}},b.method,
d,b.headers,b.responseType,b.withCredentials);
if(b.onTimeout&&0<b.timeout){var g=b.onTimeout;var h=Gh(function(){e||(e=!0,f.abort(),Hh(h),g.call(b.context||y,f))},b.timeout)}return f}
function ti(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=B("XSRF_FIELD_NAME",void 0);if(b=b.urlParams)b[c]&&delete b[c],a=gi(a,b||{},!0);return a}
function ui(a,b){var c=B("XSRF_FIELD_NAME",void 0),d=B("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.postParams,g=jh("XSRF_FIELD_NAME"),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||Yb(a)&&!b.withCredentials&&Yb(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=ei(e),ub(e,f),e=b.postBodyFormat&&"JSON"==b.postBodyFormat?JSON.stringify(e):ac(e));f=e||f&&!nb(f);!pi&&f&&"POST"!=
b.method&&(pi=!0,vh(Error("AJAX request with postData should use POST")));return e}
function wi(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,wh(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(")]}'\n"===f.substring(0,5)&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?xi(a):null)e={},cb(a.getElementsByTagName("*"),function(g){e[g.tagName]=yi(g)})}d&&zi(e);
return e}
function zi(a){if(Ma(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;Ab("HTML that is escaped and sanitized server-side and passed through yt.net.ajax");var d=a[b],e=wb();d=e?e.createHTML(d):d;a[c]=new Pb(d)}else zi(a[b])}}
function xi(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function yi(a){var b="";cb(a.childNodes,function(c){b+=c.nodeValue});
return b}
function vi(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&uh(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=li();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;L("debug_forward_web_query_parameters")&&(a=ri(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=qi(a,e))for(var m in e)k.setRequestHeader(m,e[m]),"content-type"==m.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var Ai=y.ytPubsubPubsubInstance||new J,Bi=y.ytPubsubPubsubSubscribedKeys||{},Ci=y.ytPubsubPubsubTopicToKeys||{},Di=y.ytPubsubPubsubIsSynchronous||{};function Ei(a,b){var c=Fi();if(c&&b){var d=c.subscribe(a,function(){var e=arguments;var f=function(){Bi[d]&&b.apply&&"function"==typeof b.apply&&b.apply(window,e)};
try{Di[a]?f():Gh(f,0)}catch(g){vh(g)}},void 0);
Bi[d]=!0;Ci[a]||(Ci[a]=[]);Ci[a].push(d);return d}return 0}
function Gi(a){var b=Fi();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),cb(a,function(c){b.unsubscribeByKey(c);delete Bi[c]}))}
function Hi(a,b){var c=Fi();c&&c.publish.apply(c,arguments)}
function Ii(a){var b=Fi();if(b)if(b.clear(a),a)Ji(a);else for(var c in Ci)Ji(c)}
function Fi(){return y.ytPubsubPubsubInstance}
function Ji(a){Ci[a]&&(a=Ci[a],cb(a,function(b){Bi[b]&&delete Bi[b]}),a.length=0)}
J.prototype.subscribe=J.prototype.subscribe;J.prototype.unsubscribeByKey=J.prototype.wa;J.prototype.publish=J.prototype.ka;J.prototype.clear=J.prototype.clear;z("ytPubsubPubsubInstance",Ai,void 0);z("ytPubsubPubsubTopicToKeys",Ci,void 0);z("ytPubsubPubsubIsSynchronous",Di,void 0);z("ytPubsubPubsubSubscribedKeys",Bi,void 0);var Ki=window,M=Ki.ytcsi&&Ki.ytcsi.now?Ki.ytcsi.now:Ki.performance&&Ki.performance.timing&&Ki.performance.now&&Ki.performance.timing.navigationStart?function(){return Ki.performance.timing.navigationStart+Ki.performance.now()}:function(){return(new Date).getTime()};var Li=lh("initial_gel_batch_timeout",2E3),Mi=Math.pow(2,16)-1,Ni=void 0;function Oi(){this.j=this.h=this.i=0}
var Pi=new Oi,Qi=new Oi,Ri=!0,Si=y.ytLoggingTransportGELQueue_||new Map;z("ytLoggingTransportGELQueue_",Si,void 0);var Ti=y.ytLoggingTransportGELProtoQueue_||new Map;z("ytLoggingTransportGELProtoQueue_",Ti,void 0);var Ui=y.ytLoggingTransportTokensToCttTargetIds_||{};z("ytLoggingTransportTokensToCttTargetIds_",Ui,void 0);var Vi=y.ytLoggingTransportTokensToJspbCttTargetIds_||{};z("ytLoggingTransportTokensToJspbCttTargetIds_",Vi,void 0);
function Wi(a,b){if("log_event"===a.endpoint){var c=Xi(a),d=Si.get(c)||[];Si.set(c,d);d.push(a.payload);Yi(b,d,c)}}
function Zi(a,b){if("log_event"===a.endpoint){var c=Xi(a,!0),d=Ti.get(c)||[];Ti.set(c,d);d.push(a.payload);Yi(b,d,c,!0)}}
function Yi(a,b,c,d){d=void 0===d?!1:d;a&&(Ni=new a);a=lh("tvhtml5_logging_max_batch")||lh("web_logging_max_batch")||100;var e=M(),f=d?Qi.j:Pi.j;b.length>=a?$i({writeThenSend:!0},L("flush_only_full_queue")?c:void 0,d):10<=e-f&&(aj(d),d?Qi.j=e:Pi.j=e)}
function bj(a,b){if("log_event"===a.endpoint){var c=Xi(a),d=new Map;d.set(c,[a.payload]);b&&(Ni=new b);return new yf(function(e){Ni&&Ni.isReady()?cj(d,e,{bypassNetworkless:!0},!0):e()})}}
function dj(a,b){if("log_event"===a.endpoint){var c=Xi(a,!0),d=new Map;d.set(c,[a.payload]);b&&(Ni=new b);return new yf(function(e){Ni&&Ni.isReady()?ej(d,e,{bypassNetworkless:!0},!0):e()})}}
function Xi(a,b){var c="";if(a.xa)c="visitorOnlyApprovedKey";else if(a.cttAuthInfo){if(void 0===b?0:b){b=a.cttAuthInfo.token;c=a.cttAuthInfo;var d=new Qg;c.videoId?d.setVideoId(c.videoId):c.playlistId&&Jc(d,2,Rg,c.playlistId);Vi[b]=d}else b=a.cttAuthInfo,c={},b.videoId?c.videoId=b.videoId:b.playlistId&&(c.playlistId=b.playlistId),Ui[a.cttAuthInfo.token]=c;c=a.cttAuthInfo.token}return c}
function $i(a,b,c){a=void 0===a?{}:a;c=void 0===c?!1:c;new yf(function(d){c?(Hh(Qi.i),Hh(Qi.h),Qi.h=0):(Hh(Pi.i),Hh(Pi.h),Pi.h=0);if(Ni&&Ni.isReady())if(void 0!==b)if(c){var e=new Map,f=Ti.get(b)||[];e.set(b,f);ej(e,d,a);Ti.delete(b)}else e=new Map,f=Si.get(b)||[],e.set(b,f),cj(e,d,a),Si.delete(b);else c?(ej(Ti,d,a),Ti.clear()):(cj(Si,d,a),Si.clear());else aj(c),d()})}
function aj(a){a=void 0===a?!1:a;if(L("web_gel_timeout_cap")&&(!a&&!Pi.h||a&&!Qi.h)){var b=Gh(function(){$i({writeThenSend:!0},void 0,a)},6E4);
a?Qi.h=b:Pi.h=b}Hh(a?Qi.i:Pi.i);b=B("LOGGING_BATCH_TIMEOUT",lh("web_gel_debounce_ms",1E4));L("shorten_initial_gel_batch_timeout")&&Ri&&(b=Li);b=Gh(function(){$i({writeThenSend:!0},void 0,a)},b);
a?Qi.i=b:Pi.i=b}
function cj(a,b,c,d){var e=Ni;c=void 0===c?{}:c;var f=Math.round(M()),g=a.size;a=q(a);for(var h=a.next();!h.done;h=a.next()){var k=q(h.value);h=k.next().value;var m=k=k.next().value;k=sb({context:fj(e.config_||gj())});k.events=m;(m=Ui[h])&&hj(k,h,m);delete Ui[h];h="visitorOnlyApprovedKey"===h;ij(k,f,h);jj(c);kj(e,"log_event",k,lj(c,h,function(){g--;g||b()},function(){g--;
g||b()},d));
Ri=!1}}
function ej(a,b,c,d){var e=Ni;c=void 0===c?{}:c;var f=Math.round(M()),g=a.size;a=q(a);for(var h=a.next();!h.done;h=a.next()){var k=q(h.value);h=k.next().value;var m=k=k.next().value;k=new Sg;var n=mj(e.config_||gj());G(k,1,n);for(n=0;n<m.length;n++)Pc(k,3,Og,m[n]);(m=Vi[h])&&nj(k,h,m);delete Vi[h];h="visitorOnlyApprovedKey"===h;oj(k,f,h);jj(c);a:{Ec=!0;try{var t=JSON.stringify(k.toJSON(),Yc);break a}finally{Ec=!1}t=void 0}k=t;h=lj(c,h,function(){g--;g||b()},function(){g--;
g||b()},d);
h.headers={"Content-Type":"application/json+protobuf"};h.postBodyFormat="JSPB";h.postBody=k;kj(e,"log_event","",h);Ri=!1}}
function jj(a){L("always_send_and_write")&&(a.writeThenSend=!1)}
function lj(a,b,c,d,e){return{retry:!0,onSuccess:c,onError:d,Bb:a,xa:b,po:!!e,headers:{},postBodyFormat:"",postBody:""}}
function ij(a,b,c){a.requestTimeMs=String(b);L("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);!c&&(b=B("EVENT_ID",void 0))&&(c=pj(),a.serializedClientEventId={serializedEventId:b,clientCounter:String(c)})}
function oj(a,b,c){F(a,2,b);if(!c&&(b=B("EVENT_ID",void 0))){c=pj();var d=new Pg;F(d,1,b);F(d,2,c);G(a,5,d)}}
function pj(){var a=B("BATCH_CLIENT_COUNTER",void 0)||0;a||(a=Math.floor(Math.random()*Mi/2));a++;a>Mi&&(a=1);ih("BATCH_CLIENT_COUNTER",a);return a}
function hj(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
function nj(a,b,c){if(Hc(c,1===Kc(c,Rg)?1:-1))var d=1;else if(c.getPlaylistId())d=2;else return;G(a,4,c);a=Lc(a,sg,1)||new sg;c=Lc(a,qg,3)||new qg;var e=new pg;e.setToken(b);F(e,1,d);Pc(c,12,pg,e);G(a,3,c)}
;var qj=y.ytLoggingGelSequenceIdObj_||{};z("ytLoggingGelSequenceIdObj_",qj,void 0);
function rj(a,b,c,d){d=void 0===d?{}:d;if(L("lr_drop_other_and_business_payloads")){if(ph[a]||oh[a])return}else if(L("lr_drop_other_payloads")&&ph[a])return;var e={},f=Math.round(d.timestamp||M());e.eventTimeMs=f<Number.MAX_SAFE_INTEGER?f:0;e[a]=b;a=Vh();e.context={lastActivityMs:String(d.timestamp||!isFinite(a)?-1:a)};L("log_sequence_info_on_gel_web")&&d.X&&(a=e.context,b=d.X,b={index:sj(b),groupKey:b},a.sequence=b,d.ub&&delete qj[d.X]);(d.nc?bj:Wi)({endpoint:"log_event",payload:e,cttAuthInfo:d.cttAuthInfo,
xa:d.xa},c)}
function sj(a){qj[a]=a in qj?qj[a]+1:0;return qj[a]}
;function tj(a){var b=this;this.h=void 0;a.addEventListener("beforeinstallprompt",function(c){c.preventDefault();b.h=c})}
function uj(){if(!y.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return y.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":y.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":y.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":y.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(a){return"WEB_DISPLAY_MODE_UNKNOWN"}}
function vj(){var a=uj();a=Object.keys(Ae).indexOf(a);return-1===a?null:a}
;function wj(a,b,c,d,e){Kd.set(""+a,b,{Qa:c,path:"/",domain:void 0===d?"youtube.com":d,secure:void 0===e?!1:e})}
function xj(a){return Kd.get(""+a,void 0)}
function yj(){if(!Kd.isEnabled())return!1;if(!Kd.isEmpty())return!0;Kd.set("TESTCOOKIESENABLED","1",{Qa:60});if("1"!==Kd.get("TESTCOOKIESENABLED"))return!1;Kd.remove("TESTCOOKIESENABLED");return!0}
;var zj=A("ytglobal.prefsUserPrefsPrefs_")||{};z("ytglobal.prefsUserPrefsPrefs_",zj,void 0);function Aj(){this.h=B("ALT_PREF_COOKIE_NAME","PREF");this.i=B("ALT_PREF_COOKIE_DOMAIN","youtube.com");var a=xj(this.h);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(zj[d]=c.toString())}}}
Aj.prototype.get=function(a,b){Bj(a);Cj(a);a=void 0!==zj[a]?zj[a].toString():null;return null!=a?a:b?b:""};
Aj.prototype.set=function(a,b){Bj(a);Cj(a);if(null==b)throw Error("ExpectedNotNull");zj[a]=b.toString()};
function Dj(a){return!!((Ej("f"+(Math.floor(a/31)+1))||0)&1<<a%31)}
Aj.prototype.remove=function(a){Bj(a);Cj(a);delete zj[a]};
Aj.prototype.clear=function(){for(var a in zj)delete zj[a]};
function Cj(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function Bj(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function Ej(a){a=void 0!==zj[a]?zj[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
Ja(Aj);var Fj={bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"},Gj={CONN_DEFAULT:0,CONN_UNKNOWN:1,CONN_NONE:2,CONN_WIFI:3,CONN_CELLULAR_2G:4,CONN_CELLULAR_3G:5,CONN_CELLULAR_4G:6,CONN_CELLULAR_UNKNOWN:7,CONN_DISCO:8,CONN_CELLULAR_5G:9,CONN_WIFI_METERED:10,CONN_CELLULAR_5G_SA:11,
CONN_CELLULAR_5G_NSA:12,CONN_INVALID:31},Hj={EFFECTIVE_CONNECTION_TYPE_UNKNOWN:0,EFFECTIVE_CONNECTION_TYPE_OFFLINE:1,EFFECTIVE_CONNECTION_TYPE_SLOW_2G:2,EFFECTIVE_CONNECTION_TYPE_2G:3,EFFECTIVE_CONNECTION_TYPE_3G:4,EFFECTIVE_CONNECTION_TYPE_4G:5},Ij={"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};function Jj(){var a=y.navigator;return a?a.connection:void 0}
function Kj(){var a=Jj();if(a){var b=Fj[a.type||"unknown"]||"CONN_UNKNOWN";a=Fj[a.effectiveType||"unknown"]||"CONN_UNKNOWN";"CONN_CELLULAR_UNKNOWN"===b&&"CONN_UNKNOWN"!==a&&(b=a);if("CONN_UNKNOWN"!==b)return b;if("CONN_UNKNOWN"!==a)return a}}
function Lj(){var a=Jj();if(null!==a&&void 0!==a&&a.effectiveType)return Ij.hasOwnProperty(a.effectiveType)?Ij[a.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN"}
;function Mj(){return"INNERTUBE_API_KEY"in ch&&"INNERTUBE_API_VERSION"in ch}
function gj(){return{innertubeApiKey:B("INNERTUBE_API_KEY",void 0),innertubeApiVersion:B("INNERTUBE_API_VERSION",void 0),cb:B("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),eb:B("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),Wb:B("INNERTUBE_CONTEXT_CLIENT_NAME",1),innertubeContextClientVersion:B("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),yb:B("INNERTUBE_CONTEXT_HL",void 0),xb:B("INNERTUBE_CONTEXT_GL",void 0),Xb:B("INNERTUBE_HOST_OVERRIDE",void 0)||"",Zb:!!B("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),Yb:!!B("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:B("SERIALIZED_CLIENT_CONFIG_DATA",void 0)}}
function fj(a){var b={client:{hl:a.yb,gl:a.xb,clientName:a.eb,clientVersion:a.innertubeContextClientVersion,configInfo:a.cb}};navigator.userAgent&&(b.client.userAgent=String(navigator.userAgent));var c=y.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=mh();""!==c&&(b.client.experimentsToken=c);c=nh();0<c.length&&(b.request={internalExperimentFlags:c});Nj(a,void 0,b);Oj(a,void 0,b);Pj(void 0,b);Qj(a,void 0,b);Rj(void 0,b);B("DELEGATED_SESSION_ID")&&!L("pageid_as_header_web")&&(b.user=
{onBehalfOfUser:B("DELEGATED_SESSION_ID")});a=Object;c=a.assign;for(var d=b.client,e={},f=q(Object.entries(ei(B("DEVICE","")))),g=f.next();!g.done;g=f.next()){var h=q(g.value);g=h.next().value;h=h.next().value;"cbrand"===g?e.deviceMake=h:"cmodel"===g?e.deviceModel=h:"cbr"===g?e.browserName=h:"cbrver"===g?e.browserVersion=h:"cos"===g?e.osName=h:"cosver"===g?e.osVersion=h:"cplatform"===g&&(e.platform=h)}b.client=c.call(a,d,e);return b}
function mj(a){var b=new sg,c=new lg;F(c,1,a.yb);F(c,2,a.xb);F(c,16,a.Wb);F(c,17,a.innertubeContextClientVersion);if(a.cb){var d=a.cb,e=new ig;d.coldConfigData&&F(e,1,d.coldConfigData);d.appInstallData&&F(e,6,d.appInstallData);d.coldHashData&&F(e,3,d.coldHashData);d.hotHashData&&F(e,5,d.hotHashData);G(c,62,e)}(d=y.devicePixelRatio)&&1!=d&&F(c,65,d);d=mh();""!==d&&F(c,54,d);d=nh();if(0<d.length){e=new ng;for(var f=0;f<d.length;f++){var g=new gg;F(g,1,d[f].key);g.setValue(d[f].value);Pc(e,15,gg,g)}G(b,
5,e)}Nj(a,c);Oj(a,c);Pj(c);Qj(a,c);Rj(c);B("DELEGATED_SESSION_ID")&&!L("pageid_as_header_web")&&(a=new qg,F(a,3,B("DELEGATED_SESSION_ID")));a=q(Object.entries(ei(B("DEVICE",""))));for(d=a.next();!d.done;d=a.next())e=q(d.value),d=e.next().value,e=e.next().value,"cbrand"===d?F(c,12,e):"cmodel"===d?F(c,13,e):"cbr"===d?F(c,87,e):"cbrver"===d?F(c,88,e):"cos"===d?F(c,18,e):"cosver"===d?F(c,19,e):"cplatform"===d&&F(c,42,e);G(b,1,c);return b}
function Nj(a,b,c){a=a.eb;if("WEB"===a||"MWEB"===a||1===a||2===a)if(b){c=Lc(b,jg,96)||new jg;var d=vj();null!==d&&F(c,3,d);G(b,96,c)}else c&&(c.client.mainAppWebInfo=null!=(d=c.client.mainAppWebInfo)?d:{},c.client.mainAppWebInfo.webDisplayMode=uj())}
function Oj(a,b,c){a=a.eb;if(("WEB_REMIX"===a||76===a)&&!L("music_web_display_mode_killswitch"))if(b){var d;c=null!=(d=Lc(b,kg,70))?d:new kg;d=vj();null!==d&&F(c,10,d);G(b,70,c)}else if(c){var e;c.client.Ab=null!=(e=c.client.Ab)?e:{};c.client.Ab.webDisplayMode=uj()}}
function Pj(a,b){var c;if(L("web_log_memory_total_kbytes")&&(null==(c=y.navigator)?0:c.deviceMemory)){var d;c=null==(d=y.navigator)?void 0:d.deviceMemory;a?F(a,95,1E6*c):b&&(b.client.memoryTotalKbytes=""+1E6*c)}}
function Qj(a,b,c){if(a.appInstallData)if(b){var d;c=null!=(d=Lc(b,ig,62))?d:new ig;F(c,6,a.appInstallData);G(b,62,c)}else c&&(c.client.configInfo=c.client.configInfo||{},c.client.configInfo.appInstallData=a.appInstallData)}
function Rj(a,b){var c=Kj();c&&(a?F(a,61,Gj[c]):b&&(b.client.connectionType=c));L("web_log_effective_connection_type")&&(c=Lj())&&(a?F(a,94,Hj[c]):b&&(b.client.effectiveConnectionType=c))}
function Sj(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||B("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.no||B("AUTHORIZATION"))||(a?b="Bearer "+A("gapi.auth.getToken")().mo:b=Od([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=B("SESSION_INDEX",0),L("pageid_as_header_web")&&(d["X-Goog-PageId"]=B("DELEGATED_SESSION_ID")));return d}
;function Tj(a){a=Object.assign({},a);delete a.Authorization;var b=Od();if(b){var c=new Ve;c.update(B("INNERTUBE_API_KEY",void 0));c.update(b);a.hash=zc(c.digest(),3)}return a}
;function Uj(a){var b=new $f;(b=b.isAvailable()?a?new fg(b,a):b:null)||(a=new ag(a||"UserDataSharedStore"),b=a.isAvailable()?a:null);this.h=(a=b)?new Wf(a):null;this.i=document.domain||window.location.hostname}
Uj.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(rf(b))}catch(f){return}else e=escape(b);wj(a,e,c,this.i)};
Uj.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=xj(a))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
Uj.prototype.remove=function(a){this.h&&this.h.remove(a);var b=this.i;Kd.remove(""+a,"/",void 0===b?"youtube.com":b)};var Vj;function Wj(){Vj||(Vj=new Uj("yt.innertube"));return Vj}
function Xj(a,b,c,d){if(d)return null;d=Wj().get("nextId",!0)||1;var e=Wj().get("requests",!0)||{};e[d]={method:a,request:b,authState:Tj(c),requestTime:Math.round(M())};Wj().set("nextId",d+1,86400,!0);Wj().set("requests",e,86400,!0);return d}
function Yj(a){var b=Wj().get("requests",!0)||{};delete b[a];Wj().set("requests",b,86400,!0)}
function Zj(a){var b=Wj().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(M())-d.requestTime)){var e=d.authState,f=Tj(Sj(!1));qb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(M())),kj(a,d.method,e,{}));delete b[c]}}Wj().set("requests",b,86400,!0)}}
;var ak=uc||vc;function bk(a){var b=Mb();return b?0<=b.toLowerCase().indexOf(a):!1}
;var ck=function(){var a;return function(){a||(a=new Uj("ytidb"));return a}}();
function dk(){var a;return null===(a=ck())||void 0===a?void 0:a.get("LAST_RESULT_ENTRY_KEY",!0)}
;var ek=[],fk,gk=!1;function hk(){var a={};for(fk=new ik(void 0===a.handleError?jk:a.handleError,void 0===a.logEvent?kk:a.logEvent);0<ek.length;)switch(a=ek.shift(),a.type){case "ERROR":fk.handleError(a.payload);break;case "EVENT":fk.logEvent(a.eventType,a.payload)}}
function lk(a){gk||(fk?fk.handleError(a):(ek.push({type:"ERROR",payload:a}),10<ek.length&&ek.shift()))}
function mk(a,b){gk||(fk?fk.logEvent(a,b):(ek.push({type:"EVENT",eventType:a,payload:b}),10<ek.length&&ek.shift()))}
;function nk(a){var b=Da.apply(1,arguments);var c=Error.call(this,a);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.args=[].concat(ha(b))}
r(nk,Error);function ok(){try{return pk(),!0}catch(a){return!1}}
function pk(){if(void 0!==B("DATASYNC_ID",void 0))return B("DATASYNC_ID",void 0);throw new nk("Datasync ID not set","unknown");}
;function qk(a){if(0<=a.indexOf(":"))throw Error("Database name cannot contain ':'");}
function rk(a){return a.substr(0,a.indexOf(":"))||a}
;var sk={},tk=(sk.AUTH_INVALID="No user identifier specified.",sk.EXPLICIT_ABORT="Transaction was explicitly aborted.",sk.IDB_NOT_SUPPORTED="IndexedDB is not supported.",sk.MISSING_INDEX="Index not created.",sk.MISSING_OBJECT_STORES="Object stores not created.",sk.DB_DELETED_BY_MISSING_OBJECT_STORES="Database is deleted because expected object stores were not created.",sk.DB_REOPENED_BY_MISSING_OBJECT_STORES="Database is reopened because expected object stores were not created.",sk.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",
sk.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",sk.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",sk.EXECUTE_TRANSACTION_ON_CLOSED_DB="Can't start a transaction on a closed database",sk.INCOMPATIBLE_DB_VERSION="The binary is incompatible with the database version",sk),uk={},vk=(uk.AUTH_INVALID="ERROR",uk.EXECUTE_TRANSACTION_ON_CLOSED_DB="WARNING",uk.EXPLICIT_ABORT="IGNORED",uk.IDB_NOT_SUPPORTED="ERROR",uk.MISSING_INDEX=
"WARNING",uk.MISSING_OBJECT_STORES="ERROR",uk.DB_DELETED_BY_MISSING_OBJECT_STORES="WARNING",uk.DB_REOPENED_BY_MISSING_OBJECT_STORES="WARNING",uk.QUOTA_EXCEEDED="WARNING",uk.QUOTA_MAYBE_EXCEEDED="WARNING",uk.UNKNOWN_ABORT="WARNING",uk.INCOMPATIBLE_DB_VERSION="WARNING",uk),wk={},xk=(wk.AUTH_INVALID=!1,wk.EXECUTE_TRANSACTION_ON_CLOSED_DB=!1,wk.EXPLICIT_ABORT=!1,wk.IDB_NOT_SUPPORTED=!1,wk.MISSING_INDEX=!1,wk.MISSING_OBJECT_STORES=!1,wk.DB_DELETED_BY_MISSING_OBJECT_STORES=!1,wk.DB_REOPENED_BY_MISSING_OBJECT_STORES=
!1,wk.QUOTA_EXCEEDED=!1,wk.QUOTA_MAYBE_EXCEEDED=!0,wk.UNKNOWN_ABORT=!0,wk.INCOMPATIBLE_DB_VERSION=!1,wk);function yk(a,b,c,d,e){b=void 0===b?{}:b;c=void 0===c?tk[a]:c;d=void 0===d?vk[a]:d;e=void 0===e?xk[a]:e;nk.call(this,c,Object.assign({name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;this.level=d;this.h=e;Object.setPrototypeOf(this,yk.prototype)}
r(yk,nk);function zk(a,b){yk.call(this,"MISSING_OBJECT_STORES",{expectedObjectStores:b,foundObjectStores:a},tk.MISSING_OBJECT_STORES);Object.setPrototypeOf(this,zk.prototype)}
r(zk,yk);function Ak(a,b){var c=Error.call(this);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.index=a;this.objectStore=b;Object.setPrototypeOf(this,Ak.prototype)}
r(Ak,Error);var Bk=["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
function Ck(a,b,c,d){b=rk(b);var e=a instanceof Error?a:Error("Unexpected error: "+a);if(e instanceof yk)return e;a={objectStoreNames:c,dbName:b,dbVersion:d};if("QuotaExceededError"===e.name)return new yk("QUOTA_EXCEEDED",a);if(wc&&"UnknownError"===e.name)return new yk("QUOTA_MAYBE_EXCEEDED",a);if(e instanceof Ak)return new yk("MISSING_INDEX",Object.assign(Object.assign({},a),{objectStore:e.objectStore,index:e.index}));if("InvalidStateError"===e.name&&Bk.some(function(f){return e.message.includes(f)}))return new yk("EXECUTE_TRANSACTION_ON_CLOSED_DB",
a);
if("AbortError"===e.name)return new yk("UNKNOWN_ABORT",a,e.message);e.args=[Object.assign(Object.assign({},a),{name:"IdbError",Cb:e.name})];e.level="WARNING";return e}
function Dk(a,b,c){var d=dk();return new yk("IDB_NOT_SUPPORTED",{context:{caller:a,publicName:b,version:c,hasSucceededOnce:null===d||void 0===d?void 0:d.hasSucceededOnce}})}
;function Ek(a){if(!a)throw Error();throw a;}
function Fk(a){return a}
function Gk(a){this.h=a}
function Hk(a){function b(e){if("PENDING"===d.state.status){d.state={status:"REJECTED",reason:e};e=q(d.onRejected);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
function c(e){if("PENDING"===d.state.status){d.state={status:"FULFILLED",value:e};e=q(d.h);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
var d=this;this.state={status:"PENDING"};this.h=[];this.onRejected=[];a=a.h;try{a(c,b)}catch(e){b(e)}}
Hk.all=function(a){return new Hk(new Gk(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={oa:0};f.oa<a.length;f={oa:f.oa},++f.oa)Ik(Hk.resolve(a[f.oa]).then(function(g){return function(h){d[g.oa]=h;e--;0===e&&b(d)}}(f)),function(g){c(g)})}))};
Hk.resolve=function(a){return new Hk(new Gk(function(b,c){a instanceof Hk?a.then(b,c):b(a)}))};
Hk.reject=function(a){return new Hk(new Gk(function(b,c){c(a)}))};
Hk.prototype.then=function(a,b){var c=this,d=null!==a&&void 0!==a?a:Fk,e=null!==b&&void 0!==b?b:Ek;return new Hk(new Gk(function(f,g){"PENDING"===c.state.status?(c.h.push(function(){Jk(c,c,d,f,g)}),c.onRejected.push(function(){Kk(c,c,e,f,g)})):"FULFILLED"===c.state.status?Jk(c,c,d,f,g):"REJECTED"===c.state.status&&Kk(c,c,e,f,g)}))};
function Ik(a,b){a.then(void 0,b)}
function Jk(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof Hk?Lk(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Kk(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof Hk?Lk(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Lk(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof Hk?Lk(a,b,f,d,e):d(f)},function(f){e(f)})}
;function Mk(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Nk(a){return new Promise(function(b,c){Mk(a,b,c)})}
function Ok(a){return new Hk(new Gk(function(b,c){Mk(a,b,c)}))}
;function Pk(a,b){return new Hk(new Gk(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()}))}
;function Qk(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(M());this.i=!1}
l=Qk.prototype;l.add=function(a,b,c){return Rk(this,[a],{mode:"readwrite",O:!0},function(d){return d.objectStore(a).add(b,c)})};
l.clear=function(a){return Rk(this,[a],{mode:"readwrite",O:!0},function(b){return b.objectStore(a).clear()})};
l.close=function(){var a;this.h.close();(null===(a=this.options)||void 0===a?0:a.closed)&&this.options.closed()};
l.count=function(a,b){return Rk(this,[a],{mode:"readonly",O:!0},function(c){return c.objectStore(a).count(b)})};
function Sk(a,b,c){a=a.h.createObjectStore(b,c);return new Tk(a)}
l.delete=function(a,b){return Rk(this,[a],{mode:"readwrite",O:!0},function(c){return c.objectStore(a).delete(b)})};
l.get=function(a,b){return Rk(this,[a],{mode:"readonly",O:!0},function(c){return c.objectStore(a).get(b)})};
function Uk(a,b){return Rk(a,["LogsRequestsStore"],{mode:"readwrite",O:!0},function(c){c=c.objectStore("LogsRequestsStore");return Ok(c.h.put(b,void 0))})}
l.objectStoreNames=function(){return Array.from(this.h.objectStoreNames)};
function Rk(a,b,c,d){var e,f,g,h,k,m,n,t,x,u,C,D;return w(function(K){switch(K.h){case 1:var N={mode:"readonly",O:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};"string"===typeof c?N.mode=c:Object.assign(N,c);e=N;a.transactionCount++;f=e.O?3:1;g=0;case 2:if(h){K.s(3);break}g++;k=Math.round(M());sa(K,4);m=a.h.transaction(b,e.mode);N=new Vk(m);N=Wk(N,d);return v(K,N,6);case 6:return n=K.i,t=Math.round(M()),Xk(a,k,t,g,void 0,b.join(),e),K.return(n);case 4:x=ua(K);u=Math.round(M());C=Ck(x,a.h.name,b.join(),a.h.version);
if((D=C instanceof yk&&!C.h)||g>=f)Xk(a,k,u,g,C,b.join(),e),h=C;K.s(2);break;case 3:return K.return(Promise.reject(h))}})}
function Xk(a,b,c,d,e,f,g){b=c-b;e?(e instanceof yk&&("QUOTA_EXCEEDED"===e.type||"QUOTA_MAYBE_EXCEEDED"===e.type)&&mk("QUOTA_EXCEEDED",{dbName:rk(a.h.name),objectStoreNames:f,transactionCount:a.transactionCount,transactionMode:g.mode}),e instanceof yk&&"UNKNOWN_ABORT"===e.type&&(c-=a.j,0>c&&c>=Math.pow(2,31)&&(c=0),mk("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:f,transactionDuration:b,transactionCount:a.transactionCount,dbDuration:c}),a.i=!0),Yk(a,!1,d,f,b,g.tag),lk(e)):Yk(a,!0,d,f,b,g.tag)}
function Yk(a,b,c,d,e,f){mk("TRANSACTION_ENDED",{objectStoreNames:d,connectionHasUnknownAbortedTransaction:a.i,duration:e,isSuccessful:b,tryCount:c,tag:void 0===f?"IDB_TRANSACTION_TAG_UNKNOWN":f})}
l.getName=function(){return this.h.name};
function Tk(a){this.h=a}
l=Tk.prototype;l.add=function(a,b){return Ok(this.h.add(a,b))};
l.autoIncrement=function(){return this.h.autoIncrement};
l.clear=function(){return Ok(this.h.clear()).then(function(){})};
l.count=function(a){return Ok(this.h.count(a))};
function Zk(a,b){return $k(a,{query:b},function(c){return c.delete().then(function(){return c.continue()})}).then(function(){})}
l.delete=function(a){return a instanceof IDBKeyRange?Zk(this,a):Ok(this.h.delete(a))};
l.get=function(a){return Ok(this.h.get(a))};
l.index=function(a){try{return new al(this.h.index(a))}catch(b){if(b instanceof Error&&"NotFoundError"===b.name)throw new Ak(a,this.h.name);throw b;}};
l.getName=function(){return this.h.name};
l.keyPath=function(){return this.h.keyPath};
function $k(a,b,c){a=a.h.openCursor(b.query,b.direction);return bl(a).then(function(d){return Pk(d,c)})}
function Vk(a){var b=this;this.h=a;this.j=new Map;this.i=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.i){e=yk;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function Wk(a,b){var c=new Promise(function(d,e){try{Ik(b(a).then(function(f){d(f)}),e)}catch(f){e(f),a.abort()}});
return Promise.all([c,a.done]).then(function(d){return q(d).next().value})}
Vk.prototype.abort=function(){this.h.abort();this.i=!0;throw new yk("EXPLICIT_ABORT");};
Vk.prototype.objectStore=function(a){a=this.h.objectStore(a);var b=this.j.get(a);b||(b=new Tk(a),this.j.set(a,b));return b};
function al(a){this.h=a}
l=al.prototype;l.count=function(a){return Ok(this.h.count(a))};
l.delete=function(a){return cl(this,{query:a},function(b){return b.delete().then(function(){return b.continue()})})};
l.get=function(a){return Ok(this.h.get(a))};
l.getKey=function(a){return Ok(this.h.getKey(a))};
l.keyPath=function(){return this.h.keyPath};
l.unique=function(){return this.h.unique};
function cl(a,b,c){a=a.h.openCursor(void 0===b.query?null:b.query,void 0===b.direction?"next":b.direction);return bl(a).then(function(d){return Pk(d,c)})}
function dl(a,b){this.request=a;this.cursor=b}
function bl(a){return Ok(a).then(function(b){return b?new dl(a,b):null})}
l=dl.prototype;l.advance=function(a){this.cursor.advance(a);return bl(this.request)};
l.continue=function(a){this.cursor.continue(a);return bl(this.request)};
l.delete=function(){return Ok(this.cursor.delete()).then(function(){})};
l.getKey=function(){return this.cursor.key};
l.getValue=function(){return this.cursor.value};
l.update=function(a){return Ok(this.cursor.update(a))};function el(a,b,c){return new Promise(function(d,e){function f(){x||(x=new Qk(g.result,{closed:t}));return x}
var g=void 0!==b?self.indexedDB.open(a,b):self.indexedDB.open(a);var h=c.blocked,k=c.blocking,m=c.zc,n=c.upgrade,t=c.closed,x;g.addEventListener("upgradeneeded",function(u){try{if(null===u.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(null===g.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");u.dataLoss&&"none"!==u.dataLoss&&mk("IDB_DATA_CORRUPTED",{reason:u.dataLossMessage||"unknown reason",dbName:rk(a)});var C=f(),D=new Vk(g.transaction);
n&&n(C,function(K){return u.oldVersion<K&&u.newVersion>=K},D);
D.done.catch(function(K){e(K)})}catch(K){e(K)}});
g.addEventListener("success",function(){var u=g.result;k&&u.addEventListener("versionchange",function(){k(f())});
u.addEventListener("close",function(){mk("IDB_UNEXPECTEDLY_CLOSED",{dbName:rk(a),dbVersion:u.version});m&&m()});
d(f())});
g.addEventListener("error",function(){e(g.error)});
h&&g.addEventListener("blocked",function(){h()})})}
function fl(a,b,c){c=void 0===c?{}:c;return el(a,b,c)}
function gl(a,b){b=void 0===b?{}:b;var c,d,e,f;return w(function(g){if(1==g.h)return sa(g,2),c=self.indexedDB.deleteDatabase(a),d=b,(e=d.blocked)&&c.addEventListener("blocked",function(){e()}),v(g,Nk(c),4);
if(2!=g.h)return ta(g,0);f=ua(g);throw Ck(f,a,"",-1);})}
;function hl(a){return new Promise(function(b){Mh(function(){b()},a)})}
function il(a,b){this.name=a;this.options=b;this.l=!0;this.m=this.o=0;this.i=500}
il.prototype.j=function(a,b,c){c=void 0===c?{}:c;return fl(a,b,c)};
il.prototype.delete=function(a){a=void 0===a?{}:a;return gl(this.name,a)};
function jl(a,b){return new yk("INCOMPATIBLE_DB_VERSION",{dbName:a.name,oldVersion:a.options.version,newVersion:b})}
function kl(a,b){if(!b)throw Dk("openWithToken",rk(a.name));return a.open()}
il.prototype.open=function(){function a(){var f,g,h,k,m,n,t,x,u,C;return w(function(D){switch(D.h){case 1:return h=null!==(f=Error().stack)&&void 0!==f?f:"",sa(D,2),v(D,c.j(c.name,c.options.version,e),4);case 4:k=D.i;for(var K=c.options,N=[],S=q(Object.keys(K.za)),W=S.next();!W.done;W=S.next()){W=W.value;var Qa=K.za[W],zb=void 0===Qa.ic?Number.MAX_VALUE:Qa.ic;!(k.h.version>=Qa.Xa)||k.h.version>=zb||k.h.objectStoreNames.contains(W)||N.push(W)}m=N;if(0===m.length){D.s(5);break}n=Object.keys(c.options.za);
t=k.objectStoreNames();if(c.m<lh("ytidb_reopen_db_retries",0))return c.m++,k.close(),lk(new yk("DB_REOPENED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:n,foundObjectStores:t})),D.return(a());if(!(c.o<lh("ytidb_remake_db_retries",1))){D.s(6);break}c.o++;if(!L("ytidb_remake_db_enable_backoff_delay")){D.s(7);break}return v(D,hl(c.i),8);case 8:c.i*=2;case 7:return v(D,c.delete(),9);case 9:return lk(new yk("DB_DELETED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:n,foundObjectStores:t})),
D.return(a());case 6:throw new zk(t,n);case 5:return D.return(k);case 2:x=ua(D);if(x instanceof DOMException?"VersionError"!==x.name:"DOMError"in self&&x instanceof DOMError?"VersionError"!==x.name:!(x instanceof Object&&"message"in x)||"An attempt was made to open a database using a lower version than the existing version."!==x.message){D.s(10);break}return v(D,c.j(c.name,void 0,Object.assign(Object.assign({},e),{upgrade:void 0})),11);case 11:u=D.i;C=u.h.version;if(void 0!==c.options.version&&C>
c.options.version+1)throw u.close(),c.l=!1,jl(c,C);return D.return(u);case 10:throw b(),x instanceof Error&&!L("ytidb_async_stack_killswitch")&&(x.stack=x.stack+"\n"+h.substring(h.indexOf("\n")+1)),Ck(x,c.name,"",null!==(g=c.options.version)&&void 0!==g?g:-1);}})}
function b(){c.h===d&&(c.h=void 0)}
var c=this;if(!this.l)throw jl(this);if(this.h)return this.h;var d,e={blocking:function(f){f.close()},
closed:b,zc:b,upgrade:this.options.upgrade};return this.h=d=a()};var ll=new il("YtIdbMeta",{za:{databases:{Xa:1}},upgrade:function(a,b){b(1)&&Sk(a,"databases",{keyPath:"actualName"})}});
function ml(a,b){var c;return w(function(d){if(1==d.h)return v(d,kl(ll,b),2);c=d.i;return d.return(Rk(c,["databases"],{O:!0,mode:"readwrite"},function(e){var f=e.objectStore("databases");return f.get(a.actualName).then(function(g){if(g?a.actualName!==g.actualName||a.publicName!==g.publicName||a.userIdentifier!==g.userIdentifier:1)return Ok(f.h.put(a,void 0)).then(function(){})})}))})}
function nl(a,b){var c;return w(function(d){if(1==d.h)return a?v(d,kl(ll,b),2):d.return();c=d.i;return d.return(c.delete("databases",a))})}
function ol(a,b){var c,d;return w(function(e){return 1==e.h?(c=[],v(e,kl(ll,b),2)):3!=e.h?(d=e.i,v(e,Rk(d,["databases"],{O:!0,mode:"readonly"},function(f){c.length=0;return $k(f.objectStore("databases"),{},function(g){a(g.getValue())&&c.push(g.getValue());return g.continue()})}),3)):e.return(c)})}
function pl(a){return ol(function(b){return"LogsDatabaseV2"===b.publicName&&void 0!==b.userIdentifier},a)}
function ql(a,b){return ol(function(c){return void 0!==c.userIdentifier&&!a.includes(c.userIdentifier)},b)}
;var rl,sl=new function(){}(new function(){});
function tl(){var a,b,c;return w(function(d){switch(d.h){case 1:a=dk();if(null===a||void 0===a?0:a.hasSucceededOnce)return d.return(!0);var e;if(e=ak)e=/WebKit\/([0-9]+)/.exec(Mb()),e=!!(e&&600<=parseInt(e[1],10));e&&(e=/WebKit\/([0-9]+)/.exec(Mb()),e=!(e&&602<=parseInt(e[1],10)));if(e||hc)return d.return(!1);try{if(b=self,!(b.indexedDB&&b.IDBIndex&&b.IDBKeyRange&&b.IDBObjectStore))return d.return(!1)}catch(f){return d.return(!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return d.return(!1);
sa(d,2);c={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0};return v(d,ml(c,sl),4);case 4:return v(d,nl("yt-idb-test-do-not-use",sl),5);case 5:return d.return(!0);case 2:return ua(d),d.return(!1)}})}
function ul(){if(void 0!==rl)return rl;gk=!0;return rl=tl().then(function(a){gk=!1;var b,c;null!==(b=ck())&&void 0!==b&&b.h&&(b=dk(),b={hasSucceededOnce:(null===b||void 0===b?void 0:b.hasSucceededOnce)||a},null===(c=ck())||void 0===c?void 0:c.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0));return a})}
function vl(){return A("ytglobal.idbToken_")||void 0}
function wl(){var a=vl();return a?Promise.resolve(a):ul().then(function(b){(b=b?sl:void 0)&&z("ytglobal.idbToken_",b,void 0);return b})}
;var xl=0;function yl(a){xl||(xl=Qh.M(function(){var b,c,d,e,f;return w(function(g){switch(g.h){case 1:return v(g,wl(),2);case 2:b=g.i;if(!b)return g.return();c=!0;sa(g,3);return v(g,ql(a,b),5);case 5:d=g.i;if(!d.length){c=!1;g.s(6);break}e=d[0];return v(g,gl(e.actualName),7);case 7:return v(g,nl(e.actualName,b),6);case 6:ta(g,4);break;case 3:f=ua(g),lk(f),c=!1;case 4:Qh.U(xl),xl=0,c&&yl(a),g.h=0}})}))}
new cd;function zl(a){if(!ok())throw a=new yk("AUTH_INVALID",{dbName:a}),lk(a),a;var b=pk();return{actualName:a+":"+b,publicName:a,userIdentifier:b}}
function Al(a,b,c,d){var e,f,g,h,k,m;return w(function(n){switch(n.h){case 1:return f=null!==(e=Error().stack)&&void 0!==e?e:"",v(n,wl(),2);case 2:g=n.i;if(!g)throw h=Dk("openDbImpl",a,b),L("ytidb_async_stack_killswitch")||(h.stack=h.stack+"\n"+f.substring(f.indexOf("\n")+1)),lk(h),h;qk(a);k=c?{actualName:a,publicName:a,userIdentifier:void 0}:zl(a);sa(n,3);return v(n,ml(k,g),5);case 5:return v(n,fl(k.actualName,b,d),6);case 6:return n.return(n.i);case 3:return m=ua(n),sa(n,7),v(n,nl(k.actualName,
g),9);case 9:ta(n,8);break;case 7:ua(n);case 8:throw m;}})}
function Bl(a,b,c){c=void 0===c?{}:c;return Al(a,b,!1,c)}
function Cl(a,b,c){c=void 0===c?{}:c;return Al(a,b,!0,c)}
function Dl(a,b){b=void 0===b?{}:b;var c,d;return w(function(e){if(1==e.h)return v(e,wl(),2);if(3!=e.h){c=e.i;if(!c)return e.return();qk(a);d=zl(a);return v(e,gl(d.actualName,b),3)}return v(e,nl(d.actualName,c),0)})}
function El(a,b,c){a=a.map(function(d){return w(function(e){return 1==e.h?v(e,gl(d.actualName,b),2):v(e,nl(d.actualName,c),0)})});
return Promise.all(a).then(function(){})}
function Fl(){var a=void 0===a?{}:a;var b,c;return w(function(d){if(1==d.h)return v(d,wl(),2);if(3!=d.h){b=d.i;if(!b)return d.return();qk("LogsDatabaseV2");return v(d,pl(b),3)}c=d.i;return v(d,El(c,a,b),0)})}
function Gl(a,b){b=void 0===b?{}:b;var c;return w(function(d){if(1==d.h)return v(d,wl(),2);if(3!=d.h){c=d.i;if(!c)return d.return();qk(a);return v(d,gl(a,b),3)}return v(d,nl(a,c),0)})}
;function Hl(a){var b,c,d,e,f,g,h,k;this.h=!1;this.potentialEsfErrorCounter=this.i=0;this.handleError=function(){};
this.sa=function(){};
this.now=Date.now;this.ya=!1;this.Kb=null!==(b=a.Kb)&&void 0!==b?b:100;this.Hb=null!==(c=a.Hb)&&void 0!==c?c:1;this.Fb=null!==(d=a.Fb)&&void 0!==d?d:2592E6;this.Db=null!==(e=a.Db)&&void 0!==e?e:12E4;this.Gb=null!==(f=a.Gb)&&void 0!==f?f:5E3;this.v=null!==(g=a.v)&&void 0!==g?g:void 0;this.Ma=!!a.Ma;this.La=null!==(h=a.La)&&void 0!==h?h:.1;this.Sa=null!==(k=a.Sa)&&void 0!==k?k:10;a.handleError&&(this.handleError=a.handleError);a.sa&&(this.sa=a.sa);a.ya&&(this.ya=a.ya);this.B=a.B;this.V=a.V;this.J=a.J;
this.I=a.I;this.ea=a.ea;this.ib=a.ib;this.hb=a.hb;this.v&&(!this.B||this.B("networkless_logging"))&&Il(this)}
function Il(a){a.v&&!a.ya&&(a.h=!0,a.Ma&&Math.random()<=a.La&&a.J.Qb(a.v),Jl(a),a.I.G()&&a.Ca(),a.B&&!a.B("use_new_nwl_initialization")&&(a.I.W(a.ib,a.Ca.bind(a)),a.I.W(a.hb,a.nb.bind(a))))}
l=Hl.prototype;l.writeThenSend=function(a,b){var c=this;b=void 0===b?{}:b;if(this.v&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.J.set(d,this.v).then(function(e){d.id=e;c.I.G()&&Kl(c,d)}).catch(function(e){Kl(c,d);
Ll(c,e)})}else this.ea(a,b)};
l.sendThenWrite=function(a,b,c){var d=this;b=void 0===b?{}:b;if(this.v&&this.h){var e={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.B&&this.B("nwl_skip_retry")&&(e.skipRetry=c);if(this.I.G()||this.B&&this.B("nwl_aggressive_send_then_write")&&!e.skipRetry){if(!e.skipRetry){var f=b.onError?b.onError:function(){};
b.onError=function(g,h){return w(function(k){if(1==k.h)return v(k,d.J.set(e,d.v).catch(function(m){Ll(d,m)}),2);
f(g,h);k.h=0})}}this.ea(a,b,e.skipRetry)}else this.J.set(e,this.v).catch(function(g){d.ea(a,b,e.skipRetry);
Ll(d,g)})}else this.ea(a,b,this.B&&this.B("nwl_skip_retry")&&c)};
l.sendAndWrite=function(a,b){var c=this;b=void 0===b?{}:b;if(this.v&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0},e=!1,f=b.onSuccess?b.onSuccess:function(){};
d.options.onSuccess=function(g,h){void 0!==d.id?c.J.ra(d.id,c.v):e=!0;c.I.ca&&c.B&&c.B("vss_network_hint")&&c.I.ca(!0);f(g,h)};
this.ea(d.url,d.options);this.J.set(d,this.v).then(function(g){d.id=g;e&&c.J.ra(d.id,c.v)}).catch(function(g){Ll(c,g)})}else this.ea(a,b)};
l.Ca=function(){var a=this;if(!this.v)throw Dk("throttleSend");this.i||(this.i=this.V.M(function(){var b;return w(function(c){if(1==c.h)return v(c,a.J.wb("NEW",a.v),2);if(3!=c.h)return b=c.i,b?v(c,Kl(a,b),3):(a.nb(),c.return());a.i&&(a.i=0,a.Ca());c.h=0})},this.Kb))};
l.nb=function(){this.V.U(this.i);this.i=0};
function Kl(a,b){var c,d;return w(function(e){switch(e.h){case 1:if(!a.v)throw c=Dk("immediateSend"),c;if(void 0===b.id){e.s(2);break}return v(e,a.J.ac(b.id,a.v),3);case 3:(d=e.i)?b=d:a.sa(Error("The request cannot be found in the database."));case 2:if(Ml(a,b,a.Fb)){e.s(4);break}a.sa(Error("Networkless Logging: Stored logs request expired age limit"));if(void 0===b.id){e.s(5);break}return v(e,a.J.ra(b.id,a.v),5);case 5:return e.return();case 4:b.skipRetry||(b=Nl(a,b));if(!b){e.s(0);break}if(!b.skipRetry||
void 0===b.id){e.s(8);break}return v(e,a.J.ra(b.id,a.v),8);case 8:a.ea(b.url,b.options,!!b.skipRetry),e.h=0}})}
function Nl(a,b){if(!a.v)throw Dk("updateRequestHandlers");var c=b.options.onError?b.options.onError:function(){};
b.options.onError=function(e,f){var g;return w(function(h){switch(h.h){case 1:g=Ol(f);if(!(a.B&&a.B("nwl_consider_error_code")&&g||a.B&&!a.B("nwl_consider_error_code")&&a.potentialEsfErrorCounter<=a.Sa)){h.s(2);break}if(!a.I.fa){h.s(3);break}return v(h,a.I.fa(),3);case 3:if(a.I.G()){h.s(2);break}c(e,f);if(!a.B||!a.B("nwl_consider_error_code")||void 0===(null===b||void 0===b?void 0:b.id)){h.s(6);break}return v(h,a.J.jb(b.id,a.v,!1),6);case 6:return h.return();case 2:if(a.B&&a.B("nwl_consider_error_code")&&
!g&&a.potentialEsfErrorCounter>a.Sa)return h.return();a.potentialEsfErrorCounter++;if(void 0===(null===b||void 0===b?void 0:b.id)){h.s(8);break}return b.sendCount<a.Hb?v(h,a.J.jb(b.id,a.v),12):v(h,a.J.ra(b.id,a.v),8);case 12:a.V.M(function(){a.I.G()&&a.Ca()},a.Gb);
case 8:c(e,f),h.h=0}})};
var d=b.options.onSuccess?b.options.onSuccess:function(){};
b.options.onSuccess=function(e,f){return w(function(g){if(1==g.h)return void 0===(null===b||void 0===b?void 0:b.id)?g.s(2):v(g,a.J.ra(b.id,a.v),2);a.I.ca&&a.B&&a.B("vss_network_hint")&&a.I.ca(!0);d(e,f);g.h=0})};
return b}
function Ml(a,b,c){b=b.timestamp;return a.now()-b>=c?!1:!0}
function Jl(a){if(!a.v)throw Dk("retryQueuedRequests");a.J.wb("QUEUED",a.v).then(function(b){b&&!Ml(a,b,a.Db)?a.V.M(function(){return w(function(c){if(1==c.h)return void 0===b.id?c.s(2):v(c,a.J.jb(b.id,a.v),2);Jl(a);c.h=0})}):a.I.G()&&a.Ca()})}
function Ll(a,b){a.Lb&&!a.I.G()?a.Lb(b):a.handleError(b)}
function Ol(a){var b;return(a=null===(b=null===a||void 0===a?void 0:a.error)||void 0===b?void 0:b.code)&&400<=a&&599>=a?!1:!0}
;function Pl(a,b){this.version=a;this.args=b}
;function Ql(a,b){this.topic=a;this.h=b}
Ql.prototype.toString=function(){return this.topic};var Rl=A("ytPubsub2Pubsub2Instance")||new J;J.prototype.subscribe=J.prototype.subscribe;J.prototype.unsubscribeByKey=J.prototype.wa;J.prototype.publish=J.prototype.ka;J.prototype.clear=J.prototype.clear;z("ytPubsub2Pubsub2Instance",Rl,void 0);var Sl=A("ytPubsub2Pubsub2SubscribedKeys")||{};z("ytPubsub2Pubsub2SubscribedKeys",Sl,void 0);var Tl=A("ytPubsub2Pubsub2TopicToKeys")||{};z("ytPubsub2Pubsub2TopicToKeys",Tl,void 0);var Ul=A("ytPubsub2Pubsub2IsAsync")||{};z("ytPubsub2Pubsub2IsAsync",Ul,void 0);
z("ytPubsub2Pubsub2SkipSubKey",null,void 0);function Vl(a,b){var c=Wl();c&&c.publish.call(c,a.toString(),a,b)}
function Xl(a){var b=Yl,c=Wl();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=A("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(Sl[d])try{if(f&&b instanceof Ql&&b!=e)try{var h=b.h,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.ja){var m=new h;h.ja=m.version}var n=h.ja}catch(K){}if(!n||k.version!=n)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{n=Reflect;var t=n.construct;
var x=k.args,u=x.length;if(0<u){var C=Array(u);for(k=0;k<u;k++)C[k]=x[k];var D=C}else D=[];f=t.call(n,h,D)}catch(K){throw K.message="yt.pubsub2.Data.deserialize(): "+K.message,K;}}catch(K){throw K.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+K.message,K;}a.call(window,f)}catch(K){vh(K)}},Ul[b.toString()]?A("yt.scheduler.instance")?Qh.M(g):Gh(g,0):g())});
Sl[d]=!0;Tl[b.toString()]||(Tl[b.toString()]=[]);Tl[b.toString()].push(d);return d}
function Zl(){var a=$l,b=Xl(function(c){a.apply(void 0,arguments);am(b)});
return b}
function am(a){var b=Wl();b&&("number"===typeof a&&(a=[a]),cb(a,function(c){b.unsubscribeByKey(c);delete Sl[c]}))}
function Wl(){return A("ytPubsub2Pubsub2Instance")}
;function bm(a,b){il.call(this,a,b);this.options=b;qk(a)}
r(bm,il);function cm(a,b){var c;return function(){c||(c=new bm(a,b));return c}}
bm.prototype.j=function(a,b,c){c=void 0===c?{}:c;return(this.options.kb?Cl:Bl)(a,b,Object.assign({},c))};
bm.prototype.delete=function(a){a=void 0===a?{}:a;return(this.options.kb?Gl:Dl)(this.name,a)};
function dm(a,b){return cm(a,b)}
;var em;
function fm(){if(em)return em();var a={};em=dm("LogsDatabaseV2",{za:(a.LogsRequestsStore={Xa:2},a),kb:!1,upgrade:function(b,c,d){c(2)&&Sk(b,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});c(3);c(5)&&(d=d.objectStore("LogsRequestsStore"),d.h.indexNames.contains("newRequest")&&d.h.deleteIndex("newRequest"),d.h.createIndex("newRequestV2",["status","interface","timestamp"],{unique:!1}));c(7)&&b.h.objectStoreNames.contains("sapisid")&&b.h.deleteObjectStore("sapisid");c(9)&&b.h.objectStoreNames.contains("SWHealthLog")&&b.h.deleteObjectStore("SWHealthLog")},
version:9});return em()}
;function gm(a){return kl(fm(),a)}
function hm(a,b){var c,d,e,f;return w(function(g){if(1==g.h)return c={startTime:M(),transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},v(g,gm(b),2);if(3!=g.h)return d=g.i,e=Object.assign(Object.assign({},a),{options:JSON.parse(JSON.stringify(a.options)),interface:B("INNERTUBE_CONTEXT_CLIENT_NAME",0)}),v(g,Uk(d,e),3);f=g.i;c.Ac=M();im(c);return g.return(f)})}
function jm(a,b){var c,d,e,f,g,h,k;return w(function(m){if(1==m.h)return c={startTime:M(),transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},v(m,gm(b),2);if(3!=m.h)return d=m.i,e=B("INNERTUBE_CONTEXT_CLIENT_NAME",0),f=[a,e,0],g=[a,e,M()],h=IDBKeyRange.bound(f,g),k=void 0,v(m,Rk(d,["LogsRequestsStore"],{mode:"readwrite",O:!0},function(n){return cl(n.objectStore("LogsRequestsStore").index("newRequestV2"),{query:h,direction:"prev"},function(t){t.getValue()&&(k=t.getValue(),"NEW"===a&&(k.status="QUEUED",
t.update(k)))})}),3);
c.Ac=M();im(c);return m.return(k)})}
function km(a,b){var c;return w(function(d){if(1==d.h)return v(d,gm(b),2);c=d.i;return d.return(Rk(c,["LogsRequestsStore"],{mode:"readwrite",O:!0},function(e){var f=e.objectStore("LogsRequestsStore");return f.get(a).then(function(g){if(g)return g.status="QUEUED",Ok(f.h.put(g,void 0)).then(function(){return g})})}))})}
function lm(a,b,c){c=void 0===c?!0:c;var d;return w(function(e){if(1==e.h)return v(e,gm(b),2);d=e.i;return e.return(Rk(d,["LogsRequestsStore"],{mode:"readwrite",O:!0},function(f){var g=f.objectStore("LogsRequestsStore");return g.get(a).then(function(h){return h?(h.status="NEW",c&&(h.sendCount+=1),Ok(g.h.put(h,void 0)).then(function(){return h})):Hk.resolve(void 0)})}))})}
function mm(a,b){var c;return w(function(d){if(1==d.h)return v(d,gm(b),2);c=d.i;return d.return(c.delete("LogsRequestsStore",a))})}
function nm(a){var b,c;return w(function(d){if(1==d.h)return v(d,gm(a),2);b=d.i;c=M()-2592E6;return v(d,Rk(b,["LogsRequestsStore"],{mode:"readwrite",O:!0},function(e){return $k(e.objectStore("LogsRequestsStore"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function om(){return w(function(a){return v(a,Fl(),0)})}
function im(a){L("nwl_csi_killswitch")||.01>=Math.random()&&Vl("nwl_transaction_latency_payload",a)}
;var pm={},qm=dm("ServiceWorkerLogsDatabase",{za:(pm.SWHealthLog={Xa:1},pm),kb:!0,upgrade:function(a,b){b(1)&&Sk(a,"SWHealthLog",{keyPath:"id",autoIncrement:!0}).h.createIndex("swHealthNewRequest",["interface","timestamp"],{unique:!1})},
version:1});function rm(a){return kl(qm(),a)}
function sm(a){var b,c;return w(function(d){if(1==d.h)return v(d,rm(a),2);b=d.i;c=M()-2592E6;return v(d,Rk(b,["SWHealthLog"],{mode:"readwrite",O:!0},function(e){return $k(e.objectStore("SWHealthLog"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return f.continue()})})}),0)})}
function tm(a){var b;return w(function(c){if(1==c.h)return v(c,rm(a),2);b=c.i;return v(c,b.clear("SWHealthLog"),0)})}
;var um={},vm=0;
function wm(a){var b=void 0===b?"":b;if(a)if(b)vi(a,void 0,"POST",b,void 0);else if(B("USE_NET_AJAX_FOR_PING_TRANSPORT",!1))vi(a,void 0,"GET","",void 0);else{b:{try{var c=new $a({url:a});if(c.j&&c.i||c.l){var d=Xb(a.match(Wb)[5]||null),e;if(!(e=!d||!d.endsWith("/aclk"))){var f=a.search(cc);d:{for(b=0;0<=(b=a.indexOf("ri",b))&&b<f;){var g=a.charCodeAt(b-1);if(38==g||63==g){var h=a.charCodeAt(b+2);if(!h||61==h||38==h||35==h){var k=b;break d}}b+=3}k=-1}if(0>k)var m=null;else{var n=a.indexOf("&",k);if(0>
n||n>f)n=f;k+=3;m=decodeURIComponent(a.substr(k,n-k).replace(/\+/g," "))}e="1"!==m}var t=!e;break b}}catch(u){}t=!1}if(t){b:{try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")){var x=!0;break b}}catch(u){}x=!1}t=x?!0:!1}else t=!1;t||xm(a)}}
function xm(a){var b=new Image,c=""+vm++;um[c]=b;b.onload=b.onerror=function(){delete um[c]};
b.src=a}
;function ym(){this.h=new Map;this.i=!1}
function zm(){if(!ym.h){var a=A("yt.networkRequestMonitor.instance")||new ym;z("yt.networkRequestMonitor.instance",a,void 0);ym.h=a}return ym.h}
ym.prototype.requestComplete=function(a,b){b&&(this.i=!0);a=this.removeParams(a);this.h.get(a)||this.h.set(a,b)};
ym.prototype.isEndpointCFR=function(a){a=this.removeParams(a);return(a=this.h.get(a))?!1:!1===a&&this.i?!0:null};
ym.prototype.removeParams=function(a){return a.split("?")[0]};
ym.prototype.removeParams=ym.prototype.removeParams;ym.prototype.isEndpointCFR=ym.prototype.isEndpointCFR;ym.prototype.requestComplete=ym.prototype.requestComplete;ym.getInstance=zm;var Am;function Bm(){Am||(Am=new Uj("yt.offline"));return Am}
function Cm(a){if(L("offline_error_handling")){var b=Bm().get("errors",!0)||{};b[a.message]={name:a.name,stack:a.stack};a.level&&(b[a.message].level=a.level);Bm().set("errors",b,2592E3,!0)}}
function Dm(){if(L("offline_error_handling")){var a=Bm().get("errors",!0);if(a){for(var b in a)if(a[b]){var c=new nk(b,"sent via offline_errors");c.name=a[b].name;c.stack=a[b].stack;c.level=a[b].level;vh(c)}Bm().set("errors",{},2592E3,!0)}}}
;var Em=lh("network_polling_interval",3E4);function O(){ue.call(this);this.L=0;this.S=this.m=!1;this.l=this.bb();L("use_shared_nsm")?(xe.h||(xe.h=new xe(Qh)),this.j=xe.h):(Fm(this),Gm(this))}
r(O,ue);function Hm(){if(!O.h){var a=A("yt.networkStatusManager.instance")||new O;z("yt.networkStatusManager.instance",a,void 0);O.h=a}return O.h}
l=O.prototype;l.G=function(){var a;return L("use_shared_nsm")&&this.j?null===(a=this.j)||void 0===a?void 0:a.G():this.l};
l.ca=function(a){var b;L("use_shared_nsm")&&this.j?null===(b=this.j)||void 0===b?void 0:b.j=a:a!==this.l&&(this.l=a)};
l.cc=function(a){!L("use_shared_nsm")&&(this.m=!0,void 0===a?0:a)&&(this.L||Im(this))};
l.bb=function(){var a=window.navigator.onLine;return void 0===a?!0:a};
l.Tb=function(){this.S=!0};
l.W=function(a,b){return L("use_shared_nsm")&&this.j?this.j.W(a,b):ue.prototype.W.call(this,a,b)};
function Gm(a){window.addEventListener("online",function(){return w(function(b){if(1==b.h)return v(b,a.fa(),2);a.S&&Dm();b.h=0})})}
function Fm(a){window.addEventListener("offline",function(){return w(function(b){return v(b,a.fa(),0)})})}
function Im(a){a.L=Kh(function(){return w(function(b){if(1==b.h)return a.l?a.bb()||!a.m?b.s(3):v(b,a.fa(),3):v(b,a.fa(),3);Im(a);b.h=0})},Em)}
l.fa=function(a){var b=this;if(L("use_shared_nsm")&&this.j){var c=ye(this.j,a);c.then(function(d){L("use_cfr_monitor")&&zm().requestComplete("generate_204",d)});
return c}return this.u?this.u:this.u=new Promise(function(d){var e,f,g;return w(function(h){switch(h.h){case 1:return e=window.AbortController?new window.AbortController:void 0,f=null===e||void 0===e?void 0:e.signal,g=!1,sa(h,2,3),e&&(b.A=Qh.M(function(){e.abort()},a||2E4)),v(h,fetch("/generate_204",{method:"HEAD",
signal:f}),5);case 5:g=!0;case 3:va(h);L("use_cfr_monitor")&&zm().requestComplete("generate_204",g);b.u=void 0;b.A&&Qh.U(b.A);g!==b.l&&(b.l=g,b.l&&b.m?ve(b,"ytnetworkstatus-online"):b.m&&ve(b,"ytnetworkstatus-offline"));d(g);wa(h);break;case 2:ua(h),g=!1,h.s(3)}})})};
O.prototype.sendNetworkCheckRequest=O.prototype.fa;O.prototype.listen=O.prototype.W;O.prototype.enableErrorFlushing=O.prototype.Tb;O.prototype.getWindowStatus=O.prototype.bb;O.prototype.monitorNetworkStatusChange=O.prototype.cc;O.prototype.networkStatusHint=O.prototype.ca;O.prototype.isNetworkAvailable=O.prototype.G;O.getInstance=Hm;function Jm(a){a=void 0===a?{}:a;ue.call(this);var b=this;this.l=this.L=0;this.m="ytnetworkstatus-offline";this.u="ytnetworkstatus-online";L("use_shared_nsm")&&(this.m="networkstatus-offline",this.u="networkstatus-online");this.j=Hm();var c=A("yt.networkStatusManager.instance.monitorNetworkStatusChange").bind(this.j);c&&c(a.tb);a.Pa&&!L("use_shared_nsm")&&(c=A("yt.networkStatusManager.instance.enableErrorFlushing").bind(this.j))&&c();if(c=A("yt.networkStatusManager.instance.listen").bind(this.j))a.Ua?
(this.Ua=a.Ua,c(this.u,function(){Km(b,"publicytnetworkstatus-online");L("use_shared_nsm")&&a.Pa&&Dm()}),c(this.m,function(){Km(b,"publicytnetworkstatus-offline")})):(c(this.u,function(){ve(b,"publicytnetworkstatus-online");
L("use_shared_nsm")&&a.Pa&&Dm()}),c(this.m,function(){ve(b,"publicytnetworkstatus-offline")}))}
r(Jm,ue);Jm.prototype.G=function(){var a=A("yt.networkStatusManager.instance.isNetworkAvailable");return a?a.bind(this.j)():!0};
Jm.prototype.ca=function(a){var b=A("yt.networkStatusManager.instance.networkStatusHint").bind(this.j);b&&b(a)};
Jm.prototype.fa=function(a){var b=this,c;return w(function(d){c=A("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.j);return L("skip_network_check_if_cfr")&&zm().isEndpointCFR("generate_204")?d.return(new Promise(function(e){var f;b.ca((null===(f=window.navigator)||void 0===f?void 0:f.onLine)||!0);e(b.G())})):c?d.return(c(a)):d.return(!0)})};
function Km(a,b){a.Ua?a.l?(Qh.U(a.L),a.L=Qh.M(function(){a.A!==b&&(ve(a,b),a.A=b,a.l=M())},a.Ua-(M()-a.l))):(ve(a,b),a.A=b,a.l=M()):ve(a,b)}
;var Lm;function Mm(){Hl.call(this,{J:{Qb:nm,ra:mm,wb:jm,ac:km,jb:lm,set:hm},I:Nm(),handleError:vh,sa:wh,ea:Om,now:M,Lb:Cm,V:Ph(),ib:"publicytnetworkstatus-online",hb:"publicytnetworkstatus-offline",Ma:!0,La:.1,Sa:lh("potential_esf_error_limit",10),B:L,ya:!ok()});this.j=new cd;L("networkless_immediately_drop_all_requests")&&om();Gl("LogsDatabaseV2")}
r(Mm,Hl);function Pm(){var a=A("yt.networklessRequestController.instance");a||(a=new Mm,z("yt.networklessRequestController.instance",a,void 0),L("networkless_logging")&&wl().then(function(b){a.v=b;Il(a);a.j.resolve();a.Ma&&Math.random()<=a.La&&a.v&&sm(a.v);L("networkless_immediately_drop_sw_health_store")&&Qm(a)}));
return a}
Mm.prototype.writeThenSend=function(a,b){b||(b={});ok()||(this.h=!1);Hl.prototype.writeThenSend.call(this,a,b)};
Mm.prototype.sendThenWrite=function(a,b,c){b||(b={});ok()||(this.h=!1);Hl.prototype.sendThenWrite.call(this,a,b,c)};
Mm.prototype.sendAndWrite=function(a,b){b||(b={});ok()||(this.h=!1);Hl.prototype.sendAndWrite.call(this,a,b)};
Mm.prototype.awaitInitialization=function(){return this.j.promise};
function Qm(a){var b;w(function(c){if(!a.v)throw b=Dk("clearSWHealthLogsDb"),b;return c.return(tm(a.v).catch(function(d){a.handleError(d)}))})}
function Om(a,b,c){L("use_cfr_monitor")&&Rm(a,b);var d;if(null===(d=b.postParams)||void 0===d?0:d.requestTimeMs)b.postParams.requestTimeMs=Math.round(M());c&&0===Object.keys(b).length?wm(a):si(a,b)}
function Nm(){Lm||(Lm=new Jm({Pa:!0,tb:!0}));return Lm}
function Rm(a,b){var c=b.onError?b.onError:function(){};
b.onError=function(e,f){zm().requestComplete(a,!1);c(e,f)};
var d=b.onSuccess?b.onSuccess:function(){};
b.onSuccess=function(e,f){zm().requestComplete(a,!0);d(e,f)}}
;var Sm=!1,Tm=0,Um=0,Vm,Wm=y.ytNetworklessLoggingInitializationOptions||{isNwlInitialized:Sm,potentialEsfErrorCounter:Um};z("ytNetworklessLoggingInitializationOptions",Wm,void 0);
function Xm(){var a;w(function(b){switch(b.h){case 1:return v(b,wl(),2);case 2:a=b.i;if(!a||!ok()&&!L("nwl_init_require_datasync_id_killswitch")){b.s(0);break}Sm=!0;Wm.isNwlInitialized=Sm;if(!L("use_new_nwl_initialization")){b.s(4);break}return v(b,Pm().awaitInitialization(),5);case 5:return Ym().W("publicytnetworkstatus-online",Zm),Ym().W("publicytnetworkstatus-offline",$m),b.return();case 4:return v(b,Gl("LogsDatabaseV2"),6);case 6:if(!(.1>=Math.random())){b.s(7);break}return v(b,nm(a),8);case 8:return v(b,
sm(a),7);case 7:an();Ym().G()&&Zm();Ym().W("publicytnetworkstatus-online",Zm);Ym().W("publicytnetworkstatus-offline",$m);if(!L("networkless_immediately_drop_sw_health_store")){b.s(10);break}return v(b,bn(),10);case 10:if(L("networkless_immediately_drop_all_requests"))return v(b,om(),0);b.s(0)}})}
function cn(a,b){function c(d){var e=Ym().G();if(!dn()||!d||e&&L("vss_networkless_bypass_write"))en(a,b);else{var f={url:a,options:b,timestamp:M(),status:"NEW",sendCount:0};hm(f,d).then(function(g){f.id=g;Ym().G()&&fn(f)}).catch(function(g){fn(f);
Ym().G()?vh(g):Cm(g)})}}
b=void 0===b?{}:b;L("skip_is_supported_killswitch")?wl().then(function(d){c(d)}):c(vl())}
function gn(a,b){function c(d){if(dn()&&d){var e={url:a,options:b,timestamp:M(),status:"NEW",sendCount:0},f=!1,g=b.onSuccess?b.onSuccess:function(){};
e.options.onSuccess=function(k,m){L("use_cfr_monitor")&&zm().requestComplete(e.url,!0);void 0!==e.id?mm(e.id,d):f=!0;L("vss_network_hint")&&Ym().ca(!0);g(k,m)};
if(L("use_cfr_monitor")){var h=b.onError?b.onError:function(){};
e.options.onError=function(k,m){zm().requestComplete(e.url,!1);h(k,m)}}en(e.url,e.options);
hm(e,d).then(function(k){e.id=k;f&&mm(e.id,d)}).catch(function(k){Ym().G()?vh(k):Cm(k)})}else en(a,b)}
b=void 0===b?{}:b;L("skip_is_supported_killswitch")?wl().then(function(d){c(d)}):c(vl())}
function Zm(){var a=vl();if(!a)throw Dk("throttleSend");Tm||(Tm=Qh.M(function(){var b;return w(function(c){if(1==c.h)return v(c,jm("NEW",a),2);if(3!=c.h)return b=c.i,b?v(c,fn(b),3):($m(),c.return());Tm&&(Tm=0,Zm());c.h=0})},100))}
function $m(){Qh.U(Tm);Tm=0}
function fn(a){var b,c,d;return w(function(e){switch(e.h){case 1:b=vl();if(!b)throw c=Dk("immediateSend"),c;if(void 0===a.id){e.s(2);break}return v(e,km(a.id,b),3);case 3:(d=e.i)?a=d:wh(Error("The request cannot be found in the database."));case 2:if(hn(a,2592E6)){e.s(4);break}wh(Error("Networkless Logging: Stored logs request expired age limit"));if(void 0===a.id){e.s(5);break}return v(e,mm(a.id,b),5);case 5:return e.return();case 4:a.skipRetry||(a=jn(a));var f=a,g,h;if(null===(h=null===(g=null===
f||void 0===f?void 0:f.options)||void 0===g?void 0:g.postParams)||void 0===h?0:h.requestTimeMs)f.options.postParams.requestTimeMs=Math.round(M());a=f;if(!a){e.s(0);break}if(!a.skipRetry||void 0===a.id){e.s(8);break}return v(e,mm(a.id,b),8);case 8:en(a.url,a.options,!!a.skipRetry),e.h=0}})}
function jn(a){var b=vl();if(!b)throw Dk("updateRequestHandlers");var c=a.options.onError?a.options.onError:function(){};
a.options.onError=function(e,f){var g;return w(function(h){switch(h.h){case 1:L("use_cfr_monitor")&&zm().requestComplete(a.url,!1);g=Ol(f);if(!(L("nwl_consider_error_code")&&g||!L("nwl_consider_error_code")&&kn()<=lh("potential_esf_error_limit",10))){h.s(2);break}if(L("skip_checking_network_on_cfr_failure")&&(!L("skip_checking_network_on_cfr_failure")||zm().isEndpointCFR(a.url))){h.s(3);break}return v(h,Ym().fa(),3);case 3:if(Ym().G()){h.s(2);break}c(e,f);if(!L("nwl_consider_error_code")||void 0===
(null===a||void 0===a?void 0:a.id)){h.s(6);break}return v(h,lm(a.id,b,!1),6);case 6:return h.return();case 2:if(L("nwl_consider_error_code")&&!g&&kn()>lh("potential_esf_error_limit",10))return h.return();A("ytNetworklessLoggingInitializationOptions")&&Wm.potentialEsfErrorCounter++;Um++;if(void 0===(null===a||void 0===a?void 0:a.id)){h.s(8);break}return 1>a.sendCount?v(h,lm(a.id,b),12):v(h,mm(a.id,b),8);case 12:Qh.M(function(){Ym().G()&&Zm()},5E3);
case 8:c(e,f),h.h=0}})};
var d=a.options.onSuccess?a.options.onSuccess:function(){};
a.options.onSuccess=function(e,f){return w(function(g){if(1==g.h)return L("use_cfr_monitor")&&zm().requestComplete(a.url,!0),void 0===(null===a||void 0===a?void 0:a.id)?g.s(2):v(g,mm(a.id,b),2);L("vss_network_hint")&&Ym().ca(!0);d(e,f);g.h=0})};
return a}
function hn(a,b){a=a.timestamp;return M()-a>=b?!1:!0}
function an(){var a=vl();if(!a)throw Dk("retryQueuedRequests");jm("QUEUED",a).then(function(b){b&&!hn(b,12E4)?Qh.M(function(){return w(function(c){if(1==c.h)return void 0===b.id?c.s(2):v(c,lm(b.id,a),2);an();c.h=0})}):Ym().G()&&Zm()})}
function bn(){var a,b;return w(function(c){a=vl();if(!a)throw b=Dk("clearSWHealthLogsDb"),b;return c.return(tm(a).catch(function(d){vh(d)}))})}
function Ym(){if(L("use_new_nwl"))return Nm();Vm||(Vm=new Jm({Pa:!0,tb:!0}));return Vm}
function en(a,b,c){c&&0===Object.keys(b).length?wm(a):si(a,b)}
function dn(){return A("ytNetworklessLoggingInitializationOptions")?Wm.isNwlInitialized:Sm}
function kn(){return A("ytNetworklessLoggingInitializationOptions")?Wm.potentialEsfErrorCounter:Um}
;function ln(a){var b=this;this.config_=null;a?this.config_=a:Mj()&&(this.config_=gj());Kh(function(){Zj(b)},5E3)}
ln.prototype.isReady=function(){!this.config_&&Mj()&&(this.config_=gj());return!!this.config_};
function kj(a,b,c,d){function e(C){C=void 0===C?!1:C;var D;if(d.retry&&"www.youtube-nocookie.com"!=h&&(C||L("skip_ls_gel_retry")||"application/json"!==g.headers["Content-Type"]||(D=Xj(b,c,m,k)),D)){var K=g.onSuccess,N=g.onFetchSuccess;g.onSuccess=function(S,W){Yj(D);K(S,W)};
c.onFetchSuccess=function(S,W){Yj(D);N(S,W)}}try{C&&d.retry&&!d.Bb.bypassNetworkless?(g.method="POST",d.Bb.writeThenSend?L("use_new_nwl")?Pm().writeThenSend(u,g):cn(u,g):L("use_new_nwl")?Pm().sendAndWrite(u,g):gn(u,g)):(g.method="POST",g.postParams||(g.postParams={}),si(u,g))}catch(S){if("InvalidAccessError"==S.name)D&&(Yj(D),D=0),wh(Error("An extension is blocking network request."));
else throw S;}D&&Kh(function(){Zj(a)},5E3)}
!B("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&wh(new nk("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var f=new nk("innertube xhrclient not ready",b,c,d);vh(f);throw f;}var g={headers:d.headers||{},method:"POST",postParams:c,postBody:d.postBody,postBodyFormat:d.postBodyFormat||"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(C,D){if(d.onSuccess)d.onSuccess(D)},
onFetchSuccess:function(C){if(d.onSuccess)d.onSuccess(C)},
onError:function(C,D){if(d.onError)d.onError(D)},
onFetchError:function(C){if(d.onError)d.onError(C)},
timeout:d.timeout,withCredentials:!0};g.headers["Content-Type"]||(g.headers["Content-Type"]="application/json");var h="";(f=a.config_.Xb)&&(h=f);var k=a.config_.Zb||!1,m=Sj(k,h,d);Object.assign(g.headers,m);(f=g.headers.Authorization)&&!h&&(g.headers["x-origin"]=window.location.origin);var n="/youtubei/"+a.config_.innertubeApiVersion+"/"+b,t={alt:"json"},x=a.config_.Yb&&f;x=x&&f.startsWith("Bearer");x||(t.key=a.config_.innertubeApiKey);var u=gi(""+h+n,t||{},!0);L("use_new_nwl")&&Pm().h||!L("use_new_nwl")&&
dn()?ul().then(function(C){e(C)}):e(!1)}
;function kk(a,b,c){c=void 0===c?{}:c;var d=ln;B("ytLoggingEventsDefaultDisabled",!1)&&ln==ln&&(d=null);rj(a,b,d,c)}
;var mn=[{gb:function(a){return"Cannot read property '"+a.key+"'"},
Ra:{Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}],TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]},{regexp:/(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,groups:["value","base","key"]}]}},{gb:function(a){return"Cannot call '"+a.key+"'"},
Ra:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}},{gb:function(a){return a.key+" is not defined"},
Ra:{ReferenceError:[{regexp:/(.*) is not defined/,groups:["key"]},{regexp:/Can't find variable: (.*)/,groups:["key"]}]}}];var on={ia:[],ha:[{la:nn,weight:500}]};function nn(a){if("JavaException"===a.name)return!0;a=a.stack;return a.includes("chrome://")||a.includes("chrome-extension://")||a.includes("moz-extension://")}
;function pn(){this.ha=[];this.ia=[]}
var qn;function rn(){if(!qn){var a=qn=new pn;a.ia.length=0;a.ha.length=0;on.ia&&a.ia.push.apply(a.ia,on.ia);on.ha&&a.ha.push.apply(a.ha,on.ha)}return qn}
;var sn=new J;function tn(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=un(b);if(Infinity===e)break;var f=e>>3;switch(e&7){case 0:e=un(b);if(2===f)return e;break;case 1:if(2===f)return;d+=8;break;case 2:e=un(b);if(2===f)return a.substr(d,e);d+=e;break;case 5:if(2===f)return;d+=4;break;default:return}}while(d<c)}
function un(a){var b=a(),c=b&127;if(128>b)return c;b=a();c|=(b&127)<<7;if(128>b)return c;b=a();c|=(b&127)<<14;if(128>b)return c;b=a();return 128>b?c|(b&127)<<21:Infinity}
;function vn(a,b,c,d){if(a)if(Array.isArray(a)){var e=d;for(d=0;d<a.length&&!(a[d]&&(e+=wn(d,a[d],b,c),500<e));d++);d=e}else if("object"===typeof a)for(e in a){if(a[e]){var f=a[e];var g=b;var h=c;g="string"!==typeof f||"clickTrackingParams"!==e&&"trackingParams"!==e?0:(f=tn(atob(f.replace(/-/g,"+").replace(/_/g,"/"))))?wn(e+".ve",f,g,h):0;d+=g;d+=wn(e,a[e],b,c);if(500<d)break}}else c[b]=xn(a),d+=c[b].length;else c[b]=xn(a),d+=c[b].length;return d}
function wn(a,b,c,d){c+="."+a;a=xn(b);d[c]=a;return c.length+a.length}
function xn(a){try{return("string"===typeof a?a:String(JSON.stringify(a))).substr(0,500)}catch(b){return"unable to serialize "+typeof a+" ("+b.message+")"}}
;var yn=new Set,zn=0,An=0,Bn=0,Cn=[],Dn=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function jk(a){En(a)}
function Fn(a){En(a,"WARNING")}
function En(a,b,c,d,e,f){f=void 0===f?{}:f;f.name=c||B("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||B("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);c=f||{};b=void 0===b?"ERROR":b;b=void 0===b?"ERROR":b;if(a&&(a.hasOwnProperty("level")&&a.level&&(b=a.level),L("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),a.hasOwnProperty("args")&&d.push("Error args: "+JSON.stringify(a.args)),d.push("File name: "+
a.fileName),d.push("Stacktrace: "+a.stack),window.console.log(d.join("\n"),a)),!(5<=zn))){d=Cn;var g=Td(a);e=g.message||"Unknown Error";f=g.name||"UnknownError";var h=g.stack||a.i||"Not available";if(h.startsWith(f+": "+e)){var k=h.split("\n");k.shift();h=k.join("\n")}k=g.lineNumber||"Not available";g=g.fileName||"Not available";var m=0;if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var n=0;n<a.args.length&&!(m=vn(a.args[n],"params."+n,c,m),500<=m);n++);else if(a.hasOwnProperty("params")&&
a.params){var t=a.params;if("object"===typeof a.params)for(n in t){if(t[n]){var x="params."+n,u=xn(t[n]);c[x]=u;m+=x.length+u.length;if(500<m)break}}else c.params=xn(t)}if(d.length)for(n=0;n<d.length&&!(m=vn(d[n],"params.context."+n,c,m),500<=m);n++);navigator.vendor&&!c.hasOwnProperty("vendor")&&(c["device.vendor"]=navigator.vendor);n={message:e,name:f,lineNumber:k,fileName:g,stack:h,params:c,sampleWeight:1};c=Number(a.columnNumber);isNaN(c)||(n.lineNumber=n.lineNumber+":"+c);if("IGNORED"===a.level)a=
0;else a:{a=rn();c=q(a.ia);for(d=c.next();!d.done;d=c.next())if(d=d.value,n.message&&n.message.match(d.wo)){a=d.weight;break a}a=q(a.ha);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.la(n)){a=c.weight;break a}a=1}n.sampleWeight=a;a=q(mn);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.Ra[n.name])for(e=q(c.Ra[n.name]),d=e.next();!d.done;d=e.next())if(f=d.value,d=n.message.match(f.regexp)){n.params["params.error.original"]=d[0];e=f.groups;f={};for(k=0;k<e.length;k++)f[e[k]]=d[k+1],n.params["params.error."+
e[k]]=d[k+1];n.message=c.gb(f);break}n.params||(n.params={});a=rn();n.params["params.errorServiceSignature"]="msg="+a.ia.length+"&cb="+a.ha.length;n.params["params.serviceWorker"]="false";y.document&&y.document.querySelectorAll&&(n.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));Ab("sample").constructor!==xb&&(n.params["params.fconst"]="true");window.yterr&&"function"===typeof window.yterr&&window.yterr(n);if(0!==n.sampleWeight&&!yn.has(n.message)){"ERROR"===
b?(sn.ka("handleError",n),L("record_app_crashed_web")&&0===Bn&&1===n.sampleWeight&&(Bn++,a={appCrashType:"APP_CRASH_TYPE_BREAKPAD"},L("report_client_error_with_app_crash_ks")||(a.systemHealth={crashData:{clientError:{logMessage:{message:n.message}}}}),kk("appCrashed",a)),An++):"WARNING"===b&&sn.ka("handleWarning",n);if(L("kevlar_gel_error_routing")){a=b;b:{c=q(Dn);for(d=c.next();!d.done;d=c.next())if(bk(d.value.toLowerCase())){c=!0;break b}c=!1}if(c)c=void 0;else{d={stackTrace:n.stack};n.fileName&&
(d.filename=n.fileName);c=n.lineNumber&&n.lineNumber.split?n.lineNumber.split(":"):[];0!==c.length&&(1!==c.length||isNaN(Number(c[0]))?2!==c.length||isNaN(Number(c[0]))||isNaN(Number(c[1]))||(d.lineNumber=Number(c[0]),d.columnNumber=Number(c[1])):d.lineNumber=Number(c[0]));c={level:"ERROR_LEVEL_UNKNOWN",message:n.message,errorClassName:n.name,sampleWeight:n.sampleWeight};"ERROR"===a?c.level="ERROR_LEVEL_ERROR":"WARNING"===a&&(c.level="ERROR_LEVEL_WARNNING");d={isObfuscated:!0,browserStackInfo:d};
e={pageUrl:window.location.href,kvPairs:[]};B("FEXP_EXPERIMENTS")&&(e.experimentIds=B("FEXP_EXPERIMENTS"));f=B("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0);k=ch.EXPERIMENT_FLAGS;if((!k||!k.web_disable_gel_stp_ecatcher_killswitch)&&f)for(g=q(Object.keys(f)),k=g.next();!k.done;k=g.next())k=k.value,e.kvPairs.push({key:k,value:String(f[k])});if(f=n.params)for(g=q(Object.keys(f)),k=g.next();!k.done;k=g.next())k=k.value,e.kvPairs.push({key:"client."+k,value:String(f[k])});f=jh("SERVER_NAME");k=jh("SERVER_VERSION");
f&&k&&(e.kvPairs.push({key:"server.name",value:f}),e.kvPairs.push({key:"server.version",value:k}));c={errorMetadata:e,stackTrace:d,logMessage:c}}c&&(kk("clientError",c),("ERROR"===a||L("errors_flush_gel_always_killswitch"))&&$i())}if(!L("suppress_error_204_logging")){a=n.params||{};b={urlParams:{a:"logerror",t:"jserror",type:n.name,msg:n.message.substr(0,250),line:n.lineNumber,level:b,"client.name":a.name},postParams:{url:B("PAGE_NAME",window.location.href),file:n.fileName},method:"POST"};a.version&&
(b["client.version"]=a.version);if(b.postParams){n.stack&&(b.postParams.stack=n.stack);c=q(Object.keys(a));for(d=c.next();!d.done;d=c.next())d=d.value,b.postParams["client."+d]=a[d];if(a=B("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(c=q(Object.keys(a)),d=c.next();!d.done;d=c.next())d=d.value,b.postParams[d]=a[d];a=B("SERVER_NAME",void 0);c=B("SERVER_VERSION",void 0);a&&c&&(b.postParams["server.name"]=a,b.postParams["server.version"]=c)}si(B("ECATCHER_REPORT_HOST","")+"/error_204",b)}try{yn.add(n.message)}catch(C){}zn++}}}
function Gn(a){var b=Da.apply(1,arguments),c=a;c.args||(c.args=[]);c.args.push.apply(c.args,ha(b))}
;function Hn(){this.register=new Map}
function In(a){a=q(a.register.values());for(var b=a.next();!b.done;b=a.next())b.value.zo("ABORTED")}
Hn.prototype.clear=function(){In(this);this.register.clear()};
var Jn=new Hn;var Kn=Date.now().toString();
function Ln(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=Date.now();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(Kn)for(a=1,b=0;b<Kn.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^Kn.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var Mn,Nn=y.ytLoggingDocDocumentNonce_;Nn||(Nn=Ln(),Va("ytLoggingDocDocumentNonce_",Nn));Mn=Nn;var On={ng:0,nd:1,vd:2,Pj:3,pg:4,Kn:5,Fk:6,em:7,Gl:8,0:"DEFAULT",1:"CHAT",2:"CONVERSATIONS",3:"MINIPLAYER",4:"DIALOG",5:"VOZ",6:"MUSIC_WATCH_TABS",7:"SHARE",8:"PUSH_NOTIFICATIONS"};function Pn(a){this.h=a}
function Qn(a){return new Pn({trackingParams:a})}
Pn.prototype.getAsJson=function(){var a={};void 0!==this.h.trackingParams?a.trackingParams=this.h.trackingParams:(a.veType=this.h.veType,void 0!==this.h.veCounter&&(a.veCounter=this.h.veCounter),void 0!==this.h.elementIndex&&(a.elementIndex=this.h.elementIndex));void 0!==this.h.dataElement&&(a.dataElement=this.h.dataElement.getAsJson());void 0!==this.h.youtubeData&&(a.youtubeData=this.h.youtubeData);return a};
Pn.prototype.getAsJspb=function(){var a=new ug;void 0!==this.h.trackingParams?F(a,1,this.h.trackingParams):(void 0!==this.h.veType&&F(a,2,this.h.veType),void 0!==this.h.veCounter&&F(a,6,this.h.veCounter),void 0!==this.h.elementIndex&&F(a,3,this.h.elementIndex));if(void 0!==this.h.dataElement){var b=this.h.dataElement.getAsJspb();G(a,7,b)}void 0!==this.h.youtubeData&&G(a,8,this.h.jspbYoutubeData);return a};
Pn.prototype.toString=function(){return JSON.stringify(this.getAsJson())};
Pn.prototype.isClientVe=function(){return!this.h.trackingParams&&!!this.h.veType};function Rn(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function Sn(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function Tn(a){return B(Sn(void 0===a?0:a),void 0)}
z("yt_logging_screen.getRootVeType",Tn,void 0);function Un(a){return(a=Tn(void 0===a?0:a))?new Pn({veType:a,youtubeData:void 0,jspbYoutubeData:void 0}):null}
function Vn(){var a=B("csn-to-ctt-auth-info");a||(a={},ih("csn-to-ctt-auth-info",a));return a}
function Wn(a){a=void 0===a?0:a;var b=B(Rn(a));if(!b&&!B("USE_CSN_FALLBACK",!0))return null;b||!L("use_undefined_csn_any_layer")&&0!=a||(b="UNDEFINED_CSN");return b?b:null}
z("yt_logging_screen.getCurrentCsn",Wn,void 0);function Xn(a,b,c){var d=Vn();(c=Wn(c))&&delete d[c];b&&(d[a]=b)}
function Yn(a){return Vn()[a]}
z("yt_logging_screen.getCttAuthInfo",Yn,void 0);function Zn(a,b,c,d){c=void 0===c?0:c;if(a!==B(Rn(c))||b!==B(Sn(c)))Xn(a,d,c),ih(Rn(c),a),ih(Sn(c),b),b=function(){setTimeout(function(){if(a){var e={clientDocumentNonce:Mn,clientScreenNonce:a};L("use_default_heartbeat_client")?kk("foregroundHeartbeatScreenAssociated",e):rj("foregroundHeartbeatScreenAssociated",e,ln)}},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b()}
z("yt_logging_screen.setCurrentScreen",Zn,void 0);var $n=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};z("yt.msgs_",$n,void 0);function ao(a){Yg($n,arguments)}
;var bo={md:3611,Bc:27686,Cc:85013,Dc:23462,Fc:42016,Gc:62407,Hc:26926,Ec:43781,Ic:51236,Jc:79148,Kc:50160,Lc:77504,Xc:87907,Yc:18630,Zc:54445,bd:80935,cd:105675,dd:37521,ed:47786,fd:98349,gd:123695,hd:6827,jd:29434,kd:7282,ld:124448,pd:32276,od:76278,qd:93911,rd:106531,sd:27259,td:27262,ud:27263,wd:21759,xd:27107,yd:62936,zd:49568,Ad:38408,Bd:80637,Cd:68727,Dd:68728,Ed:80353,Fd:80356,Gd:74610,Hd:45707,Id:83962,Jd:83970,Kd:46713,Ld:89711,Md:74612,Nd:93265,Od:74611,Pd:131380,Rd:128979,Sd:139311,Td:128978,
Qd:131391,Ud:105350,Wd:139312,Xd:134800,Vd:131392,Zd:113533,ae:93252,be:99357,de:94521,ee:114252,ge:113532,he:94522,ce:94583,ie:88E3,je:139580,ke:93253,le:93254,me:94387,ne:94388,oe:93255,pe:97424,Yd:72502,qe:110111,re:76019,te:117092,ue:117093,se:89431,we:110466,xe:77240,ye:60508,ze:137401,Ae:137402,Be:137046,Ce:73393,De:113534,Ee:92098,Fe:131381,Ge:84517,He:83759,Ie:80357,Je:86113,Ke:72598,Le:72733,Me:107349,Ne:124275,Oe:118203,Pe:133275,Qe:133274,Re:133272,Se:133273,Te:133276,Ue:144507,Ve:143247,
We:143248,Xe:143249,Ye:143250,Ze:143251,af:144401,cf:117431,bf:133797,df:128572,ef:133405,ff:117429,gf:117430,hf:117432,jf:120080,kf:117259,lf:121692,mf:132972,nf:133051,pf:133658,qf:132971,rf:97615,tf:143359,sf:143356,vf:143361,uf:143358,xf:143360,wf:143357,yf:142303,zf:143353,Af:143354,Bf:144479,Cf:143355,Df:31402,Ff:133624,Gf:133623,Hf:133622,Ef:133621,If:84774,Jf:95117,Kf:98930,Lf:98931,Mf:98932,Nf:43347,Of:129889,Pf:45474,Qf:100352,Rf:84758,Sf:98443,Tf:117985,Uf:74613,Vf:74614,Wf:64502,Xf:136032,
Yf:74615,Zf:74616,ag:122224,cg:74617,dg:77820,eg:74618,fg:93278,gg:93274,hg:93275,ig:93276,jg:22110,kg:29433,lg:133798,mg:132295,og:120541,qg:82047,rg:113550,sg:75836,tg:75837,ug:42352,vg:84512,wg:76065,xg:75989,yg:16623,zg:32594,Ag:27240,Bg:32633,Cg:74858,Eg:3945,Dg:16989,Fg:45520,Gg:25488,Hg:25492,Ig:25494,Jg:55760,Kg:14057,Lg:18451,Mg:57204,Ng:57203,Og:17897,Pg:57205,Qg:18198,Rg:17898,Sg:17909,Tg:43980,Ug:46220,Vg:11721,Wg:49954,Xg:96369,Yg:3854,Zg:56251,ah:25624,sh:16906,th:99999,uh:68172,vh:27068,
wh:47973,xh:72773,yh:26970,zh:26971,Ah:96805,Bh:17752,Ch:73233,Dh:109512,Eh:22256,Fh:14115,Gh:22696,Hh:89278,Ih:89277,Jh:109513,Kh:43278,Lh:43459,Mh:43464,Nh:89279,Oh:43717,Ph:55764,Qh:22255,Rh:89281,Sh:40963,Th:43277,Uh:43442,Vh:91824,Wh:120137,Xh:96367,Yh:36850,Zh:72694,ai:37414,bi:36851,di:124863,ci:121343,fi:73491,gi:54473,hi:43375,ii:46674,ji:143815,ki:139095,li:144402,mi:32473,ni:72901,oi:72906,ri:50947,si:50612,ti:50613,vi:50942,wi:84938,xi:84943,yi:84939,zi:84941,Ai:84944,Bi:84940,Ci:84942,
Di:35585,Ei:51926,Fi:79983,Gi:63238,Hi:18921,Ii:63241,Ji:57893,Ki:41182,Li:135732,Mi:33424,Ni:22207,Oi:42993,Pi:36229,Qi:22206,Ri:22205,Si:18993,Ti:19001,Ui:18990,Vi:18991,Wi:18997,Xi:18725,Yi:19003,Zi:36874,aj:44763,bj:33427,cj:67793,dj:22182,ej:37091,fj:34650,gj:50617,hj:47261,ij:22287,jj:25144,kj:97917,lj:62397,mj:125598,nj:137935,oj:36961,pj:108035,qj:27426,rj:27857,sj:27846,tj:27854,uj:69692,vj:61411,wj:39299,xj:38696,yj:62520,zj:36382,Aj:108701,Bj:50663,Cj:36387,Dj:14908,Ej:37533,Fj:105443,
Gj:61635,Hj:62274,Ij:133818,Jj:65702,Kj:65703,Lj:65701,Mj:76256,Nj:37671,Oj:49953,Qj:36216,Rj:28237,Sj:39553,Tj:29222,Uj:26107,Vj:38050,Wj:26108,Yj:120745,Xj:26109,Zj:26110,ak:66881,bk:28236,ck:14586,dk:57929,ek:74723,fk:44098,gk:44099,jk:23528,kk:61699,hk:134104,ik:134103,lk:59149,mk:101951,nk:97346,pk:118051,qk:95102,rk:64882,sk:119505,tk:63595,uk:63349,vk:95101,wk:75240,xk:27039,yk:68823,zk:21537,Ak:83464,Bk:75707,Ck:83113,Dk:101952,Ek:101953,Gk:79610,Hk:125755,Ik:24402,Jk:24400,Kk:32925,Lk:57173,
Mk:122502,Nk:138480,Ok:64423,Pk:64424,Qk:33986,Rk:100828,Sk:129089,Tk:21409,Xk:135155,Yk:135156,Zk:135157,al:135158,bl:135159,dl:135160,fl:135161,il:135162,jl:135163,kl:135164,ll:135165,ml:135166,Uk:11070,Vk:11074,Wk:17880,nl:14001,pl:30709,ql:30707,rl:30711,sl:30710,ul:30708,ol:26984,vl:63648,wl:63649,xl:51879,yl:111059,zl:5754,Al:20445,Cl:130975,Bl:130976,Dl:110386,El:113746,Fl:66557,Hl:17310,Il:28631,Jl:21589,Kl:68012,Ll:60480,Ml:138664,Nl:141121,Ol:31571,Pl:141978,Ql:76980,Rl:41577,Sl:45469,Tl:38669,
Ul:13768,Vl:13777,Wl:141842,Xl:62985,Yl:4724,Zl:59369,am:43927,bm:43928,cm:12924,dm:100355,gm:56219,hm:27669,im:10337,fm:47896,jm:122629,lm:139723,km:139722,mm:121258,nm:107598,om:127991,pm:96639,qm:107536,rm:130169,sm:96661,tm:96658,um:116646,vm:121122,wm:96660,xm:127738,ym:127083,zm:104443,Am:96659,Bm:106442,Cm:134840,Dm:63667,Em:63668,Fm:63669,Gm:130686,Hm:78314,Im:55761,Jm:127098,Km:134841,Lm:96368,Mm:67374,Nm:48992,Om:49956,Pm:31961,Qm:26388,Rm:23811,Sm:5E4,Tm:126250,Um:96370,Vm:47355,Wm:47356,
Xm:37935,Ym:45521,Zm:21760,an:83769,bn:49977,cn:49974,dn:93497,en:93498,fn:34325,gn:140759,hn:115803,jn:123707,kn:100081,ln:35309,mn:68314,nn:25602,pn:100339,qn:143516,rn:59018,sn:18248,tn:50625,un:9729,vn:37168,wn:37169,xn:21667,yn:16749,zn:18635,An:39305,Bn:18046,Cn:53969,Dn:8213,En:93926,Fn:102852,Gn:110099,Hn:22678,In:69076,Jn:137575,Ln:139224,Mn:100856,Nn:17736,On:3832,Pn:55759,Qn:64031,Wn:93044,Xn:93045,Yn:34388,Zn:17657,ao:17655,bo:39579,co:39578,eo:77448,fo:8196,ho:11357,jo:69877,ko:8197,
lo:82039};function co(){var a=rb(eo),b;return Ff(new yf(function(c,d){a.onSuccess=function(e){mi(e)?c(new fo(e)):d(new go("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new go("Unknown request error","net.unknown",e))};
a.onTimeout=function(e){d(new go("Request timed out","net.timeout",e))};
b=si("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof Gf&&b.abort();
return Df(c)})}
function go(a,b,c){Za.call(this,a+", errorCode="+b);this.errorCode=b;this.xhr=c;this.name="PromiseAjaxError"}
r(go,Za);function fo(a){this.xhr=a}
;function ho(){this.i=0;this.h=null}
ho.prototype.then=function(a,b,c){return 1===this.i&&a?(a=a.call(c,this.h),xf(a)?a:io(a)):2===this.i&&b?(a=b.call(c,this.h),xf(a)?a:jo(a)):this};
ho.prototype.getValue=function(){return this.h};
ho.prototype.$goog_Thenable=!0;function jo(a){var b=new ho;a=void 0===a?null:a;b.i=2;b.h=void 0===a?null:a;return b}
function io(a){var b=new ho;a=void 0===a?null:a;b.i=1;b.h=void 0===a?null:a;return b}
;function ko(){if(Md())return!0;var a=B("INNERTUBE_CLIENT_NAME");return!a||"WEB"!==a&&"MWEB"!==a||ak&&bk("applewebkit")&&!bk("version")&&(!bk("safari")||bk("gsa/"))||kc&&bk("version/")?!0:(a=xj("CONSENT"))?a.startsWith("YES+"):!0}
;function lo(a){Za.call(this,a.message||a.description||a.name);this.isMissing=a instanceof mo;this.isTimeout=a instanceof go&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Gf}
r(lo,Za);lo.prototype.name="BiscottiError";function mo(){Za.call(this,"Biscotti ID is missing from server")}
r(mo,Za);mo.prototype.name="BiscottiMissingError";var eo={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},no=null;function Xh(){if(L("disable_biscotti_fetch_entirely_for_all_web_clients"))return Df(Error("Biscotti id fetching has been disabled entirely."));if(!ko())return Df(Error("User has not consented - not fetching biscotti id."));if("1"==pb())return Df(Error("Biscotti ID is not available in private embed mode"));no||(no=Ff(co().then(oo),function(a){return po(2,a)}));
return no}
function oo(a){a=a.xhr.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new mo;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new mo;a=a.id;Yh(a);no=io(a);qo(18E5,2);return a}
function po(a,b){b=new lo(b);Yh("");no=jo(b);0<a&&qo(12E4,a-1);throw b;}
function qo(a,b){Gh(function(){Ff(co().then(oo,function(c){return po(b,c)}),Ia)},a)}
function ro(){try{var a=A("yt.ads.biscotti.getId_");return a?a():Xh()}catch(b){return Df(b)}}
;function so(a){if("1"!=pb()){a&&Wh();try{ro().then(function(){},function(){}),Gh(so,18E5)}catch(b){vh(b)}}}
;function to(){this.yc=!0}
function uo(a){var b={},c=Od([]);c&&(b.Authorization=c,c=a=null===a||void 0===a?void 0:a.sessionIndex,void 0===c&&(c=Number(B("SESSION_INDEX",0)),c=isNaN(c)?0:c),b["X-Goog-AuthUser"]=c,"INNERTUBE_HOST_OVERRIDE"in ch||(b["X-Origin"]=window.location.origin),void 0===a&&"DELEGATED_SESSION_ID"in ch&&(b["X-Goog-PageId"]=B("DELEGATED_SESSION_ID")));return b}
;var vo={identityType:"UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"};var wo=new Map([["dark","USER_INTERFACE_THEME_DARK"],["light","USER_INTERFACE_THEME_LIGHT"]]),xo=["/fashion","/feed/fashion_destination","/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ"];function yo(){var a=void 0===a?window.location.href:a;if(L("kevlar_disable_theme_param"))return null;var b=Xb(a.match(Wb)[5]||null);if(zo(b))return"USER_INTERFACE_THEME_DARK";try{var c=fi(a).theme;return wo.get(c)||null}catch(d){}return null}
function zo(a){var b=xo.map(function(c){return c.toLowerCase()});
return!L("disable_dark_fashion_destination_launch")&&b.some(function(c){return a.toLowerCase().startsWith(c)})?!0:!1}
;function Ao(){this.h={};if(this.i=yj()){var a=xj("CONSISTENCY");a&&Bo(this,{encryptedTokenJarContents:a})}}
Ao.prototype.handleResponse=function(a,b){var c,d,e;b=(null===(d=null===(c=b.ba.context)||void 0===c?void 0:c.request)||void 0===d?void 0:d.consistencyTokenJars)||[];(a=null===(e=a.responseContext)||void 0===e?void 0:e.consistencyTokenJar)&&this.replace(b,a)};
Ao.prototype.replace=function(a,b){a=q(a);for(var c=a.next();!c.done;c=a.next())delete this.h[c.value.encryptedTokenJarContents];Bo(this,b)};
function Bo(a,b){if(b.encryptedTokenJarContents&&(a.h[b.encryptedTokenJarContents]=b,"string"===typeof b.expirationSeconds)){var c=Number(b.expirationSeconds);setTimeout(function(){delete a.h[b.encryptedTokenJarContents]},1E3*c);
a.i&&wj("CONSISTENCY",b.encryptedTokenJarContents,c,void 0,!0)}}
;var Co=window.location.hostname.split(".").slice(-2).join(".");function Do(){var a=B("LOCATION_PLAYABILITY_TOKEN");"TVHTML5"===B("INNERTUBE_CLIENT_NAME")&&(this.h=Eo(this))&&(a=this.h.get("yt-location-playability-token"));a&&(this.locationPlayabilityToken=a,this.i=void 0)}
var Fo;Do.getInstance=function(){Fo=A("yt.clientLocationService.instance");Fo||(Fo=new Do,z("yt.clientLocationService.instance",Fo,void 0));return Fo};
Do.prototype.setLocationOnInnerTubeContext=function(a){a.client||(a.client={});this.i?(a.client.locationInfo||(a.client.locationInfo={}),a.client.locationInfo.latitudeE7=1E7*this.i.coords.latitude,a.client.locationInfo.longitudeE7=1E7*this.i.coords.longitude,a.client.locationInfo.horizontalAccuracyMeters=this.i.coords.accuracy,a.client.locationInfo.forceLocationPlayabilityTokenRefresh=!0):this.locationPlayabilityToken&&(a.client.locationPlayabilityToken=this.locationPlayabilityToken)};
Do.prototype.handleResponse=function(a){var b;a=null===(b=a.responseContext)||void 0===b?void 0:b.locationPlayabilityToken;void 0!==a&&(this.locationPlayabilityToken=a,this.i=void 0,"TVHTML5"===B("INNERTUBE_CLIENT_NAME")?(this.h=Eo(this))&&this.h.set("yt-location-playability-token",a,15552E3):wj("YT_CL",JSON.stringify({loctok:a}),15552E3,Co,!0))};
function Eo(a){return void 0===a.h?new Uj("yt-client-location"):a.h}
Do.prototype.getCurrentPositionFromGeolocation=function(){var a=this;if(!(navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition)||!L("web_enable_browser_geolocation_api")&&!L("enable_handoff_location_2fa_on_mweb"))return Promise.reject(Error("Geolocation unsupported"));var b=!1,c=1E4;L("enable_handoff_location_2fa_on_mweb")&&(b=!0,c=15E3);return new Promise(function(d,e){navigator.geolocation.getCurrentPosition(function(f){a.i=f;d(f)},function(f){e(f)},{enableHighAccuracy:b,
maximumAge:0,timeout:c})})};
Do.prototype.createUnpluggedLocationInfo=function(a){var b={};a=a.coords;if(null===a||void 0===a?0:a.latitude)b.latitudeE7=Math.floor(1E7*a.latitude);if(null===a||void 0===a?0:a.longitude)b.longitudeE7=Math.floor(1E7*a.longitude);if(null===a||void 0===a?0:a.accuracy)b.locationRadiusMeters=Math.round(a.accuracy);return b};function Go(a,b){var c,d;if((null===(c=a.signalServiceEndpoint)||void 0===c?0:c.signal)&&b.Ba){var e=b.Ba[a.signalServiceEndpoint.signal];if(e)return e()}if((null===(d=a.continuationCommand)||void 0===d?0:d.request)&&b.Rb&&(e=b.Rb[a.continuationCommand.request]))return e();for(var f in a)if(b.pb[f]&&(a=b.pb[f]))return a()}
;function Ho(a){return function(){return new a}}
;var Io={},Jo=(Io.WEB_UNPLUGGED="^unplugged/",Io.WEB_UNPLUGGED_ONBOARDING="^unplugged/",Io.WEB_UNPLUGGED_OPS="^unplugged/",Io.WEB_UNPLUGGED_PUBLIC="^unplugged/",Io.WEB_CREATOR="^creator/",Io.WEB_KIDS="^kids/",Io.WEB_EXPERIMENTS="^experiments/",Io.WEB_MUSIC="^music/",Io.WEB_REMIX="^music/",Io.WEB_MUSIC_EMBEDDED_PLAYER="^music/",Io.WEB_MUSIC_EMBEDDED_PLAYER="^main_app/|^sfv/",Io);
function Ko(a){var b=void 0===b?"UNKNOWN_INTERFACE":b;if(1===a.length)return a[0];var c=Jo[b];if(c){var d=new RegExp(c),e=q(a);for(c=e.next();!c.done;c=e.next())if(c=c.value,d.exec(c))return c}var f=[];Object.entries(Jo).forEach(function(g){var h=q(g);g=h.next().value;h=h.next().value;b!==g&&f.push(h)});
d=new RegExp(f.join("|"));a.sort(function(g,h){return g.length-h.length});
e=q(a);for(c=e.next();!c.done;c=e.next())if(c=c.value,!d.exec(c))return c;return a[0]}
;function Lo(a,b){return{method:void 0===b?"POST":b,mode:hi(a)?"same-origin":"cors",credentials:hi(a)?"same-origin":"include"}}
;function Mo(){}
Mo.prototype.o=function(a,b,c){b=void 0===b?{}:b;c=void 0===c?vo:c;var d;var e=a.clickTrackingParams,f=this.l,g=!1;g=void 0===g?!1:g;f=void 0===f?!1:f;var h=B("INNERTUBE_CONTEXT");if(h){h=sb(h);L("web_no_tracking_params_in_shell_killswitch")||delete h.clickTracking;var k,m;h.client||(h.client={});var n=h.client;"MWEB"===n.clientName&&(n.clientFormFactor=B("IS_TABLET")?"LARGE_FORM_FACTOR":"SMALL_FORM_FACTOR");n.screenWidthPoints=window.innerWidth;n.screenHeightPoints=window.innerHeight;n.screenPixelDensity=
Math.round(window.devicePixelRatio||1);n.screenDensityFloat=window.devicePixelRatio||1;n.utcOffsetMinutes=-Math.floor((new Date).getTimezoneOffset());var t=void 0===t?!1:t;Aj.getInstance();var x="USER_INTERFACE_THEME_LIGHT";Dj(165)?x="USER_INTERFACE_THEME_DARK":Dj(174)?x="USER_INTERFACE_THEME_LIGHT":!L("kevlar_legacy_browsers")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme)").matches&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(x="USER_INTERFACE_THEME_DARK");t=t?x:yo()||
x;n.userInterfaceTheme=t;if(!g){if(t=Kj())n.connectionType=t;L("web_log_effective_connection_type")&&(t=Lj())&&(h.client.effectiveConnectionType=t)}L("web_log_memory_total_kbytes")&&(null===(k=y.navigator)||void 0===k?0:k.deviceMemory)&&(k=null===(m=y.navigator)||void 0===m?void 0:m.deviceMemory,h.client.memoryTotalKbytes=""+1E6*k);m=fi(y.location.href);!L("web_populate_internal_geo_killswitch")&&m.internalcountrycode&&(n.internalGeo=m.internalcountrycode);"MWEB"===n.clientName||"WEB"===n.clientName?
(n.mainAppWebInfo={graftUrl:y.location.href},L("kevlar_woffle")&&tj.h&&(n.mainAppWebInfo.pwaInstallabilityStatus=tj.h.h?"PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED":"PWA_INSTALLABILITY_STATUS_UNKNOWN"),n.mainAppWebInfo.webDisplayMode=uj(),n.mainAppWebInfo.isWebNativeShareAvailable=navigator&&void 0!==navigator.share):"TVHTML5"===n.clientName&&(!L("web_lr_app_quality_killswitch")&&(m=B("LIVING_ROOM_APP_QUALITY"))&&(n.tvAppInfo=Object.assign(n.tvAppInfo||{},{appQuality:m})),m=B("LIVING_ROOM_CERTIFICATION_SCOPE"))&&
(n.tvAppInfo=Object.assign(n.tvAppInfo||{},{certificationScope:m}));if(!L("web_populate_time_zone_itc_killswitch")){b:{if("undefined"!==typeof Intl)try{var u=(new Intl.DateTimeFormat).resolvedOptions().timeZone;break b}catch(fa){}u=void 0}u&&(n.timeZone=u)}(u=mh())?n.experimentsToken=u:delete n.experimentsToken;u=nh();Ao.h||(Ao.h=new Ao);n=Ao.h.h;m=[];k=0;for(var C in n)m[k++]=n[C];h.request=Object.assign(Object.assign({},h.request),{internalExperimentFlags:u,consistencyTokenJars:m});!L("web_prequest_context_killswitch")&&
(C=B("INNERTUBE_CONTEXT_PREQUEST_CONTEXT"))&&(h.request.externalPrequestContext=C);u=Aj.getInstance();C=Dj(58);u=u.get("gsml","");h.user=Object.assign({},h.user);C&&(h.user.enableSafetyMode=C);u&&(h.user.lockedSafetyMode=!0);L("warm_op_csn_cleanup")?f&&(g=Wn())&&(h.clientScreenNonce=g):!g&&(g=Wn())&&(h.clientScreenNonce=g);e&&(h.clickTracking={clickTrackingParams:e});if(e=A("yt.mdx.remote.remoteClient_"))h.remoteClient=e;L("web_enable_client_location_service")&&Do.getInstance().setLocationOnInnerTubeContext(h);
try{var D=ii(void 0),K=D.bid;delete D.bid;h.adSignalsInfo={params:[],bid:K};for(var N=q(Object.entries(D)),S=N.next();!S.done;S=N.next()){var W=q(S.value),Qa=W.next().value,zb=W.next().value;D=Qa;K=zb;null===(d=h.adSignalsInfo.params)||void 0===d?void 0:d.push({key:D,value:""+K})}}catch(fa){En(fa)}d=h}else En(Error("Error: No InnerTubeContext shell provided in ytconfig.")),d={};d={context:d};if(N=this.h(a)){this.i(d,N,b);var P,Y;b="/youtubei/v1/"+Ko(this.j());(a=null===(Y=null===(P=a.commandMetadata)||
void 0===P?void 0:P.webCommandMetadata)||void 0===Y?void 0:Y.apiUrl)&&(b=a);P=b;(Y=B("INNERTUBE_HOST_OVERRIDE"))&&(P=String(Y)+String(Zb(P)));Y={};Y.key=B("INNERTUBE_API_KEY");L("json_condensed_response")&&(Y.prettyPrint="false");P=gi(P,Y||{},!1);P={input:P,ta:Lo(P),ba:d,config:Object.assign({},void 0)};P.config.Ia?P.config.Ia.identity=c:P.config.Ia={identity:c};return P}En(new nk("Error: Failed to create Request from Command.",a))};
da.Object.defineProperties(Mo.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!1}}});function No(){}
r(No,Mo);No.prototype.o=function(){return{input:"/getDatasyncIdsEndpoint",ta:Lo("/getDatasyncIdsEndpoint","GET"),ba:{}}};
No.prototype.j=function(){return[]};
No.prototype.h=function(){};
No.prototype.i=function(){};var Oo={},Po=(Oo.GET_DATASYNC_IDS=Ho(No),Oo);function Qo(a){var b=Da.apply(1,arguments);if(!Ro(a)||b.some(function(e){return!Ro(e)}))throw Error("Only objects may be merged.");
var c=a;b=q(b);for(var d=b.next();!d.done;d=b.next())So(c,d.value);return c}
function So(a,b){for(var c in b)if(Ro(b[c])){if(c in a&&!Ro(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});So(a[c],b[c])}else if(To(b[c])){if(c in a&&!To(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);Uo(a[c],b[c])}else a[c]=b[c];return a}
function Uo(a,b){b=q(b);for(var c=b.next();!c.done;c=b.next())c=c.value,Ro(c)?a.push(So({},c)):To(c)?a.push(Uo([],c)):a.push(c);return a}
function Ro(a){return"object"===typeof a&&!Array.isArray(a)}
function To(a){return"object"===typeof a&&Array.isArray(a)}
;function Vo(a,b){Pl.call(this,1,arguments);this.timer=b}
r(Vo,Pl);var Wo=new Ql("aft-recorded",Vo);var Xo=window;function Yo(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
var Q=Xo.performance||Xo.mozPerformance||Xo.msPerformance||Xo.webkitPerformance||new Yo;var Zo=!1,$o={'script[name="scheduler/scheduler"]':"sj",'script[name="player/base"]':"pj",'link[rel="stylesheet"][name="www-player"]':"pc",'link[rel="stylesheet"][name="player/www-player"]':"pc",'script[name="desktop_polymer/desktop_polymer"]':"dpj",'link[rel="import"][name="desktop_polymer"]':"dph",'script[name="mobile-c3"]':"mcj",'link[rel="stylesheet"][name="mobile-c3"]':"mcc",'script[name="player-plasma-ias-phone/base"]':"mcppj",'script[name="player-plasma-ias-tablet/base"]':"mcptj",'link[rel="stylesheet"][name="mobile-polymer-player-ias"]':"mcpc",
'link[rel="stylesheet"][name="mobile-polymer-player-svg-ias"]':"mcpsc",'script[name="mobile_blazer_core_mod"]':"mbcj",'link[rel="stylesheet"][name="mobile_blazer_css"]':"mbc",'script[name="mobile_blazer_logged_in_users_mod"]':"mbliuj",'script[name="mobile_blazer_logged_out_users_mod"]':"mblouj",'script[name="mobile_blazer_noncore_mod"]':"mbnj","#player_css":"mbpc",'script[name="mobile_blazer_desktopplayer_mod"]':"mbpj",'link[rel="stylesheet"][name="mobile_blazer_tablet_css"]':"mbtc",'script[name="mobile_blazer_watch_mod"]':"mbwj"},
ap=Ta(Q.clearResourceTimings||Q.webkitClearResourceTimings||Q.mozClearResourceTimings||Q.msClearResourceTimings||Q.oClearResourceTimings||Ia,Q);function bp(a){var b=cp(a);if(b.aft)return b.aft;a=B((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=a.length,d=0;d<c;d++){var e=b[a[d]];if(e)return e}return NaN}
function dp(){var a;if(L("csi_use_performance_navigation_timing")){var b,c,d,e=null===(d=null===(c=null===(b=null===(a=null===Q||void 0===Q?void 0:Q.getEntriesByType)||void 0===a?void 0:a.call(Q,"navigation"))||void 0===b?void 0:b[0])||void 0===c?void 0:c.toJSON)||void 0===d?void 0:d.call(c);e?(e.requestStart=ep(e.requestStart),e.responseEnd=ep(e.responseEnd),e.redirectStart=ep(e.redirectStart),e.redirectEnd=ep(e.redirectEnd),e.domainLookupEnd=ep(e.domainLookupEnd),e.connectStart=ep(e.connectStart),
e.connectEnd=ep(e.connectEnd),e.responseStart=ep(e.responseStart),e.secureConnectionStart=ep(e.secureConnectionStart),e.domainLookupStart=ep(e.domainLookupStart),e.isPerformanceNavigationTiming=!0,a=e):a=Q.timing}else a=Q.timing;return a}
function fp(){return L("csi_use_time_origin")&&Q.timeOrigin?Math.floor(Q.timeOrigin):Q.timing.navigationStart}
function ep(a){return Math.round(fp()+a)}
function gp(a){z("ytglobal.timing"+(a||"")+"ready_",!0,void 0)}
function hp(a){return A("ytcsi."+(a||"")+"data_")||ip(a)}
function jp(a){a=hp(a);a.info||(a.info={});return a.info}
function cp(a){a=hp(a);a.tick||(a.tick={});return a.tick}
function kp(a){a=hp(a);if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}else a.gel={gelTicks:{},gelInfos:{}};return a.gel}
function lp(a){a=kp(a);a.gelInfos||(a.gelInfos={});return a.gelInfos}
function mp(a){var b=hp(a).nonce;b||(b=Ln(),hp(a).nonce=b);return b}
function ip(a){var b={tick:{},info:{}};z("ytcsi."+(a||"")+"data_",b,void 0);return b}
function np(a){var b=cp(a||""),c=bp(a);c&&!Zo&&(Vl(Wo,new Vo(Math.round(c-b._start),a)),Zo=!0)}
function op(a,b){for(var c=q(Object.keys(b)),d=c.next();!d.done;d=c.next())if(d=d.value,!Object.keys(a).includes(d)||"object"===typeof b[d]&&!op(a[d],b[d]))return!1;return!0}
;function pp(){if(Q.getEntriesByType){var a=Q.getEntriesByType("paint");if(a=gb(a,function(b){return"first-paint"===b.name}))return ep(a.startTime)}a=Q.timing;
return a.dc?Math.max(0,a.dc):0}
;function qp(){var a=A("ytcsi.debug");a||(a=[],z("ytcsi.debug",a,void 0),z("ytcsi.reference",{},void 0));return a}
function rp(a){a=a||"";var b=sp();if(b[a])return b[a];var c=qp(),d={timerName:a,info:{},tick:{},span:{},jspbInfo:[]};c.push(d);return b[a]=d}
function sp(){var a=A("ytcsi.reference");if(a)return a;qp();return A("ytcsi.reference")}
;var R={},tp=(R.auto_search="LATENCY_ACTION_AUTO_SEARCH",R.ad_to_ad="LATENCY_ACTION_AD_TO_AD",R.ad_to_video="LATENCY_ACTION_AD_TO_VIDEO",R["analytics.explore"]="LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE",R.app_startup="LATENCY_ACTION_APP_STARTUP",R["artist.analytics"]="LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS",R["artist.events"]="LATENCY_ACTION_CREATOR_ARTIST_CONCERTS",R["artist.presskit"]="LATENCY_ACTION_CREATOR_ARTIST_PROFILE",R.browse="LATENCY_ACTION_BROWSE",R.cast_splash="LATENCY_ACTION_CAST_SPLASH",
R.channels="LATENCY_ACTION_CHANNELS",R.creator_channel_dashboard="LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD",R["channel.analytics"]="LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS",R["channel.comments"]="LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS",R["channel.content"]="LATENCY_ACTION_CREATOR_POST_LIST",R["channel.copyright"]="LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT",R["channel.editing"]="LATENCY_ACTION_CREATOR_CHANNEL_EDITING",R["channel.monetization"]="LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION",R["channel.music"]=
"LATENCY_ACTION_CREATOR_CHANNEL_MUSIC",R["channel.playlists"]="LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS",R["channel.translations"]="LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS",R["channel.videos"]="LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS",R["channel.live_streaming"]="LATENCY_ACTION_CREATOR_LIVE_STREAMING",R.chips="LATENCY_ACTION_CHIPS",R["dialog.copyright_strikes"]="LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES",R["dialog.uploads"]="LATENCY_ACTION_CREATOR_DIALOG_UPLOADS",R.direct_playback="LATENCY_ACTION_DIRECT_PLAYBACK",
R.embed="LATENCY_ACTION_EMBED",R.entity_key_serialization_perf="LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",R.entity_key_deserialization_perf="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",R.explore="LATENCY_ACTION_EXPLORE",R.home="LATENCY_ACTION_HOME",R.library="LATENCY_ACTION_LIBRARY",R.live="LATENCY_ACTION_LIVE",R.live_pagination="LATENCY_ACTION_LIVE_PAGINATION",R.onboarding="LATENCY_ACTION_ONBOARDING",R.parent_profile_settings="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",R.parent_tools_collection=
"LATENCY_ACTION_PARENT_TOOLS_COLLECTION",R.parent_tools_dashboard="LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",R.player_att="LATENCY_ACTION_PLAYER_ATTESTATION",R["post.comments"]="LATENCY_ACTION_CREATOR_POST_COMMENTS",R["post.edit"]="LATENCY_ACTION_CREATOR_POST_EDIT",R.prebuffer="LATENCY_ACTION_PREBUFFER",R.prefetch="LATENCY_ACTION_PREFETCH",R.profile_settings="LATENCY_ACTION_KIDS_PROFILE_SETTINGS",R.profile_switcher="LATENCY_ACTION_LOGIN",R.reel_watch="LATENCY_ACTION_REEL_WATCH",R.results="LATENCY_ACTION_RESULTS",
R.search_ui="LATENCY_ACTION_SEARCH_UI",R.search_suggest="LATENCY_ACTION_SUGGEST",R.search_zero_state="LATENCY_ACTION_SEARCH_ZERO_STATE",R.secret_code="LATENCY_ACTION_KIDS_SECRET_CODE",R.seek="LATENCY_ACTION_PLAYER_SEEK",R.settings="LATENCY_ACTION_SETTINGS",R.tenx="LATENCY_ACTION_TENX",R.video_to_ad="LATENCY_ACTION_VIDEO_TO_AD",R.watch="LATENCY_ACTION_WATCH",R.watch_it_again="LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",R["watch,watch7"]="LATENCY_ACTION_WATCH",R["watch,watch7_html5"]="LATENCY_ACTION_WATCH",
R["watch,watch7ad"]="LATENCY_ACTION_WATCH",R["watch,watch7ad_html5"]="LATENCY_ACTION_WATCH",R.wn_comments="LATENCY_ACTION_LOAD_COMMENTS",R.ww_rqs="LATENCY_ACTION_WHO_IS_WATCHING",R["video.analytics"]="LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS",R["video.comments"]="LATENCY_ACTION_CREATOR_VIDEO_COMMENTS",R["video.edit"]="LATENCY_ACTION_CREATOR_VIDEO_EDIT",R["video.editor"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR",R["video.editor_async"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC",R["video.live_settings"]=
"LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS",R["video.live_streaming"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING",R["video.monetization"]="LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION",R["video.translations"]="LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS",R.voice_assistant="LATENCY_ACTION_VOICE_ASSISTANT",R.cast_load_by_entity_to_watch="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",R.networkless_performance="LATENCY_ACTION_NETWORKLESS_PERFORMANCE",R),T={},up=(T.ad_allowed="adTypesAllowed",T.yt_abt="adBreakType",
T.ad_cpn="adClientPlaybackNonce",T.ad_docid="adVideoId",T.yt_ad_an="adNetworks",T.ad_at="adType",T.aida="appInstallDataAgeMs",T.browse_id="browseId",T.p="httpProtocol",T.t="transportProtocol",T.cs="commandSource",T.cpn="clientPlaybackNonce",T.ccs="creatorInfo.creatorCanaryState",T.ctop="creatorInfo.topEntityType",T.csn="clientScreenNonce",T.docid="videoId",T.GetHome_rid="requestIds",T.GetSearch_rid="requestIds",T.GetPlayer_rid="requestIds",T.GetWatchNext_rid="requestIds",T.GetBrowse_rid="requestIds",
T.GetLibrary_rid="requestIds",T.is_continuation="isContinuation",T.is_nav="isNavigation",T.b_p="kabukiInfo.browseParams",T.is_prefetch="kabukiInfo.isPrefetch",T.is_secondary_nav="kabukiInfo.isSecondaryNav",T.nav_type="kabukiInfo.navigationType",T.prev_browse_id="kabukiInfo.prevBrowseId",T.query_source="kabukiInfo.querySource",T.voz_type="kabukiInfo.vozType",T.yt_lt="loadType",T.mver="creatorInfo.measurementVersion",T.yt_ad="isMonetized",T.nr="webInfo.navigationReason",T.nrsu="navigationRequestedSameUrl",
T.pnt="performanceNavigationTiming",T.prt="playbackRequiresTap",T.plt="playerInfo.playbackType",T.pis="playerInfo.playerInitializedState",T.paused="playerInfo.isPausedOnLoad",T.yt_pt="playerType",T.fmt="playerInfo.itag",T.yt_pl="watchInfo.isPlaylist",T.yt_pre="playerInfo.preloadType",T.yt_ad_pr="prerollAllowed",T.pa="previousAction",T.yt_red="isRedSubscriber",T.rce="mwebInfo.responseContentEncoding",T.rc="resourceInfo.resourceCache",T.scrh="screenHeight",T.scrw="screenWidth",T.st="serverTimeMs",T.ssdm=
"shellStartupDurationMs",T.br_trs="tvInfo.bedrockTriggerState",T.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",T.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",T.label="tvInfo.label",T.is_mdx="tvInfo.isMdx",T.preloaded="tvInfo.isPreloaded",T.aac_type="tvInfo.authAccessCredentialType",T.upg_player_vis="playerInfo.visibilityState",T.query="unpluggedInfo.query",T.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",T.yt_vst="videoStreamType",T.vph="viewportHeight",T.vpw="viewportWidth",
T.yt_vis="isVisible",T.rcl="mwebInfo.responseContentLength",T.GetSettings_rid="requestIds",T.GetTrending_rid="requestIds",T.GetMusicSearchSuggestions_rid="requestIds",T.REQUEST_ID="requestIds",T),vp="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized navigationRequestedSameUrl performanceNavigationTiming playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),
wp={},xp=(wp.ccs="CANARY_STATE_",wp.mver="MEASUREMENT_VERSION_",wp.pis="PLAYER_INITIALIZED_STATE_",wp.yt_pt="LATENCY_PLAYER_",wp.pa="LATENCY_ACTION_",wp.ctop="TOP_ENTITY_TYPE_",wp.yt_vst="VIDEO_STREAM_TYPE_",wp),yp="all_vc ap aq c cbr cbrand cbrver cmodel cos cosver cplatform ctheme cver ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");
function zp(a){return tp[a]||"LATENCY_ACTION_UNKNOWN"}
function Ap(a,b,c){c=kp(c);if(c.gelInfos)c.gelInfos[a]=!0;else{var d={};c.gelInfos=(d[a]=!0,d)}if(a.match("_rid")){var e=a.split("_rid")[0];a="REQUEST_ID"}if(a in up){c=up[a];0<=bb(vp,c)&&(b=!!b);a in xp&&"string"===typeof b&&(b=xp[a]+b.toUpperCase());a=b;b=c.split(".");for(var f=d={},g=0;g<b.length-1;g++){var h=b[g];f[h]={};f=f[h]}f[b[b.length-1]]="requestIds"===c?[{id:a,endpoint:e}]:a;return Qo({},d)}0<=bb(yp,a)||Fn(new nk("Unknown label logged with GEL CSI",a))}
;var U={LATENCY_ACTION_KIDS_PROFILE_SWITCHER:90,LATENCY_ACTION_OFFLINE_THUMBNAIL_TRANSFER:100,LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC:46,LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR:37,LATENCY_ACTION_SPINNER_DISPLAYED:14,LATENCY_ACTION_PLAYABILITY_CHECK:10,LATENCY_ACTION_PROCESS:9,LATENCY_ACTION_APP_STARTUP:5,LATENCY_ACTION_PLAYER_ROTATION:150,LATENCY_ACTION_SHOPPING_IN_APP:124,LATENCY_ACTION_PLAYER_ATTESTATION:121,LATENCY_ACTION_PLAYER_SEEK:119,LATENCY_ACTION_SUPER_STICKER_BUY_FLOW:114,LATENCY_ACTION_BLOCKS_PERFORMANCE:148,
LATENCY_ACTION_ASSISTANT_QUERY:138,LATENCY_ACTION_ASSISTANT_SETTINGS:137,LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF:129,LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF:128,LATENCY_ACTION_PROOF_OF_ORIGIN_TOKEN_CREATE:127,LATENCY_ACTION_EMBEDS_SDK_INITIALIZATION:123,LATENCY_ACTION_NETWORKLESS_PERFORMANCE:122,LATENCY_ACTION_DOWNLOADS_EXPANSION:133,LATENCY_ACTION_ENTITY_TRANSFORM:131,LATENCY_ACTION_DOWNLOADS_COMPATIBILITY_LAYER:96,LATENCY_ACTION_EMBEDS_SET_VIDEO:95,LATENCY_ACTION_SETTINGS:93,LATENCY_ACTION_ABANDONED_STARTUP:81,
LATENCY_ACTION_MEDIA_BROWSER_ALARM_PLAY:80,LATENCY_ACTION_MEDIA_BROWSER_SEARCH:79,LATENCY_ACTION_MEDIA_BROWSER_LOAD_TREE:78,LATENCY_ACTION_WHO_IS_WATCHING:77,LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH:76,LATENCY_ACTION_LITE_SWITCH_ACCOUNT:73,LATENCY_ACTION_ELEMENTS_PERFORMANCE:70,LATENCY_ACTION_LOCATION_SIGNAL_COLLECTION:69,LATENCY_ACTION_MODIFY_CHANNEL_NOTIFICATION:65,LATENCY_ACTION_OFFLINE_STORE_START:61,LATENCY_ACTION_REEL_EDITOR:58,LATENCY_ACTION_CHANNEL_SUBSCRIBE:56,LATENCY_ACTION_CHANNEL_PREVIEW:55,
LATENCY_ACTION_PREFETCH:52,LATENCY_ACTION_ABANDONED_WATCH:45,LATENCY_ACTION_LOAD_COMMENT_REPLIES:26,LATENCY_ACTION_LOAD_COMMENTS:25,LATENCY_ACTION_EDIT_COMMENT:24,LATENCY_ACTION_NEW_COMMENT:23,LATENCY_ACTION_OFFLINE_SHARING_RECEIVER_PAIRING:19,LATENCY_ACTION_EMBED:18,LATENCY_ACTION_MDX_LAUNCH:15,LATENCY_ACTION_RESOLVE_URL:13,LATENCY_ACTION_CAST_SPLASH:149,LATENCY_ACTION_MDX_CAST:120,LATENCY_ACTION_MDX_COMMAND:12,LATENCY_ACTION_REEL_SELECT_SEGMENT:136,LATENCY_ACTION_ACCELERATED_EFFECTS:145,LATENCY_ACTION_UPLOAD_AUDIO_MIXER:147,
LATENCY_ACTION_SHORTS_SEG_IMP_TRANSCODING:146,LATENCY_ACTION_SHORTS_AUDIO_PICKER_PLAYBACK:130,LATENCY_ACTION_SHORTS_WAVEFORM_DOWNLOAD:125,LATENCY_ACTION_SHORTS_GALLERY:107,LATENCY_ACTION_SHORTS_TRIM:105,LATENCY_ACTION_SHORTS_EDIT:104,LATENCY_ACTION_SHORTS_CAMERA:103,LATENCY_ACTION_PARENT_TOOLS_DASHBOARD:102,LATENCY_ACTION_PARENT_TOOLS_COLLECTION:101,LATENCY_ACTION_MUSIC_LOAD_RECOMMENDED_MEDIA_ITEMS:116,LATENCY_ACTION_MUSIC_LOAD_MEDIA_ITEMS:115,LATENCY_ACTION_MUSIC_ALBUM_DETAIL:72,LATENCY_ACTION_MUSIC_PLAYLIST_DETAIL:71,
LATENCY_ACTION_CHIPS:68,LATENCY_ACTION_SEARCH_ZERO_STATE:67,LATENCY_ACTION_LIVE_PAGINATION:117,LATENCY_ACTION_LIVE:20,LATENCY_ACTION_PREBUFFER:40,LATENCY_ACTION_TENX:39,LATENCY_ACTION_KIDS_PROFILE_SETTINGS:94,LATENCY_ACTION_KIDS_WATCH_IT_AGAIN:92,LATENCY_ACTION_KIDS_SECRET_CODE:91,LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS:89,LATENCY_ACTION_KIDS_ONBOARDING:88,LATENCY_ACTION_KIDS_VOICE_SEARCH:82,LATENCY_ACTION_KIDS_CURATED_COLLECTION:62,LATENCY_ACTION_KIDS_LIBRARY:53,LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS:38,
LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION:74,LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING:141,LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS:142,LATENCY_ACTION_CREATOR_VIDEO_EDITOR_ASYNC:51,LATENCY_ACTION_CREATOR_VIDEO_EDITOR:50,LATENCY_ACTION_CREATOR_VIDEO_EDIT:36,LATENCY_ACTION_CREATOR_VIDEO_COMMENTS:34,LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS:33,LATENCY_ACTION_CREATOR_POST_LIST:112,LATENCY_ACTION_CREATOR_POST_EDIT:110,LATENCY_ACTION_CREATOR_POST_COMMENTS:111,LATENCY_ACTION_CREATOR_LIVE_STREAMING:108,
LATENCY_ACTION_CREATOR_DIALOG_UPLOADS:86,LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES:87,LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS:32,LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS:48,LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS:139,LATENCY_ACTION_CREATOR_CHANNEL_MUSIC:99,LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION:43,LATENCY_ACTION_CREATOR_CHANNEL_EDITING:113,LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD:49,LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT:44,LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS:66,LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS:31,
LATENCY_ACTION_CREATOR_ARTIST_PROFILE:85,LATENCY_ACTION_CREATOR_ARTIST_CONCERTS:84,LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS:83,LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE:140,LATENCY_ACTION_STORYBOARD_THUMBNAILS:118,LATENCY_ACTION_SEARCH_THUMBNAILS:59,LATENCY_ACTION_ON_DEVICE_MODEL_DOWNLOAD:54,LATENCY_ACTION_VOICE_ASSISTANT:47,LATENCY_ACTION_SEARCH_UI:35,LATENCY_ACTION_SUGGEST:30,LATENCY_ACTION_AUTO_SEARCH:126,LATENCY_ACTION_DOWNLOADS:98,LATENCY_ACTION_EXPLORE:75,LATENCY_ACTION_VIDEO_LIST:63,LATENCY_ACTION_HOME_RESUME:60,
LATENCY_ACTION_SUBSCRIPTIONS_LIST:57,LATENCY_ACTION_THUMBNAIL_LOAD:42,LATENCY_ACTION_FIRST_THUMBNAIL_LOAD:29,LATENCY_ACTION_SUBSCRIPTIONS_FEED:109,LATENCY_ACTION_SUBSCRIPTIONS:28,LATENCY_ACTION_TRENDING:27,LATENCY_ACTION_LIBRARY:21,LATENCY_ACTION_VIDEO_THUMBNAIL:8,LATENCY_ACTION_SHOW_MORE:7,LATENCY_ACTION_VIDEO_PREVIEW:6,LATENCY_ACTION_PREBUFFER_VIDEO:144,LATENCY_ACTION_PREFETCH_VIDEO:143,LATENCY_ACTION_DIRECT_PLAYBACK:132,LATENCY_ACTION_REEL_WATCH:41,LATENCY_ACTION_AD_TO_AD:22,LATENCY_ACTION_VIDEO_TO_AD:17,
LATENCY_ACTION_AD_TO_VIDEO:16,LATENCY_ACTION_ONBOARDING:135,LATENCY_ACTION_LOGIN:97,LATENCY_ACTION_BROWSE:11,LATENCY_ACTION_CHANNELS:4,LATENCY_ACTION_WATCH:3,LATENCY_ACTION_RESULTS:2,LATENCY_ACTION_HOME:1,LATENCY_ACTION_STARTUP:106,LATENCY_ACTION_UNKNOWN:0};U[U.LATENCY_ACTION_KIDS_PROFILE_SWITCHER]="LATENCY_ACTION_KIDS_PROFILE_SWITCHER";U[U.LATENCY_ACTION_OFFLINE_THUMBNAIL_TRANSFER]="LATENCY_ACTION_OFFLINE_THUMBNAIL_TRANSFER";U[U.LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC";
U[U.LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR";U[U.LATENCY_ACTION_SPINNER_DISPLAYED]="LATENCY_ACTION_SPINNER_DISPLAYED";U[U.LATENCY_ACTION_PLAYABILITY_CHECK]="LATENCY_ACTION_PLAYABILITY_CHECK";U[U.LATENCY_ACTION_PROCESS]="LATENCY_ACTION_PROCESS";U[U.LATENCY_ACTION_APP_STARTUP]="LATENCY_ACTION_APP_STARTUP";U[U.LATENCY_ACTION_PLAYER_ROTATION]="LATENCY_ACTION_PLAYER_ROTATION";U[U.LATENCY_ACTION_SHOPPING_IN_APP]="LATENCY_ACTION_SHOPPING_IN_APP";
U[U.LATENCY_ACTION_PLAYER_ATTESTATION]="LATENCY_ACTION_PLAYER_ATTESTATION";U[U.LATENCY_ACTION_PLAYER_SEEK]="LATENCY_ACTION_PLAYER_SEEK";U[U.LATENCY_ACTION_SUPER_STICKER_BUY_FLOW]="LATENCY_ACTION_SUPER_STICKER_BUY_FLOW";U[U.LATENCY_ACTION_BLOCKS_PERFORMANCE]="LATENCY_ACTION_BLOCKS_PERFORMANCE";U[U.LATENCY_ACTION_ASSISTANT_QUERY]="LATENCY_ACTION_ASSISTANT_QUERY";U[U.LATENCY_ACTION_ASSISTANT_SETTINGS]="LATENCY_ACTION_ASSISTANT_SETTINGS";U[U.LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF]="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF";
U[U.LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF]="LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF";U[U.LATENCY_ACTION_PROOF_OF_ORIGIN_TOKEN_CREATE]="LATENCY_ACTION_PROOF_OF_ORIGIN_TOKEN_CREATE";U[U.LATENCY_ACTION_EMBEDS_SDK_INITIALIZATION]="LATENCY_ACTION_EMBEDS_SDK_INITIALIZATION";U[U.LATENCY_ACTION_NETWORKLESS_PERFORMANCE]="LATENCY_ACTION_NETWORKLESS_PERFORMANCE";U[U.LATENCY_ACTION_DOWNLOADS_EXPANSION]="LATENCY_ACTION_DOWNLOADS_EXPANSION";U[U.LATENCY_ACTION_ENTITY_TRANSFORM]="LATENCY_ACTION_ENTITY_TRANSFORM";
U[U.LATENCY_ACTION_DOWNLOADS_COMPATIBILITY_LAYER]="LATENCY_ACTION_DOWNLOADS_COMPATIBILITY_LAYER";U[U.LATENCY_ACTION_EMBEDS_SET_VIDEO]="LATENCY_ACTION_EMBEDS_SET_VIDEO";U[U.LATENCY_ACTION_SETTINGS]="LATENCY_ACTION_SETTINGS";U[U.LATENCY_ACTION_ABANDONED_STARTUP]="LATENCY_ACTION_ABANDONED_STARTUP";U[U.LATENCY_ACTION_MEDIA_BROWSER_ALARM_PLAY]="LATENCY_ACTION_MEDIA_BROWSER_ALARM_PLAY";U[U.LATENCY_ACTION_MEDIA_BROWSER_SEARCH]="LATENCY_ACTION_MEDIA_BROWSER_SEARCH";
U[U.LATENCY_ACTION_MEDIA_BROWSER_LOAD_TREE]="LATENCY_ACTION_MEDIA_BROWSER_LOAD_TREE";U[U.LATENCY_ACTION_WHO_IS_WATCHING]="LATENCY_ACTION_WHO_IS_WATCHING";U[U.LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH]="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH";U[U.LATENCY_ACTION_LITE_SWITCH_ACCOUNT]="LATENCY_ACTION_LITE_SWITCH_ACCOUNT";U[U.LATENCY_ACTION_ELEMENTS_PERFORMANCE]="LATENCY_ACTION_ELEMENTS_PERFORMANCE";U[U.LATENCY_ACTION_LOCATION_SIGNAL_COLLECTION]="LATENCY_ACTION_LOCATION_SIGNAL_COLLECTION";
U[U.LATENCY_ACTION_MODIFY_CHANNEL_NOTIFICATION]="LATENCY_ACTION_MODIFY_CHANNEL_NOTIFICATION";U[U.LATENCY_ACTION_OFFLINE_STORE_START]="LATENCY_ACTION_OFFLINE_STORE_START";U[U.LATENCY_ACTION_REEL_EDITOR]="LATENCY_ACTION_REEL_EDITOR";U[U.LATENCY_ACTION_CHANNEL_SUBSCRIBE]="LATENCY_ACTION_CHANNEL_SUBSCRIBE";U[U.LATENCY_ACTION_CHANNEL_PREVIEW]="LATENCY_ACTION_CHANNEL_PREVIEW";U[U.LATENCY_ACTION_PREFETCH]="LATENCY_ACTION_PREFETCH";U[U.LATENCY_ACTION_ABANDONED_WATCH]="LATENCY_ACTION_ABANDONED_WATCH";
U[U.LATENCY_ACTION_LOAD_COMMENT_REPLIES]="LATENCY_ACTION_LOAD_COMMENT_REPLIES";U[U.LATENCY_ACTION_LOAD_COMMENTS]="LATENCY_ACTION_LOAD_COMMENTS";U[U.LATENCY_ACTION_EDIT_COMMENT]="LATENCY_ACTION_EDIT_COMMENT";U[U.LATENCY_ACTION_NEW_COMMENT]="LATENCY_ACTION_NEW_COMMENT";U[U.LATENCY_ACTION_OFFLINE_SHARING_RECEIVER_PAIRING]="LATENCY_ACTION_OFFLINE_SHARING_RECEIVER_PAIRING";U[U.LATENCY_ACTION_EMBED]="LATENCY_ACTION_EMBED";U[U.LATENCY_ACTION_MDX_LAUNCH]="LATENCY_ACTION_MDX_LAUNCH";
U[U.LATENCY_ACTION_RESOLVE_URL]="LATENCY_ACTION_RESOLVE_URL";U[U.LATENCY_ACTION_CAST_SPLASH]="LATENCY_ACTION_CAST_SPLASH";U[U.LATENCY_ACTION_MDX_CAST]="LATENCY_ACTION_MDX_CAST";U[U.LATENCY_ACTION_MDX_COMMAND]="LATENCY_ACTION_MDX_COMMAND";U[U.LATENCY_ACTION_REEL_SELECT_SEGMENT]="LATENCY_ACTION_REEL_SELECT_SEGMENT";U[U.LATENCY_ACTION_ACCELERATED_EFFECTS]="LATENCY_ACTION_ACCELERATED_EFFECTS";U[U.LATENCY_ACTION_UPLOAD_AUDIO_MIXER]="LATENCY_ACTION_UPLOAD_AUDIO_MIXER";
U[U.LATENCY_ACTION_SHORTS_SEG_IMP_TRANSCODING]="LATENCY_ACTION_SHORTS_SEG_IMP_TRANSCODING";U[U.LATENCY_ACTION_SHORTS_AUDIO_PICKER_PLAYBACK]="LATENCY_ACTION_SHORTS_AUDIO_PICKER_PLAYBACK";U[U.LATENCY_ACTION_SHORTS_WAVEFORM_DOWNLOAD]="LATENCY_ACTION_SHORTS_WAVEFORM_DOWNLOAD";U[U.LATENCY_ACTION_SHORTS_GALLERY]="LATENCY_ACTION_SHORTS_GALLERY";U[U.LATENCY_ACTION_SHORTS_TRIM]="LATENCY_ACTION_SHORTS_TRIM";U[U.LATENCY_ACTION_SHORTS_EDIT]="LATENCY_ACTION_SHORTS_EDIT";U[U.LATENCY_ACTION_SHORTS_CAMERA]="LATENCY_ACTION_SHORTS_CAMERA";
U[U.LATENCY_ACTION_PARENT_TOOLS_DASHBOARD]="LATENCY_ACTION_PARENT_TOOLS_DASHBOARD";U[U.LATENCY_ACTION_PARENT_TOOLS_COLLECTION]="LATENCY_ACTION_PARENT_TOOLS_COLLECTION";U[U.LATENCY_ACTION_MUSIC_LOAD_RECOMMENDED_MEDIA_ITEMS]="LATENCY_ACTION_MUSIC_LOAD_RECOMMENDED_MEDIA_ITEMS";U[U.LATENCY_ACTION_MUSIC_LOAD_MEDIA_ITEMS]="LATENCY_ACTION_MUSIC_LOAD_MEDIA_ITEMS";U[U.LATENCY_ACTION_MUSIC_ALBUM_DETAIL]="LATENCY_ACTION_MUSIC_ALBUM_DETAIL";U[U.LATENCY_ACTION_MUSIC_PLAYLIST_DETAIL]="LATENCY_ACTION_MUSIC_PLAYLIST_DETAIL";
U[U.LATENCY_ACTION_CHIPS]="LATENCY_ACTION_CHIPS";U[U.LATENCY_ACTION_SEARCH_ZERO_STATE]="LATENCY_ACTION_SEARCH_ZERO_STATE";U[U.LATENCY_ACTION_LIVE_PAGINATION]="LATENCY_ACTION_LIVE_PAGINATION";U[U.LATENCY_ACTION_LIVE]="LATENCY_ACTION_LIVE";U[U.LATENCY_ACTION_PREBUFFER]="LATENCY_ACTION_PREBUFFER";U[U.LATENCY_ACTION_TENX]="LATENCY_ACTION_TENX";U[U.LATENCY_ACTION_KIDS_PROFILE_SETTINGS]="LATENCY_ACTION_KIDS_PROFILE_SETTINGS";U[U.LATENCY_ACTION_KIDS_WATCH_IT_AGAIN]="LATENCY_ACTION_KIDS_WATCH_IT_AGAIN";
U[U.LATENCY_ACTION_KIDS_SECRET_CODE]="LATENCY_ACTION_KIDS_SECRET_CODE";U[U.LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS]="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS";U[U.LATENCY_ACTION_KIDS_ONBOARDING]="LATENCY_ACTION_KIDS_ONBOARDING";U[U.LATENCY_ACTION_KIDS_VOICE_SEARCH]="LATENCY_ACTION_KIDS_VOICE_SEARCH";U[U.LATENCY_ACTION_KIDS_CURATED_COLLECTION]="LATENCY_ACTION_KIDS_CURATED_COLLECTION";U[U.LATENCY_ACTION_KIDS_LIBRARY]="LATENCY_ACTION_KIDS_LIBRARY";
U[U.LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS]="LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS";U[U.LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION]="LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION";U[U.LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING";U[U.LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS";U[U.LATENCY_ACTION_CREATOR_VIDEO_EDITOR_ASYNC]="LATENCY_ACTION_CREATOR_VIDEO_EDITOR_ASYNC";
U[U.LATENCY_ACTION_CREATOR_VIDEO_EDITOR]="LATENCY_ACTION_CREATOR_VIDEO_EDITOR";U[U.LATENCY_ACTION_CREATOR_VIDEO_EDIT]="LATENCY_ACTION_CREATOR_VIDEO_EDIT";U[U.LATENCY_ACTION_CREATOR_VIDEO_COMMENTS]="LATENCY_ACTION_CREATOR_VIDEO_COMMENTS";U[U.LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS]="LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS";U[U.LATENCY_ACTION_CREATOR_POST_LIST]="LATENCY_ACTION_CREATOR_POST_LIST";U[U.LATENCY_ACTION_CREATOR_POST_EDIT]="LATENCY_ACTION_CREATOR_POST_EDIT";
U[U.LATENCY_ACTION_CREATOR_POST_COMMENTS]="LATENCY_ACTION_CREATOR_POST_COMMENTS";U[U.LATENCY_ACTION_CREATOR_LIVE_STREAMING]="LATENCY_ACTION_CREATOR_LIVE_STREAMING";U[U.LATENCY_ACTION_CREATOR_DIALOG_UPLOADS]="LATENCY_ACTION_CREATOR_DIALOG_UPLOADS";U[U.LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES]="LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES";U[U.LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS]="LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS";U[U.LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS]="LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS";
U[U.LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS]="LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS";U[U.LATENCY_ACTION_CREATOR_CHANNEL_MUSIC]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC";U[U.LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION]="LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION";U[U.LATENCY_ACTION_CREATOR_CHANNEL_EDITING]="LATENCY_ACTION_CREATOR_CHANNEL_EDITING";U[U.LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD]="LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD";U[U.LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT]="LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT";
U[U.LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS]="LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS";U[U.LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS]="LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS";U[U.LATENCY_ACTION_CREATOR_ARTIST_PROFILE]="LATENCY_ACTION_CREATOR_ARTIST_PROFILE";U[U.LATENCY_ACTION_CREATOR_ARTIST_CONCERTS]="LATENCY_ACTION_CREATOR_ARTIST_CONCERTS";U[U.LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS]="LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS";U[U.LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE]="LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE";
U[U.LATENCY_ACTION_STORYBOARD_THUMBNAILS]="LATENCY_ACTION_STORYBOARD_THUMBNAILS";U[U.LATENCY_ACTION_SEARCH_THUMBNAILS]="LATENCY_ACTION_SEARCH_THUMBNAILS";U[U.LATENCY_ACTION_ON_DEVICE_MODEL_DOWNLOAD]="LATENCY_ACTION_ON_DEVICE_MODEL_DOWNLOAD";U[U.LATENCY_ACTION_VOICE_ASSISTANT]="LATENCY_ACTION_VOICE_ASSISTANT";U[U.LATENCY_ACTION_SEARCH_UI]="LATENCY_ACTION_SEARCH_UI";U[U.LATENCY_ACTION_SUGGEST]="LATENCY_ACTION_SUGGEST";U[U.LATENCY_ACTION_AUTO_SEARCH]="LATENCY_ACTION_AUTO_SEARCH";
U[U.LATENCY_ACTION_DOWNLOADS]="LATENCY_ACTION_DOWNLOADS";U[U.LATENCY_ACTION_EXPLORE]="LATENCY_ACTION_EXPLORE";U[U.LATENCY_ACTION_VIDEO_LIST]="LATENCY_ACTION_VIDEO_LIST";U[U.LATENCY_ACTION_HOME_RESUME]="LATENCY_ACTION_HOME_RESUME";U[U.LATENCY_ACTION_SUBSCRIPTIONS_LIST]="LATENCY_ACTION_SUBSCRIPTIONS_LIST";U[U.LATENCY_ACTION_THUMBNAIL_LOAD]="LATENCY_ACTION_THUMBNAIL_LOAD";U[U.LATENCY_ACTION_FIRST_THUMBNAIL_LOAD]="LATENCY_ACTION_FIRST_THUMBNAIL_LOAD";U[U.LATENCY_ACTION_SUBSCRIPTIONS_FEED]="LATENCY_ACTION_SUBSCRIPTIONS_FEED";
U[U.LATENCY_ACTION_SUBSCRIPTIONS]="LATENCY_ACTION_SUBSCRIPTIONS";U[U.LATENCY_ACTION_TRENDING]="LATENCY_ACTION_TRENDING";U[U.LATENCY_ACTION_LIBRARY]="LATENCY_ACTION_LIBRARY";U[U.LATENCY_ACTION_VIDEO_THUMBNAIL]="LATENCY_ACTION_VIDEO_THUMBNAIL";U[U.LATENCY_ACTION_SHOW_MORE]="LATENCY_ACTION_SHOW_MORE";U[U.LATENCY_ACTION_VIDEO_PREVIEW]="LATENCY_ACTION_VIDEO_PREVIEW";U[U.LATENCY_ACTION_PREBUFFER_VIDEO]="LATENCY_ACTION_PREBUFFER_VIDEO";U[U.LATENCY_ACTION_PREFETCH_VIDEO]="LATENCY_ACTION_PREFETCH_VIDEO";
U[U.LATENCY_ACTION_DIRECT_PLAYBACK]="LATENCY_ACTION_DIRECT_PLAYBACK";U[U.LATENCY_ACTION_REEL_WATCH]="LATENCY_ACTION_REEL_WATCH";U[U.LATENCY_ACTION_AD_TO_AD]="LATENCY_ACTION_AD_TO_AD";U[U.LATENCY_ACTION_VIDEO_TO_AD]="LATENCY_ACTION_VIDEO_TO_AD";U[U.LATENCY_ACTION_AD_TO_VIDEO]="LATENCY_ACTION_AD_TO_VIDEO";U[U.LATENCY_ACTION_ONBOARDING]="LATENCY_ACTION_ONBOARDING";U[U.LATENCY_ACTION_LOGIN]="LATENCY_ACTION_LOGIN";U[U.LATENCY_ACTION_BROWSE]="LATENCY_ACTION_BROWSE";U[U.LATENCY_ACTION_CHANNELS]="LATENCY_ACTION_CHANNELS";
U[U.LATENCY_ACTION_WATCH]="LATENCY_ACTION_WATCH";U[U.LATENCY_ACTION_RESULTS]="LATENCY_ACTION_RESULTS";U[U.LATENCY_ACTION_HOME]="LATENCY_ACTION_HOME";U[U.LATENCY_ACTION_STARTUP]="LATENCY_ACTION_STARTUP";U[U.LATENCY_ACTION_UNKNOWN]="LATENCY_ACTION_UNKNOWN";var Bp={LATENCY_NETWORK_MOBILE:2,LATENCY_NETWORK_WIFI:1,LATENCY_NETWORK_UNKNOWN:0};Bp[Bp.LATENCY_NETWORK_MOBILE]="LATENCY_NETWORK_MOBILE";Bp[Bp.LATENCY_NETWORK_WIFI]="LATENCY_NETWORK_WIFI";Bp[Bp.LATENCY_NETWORK_UNKNOWN]="LATENCY_NETWORK_UNKNOWN";
var V={CONN_INVALID:31,CONN_CELLULAR_5G_NSA:12,CONN_CELLULAR_5G_SA:11,CONN_WIFI_METERED:10,CONN_CELLULAR_5G:9,CONN_DISCO:8,CONN_CELLULAR_UNKNOWN:7,CONN_CELLULAR_4G:6,CONN_CELLULAR_3G:5,CONN_CELLULAR_2G:4,CONN_WIFI:3,CONN_NONE:2,CONN_UNKNOWN:1,CONN_DEFAULT:0};V[V.CONN_INVALID]="CONN_INVALID";V[V.CONN_CELLULAR_5G_NSA]="CONN_CELLULAR_5G_NSA";V[V.CONN_CELLULAR_5G_SA]="CONN_CELLULAR_5G_SA";V[V.CONN_WIFI_METERED]="CONN_WIFI_METERED";V[V.CONN_CELLULAR_5G]="CONN_CELLULAR_5G";V[V.CONN_DISCO]="CONN_DISCO";
V[V.CONN_CELLULAR_UNKNOWN]="CONN_CELLULAR_UNKNOWN";V[V.CONN_CELLULAR_4G]="CONN_CELLULAR_4G";V[V.CONN_CELLULAR_3G]="CONN_CELLULAR_3G";V[V.CONN_CELLULAR_2G]="CONN_CELLULAR_2G";V[V.CONN_WIFI]="CONN_WIFI";V[V.CONN_NONE]="CONN_NONE";V[V.CONN_UNKNOWN]="CONN_UNKNOWN";V[V.CONN_DEFAULT]="CONN_DEFAULT";
var X={DETAILED_NETWORK_TYPE_NR_NSA:126,DETAILED_NETWORK_TYPE_NR_SA:125,DETAILED_NETWORK_TYPE_INTERNAL_WIFI_IMPAIRED:124,DETAILED_NETWORK_TYPE_APP_WIFI_HOTSPOT:123,DETAILED_NETWORK_TYPE_DISCONNECTED:122,DETAILED_NETWORK_TYPE_NON_MOBILE_UNKNOWN:121,DETAILED_NETWORK_TYPE_MOBILE_UNKNOWN:120,DETAILED_NETWORK_TYPE_WIMAX:119,DETAILED_NETWORK_TYPE_ETHERNET:118,DETAILED_NETWORK_TYPE_BLUETOOTH:117,DETAILED_NETWORK_TYPE_WIFI:116,DETAILED_NETWORK_TYPE_LTE:115,DETAILED_NETWORK_TYPE_HSPAP:114,DETAILED_NETWORK_TYPE_EHRPD:113,
DETAILED_NETWORK_TYPE_EVDO_B:112,DETAILED_NETWORK_TYPE_UMTS:111,DETAILED_NETWORK_TYPE_IDEN:110,DETAILED_NETWORK_TYPE_HSUPA:109,DETAILED_NETWORK_TYPE_HSPA:108,DETAILED_NETWORK_TYPE_HSDPA:107,DETAILED_NETWORK_TYPE_EVDO_A:106,DETAILED_NETWORK_TYPE_EVDO_0:105,DETAILED_NETWORK_TYPE_CDMA:104,DETAILED_NETWORK_TYPE_1_X_RTT:103,DETAILED_NETWORK_TYPE_GPRS:102,DETAILED_NETWORK_TYPE_EDGE:101,DETAILED_NETWORK_TYPE_UNKNOWN:0};X[X.DETAILED_NETWORK_TYPE_NR_NSA]="DETAILED_NETWORK_TYPE_NR_NSA";
X[X.DETAILED_NETWORK_TYPE_NR_SA]="DETAILED_NETWORK_TYPE_NR_SA";X[X.DETAILED_NETWORK_TYPE_INTERNAL_WIFI_IMPAIRED]="DETAILED_NETWORK_TYPE_INTERNAL_WIFI_IMPAIRED";X[X.DETAILED_NETWORK_TYPE_APP_WIFI_HOTSPOT]="DETAILED_NETWORK_TYPE_APP_WIFI_HOTSPOT";X[X.DETAILED_NETWORK_TYPE_DISCONNECTED]="DETAILED_NETWORK_TYPE_DISCONNECTED";X[X.DETAILED_NETWORK_TYPE_NON_MOBILE_UNKNOWN]="DETAILED_NETWORK_TYPE_NON_MOBILE_UNKNOWN";X[X.DETAILED_NETWORK_TYPE_MOBILE_UNKNOWN]="DETAILED_NETWORK_TYPE_MOBILE_UNKNOWN";
X[X.DETAILED_NETWORK_TYPE_WIMAX]="DETAILED_NETWORK_TYPE_WIMAX";X[X.DETAILED_NETWORK_TYPE_ETHERNET]="DETAILED_NETWORK_TYPE_ETHERNET";X[X.DETAILED_NETWORK_TYPE_BLUETOOTH]="DETAILED_NETWORK_TYPE_BLUETOOTH";X[X.DETAILED_NETWORK_TYPE_WIFI]="DETAILED_NETWORK_TYPE_WIFI";X[X.DETAILED_NETWORK_TYPE_LTE]="DETAILED_NETWORK_TYPE_LTE";X[X.DETAILED_NETWORK_TYPE_HSPAP]="DETAILED_NETWORK_TYPE_HSPAP";X[X.DETAILED_NETWORK_TYPE_EHRPD]="DETAILED_NETWORK_TYPE_EHRPD";X[X.DETAILED_NETWORK_TYPE_EVDO_B]="DETAILED_NETWORK_TYPE_EVDO_B";
X[X.DETAILED_NETWORK_TYPE_UMTS]="DETAILED_NETWORK_TYPE_UMTS";X[X.DETAILED_NETWORK_TYPE_IDEN]="DETAILED_NETWORK_TYPE_IDEN";X[X.DETAILED_NETWORK_TYPE_HSUPA]="DETAILED_NETWORK_TYPE_HSUPA";X[X.DETAILED_NETWORK_TYPE_HSPA]="DETAILED_NETWORK_TYPE_HSPA";X[X.DETAILED_NETWORK_TYPE_HSDPA]="DETAILED_NETWORK_TYPE_HSDPA";X[X.DETAILED_NETWORK_TYPE_EVDO_A]="DETAILED_NETWORK_TYPE_EVDO_A";X[X.DETAILED_NETWORK_TYPE_EVDO_0]="DETAILED_NETWORK_TYPE_EVDO_0";X[X.DETAILED_NETWORK_TYPE_CDMA]="DETAILED_NETWORK_TYPE_CDMA";
X[X.DETAILED_NETWORK_TYPE_1_X_RTT]="DETAILED_NETWORK_TYPE_1_X_RTT";X[X.DETAILED_NETWORK_TYPE_GPRS]="DETAILED_NETWORK_TYPE_GPRS";X[X.DETAILED_NETWORK_TYPE_EDGE]="DETAILED_NETWORK_TYPE_EDGE";X[X.DETAILED_NETWORK_TYPE_UNKNOWN]="DETAILED_NETWORK_TYPE_UNKNOWN";var Cp={LATENCY_PLAYER_RTSP:7,LATENCY_PLAYER_HTML5_INLINE:6,LATENCY_PLAYER_HTML5_FULLSCREEN:5,LATENCY_PLAYER_HTML5:4,LATENCY_PLAYER_FRAMEWORK:3,LATENCY_PLAYER_FLASH:2,LATENCY_PLAYER_EXO:1,LATENCY_PLAYER_UNKNOWN:0};Cp[Cp.LATENCY_PLAYER_RTSP]="LATENCY_PLAYER_RTSP";
Cp[Cp.LATENCY_PLAYER_HTML5_INLINE]="LATENCY_PLAYER_HTML5_INLINE";Cp[Cp.LATENCY_PLAYER_HTML5_FULLSCREEN]="LATENCY_PLAYER_HTML5_FULLSCREEN";Cp[Cp.LATENCY_PLAYER_HTML5]="LATENCY_PLAYER_HTML5";Cp[Cp.LATENCY_PLAYER_FRAMEWORK]="LATENCY_PLAYER_FRAMEWORK";Cp[Cp.LATENCY_PLAYER_FLASH]="LATENCY_PLAYER_FLASH";Cp[Cp.LATENCY_PLAYER_EXO]="LATENCY_PLAYER_EXO";Cp[Cp.LATENCY_PLAYER_UNKNOWN]="LATENCY_PLAYER_UNKNOWN";
var Dp={LATENCY_AD_BREAK_TYPE_POSTROLL:3,LATENCY_AD_BREAK_TYPE_MIDROLL:2,LATENCY_AD_BREAK_TYPE_PREROLL:1,LATENCY_AD_BREAK_TYPE_UNKNOWN:0};Dp[Dp.LATENCY_AD_BREAK_TYPE_POSTROLL]="LATENCY_AD_BREAK_TYPE_POSTROLL";Dp[Dp.LATENCY_AD_BREAK_TYPE_MIDROLL]="LATENCY_AD_BREAK_TYPE_MIDROLL";Dp[Dp.LATENCY_AD_BREAK_TYPE_PREROLL]="LATENCY_AD_BREAK_TYPE_PREROLL";Dp[Dp.LATENCY_AD_BREAK_TYPE_UNKNOWN]="LATENCY_AD_BREAK_TYPE_UNKNOWN";var Ep={LATENCY_ACTION_ERROR_STARTUP_TIMEOUT:1,LATENCY_ACTION_ERROR_UNSPECIFIED:0};
Ep[Ep.LATENCY_ACTION_ERROR_STARTUP_TIMEOUT]="LATENCY_ACTION_ERROR_STARTUP_TIMEOUT";Ep[Ep.LATENCY_ACTION_ERROR_UNSPECIFIED]="LATENCY_ACTION_ERROR_UNSPECIFIED";var Fp={LIVE_STREAM_MODE_WINDOW:5,LIVE_STREAM_MODE_POST:4,LIVE_STREAM_MODE_LP:3,LIVE_STREAM_MODE_LIVE:2,LIVE_STREAM_MODE_DVR:1,LIVE_STREAM_MODE_UNKNOWN:0};Fp[Fp.LIVE_STREAM_MODE_WINDOW]="LIVE_STREAM_MODE_WINDOW";Fp[Fp.LIVE_STREAM_MODE_POST]="LIVE_STREAM_MODE_POST";Fp[Fp.LIVE_STREAM_MODE_LP]="LIVE_STREAM_MODE_LP";
Fp[Fp.LIVE_STREAM_MODE_LIVE]="LIVE_STREAM_MODE_LIVE";Fp[Fp.LIVE_STREAM_MODE_DVR]="LIVE_STREAM_MODE_DVR";Fp[Fp.LIVE_STREAM_MODE_UNKNOWN]="LIVE_STREAM_MODE_UNKNOWN";var Gp={VIDEO_STREAM_TYPE_VOD:3,VIDEO_STREAM_TYPE_DVR:2,VIDEO_STREAM_TYPE_LIVE:1,VIDEO_STREAM_TYPE_UNSPECIFIED:0};Gp[Gp.VIDEO_STREAM_TYPE_VOD]="VIDEO_STREAM_TYPE_VOD";Gp[Gp.VIDEO_STREAM_TYPE_DVR]="VIDEO_STREAM_TYPE_DVR";Gp[Gp.VIDEO_STREAM_TYPE_LIVE]="VIDEO_STREAM_TYPE_LIVE";Gp[Gp.VIDEO_STREAM_TYPE_UNSPECIFIED]="VIDEO_STREAM_TYPE_UNSPECIFIED";
var Hp={YT_IDB_TRANSACTION_TYPE_READ:2,YT_IDB_TRANSACTION_TYPE_WRITE:1,YT_IDB_TRANSACTION_TYPE_UNKNOWN:0};Hp[Hp.YT_IDB_TRANSACTION_TYPE_READ]="YT_IDB_TRANSACTION_TYPE_READ";Hp[Hp.YT_IDB_TRANSACTION_TYPE_WRITE]="YT_IDB_TRANSACTION_TYPE_WRITE";Hp[Hp.YT_IDB_TRANSACTION_TYPE_UNKNOWN]="YT_IDB_TRANSACTION_TYPE_UNKNOWN";var Ip={PLAYER_ROTATION_TYPE_PORTRAIT_TO_FULLSCREEN:2,PLAYER_ROTATION_TYPE_FULLSCREEN_TO_PORTRAIT:1,PLAYER_ROTATION_TYPE_UNKNOWN:0};Ip[Ip.PLAYER_ROTATION_TYPE_PORTRAIT_TO_FULLSCREEN]="PLAYER_ROTATION_TYPE_PORTRAIT_TO_FULLSCREEN";
Ip[Ip.PLAYER_ROTATION_TYPE_FULLSCREEN_TO_PORTRAIT]="PLAYER_ROTATION_TYPE_FULLSCREEN_TO_PORTRAIT";Ip[Ip.PLAYER_ROTATION_TYPE_UNKNOWN]="PLAYER_ROTATION_TYPE_UNKNOWN";var Jp=y.ytLoggingGelSequenceIdObj_||{};z("ytLoggingGelSequenceIdObj_",Jp,void 0);function Kp(a,b,c){c=void 0===c?{}:c;var d=Math.round(c.timestamp||M());F(a,1,d<Number.MAX_SAFE_INTEGER?d:0);var e=Vh();d=new Ng;F(d,1,c.timestamp||!isFinite(e)?-1:e);if(L("log_sequence_info_on_gel_web")&&c.X){e=c.X;var f=sj(e),g=new Mg;F(g,2,f);F(g,1,e);G(d,3,g);c.ub&&delete Jp[c.X]}G(a,33,d);(c.nc?dj:Zi)({endpoint:"log_event",payload:a,cttAuthInfo:c.cttAuthInfo,xa:c.xa},b)}
;function Lp(a,b){b=void 0===b?{}:b;var c=!1;B("ytLoggingEventsDefaultDisabled",!1)&&ln===ln&&(c=!0);Kp(a,c?null:ln,b)}
;function Mp(a,b,c){var d=new Og;Nc(d,72,a);c?Kp(d,c,b):Lp(d,b)}
function Np(a,b,c){var d=new Og;Nc(d,73,a);c?Kp(d,c,b):Lp(d,b)}
function Op(a,b,c){var d=new Og;Nc(d,78,a);c?Kp(d,c,b):Lp(d,b)}
function Pp(a,b,c){var d=new Og;Nc(d,208,a);c?Kp(d,c,b):Lp(d,b)}
function Qp(a,b,c){var d=new Og;Nc(d,156,a);c?Kp(d,c,b):Lp(d,b)}
function Rp(a,b,c){var d=new Og;Nc(d,215,a);c?Kp(d,c,b):Lp(d,b)}
;var Sp=y.ytLoggingLatencyUsageStats_||{};z("ytLoggingLatencyUsageStats_",Sp,void 0);function Tp(){this.h=0}
function Up(){Tp.h||(Tp.h=new Tp);return Tp.h}
Tp.prototype.tick=function(a,b,c,d){Vp(this,"tick_"+a+"_"+b)||(c={timestamp:c,cttAuthInfo:d},L("web_csi_via_jspb")?(d=new Lg,F(d,1,a),F(d,2,b),a=new Og,Nc(a,5,d),Lp(a,c)):kk("latencyActionTicked",{tickName:a,clientActionNonce:b},c))};
Tp.prototype.info=function(a,b,c){var d=Object.keys(a).join("");Vp(this,"info_"+d+"_"+b)||(a=Object.assign({},a),a.clientActionNonce=b,kk("latencyActionInfo",a,{cttAuthInfo:c}))};
Tp.prototype.jspbInfo=function(a,b,c){for(var d="",e=0;e<a.toJSON().length;e++)void 0!==a.toJSON()[e]&&(d=0===e?d.concat(""+e):d.concat("_"+e));Vp(this,"info_"+d+"_"+b)||(F(a,2,b),b={cttAuthInfo:c},c=new Og,Nc(c,7,a),Lp(c,b))};
Tp.prototype.span=function(a,b,c){var d=Object.keys(a).join("");Vp(this,"span_"+d+"_"+b)||(a.clientActionNonce=b,kk("latencyActionSpan",a,{cttAuthInfo:c}))};
function Vp(a,b){Sp[b]=Sp[b]||{count:0};var c=Sp[b];c.count++;c.time=M();a.h||(a.h=Kh(function(){var d=M(),e;for(e in Sp)Sp[e]&&6E4<d-Sp[e].time&&delete Sp[e];a&&(a.h=0)},5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new nk("CSI data exceeded logging limit with key",b.split("_")),0<=b.indexOf("plev")||Fn(c)),!0):!1}
;function Wp(){var a=["ol"];rp("").info.actionType="embed";a&&ih("TIMING_AFT_KEYS",a);ih("TIMING_ACTION","embed");a=B("TIMING_INFO",{});for(var b in a)a.hasOwnProperty(b)&&Xp(b,a[b]);b={isNavigation:!0,actionType:zp(jh("TIMING_ACTION"))};if(a=jh("PREVIOUS_ACTION"))b.previousAction=zp(a);if(a=B("CLIENT_PROTOCOL"))b.httpProtocol=a;if(a=B("CLIENT_TRANSPORT"))b.transportProtocol=a;(a=Wn())&&"UNDEFINED_CSN"!==a&&(b.clientScreenNonce=a);a=Yp();if(1===a||-1===a)b.isVisible=!0;a=jp();b.loadType="cold";var c=
dp(),d=fp();d&&(Z("srt",c.responseStart),1!==a.prerender&&Z("_start",d,void 0));a=pp();0<a&&Z("fpt",a);a=dp();a.isPerformanceNavigationTiming&&Zp({performanceNavigationTiming:!0},void 0);Z("nreqs",a.requestStart,void 0);Z("nress",a.responseStart,void 0);Z("nrese",a.responseEnd,void 0);0<a.redirectEnd-a.redirectStart&&(Z("nrs",a.redirectStart,void 0),Z("nre",a.redirectEnd,void 0));0<a.domainLookupEnd-a.domainLookupStart&&(Z("ndnss",a.domainLookupStart,void 0),Z("ndnse",a.domainLookupEnd,void 0));0<
a.connectEnd-a.connectStart&&(Z("ntcps",a.connectStart,void 0),Z("ntcpe",a.connectEnd,void 0));a.secureConnectionStart>=fp()&&0<a.connectEnd-a.secureConnectionStart&&(Z("nstcps",a.secureConnectionStart,void 0),Z("ntcpe",a.connectEnd,void 0));Q&&"getEntriesByType"in Q&&$p();a=[];if(document.querySelector&&Q&&Q.getEntriesByName)for(var e in $o)$o.hasOwnProperty(e)&&(c=$o[e],aq(e,c)&&a.push(c));if(0<a.length)for(b.resourceInfo=[],e=q(a),a=e.next();!a.done;a=e.next())b.resourceInfo.push({resourceCache:a.value});
Zp(b);e=jp();b=lp();if("cold"===e.yt_lt||"cold"===b.loadType){a=cp();c=kp();c=c.gelTicks?c.gelTicks:c.gelTicks={};for(var f in a)f in c||Z(f,a[f]);f={};a=!1;c=q(Object.keys(e));for(d=c.next();!d.done;d=c.next())d=d.value,(d=Ap(d,e[d]))&&!op(lp(void 0),d)&&(Qo(b,d),Qo(f,d),a=!0);a&&Zp(f)}gp();f=jh("TIMING_ACTION");A("ytglobal.timingready_")&&f&&"_start"in cp(void 0)&&bp()&&np()}
function Xp(a,b,c){null!==b&&(jp(c)[a]=b,(a=Ap(a,b,c))&&Zp(a,c))}
function Zp(a,b){if(L("web_csi_via_jspb")){var c=new Ig,d=Object.keys(a);a=Object.values(a);for(var e=0;e<d.length;e++)switch(d[e]){case "actionType":F(c,1,U[a[e]]);break;case "clientActionNonce":F(c,2,a[e]);break;case "clientScreenNonce":F(c,4,a[e]);break;case "actionVisualElement":G(c,88,a[e]);break;case "loadType":F(c,3,a[e]);break;case "isFirstInstall":F(c,55,a[e]);break;case "networkType":F(c,5,Bp[a[e]]);break;case "connectionType":F(c,26,V[a[e]]);break;case "detailedConnectionType":F(c,27,X[a[e]]);
break;case "isVisible":F(c,6,a[e]);break;case "playerType":F(c,7,Cp[a[e]]);break;case "clientPlaybackNonce":F(c,8,a[e]);break;case "adClientPlaybackNonce":F(c,28,a[e]);break;case "previousCpn":F(c,77,a[e]);break;case "targetCpn":F(c,76,a[e]);break;case "isMonetized":F(c,9,a[e]);break;case "isPrerollAllowed":F(c,16,a[e]);break;case "isPrerollShown":F(c,17,a[e]);break;case "adType":F(c,12,a[e]);break;case "adTypesAllowed":F(c,36,a[e]);break;case "adNetworks":F(c,37,a[e]);break;case "previousAction":F(c,
13,U[a[e]]);break;case "isRedSubscriber":F(c,14,a[e]);break;case "serverTimeMs":F(c,15,a[e]);break;case "spinnerInfo":G(c,18,a[e]);break;case "videoId":c.setVideoId(a[e]);break;case "adVideoId":F(c,20,a[e]);break;case "targetVideoId":F(c,78,a[e]);break;case "adBreakType":F(c,21,Dp[a[e]]);break;case "isNavigation":F(c,25,a[e]);break;case "viewportHeight":F(c,29,a[e]);break;case "viewportWidth":F(c,30,a[e]);break;case "screenHeight":F(c,84,a[e]);break;case "screenWidth":F(c,85,a[e]);break;case "browseId":F(c,
31,a[e]);break;case "isCacheHit":F(c,32,a[e]);break;case "httpProtocol":F(c,33,a[e]);break;case "transportProtocol":F(c,34,a[e]);break;case "searchQuery":F(c,41,a[e]);break;case "isContinuation":F(c,42,a[e]);break;case "availableProcessors":F(c,43,a[e]);break;case "sdk":F(c,44,a[e]);break;case "isLocalStream":F(c,45,a[e]);break;case "navigationRequestedSameUrl":F(c,64,a[e]);break;case "shellStartupDurationMs":F(c,70,a[e]);break;case "appInstallDataAgeMs":F(c,73,a[e]);break;case "latencyActionError":F(c,
71,Ep[a[e]]);break;case "actionStep":F(c,79,a[e]);break;case "jsHeapSizeLimit":F(c,80,a[e]);break;case "totalJsHeapSize":F(c,81,a[e]);break;case "usedJsHeapSize":F(c,82,a[e]);break;case "resourceInfo":Pc(c,83,Hg,a[e]);break;case "sourceVideoDurationMs":F(c,90,a[e]);break;case "playerInfo":G(c,22,a[e]);break;case "commentInfo":G(c,23,a[e]);break;case "mdxInfo":G(c,24,a[e]);break;case "watchInfo":G(c,35,a[e]);break;case "adPrebufferedTimeSecs":F(c,39,a[e]);break;case "thumbnailLoadInfo":G(c,40,a[e]);
break;case "creatorInfo":G(c,46,a[e]);break;case "unpluggedInfo":G(c,50,a[e]);break;case "isLivestream":F(c,47,a[e]);break;case "liveStreamMode":F(c,91,Fp[a[e]]);break;case "adCpn2":F(c,48,a[e]);break;case "adDaiDriftMillis":F(c,49,a[e]);break;case "videoStreamType":F(c,53,Gp[a[e]]);break;case "reelInfo":G(c,54,a[e]);break;case "subscriptionsFeedInfo":G(c,72,a[e]);break;case "playbackRequiresTap":F(c,56,a[e]);break;case "requestIds":Pc(c,68,Kg,a[e]);break;case "mediaBrowserActionInfo":G(c,58,a[e]);
break;case "performanceNavigationTiming":F(c,67,a[e]);break;case "musicLoadActionInfo":G(c,69,a[e]);break;case "transactionType":F(c,74,Hp[a[e]]);break;case "shoppingInfo":G(c,75,a[e]);break;case "prefetchInfo":G(c,86,a[e]);break;case "accelerationSession":G(c,87,a[e]);break;case "playerRotationType":F(c,101,Ip[a[e]]);break;case "webInfo":G(c,38,a[e]);break;case "tvInfo":G(c,51,a[e]);break;case "kabukiInfo":G(c,52,a[e]);break;case "mwebInfo":G(c,59,a[e]);break;case "musicInfo":G(c,65,a[e]);break;
case "allowedPreroll":F(c,10,a[e]);break;case "shownPreroll":F(c,11,a[e]);break;case "getHomeRequestId":F(c,57,a[e]);break;case "getSearchRequestId":F(c,60,a[e]);break;case "getPlayerRequestId":F(c,61,a[e]);break;case "getWatchNextRequestId":F(c,62,a[e]);break;case "getBrowseRequestId":F(c,63,a[e]);break;case "getLibraryRequestId":F(c,66,a[e])}a=kp(b);a.jspbInfos||(a.jspbInfos=[]);a.jspbInfos.push(c);rp(b||"").jspbInfo.push(c);a=mp(b);b=hp(b).cttAuthInfo;Up().jspbInfo(c,a,b)}else c=rp(b||""),Qo(c.info,
a),Qo(lp(b),a),c=mp(b),b=hp(b).cttAuthInfo,Up().info(a,c,b)}
function Z(a,b,c){if(!b&&"_"!==a[0]){var d=a;Q.mark&&(0==d.lastIndexOf("mark_",0)||(d="mark_"+d),c&&(d+=" ("+c+")"),Q.mark(d))}rp(c||"").tick[a]=b||M();d=kp(c);d.gelTicks&&(d.gelTicks[a]=!0);d=cp(c);var e=b||M();d[a]=e;e=mp(c);var f=hp(c).cttAuthInfo;if("_start"===a){var g=Up();Vp(g,"baseline_"+e)||(b={timestamp:b,cttAuthInfo:f},L("web_csi_via_jspb")?(f=new Gg,F(f,1,e),e=new Og,Nc(e,6,f),Lp(e,b)):kk("latencyActionBaselined",{clientActionNonce:e},b))}else Up().tick(a,e,b,f);np(c);return d[a]}
function bq(){var a=mp(void 0);requestAnimationFrame(function(){setTimeout(function(){a===mp(void 0)&&Z("ol",void 0,void 0)},0)})}
function Yp(){var a=document;if("visibilityState"in a)a=a.visibilityState;else{var b=rh+"VisibilityState";a=b in a?a[b]:void 0}switch(a){case "hidden":return 0;case "visible":return 1;case "prerender":return 2;case "unloaded":return 3;default:return-1}}
function aq(a,b){a=document.querySelector(a);if(!a)return!1;var c="",d=a.nodeName;"SCRIPT"===d?(c=a.src,c||(c=a.getAttribute("data-timing-href"))&&(c=window.location.protocol+c)):"LINK"===d&&(c=a.href);Tb()&&a.setAttribute("nonce",Tb());return c?(a=Q.getEntriesByName(c))&&a[0]&&(a=a[0],c=fp(),Z("rsf_"+b,c+Math.round(a.fetchStart)),Z("rse_"+b,c+Math.round(a.responseEnd)),void 0!==a.transferSize&&0===a.transferSize)?!0:!1:!1}
function $p(){var a=window.location.protocol,b=Q.getEntriesByType("resource");b=db(b,function(c){return 0===c.name.indexOf(a+"//fonts.gstatic.com/s/")});
(b=fb(b,function(c,d){return d.duration>c.duration?d:c},{duration:0}))&&0<b.startTime&&0<b.responseEnd&&(Z("wffs",ep(b.startTime)),Z("wffe",ep(b.responseEnd)))}
var cq=window;cq.ytcsi&&(cq.ytcsi.info=Xp,cq.ytcsi.tick=Z);var dq=["consistency","mss","client_location","entities","store"];function eq(a,b,c,d,e){this.o=a;this.I=b;this.l=c;this.m=d;this.j=e;this.i=void 0;this.h=new Map;a.Ba||(a.Ba={});a.Ba=Object.assign(Object.assign({},Po),a.Ba)}
function fq(a,b,c,d,e){if(void 0!==eq.h){if(d=eq.h,a=[a!==d.o,b!==d.I,c!==d.l,!1,!1,void 0!==d.i],a.some(function(f){return f}))throw new nk("InnerTubeTransportService is already initialized",a);
}else eq.h=new eq(a,b,c,d,e)}
function gq(){var a=eq.h,b={signalServiceEndpoint:{signal:"GET_DATASYNC_IDS"}};var c=void 0===c?vo:c;var d=Go(b,a.o);if(!d)return Df(new nk("Error: No request builder found for command.",b));var e=d.o(b,void 0,c);return e?new yf(function(f){var g,h,k;return w(function(m){if(1==m.h)return h="cors"===(null===(g=e.ta)||void 0===g?void 0:g.mode)?"cors":void 0,v(m,hq(a,e.config,h),2);k=m.i;f(iq(a,e,k));m.h=0})}):Df(new nk("Error: Failed to build request for command.",b))}
function iq(a,b,c){var d,e,f,g,h,k,m,n,t,x,u,C,D,K,N,S,W,Qa,zb;return w(function(P){switch(P.h){case 1:P.s(2);break;case 3:if((m=P.i)&&!m.isExpired())return P.return(Promise.resolve(m.h()));case 2:if((n=null===(d=b.config)||void 0===d?void 0:d.Ao)&&a.h.has(n)&&L("web_memoize_inflight_requests"))return P.return(a.h.get(n));if(null===(e=null===b||void 0===b?void 0:b.ba)||void 0===e?0:e.context)for(t=q([]),x=t.next();!x.done;x=t.next())u=x.value,u.yo(b.ba.context);if(null===(f=a.i)||void 0===f?0:f.l(b.input,
b.ba))return P.return(a.i.j(b.input,b.ba));C=JSON.stringify(b.ba);b.ta=Object.assign(Object.assign({},b.ta),{headers:c});D=Object.assign({},b.ta);"POST"===b.ta.method&&(D=Object.assign(Object.assign({},D),{body:C}));(null===(g=b.config)||void 0===g?0:g.jc)&&Z(b.config.jc);K=a.I.fetch(b.input,D,b.config);n&&a.h.set(n,K);return v(P,K,4);case 4:N=P.i;n&&a.h.has(n)&&a.h.delete(n);(null===(h=b.config)||void 0===h?0:h.kc)&&Z(b.config.kc);if(N||null===(k=a.i)||void 0===k||!k.h(b.input,b.ba)){P.s(5);break}return v(P,
a.i.i(b.input,b.ba),6);case 6:N=P.i;case 5:if(L("web_ordered_response_processors")&&N&&a.j)for(S=q(dq),x=S.next();!x.done;x=S.next())W=x.value,a.j[W]&&a.j[W].handleResponse(N,b);else if(N&&a.m)for(Qa=q(a.m),x=Qa.next();!x.done;x=Qa.next())zb=x.value,zb.handleResponse(N,b);return P.return(N)}})}
function hq(a,b,c){return w(function(d){if(a.l.yc){var e=d.return,f,g=null===(f=null===b||void 0===b?void 0:b.Ia)||void 0===f?void 0:f.sessionIndex;f=uo({sessionIndex:g});f=Object.assign(Object.assign({},jq(c)),f);d=e.call(d,f)}else d=d.return(kq(b,c));return d})}
function kq(a,b){var c,d,e;return w(function(f){if(1==f.h){d=null===(c=null===a||void 0===a?void 0:a.Ia)||void 0===c?void 0:c.sessionIndex;var g=uo({sessionIndex:d});if(!(g instanceof yf)){var h=new yf(Ia);zf(h,2,g);g=h}return v(f,g,2)}e=f.i;return f.return(Promise.resolve(Object.assign(Object.assign({},jq(b)),e)))})}
function jq(a){var b={"Content-Type":"application/json"};L("enable_web_eom_visitor_data")&&B("EOM_VISITOR_DATA")?b["X-Goog-EOM-Visitor-Id"]=B("EOM_VISITOR_DATA"):B("VISITOR_DATA")&&(b["X-Goog-Visitor-Id"]=B("VISITOR_DATA"));"cors"!==a&&((a=B("INNERTUBE_CONTEXT_CLIENT_NAME"))&&(b["X-Youtube-Client-Name"]=a),(a=B("INNERTUBE_CONTEXT_CLIENT_VERSION"))&&(b["X-Youtube-Client-Version"]=a),(a=B("CHROME_CONNECTED_HEADER"))&&(b["X-Youtube-Chrome-Connected"]=a),L("forward_domain_admin_state_on_embeds")&&(a=
B("DOMAIN_ADMIN_STATE"))&&(b["X-Youtube-Domain-Admin-State"]=a));return b}
;var lq=["share/get_web_player_share_panel"],mq=["feedback"],nq=["notification/modify_channel_preference"],oq=["browse/edit_playlist"],pq=["subscription/subscribe"],qq=["subscription/unsubscribe"];function rq(){}
r(rq,Mo);rq.prototype.j=function(){return pq};
rq.prototype.h=function(a){return a.subscribeEndpoint};
rq.prototype.i=function(a,b,c){c=void 0===c?{}:c;b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params);c.botguardResponse&&(a.botguardResponse=c.botguardResponse);c.feature&&(a.clientFeature=c.feature)};
da.Object.defineProperties(rq.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function sq(){}
r(sq,Mo);sq.prototype.j=function(){return qq};
sq.prototype.h=function(a){return a.unsubscribeEndpoint};
sq.prototype.i=function(a,b){b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params)};
da.Object.defineProperties(sq.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function tq(){}
r(tq,Mo);tq.prototype.j=function(){return mq};
tq.prototype.h=function(a){return a.feedbackEndpoint};
tq.prototype.i=function(a,b,c){a.feedbackTokens=[];b.feedbackToken&&a.feedbackTokens.push(b.feedbackToken);if(b=b.cpn||c.cpn)a.feedbackContext={cpn:b};a.isFeedbackTokenUnencrypted=!!c.is_feedback_token_unencrypted;a.shouldMerge=!1;c.extra_feedback_tokens&&(a.shouldMerge=!0,a.feedbackTokens=a.feedbackTokens.concat(c.extra_feedback_tokens))};
da.Object.defineProperties(tq.prototype,{l:{configurable:!0,enumerable:!0,get:function(){return!0}}});function uq(){}
r(uq,Mo);uq.prototype.j=function(){return nq};
uq.prototype.h=function(a){return a.modifyChannelNotificationPreferenceEndpoint};
uq.prototype.i=function(a,b){b.params&&(a.params=b.params);b.secondaryParams&&(a.secondaryParams=b.secondaryParams)};function vq(){}
r(vq,Mo);vq.prototype.j=function(){return oq};
vq.prototype.h=function(a){return a.playlistEditEndpoint};
vq.prototype.i=function(a,b){b.actions&&(a.actions=b.actions);b.params&&(a.params=b.params);b.playlistId&&(a.playlistId=b.playlistId)};function wq(){}
r(wq,Mo);wq.prototype.j=function(){return lq};
wq.prototype.h=function(a){return a.webPlayerShareEntityServiceEndpoint};
wq.prototype.i=function(a,b,c){c=void 0===c?{}:c;b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);c.includeListId&&(a.includeListId=!0)};function xq(){}
xq.prototype.fetch=function(a,b){var c=this,d,e,f;return w(function(g){if(1==g.h){d=new window.Request(a,b);if(L("web_fetch_promise_cleanup_killswitch"))return g.return(Promise.resolve(fetch(d).then(function(h){return c.handleResponse(h)}).catch(function(h){Fn(h)})));
sa(g,3);return v(g,fetch(d),5)}if(3!=g.h)return e=g.i,g.return(c.handleResponse(e));f=ua(g);Fn(f);return g.return(void 0)})};
xq.prototype.handleResponse=function(a){var b=a.text().then(function(c){return JSON.parse(c.replace(")]}'",""))});
a.redirected||a.ok||(b=b.then(function(c){Fn(new nk("Error: API fetch failed",a.status,a.url,c));return Object.assign(Object.assign({},c),{errorMetadata:{status:a.status}})}));
return b};var yq;function zq(a){Pl.call(this,1,arguments);this.csn=a}
r(zq,Pl);var Yl=new Ql("screen-created",zq),Aq=[],Cq=Bq,Dq=0;function Eq(a,b,c,d,e,f,g){function h(){Fn(new nk("newScreen() parent element does not have a VE - rootVe",b))}
var k=Cq();f=new Pn({veType:b,youtubeData:f,jspbYoutubeData:void 0});e={cttAuthInfo:e,X:k};if(L("il_via_jspb")){var m=new wg;m.Y(k);xg(m,f.getAsJspb());c&&c.visualElement?(f=new yg,c.clientScreenNonce&&F(f,2,c.clientScreenNonce),zg(f,c.visualElement.getAsJspb()),g&&F(f,4,vg[g]),G(m,5,f)):c&&h();d&&F(m,3,d);Qp(m,e,a)}else f={csn:k,pageVe:f.getAsJson()},c&&c.visualElement?(f.implicitGesture={parentCsn:c.clientScreenNonce,gesturedVe:c.visualElement.getAsJson()},g&&(f.implicitGesture.gestureType=g)):
c&&h(),d&&(f.cloneCsn=d),a?rj("screenCreated",f,a,e):kk("screenCreated",f,e);Vl(Yl,new zq(k));return k}
function Fq(a,b,c,d){var e=d.filter(function(k){k.csn!==b?(k.csn=b,k=!0):k=!1;return k}),f={cttAuthInfo:Yn(b),
X:b};d=q(d);for(var g=d.next();!g.done;g=d.next())g=g.value.getAsJson(),(nb(g)||!g.trackingParams&&!g.veType)&&Fn(Error("Child VE logged with no data"));if(L("il_via_jspb")){var h=new Ag;h.Y(b);Cg(h,c.getAsJspb());eb(e,function(k){k=k.getAsJspb();Pc(h,3,ug,k)});
"UNDEFINED_CSN"==b?Gq("visualElementAttached",h,f):Rp(h,f,a)}else c={csn:b,parentVe:c.getAsJson(),childVes:eb(e,function(k){return k.getAsJson()})},"UNDEFINED_CSN"==b?Gq("visualElementAttached",c,f):a?rj("visualElementAttached",c,a,f):kk("visualElementAttached",c,f)}
function Bq(){for(var a=Math.random()+"",b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);255<e&&(b[c++]=e&255,e>>=8);b[c++]=e}return zc(b,3)}
function Gq(a,b,c){Aq.push({payloadName:a,payload:b,options:c});Dq||(Dq=Zl())}
function $l(a){if(Aq){for(var b=q(Aq),c=b.next();!c.done;c=b.next())if(c=c.value,c.payload)if(L("il_via_jspb"))switch(c.payload.Y(a.csn),c.payloadName){case "screenCreated":Qp(c.payload,c.options);break;case "visualElementAttached":Rp(c.payload,c.options);break;case "visualElementShown":Mp(c.payload,c.options);break;case "visualElementHidden":Np(c.payload,c.options);break;case "visualElementGestured":Op(c.payload,c.options);break;case "visualElementStateChanged":Pp(c.payload,c.options);break;default:Fn(new nk("flushQueue unable to map payloadName to JSPB setter"))}else c.payload.csn=
a.csn,rj(c.payloadName,c.payload,null,c.options);Aq.length=0}Dq=0}
;function Hq(){this.i=new Set;this.h=new Set;this.j=new Map}
Hq.prototype.clear=function(){this.i.clear();this.h.clear();this.j.clear()};
Ja(Hq);function Iq(){this.o=[];this.D=[];this.h=[];this.l=[];this.m=[];this.i=new Set;this.u=new Map}
function Jq(a,b,c){c=void 0===c?0:c;b.then(function(d){var e,f;a.i.has(c)&&a.j&&a.j();var g=Wn(c),h=Un(c);g&&h&&((null===(e=null===d||void 0===d?void 0:d.response)||void 0===e?0:e.trackingParams)&&Fq(a.client,g,h,[Qn(d.response.trackingParams)]),(null===(f=null===d||void 0===d?void 0:d.playerResponse)||void 0===f?0:f.trackingParams)&&Fq(a.client,g,h,[Qn(d.playerResponse.trackingParams)]))})}
function Kq(a,b,c,d){d=void 0===d?0:d;if(a.i.has(d))a.o.push([b,c]);else{var e=Wn(d);c=c||Un(d);e&&c&&Fq(a.client,e,c,[b])}}
Iq.prototype.clickCommand=function(a,b,c){var d=a.clickTrackingParams;c=void 0===c?0:c;if(d)if(c=Wn(void 0===c?0:c)){a=this.client;var e=Qn(d);var f="INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";d={cttAuthInfo:Yn(c),X:c};if(L("il_via_jspb")){var g=new Dg;g.Y(c);e=e.getAsJspb();G(g,2,e);F(g,4,vg[f]);b&&G(g,3,void 0);"UNDEFINED_CSN"==c?Gq("visualElementGestured",g,d):Op(g,d,a)}else f={csn:c,ve:e.getAsJson(),gestureType:f},b&&(f.clientData=b),"UNDEFINED_CSN"==c?Gq("visualElementGestured",f,d):a?rj("visualElementGestured",
f,a,d):kk("visualElementGestured",f,d);b=!0}else b=!1;else b=!1;return b};
function Lq(a,b,c){c=void 0===c?{}:c;a.i.add(c.layer||0);a.j=function(){Mq(a,b,c);var f=Un(c.layer);if(f){for(var g=q(a.o),h=g.next();!h.done;h=g.next())h=h.value,Kq(a,h[0],h[1]||f,c.layer);f=q(a.D);for(g=f.next();!g.done;g=f.next()){var k=g.value;g=void 0;g=void 0===g?0:g;h=Wn(g);var m=k[0]||Un(g);if(h&&m){g=a.client;var n=k[1];k={cttAuthInfo:Yn(h),X:h};L("il_via_jspb")?(n=new Fg,n.Y(h),m=m.getAsJspb(),G(n,2,m),"UNDEFINED_CSN"==h?Gq("visualElementStateChanged",n,k):Pp(n,k,g)):(m={csn:h,ve:m.getAsJson(),
clientData:n},"UNDEFINED_CSN"==h?Gq("visualElementStateChanged",m,k):g?rj("visualElementStateChanged",m,g,k):kk("visualElementStateChanged",m,k))}}}};
Wn(c.layer)||a.j();if(c.sb)for(var d=q(c.sb),e=d.next();!e.done;e=d.next())Jq(a,e.value,c.layer);else En(Error("Delayed screen needs a data promise."))}
function Mq(a,b,c){c=void 0===c?{}:c;c.layer||(c.layer=0);var d=void 0!==c.ec?c.ec:c.layer;var e=Wn(d);d=Un(d);var f;d&&(void 0!==c.parentCsn?f={clientScreenNonce:c.parentCsn,visualElement:d}:e&&"UNDEFINED_CSN"!==e&&(f={clientScreenNonce:e,visualElement:d}));var g,h=B("EVENT_ID");"UNDEFINED_CSN"===e&&h&&(g={servletData:{serializedServletEventId:h}});try{var k=Eq(a.client,b,f,c.rb,c.cttAuthInfo,g,c.to)}catch(m){Gn(m,{Bo:b,rootVe:d,parentVisualElement:void 0,qo:e,xo:f,rb:c.rb});En(m);return}Zn(k,b,
c.layer,c.cttAuthInfo);if((b=e&&"UNDEFINED_CSN"!==e&&d)&&!(b=L("screen_manager_skip_hide_killswitch"))){a:{b=q(Object.values(On));for(f=b.next();!f.done;f=b.next())if(Wn(f.value)==e){b=!0;break a}b=!1}b=!b}b&&(b=a.client,g=!0,h=(g=void 0===g?!1:g)?16:8,f={cttAuthInfo:Yn(e),X:e,ub:g},L("il_via_jspb")?(h=new Eg,h.Y(e),d=d.getAsJspb(),G(h,2,d),F(h,4,g?16:8),"UNDEFINED_CSN"==e?Gq("visualElementHidden",h,f):Np(h,f,b)):(d={csn:e,ve:d.getAsJson(),eventType:h},"UNDEFINED_CSN"==e?Gq("visualElementHidden",
d,f):b?rj("visualElementHidden",d,b,f):kk("visualElementHidden",d,f)));a.h[a.h.length-1]&&!a.h[a.h.length-1].csn&&(a.h[a.h.length-1].csn=k||"");Zp({clientScreenNonce:k});Hq.getInstance().clear();d=Un(c.layer);e&&"UNDEFINED_CSN"!==e&&d&&(L("web_mark_root_visible")||L("music_web_mark_root_visible"))&&(e=k,k={cttAuthInfo:Yn(e),X:e},L("il_via_jspb")?(b=new Eg,b.Y(e),f=d.getAsJspb(),G(b,2,f),F(b,4,1),"UNDEFINED_CSN"==e?Gq("visualElementShown",b,k):Mp(b,k,void 0)):(b={csn:e,ve:d.getAsJson(),eventType:1},
"UNDEFINED_CSN"==e?Gq("visualElementShown",b,k):kk("visualElementShown",b,k)));a.i.delete(c.layer||0);a.j=void 0;e=q(a.u);for(k=e.next();!k.done;k=e.next())b=q(k.value),k=b.next().value,b=b.next().value,b.has(c.layer)&&d&&Kq(a,k,d,c.layer);for(c=0;c<a.l.length;c++){e=a.l[c];try{e()}catch(m){En(m)}}for(c=a.l.length=0;c<a.m.length;c++){e=a.m[c];try{e()}catch(m){En(m)}}}
;function Nq(){var a;return w(function(b){if(1==b.h)return v(b,gq(),2);if(a=b.i)return a.errorMetadata?(En(Error("Datasync IDs fetch responded with "+a.errorMetadata.code+": "+a.error)),b.return(void 0)):b.return(a.ro);Fn(Error("Network request to get Datasync IDs failed."));return b.return(void 0)})}
;var Oq=y.caches,Pq;function Qq(a){var b=a.indexOf(":");return-1===b?{Cb:a}:{Cb:a.substring(0,b),datasyncId:a.substring(b+1)}}
function Rq(){return w(function(a){if(void 0!==Pq)return a.return(Pq);Pq=new Promise(function(b){var c;return w(function(d){switch(d.h){case 1:return sa(d,2),v(d,Oq.open("test-only"),4);case 4:return v(d,Oq.delete("test-only"),5);case 5:ta(d,3);break;case 2:if(c=ua(d),c instanceof Error&&"SecurityError"===c.name)return b(!1),d.return();case 3:b("caches"in window),d.h=0}})});
return a.return(Pq)})}
function Sq(a){var b,c,d,e,f,g,h;w(function(k){if(1==k.h)return v(k,Rq(),2);if(3!=k.h){if(!k.i)return k.return(!1);b=[];return v(k,Oq.keys(),3)}c=k.i;d=q(c);for(e=d.next();!e.done;e=d.next())f=e.value,g=Qq(f),h=g.datasyncId,!h||a.includes(h)||b.push(Oq.delete(f));return k.return(Promise.all(b).then(function(m){return m.some(function(n){return n})}))})}
;function Tq(){Nq().then(function(a){if(a&&(yl(a),Sq(a),L("clear_user_partitioned_ls"))){var b=void 0===b?{}:b;"_start"in cp("cupls")&&Z("aa",void 0,"cupls");var c=sp();c.cupls&&delete c.cupls;var d={timerName:"cupls",info:{},tick:{},span:{},jspbInfo:[]};qp().push(d);c.cupls=d;ip("cupls");ap();hp("cupls").useGel=!0;rp("cupls").info.actionType="cupls";b.cttAuthInfo&&(hp("cupls").cttAuthInfo=b.cttAuthInfo);ih("cuplsTIMING_ACTION","cupls");Z("_start",b.startTime,"cupls");b={actionType:zp("cupls")};(c=
Wn())&&"UNDEFINED_CSN"!==c&&(b.clientScreenNonce=c);Zp(b,"cupls");gp("cupls");Z("cuplss",void 0,"cupls");try{try{var e=!!self.localStorage}catch(t){e=!1}if(e)for(var f=Object.keys(window.localStorage),g=q(f),h=g.next();!h.done;h=g.next()){var k=h.value;var m=k.match(/(.*)::.*::.*/);var n=null!==m?m[1]:void 0;e=n;void 0===e||a.includes(e)||self.localStorage.removeItem(k)}Z("cuplsc",void 0,"cupls")}catch(t){En(t),Z("cuplse",void 0,"cupls")}}})}
function Uq(){var a=new Jm;Qh.M(function(){a.G()?Tq():a.i.add("publicytnetworkstatus-online",Tq,!0,void 0,void 0)})}
;function Vq(a){a&&(a.dataset?a.dataset[Wq("loaded")]="true":a.setAttribute("data-loaded","true"))}
function Xq(a,b){return a?a.dataset?a.dataset[Wq(b)]:a.getAttribute("data-"+b):null}
var Yq={};function Wq(a){return Yq[a]||(Yq[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Zq=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,$q=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function ar(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Zq,""),c=c.replace($q,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else br(a,b,c)}
function br(a,b,c){c=void 0===c?null:c;var d=cr(a),e=document.getElementById(d),f=e&&Xq(e,"loaded"),g=e&&!f;f?b&&b():(b&&(f=Ei(d,b),b=""+Na(b),dr[b]=f),g||(e=er(a,d,function(){Xq(e,"loaded")||(Vq(e),Hi(d),Gh(Ua(Ii,d),0))},c)))}
function er(a,b,c,d){d=void 0===d?null:d;var e=od("SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);kd(e,pf(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function fr(a){a=cr(a);var b=document.getElementById(a);b&&(Ii(a),b.parentNode.removeChild(b))}
function gr(a,b){a&&b&&(a=""+Na(b),(a=dr[a])&&Gi(a))}
function cr(a){var b=document.createElement("a");Qb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Vb(a)}
var dr={};var hr=[],ir=!1;function jr(){if(!L("disable_biscotti_fetch_for_ad_blocker_detection")&&!L("disable_biscotti_fetch_entirely_for_all_web_clients")&&ko()&&"1"!=pb()){var a=function(){ir=!0;"google_ad_status"in window?ih("DCLKSTAT",1):ih("DCLKSTAT",2)};
try{ar("//static.doubleclick.net/instream/ad_status.js",a)}catch(b){}hr.push(Qh.M(function(){if(!(ir||"google_ad_status"in window)){try{gr("//static.doubleclick.net/instream/ad_status.js",a)}catch(b){}ir=!0;ih("DCLKSTAT",3)}},5E3))}}
function kr(){var a=Number(B("DCLKSTAT",0));return isNaN(a)?0:a}
;function lr(){this.state=1;this.h=null}
l=lr.prototype;
l.initialize=function(a,b,c){var d,e;if(a.program){var f=null!==(d=a.interpreterScript)&&void 0!==d?d:null,g=null!==(e=a.interpreterUrl)&&void 0!==e?e:null;if(a.interpreterSafeScript){f=a.interpreterSafeScript;Ab("From proto message. b/166824318");f=f.privateDoNotAccessOrElseSafeScriptWrappedValue||"";var h=wb();f=h?h.createScript(f):f;f=(new Cb(f)).toString()}a.interpreterSafeUrl&&(g=a.interpreterSafeUrl,Ab("From proto message. b/166824318"),g=Gb(g.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue||"").toString());
mr(this,f,g,a.program,b,c)}else Fn(Error("Cannot initialize botguard without program"))};
function mr(a,b,c,d,e,f){var g=void 0===g?"trayride":g;c?(a.state=2,ar(c,function(){window[g]?nr(a,d,g,e):(a.state=3,fr(c),Fn(new nk("Unable to load Botguard","from "+c)))},f)):b&&(f=od("SCRIPT"),f.textContent=b,f.nonce=Tb(),document.head.appendChild(f),document.head.removeChild(f),window[g]?nr(a,d,g,e):(a.state=4,Fn(Error("Unable to load Botguard from JS"))))}
l.isInitialized=function(){return!!this.h};
l.getState=function(){return this.state};
function nr(a,b,c,d){var e,f,g;a.state=5;if(L("use_bg_facade"))if(window[c])try{var h=new dd({program:b,globalName:c});h.vc.then(function(){a.state=6;d&&d(b)});
or(a,h)}catch(k){k instanceof Error&&(a.state=7,Fn(k))}else a.state=7,Fn(Error("VM not loaded, cannot start"));else if(h=null!==(f=null===(e=window[c])||void 0===e?void 0:e.ad)&&void 0!==f?f:null===(g=window[c])||void 0===g?void 0:g.bg){try{or(a,new h(b)),a.state=6}catch(k){a.state=7,k instanceof Error&&Fn(k)}d&&d(b)}else a.state=7,Fn(Error("Failed to finish initializing VM"))}
l.invoke=function(a){a=void 0===a?{}:a;if(this.h){if(this.h.Jb)return this.h.Jb({qb:a});if(this.h.hot)return this.h.hot(void 0,void 0,a);if(this.h.invoke)return this.h.invoke(void 0,void 0,a);Fn(Error("VM has unknown interface"))}return null};
l.dispose=function(){or(this,null);this.state=8};
function or(a,b){Pd(a.h);a.h=b}
;var pr=new lr;function qr(){return pr.isInitialized()}
function rr(a){a=void 0===a?{}:a;return pr.invoke(a)}
;function sr(a){var b=this;var c=void 0===c?0:c;var d=void 0===d?Ph():d;this.l=c;this.j=d;this.i=new cd;this.h=a;a={};c=q(this.h.entries());for(d=c.next();!d.done;a={va:a.va,Da:a.Da},d=c.next()){var e=q(d.value);d=e.next().value;e=e.next().value;a.Da=d;a.va=e;d=function(f){return function(){f.va.fb();b.h[f.Da].Ta=!0;b.h.every(function(g){return!0===g.Ta})&&b.i.resolve()}}(a);
e=Lh(d,tr(this,a.va));this.h[a.Da]=Object.assign(Object.assign({},a.va),{fb:d,Oa:e})}}
function ur(a){var b=Array.from(a.h.keys()).sort(function(d,e){return tr(a,a.h[e])-tr(a,a.h[d])});
b=q(b);for(var c=b.next();!c.done;c=b.next())c=a.h[c.value],void 0===c.Oa||c.Ta||(a.j.U(c.Oa),Lh(c.fb,10))}
sr.prototype.cancel=function(){for(var a=q(this.h),b=a.next();!b.done;b=a.next())b=b.value,void 0===b.Oa||b.Ta||this.j.U(b.Oa),b.Ta=!0;this.i.resolve()};
function tr(a,b){var c;return null!==(c=b.priority)&&void 0!==c?c:a.l}
;function vr(a){this.state=a;this.plugins=[];this.m=void 0}
vr.prototype.install=function(){this.plugins.push.apply(this.plugins,ha(Da.apply(0,arguments)))};
vr.prototype.transition=function(a,b){var c=this,d=this.D.find(function(f){return f.from===c.state&&f.C===a});
if(d){this.j&&(ur(this.j),this.j=void 0);this.state=a;d=d.action.bind(this);var e=this.plugins.filter(function(f){return f[a]}).map(function(f){return f[a]});
d(wr(this,e,this.m),b)}else throw Error("no transition specified from "+this.state+" to "+a);};
function wr(a,b,c){return function(){var d=Da.apply(0,arguments),e=b.filter(function(k){var m;return 10===(null!==(m=null!==c&&void 0!==c?c:k.priority)&&void 0!==m?m:0)}),f=b.filter(function(k){var m;
return 10!==(null!==(m=null!==c&&void 0!==c?c:k.priority)&&void 0!==m?m:0)});
Ph();var g={};e=q(e);for(var h=e.next();!h.done;g={Ea:g.Ea},h=e.next())g.Ea=h.value,Nh(function(k){return function(){k.Ea.la.apply(k.Ea,ha(d))}}(g));
f=f.map(function(k){var m;return{fb:function(){k.la.apply(k,ha(d))},
priority:null!==(m=null!==c&&void 0!==c?c:k.priority)&&void 0!==m?m:0}});
f.length&&(a.j=new sr(f))}}
da.Object.defineProperties(vr.prototype,{currentState:{configurable:!0,enumerable:!0,get:function(){return this.state}}});function xr(a){vr.call(this,void 0===a?"document_active":a);var b=this;this.m=10;this.h=new Map;this.D=[{from:"document_active",C:"document_disposed_preventable",action:this.u},{from:"document_active",C:"document_disposed",action:this.l},{from:"document_disposed_preventable",C:"document_disposed",action:this.l},{from:"document_disposed_preventable",C:"flush_logs",action:this.o},{from:"document_disposed_preventable",C:"document_active",action:this.i},{from:"document_disposed",C:"flush_logs",action:this.o},
{from:"document_disposed",C:"document_active",action:this.i},{from:"document_disposed",C:"document_disposed",action:function(){}},
{from:"flush_logs",C:"document_active",action:this.i}];window.addEventListener("pagehide",function(c){b.transition("document_disposed",c)});
window.addEventListener("beforeunload",function(c){b.transition("document_disposed_preventable",c)})}
r(xr,vr);xr.prototype.u=function(a,b){if(!this.h.get("document_disposed_preventable")&&(a(b),(null===b||void 0===b?0:b.defaultPrevented)||(null===b||void 0===b?0:b.returnValue))){b.returnValue||(b.returnValue=!0);b.defaultPrevented||b.preventDefault();this.h=new Map;this.transition("document_active");return}this.h.set("document_disposed_preventable",!0);this.h.get("document_disposed")?this.transition("flush_logs"):this.transition("document_disposed")};
xr.prototype.l=function(a,b){this.h.get("document_disposed")?this.transition("document_active"):(a(b),this.h.set("document_disposed",!0),this.transition("flush_logs"))};
xr.prototype.o=function(a,b){a(b);this.transition("document_active")};
xr.prototype.i=function(){this.h=new Map};function yr(a){vr.call(this,void 0===a?"document_visibility_unknown":a);var b=this;this.D=[{from:"document_visibility_unknown",C:"document_visible",action:this.i},{from:"document_visibility_unknown",C:"document_hidden",action:this.h},{from:"document_visibility_unknown",C:"document_foregrounded",action:this.o},{from:"document_visibility_unknown",C:"document_backgrounded",action:this.l},{from:"document_visible",C:"document_hidden",action:this.h},{from:"document_visible",C:"document_foregrounded",action:this.o},
{from:"document_visible",C:"document_visible",action:this.i},{from:"document_foregrounded",C:"document_visible",action:this.i},{from:"document_foregrounded",C:"document_hidden",action:this.h},{from:"document_foregrounded",C:"document_foregrounded",action:this.o},{from:"document_hidden",C:"document_visible",action:this.i},{from:"document_hidden",C:"document_backgrounded",action:this.l},{from:"document_hidden",C:"document_hidden",action:this.h},{from:"document_backgrounded",C:"document_hidden",action:this.h},
{from:"document_backgrounded",C:"document_backgrounded",action:this.l},{from:"document_backgrounded",C:"document_visible",action:this.i}];document.addEventListener("visibilitychange",function(c){"visible"===document.visibilityState?b.transition("document_visible",c):b.transition("document_hidden",c)});
L("visibility_lifecycles_dynamic_backgrounding")&&(window.addEventListener("blur",function(c){b.transition("document_backgrounded",c)}),window.addEventListener("focus",function(c){b.transition("document_foregrounded",c)}))}
r(yr,vr);yr.prototype.i=function(a,b){a(b);L("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_foregrounded")};
yr.prototype.h=function(a,b){a(b);L("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_backgrounded")};
yr.prototype.l=function(a,b){a(b)};
yr.prototype.o=function(a,b){a(b)};function zr(){this.h=new xr;this.i=new yr}
zr.prototype.install=function(){var a=Da.apply(0,arguments);this.h.install.apply(this.h,ha(a));this.i.install.apply(this.i,ha(a))};function Ar(){zr.call(this);var a={};this.install((a.document_disposed={la:this.j},a));a={};this.install((a.flush_logs={la:this.l},a))}
var Br;r(Ar,zr);Ar.prototype.l=function(){kk("finalPayload",{csn:Wn()})};
Ar.prototype.j=function(){In(Jn)};function Cr(){}
Cr.getInstance=function(){var a=A("ytglobal.storage_");a||(a=new Cr,z("ytglobal.storage_",a,void 0));return a};
Cr.prototype.estimate=function(){var a,b,c;return w(function(d){c=navigator;return(null===(a=c.storage)||void 0===a?0:a.estimate)?d.return(c.storage.estimate()):(null===(b=c.webkitTemporaryStorage)||void 0===b?0:b.queryUsageAndQuota)?d.return(Dr()):d.return()})};
function Dr(){var a=navigator;return new Promise(function(b,c){var d;null!==(d=a.webkitTemporaryStorage)&&void 0!==d&&d.queryUsageAndQuota?a.webkitTemporaryStorage.queryUsageAndQuota(function(e,f){b({usage:e,quota:f})},function(e){c(e)}):c(Error("webkitTemporaryStorage is not supported."))})}
z("ytglobal.storageClass_",Cr,void 0);function ik(a,b){var c=this;this.handleError=a;this.h=b;this.i=!1;void 0===self.document||self.addEventListener("beforeunload",function(){c.i=!0});
this.j=Math.random()<=lh("ytidb_transaction_ended_event_rate_limit",.02)}
ik.prototype.logEvent=function(a,b){switch(a){case "IDB_DATA_CORRUPTED":L("idb_data_corrupted_killswitch")||this.h("idbDataCorrupted",b);break;case "IDB_UNEXPECTEDLY_CLOSED":this.h("idbUnexpectedlyClosed",b);break;case "IS_SUPPORTED_COMPLETED":L("idb_is_supported_completed_killswitch")||this.h("idbIsSupportedCompleted",b);break;case "QUOTA_EXCEEDED":Er(this,b);break;case "TRANSACTION_ENDED":this.j&&this.h("idbTransactionEnded",b);break;case "TRANSACTION_UNEXPECTEDLY_ABORTED":a=Object.assign(Object.assign({},
b),{hasWindowUnloaded:this.i}),this.h("idbTransactionAborted",a)}};
function Er(a,b){Cr.getInstance().estimate().then(function(c){c=Object.assign(Object.assign({},b),{isSw:void 0===self.document,isIframe:self!==self.top,deviceStorageUsageMbytes:Fr(null===c||void 0===c?void 0:c.usage),deviceStorageQuotaMbytes:Fr(null===c||void 0===c?void 0:c.quota)});a.h("idbQuotaExceeded",c)})}
function Fr(a){return"undefined"===typeof a?"-1":String(Math.ceil(a/1048576))}
;var Gr=window;
function Hr(){var a=Gr.uaChPolyfill.state;if(0===a.type)kk("clientHintsPolyfillEvent",{clientHintsSupported:!1});else{var b=navigator.userAgent,c=void 0!==a.syntheticUa&&a.syntheticUa===b,d={clientHintsSupported:!0,uaAccessedBeforePolyfill:a.didAccessUaBeforePolyfillAvailable,syntheticUaMatches:c};a.didAccessUaBeforePolyfillAvailable&&(d.uaAccessBeforePolyfillCount=a.uaAccessBeforePolyfillCount,a.firstAccessUaError&&(d.firstUaAccessStack=String(a.firstAccessUaError.stack).replace(/\n/g,""),En(a.firstAccessUaError)),
d.polyfillAvailabilityDelayMs=a.polyfillAvailabilityDelay);kk("clientHintsPolyfillEvent",d);c||(b={syntheticUa:a.syntheticUa,ua:b},b.brand=a.data.brands.map(function(e){return'"'+e.brand+'"; v="'+e.version+'"'}),b.mobileness=a.data.mobile,a=a.data.values,a.architecture&&(b.platformArchitecture=a.architecture),a.model&&(b.model=a.model),a.platform&&(b.platformBrand=a.platform),a.platformVersion&&(b.platformVersion=a.platformVersion),a.uaFullVersion&&(b.fullVersion=a.uaFullVersion),kk("clientHintsPolyfillDiagnostics",
b))}}
var Ir=!1;function Jr(){var a;1===(null===(a=Gr.uaChPolyfill)||void 0===a?void 0:a.state.type)?Ir||(Gr.uaChPolyfill.onReady=Jr,Ir=!0):Gr.uaChPolyfill&&Hr()}
;function Kr(a,b,c){I.call(this);var d=this;c=c||B("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname;this.j=b||null;this.K="*";this.l=c;this.sessionId=null;this.channel="widget";this.L=!!a;this.A=function(e){a:if(!("*"!=d.l&&e.origin!=d.l||d.j&&e.source!=d.j||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(g){break a}if(!(null==f||d.L&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.l=d.K=e.origin);d.j=e.source;d.sessionId=f.id;d.i&&(d.i(),d.i=null);break;case "command":d.m&&(!d.u||0<=bb(d.u,f.func))&&d.m(f.func,f.args,e.origin)}}};
this.u=this.i=this.m=null;window.addEventListener("message",this.A)}
r(Kr,I);Kr.prototype.sendMessage=function(a,b){if(b=b||this.j){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var c=JSON.stringify(a);b.postMessage(c,this.K)}catch(d){wh(d)}}};
Kr.prototype.H=function(){window.removeEventListener("message",this.A);I.prototype.H.call(this)};function Lr(){this.i=[];this.isReady=!1;this.j={};var a=this.h=new Kr(!!B("WIDGET_ID_ENFORCE")),b=this.hc.bind(this);a.m=b;a.u=null;this.h.channel="widget";if(a=B("WIDGET_ID"))this.h.sessionId=a}
l=Lr.prototype;l.hc=function(a,b,c){"addEventListener"===a&&b?(a=b[0],this.j[a]||"onReady"===a||(this.addEventListener(a,Mr(this,a)),this.j[a]=!0)):this.lb(a,b,c)};
l.lb=function(){};
function Mr(a,b){return function(c){return a.sendMessage(b,c)}}
l.addEventListener=function(){};
l.Vb=function(){this.isReady=!0;this.sendMessage("initialDelivery",this.Za());this.sendMessage("onReady");cb(this.i,this.Ib,this);this.i=[]};
l.Za=function(){return null};
function Nr(a,b){a.sendMessage("infoDelivery",b)}
l.Ib=function(a){this.isReady?this.h.sendMessage(a):this.i.push(a)};
l.sendMessage=function(a,b){this.Ib({event:a,info:void 0===b?null:b})};
l.dispose=function(){this.h=null};function Or(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function Pr(a,b,c){if("string"===typeof a)return{videoId:a,startSeconds:b,suggestedQuality:c};b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}
function Qr(a,b,c,d){if(Ma(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16===a.length?b.list="PL"+a:b.playlist=a;return b}
;function Rr(a){Lr.call(this);this.listeners=[];this.api=a;this.addEventListener("onReady",this.onReady.bind(this));this.addEventListener("onVideoProgress",this.sc.bind(this));this.addEventListener("onVolumeChange",this.tc.bind(this));this.addEventListener("onApiChange",this.lc.bind(this));this.addEventListener("onPlaybackQualityChange",this.oc.bind(this));this.addEventListener("onPlaybackRateChange",this.pc.bind(this));this.addEventListener("onStateChange",this.qc.bind(this));this.addEventListener("onWebglSettingsChanged",
this.uc.bind(this))}
r(Rr,Lr);l=Rr.prototype;
l.lb=function(a,b,c){if(this.api.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&Or(a)){var d=b;if(Ma(d[0])&&!Array.isArray(d[0]))var e=d[0];else switch(e={},a){case "loadVideoById":case "cueVideoById":e=Pr(d[0],void 0!==d[1]?Number(d[1]):void 0,d[2]);break;case "loadVideoByUrl":case "cueVideoByUrl":e=d[0];"string"===typeof e&&(e={mediaContentUrl:e,startSeconds:void 0!==d[1]?Number(d[1]):void 0,suggestedQuality:d[2]});b:{if((d=e.mediaContentUrl)&&(d=/\/([ve]|embed)\/([^#?]+)/.exec(d))&&d[2]){d=
d[2];break b}d=null}e.videoId=d;e=Pr(e);break;case "loadPlaylist":case "cuePlaylist":e=Qr(d[0],d[1],d[2],d[3])}b.length=1;b[0]=e}this.api.handleExternalCall(a,b,c);Or(a)&&Nr(this,this.Za())}};
l.onReady=function(){var a=this.Vb.bind(this);this.h.i=a};
l.addEventListener=function(a,b){this.listeners.push({eventType:a,listener:b});this.api.addEventListener(a,b)};
l.Za=function(){if(!this.api)return null;var a=this.api.getApiInterface();ib(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0===e.search("get")||0===e.search("is")){var f=0;0===e.search("get")?f=3:0===e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var g=this.api[e]();b[f]=g}catch(h){}}}b.videoData=this.api.getVideoData();b.currentTimeLastUpdated_=Date.now()/1E3;return b};
l.qc=function(a){a={playerState:a,currentTime:this.api.getCurrentTime(),duration:this.api.getDuration(),videoData:this.api.getVideoData(),videoStartBytes:0,videoBytesTotal:this.api.getVideoBytesTotal(),videoLoadedFraction:this.api.getVideoLoadedFraction(),playbackQuality:this.api.getPlaybackQuality(),availableQualityLevels:this.api.getAvailableQualityLevels(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getVideoUrl&&
(a.videoUrl=this.api.getVideoUrl());this.api.getVideoContentRect&&(a.videoContentRect=this.api.getVideoContentRect());this.api.getProgressState&&(a.progressState=this.api.getProgressState());this.api.getPlaylist&&(a.playlist=this.api.getPlaylist());this.api.getPlaylistIndex&&(a.playlistIndex=this.api.getPlaylistIndex());this.api.getStoryboardFormat&&(a.storyboardFormat=this.api.getStoryboardFormat());Nr(this,a)};
l.oc=function(a){Nr(this,{playbackQuality:a})};
l.pc=function(a){Nr(this,{playbackRate:a})};
l.lc=function(){for(var a=this.api.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.api.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],m=this.api.getOption(e,k);b[e][k]=m}}this.sendMessage("apiInfoDelivery",b)};
l.tc=function(){Nr(this,{muted:this.api.isMuted(),volume:this.api.getVolume()})};
l.sc=function(a){a={currentTime:a,videoBytesLoaded:this.api.getVideoBytesLoaded(),videoLoadedFraction:this.api.getVideoLoadedFraction(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getProgressState&&(a.progressState=this.api.getProgressState());Nr(this,a)};
l.uc=function(){var a={sphericalProperties:this.api.getSphericalProperties()};Nr(this,a)};
l.dispose=function(){Lr.prototype.dispose.call(this);for(var a=0;a<this.listeners.length;a++){var b=this.listeners[a];this.api.removeEventListener(b.eventType,b.listener)}this.listeners=[]};function Sr(a){I.call(this);this.i={};this.started=!1;this.connection=a;this.connection.subscribe("command",this.Eb,this)}
r(Sr,I);l=Sr.prototype;l.start=function(){this.started||this.h()||(this.started=!0,this.connection.na("RECEIVING"))};
l.na=function(a,b){this.started&&!this.h()&&this.connection.na(a,b)};
l.Eb=function(a,b,c){if(this.started&&!this.h()){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&this.addListener(d.event);break;case "removeEventListener":"string"===typeof d.event&&this.removeListener(d.event);break;default:this.api.isReady()&&this.api.isExternalMethodAvailable(a,c||null)&&(b=Tr(a,b||{}),c=this.api.handleExternalCall(a,b,c||null),(c=Ur(a,c))&&this.na(a,c))}}};
l.addListener=function(a){if(!(a in this.i)){var b=this.mc.bind(this,a);this.i[a]=b;this.addEventListener(a,b)}};
l.mc=function(a,b){this.started&&!this.h()&&this.connection.na(a,this.Ya(a,b))};
l.Ya=function(a,b){if(null!=b)return{value:b}};
l.removeListener=function(a){a in this.i&&(this.removeEventListener(a,this.i[a]),delete this.i[a])};
l.H=function(){var a=this.connection;a.h()||Qf(a.i,"command",this.Eb,this);this.connection=null;for(var b in this.i)this.i.hasOwnProperty(b)&&this.removeListener(b);I.prototype.H.call(this)};function Vr(a,b){Sr.call(this,b);this.api=a;this.start()}
r(Vr,Sr);Vr.prototype.addEventListener=function(a,b){this.api.addEventListener(a,b)};
Vr.prototype.removeEventListener=function(a,b){this.api.removeEventListener(a,b)};
function Tr(a,b){switch(a){case "loadVideoById":return a=Pr(b),[a];case "cueVideoById":return a=Pr(b),[a];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return a=Qr(b),[a];case "cuePlaylist":return a=Qr(b),[a];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function Ur(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
Vr.prototype.Ya=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return Sr.prototype.Ya.call(this,a,b)};
Vr.prototype.H=function(){Sr.prototype.H.call(this);delete this.api};function Wr(a){a=void 0===a?!1:a;I.call(this);this.i=new J(a);Rd(this,Ua(Pd,this.i))}
Wa(Wr,I);Wr.prototype.subscribe=function(a,b,c){return this.h()?0:this.i.subscribe(a,b,c)};
Wr.prototype.l=function(a,b){this.h()||this.i.ka.apply(this.i,arguments)};function Xr(a,b,c){Wr.call(this);this.j=a;this.destination=b;this.id=c}
r(Xr,Wr);Xr.prototype.na=function(a,b){this.h()||this.j.na(this.destination,this.id,a,b)};
Xr.prototype.H=function(){this.destination=this.j=null;Wr.prototype.H.call(this)};function Yr(a,b,c){I.call(this);this.destination=a;this.origin=c;this.i=Dh(window,"message",this.j.bind(this));this.connection=new Xr(this,a,b);Rd(this,Ua(Pd,this.connection))}
r(Yr,I);Yr.prototype.na=function(a,b,c,d){this.h()||a!==this.destination||(a={id:b,command:c},d&&(a.data=d),this.destination.postMessage(rf(a),this.origin))};
Yr.prototype.j=function(a){var b;if(b=!this.h())if(b=a.origin===this.origin)a:{b=this.destination;do{b:{var c=a.source;do{if(c===b){c=!0;break b}if(c===c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,"string"===typeof b)){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.connection,c.h()||c.l("command",b.command,b.data,a.origin))}};
Yr.prototype.H=function(){Eh(this.i);this.destination=null;I.prototype.H.call(this)};function Zr(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||rb(b);this.assets=a.assets||{};this.attrs=a.attrs||rb(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Zr.prototype.clone=function(){var a=new Zr,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==Ka(c)?a[b]=rb(c):a[b]=c}return a};var $r=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function as(a){a=a||"";if(window.spf){var b=a.match($r);spf.style.load(a,b?b[1]:"",void 0)}else bs(a)}
function bs(a){var b=cs(a),c=document.getElementById(b),d=c&&Xq(c,"loaded");d||c&&!d||(c=ds(a,b,function(){Xq(c,"loaded")||(Vq(c),Hi(b),Gh(Ua(Ii,b),0))}))}
function ds(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=pf(a);Rb(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function cs(a){var b=od("A");Ab("This URL is never added to the DOM");Qb(b,new Ib(a,Jb));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Vb(a)}
;function es(){I.call(this);this.i=[]}
r(es,I);es.prototype.H=function(){for(;this.i.length;){var a=this.i.pop();a.target.removeEventListener(a.name,a.la,void 0)}I.prototype.H.call(this)};function fs(){es.apply(this,arguments)}
r(fs,es);function gs(a,b,c,d){I.call(this);var e=this;this.L=b;this.webPlayerContextConfig=d;this.Va=!1;this.api={};this.Fa=this.u=null;this.S=new J;this.i={};this.ga=this.Ga=this.elementId=this.Wa=this.config=null;this.Z=!1;this.l=this.A=null;this.Ha={};this.Mb=["onReady"];this.lastError=null;this.mb=NaN;this.K={};this.Nb=new fs(this);this.qa=0;this.j=this.m=a;Rd(this,Ua(Pd,this.S));hs(this);is(this);Rd(this,Ua(Pd,this.Nb));c?this.qa=Gh(function(){e.loadNewVideoConfig(c)},0):d&&(js(this),ks(this))}
r(gs,I);l=gs.prototype;l.getId=function(){return this.L};
l.loadNewVideoConfig=function(a){if(!this.h()){this.qa&&(Hh(this.qa),this.qa=0);var b=a||{};b instanceof Zr||(b=new Zr(b));this.config=b;this.setConfig(a);ks(this);this.isReady()&&ls(this)}};
function js(a){var b,c;a.webPlayerContextConfig?c=a.webPlayerContextConfig.rootElementId:c=a.config.attrs.id;a.elementId=c||a.elementId;"video-player"===a.elementId&&(a.elementId=a.L,a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.L:a.config.attrs.id=a.L);(null===(b=a.j)||void 0===b?void 0:b.id)===a.elementId&&(a.elementId+="-player",a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.elementId:a.config.attrs.id=a.elementId)}
l.setConfig=function(a){var b;this.Wa=a;this.config=ms(a);js(this);this.Ga||(this.Ga=ns(this,(null===(b=this.config.args)||void 0===b?void 0:b.jsapicallback)||"onYouTubePlayerReady"));this.config.args?this.config.args.jsapicallback=null:this.config.args={jsapicallback:null};var c;if(null===(c=this.config)||void 0===c?0:c.attrs)a=this.config.attrs,(c=a.width)&&this.j&&(this.j.style.width=zd(Number(c)||c)),(a=a.height)&&this.j&&(this.j.style.height=zd(Number(a)||a))};
function ls(a){var b;a.config&&!0!==a.config.loaded&&(a.config.loaded=!0,!a.config.args||"0"!==a.config.args.autoplay&&0!==a.config.args.autoplay&&!1!==a.config.args.autoplay?a.api.loadVideoByPlayerVars(null!==(b=a.config.args)&&void 0!==b?b:null):a.api.cueVideoByPlayerVars(a.config.args))}
function os(a){var b=!0,c=ps(a);c&&a.config&&(a=qs(a),b=Xq(c,"version")===a);return b&&!!A("yt.player.Application.create")}
function ks(a){if(!a.h()&&!a.Z){var b=os(a);if(b&&"html5"===(ps(a)?"html5":null))a.ga="html5",a.isReady()||rs(a);else if(ss(a),a.ga="html5",b&&a.l&&a.m)a.m.appendChild(a.l),rs(a);else{a.config&&(a.config.loaded=!0);var c=!1;a.A=function(){c=!0;var d=ts(a,"player_bootstrap_method")?A("yt.player.Application.createAlternate")||A("yt.player.Application.create"):A("yt.player.Application.create");var e=a.config?ms(a.config):void 0;d&&d(a.m,e,a.webPlayerContextConfig);rs(a)};
a.Z=!0;b?a.A():(ar(qs(a),a.A),(b=us(a))&&as(b),vs(a)&&!c&&z("yt.player.Application.create",null,void 0))}}}
function ps(a){var b=nd(a.elementId);!b&&a.j&&a.j.querySelector&&(b=a.j.querySelector("#"+a.elementId));return b}
function rs(a){var b;if(!a.h()){var c=ps(a),d=!1;c&&c.getApiInterface&&c.getApiInterface()&&(d=!0);d?(a.Z=!1,!ts(a,"html5_remove_not_servable_check_killswitch")&&(null===c||void 0===c?0:c.isNotServable)&&a.config&&(null===c||void 0===c?0:c.isNotServable(null===(b=a.config.args)||void 0===b?void 0:b.video_id))||ws(a)):a.mb=Gh(function(){rs(a)},50)}}
function ws(a){hs(a);a.Va=!0;var b=ps(a);if(b){a.u=xs(a,b,"addEventListener");a.Fa=xs(a,b,"removeEventListener");var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=a.api,e=0;e<c.length;e++){var f=c[e];d[f]||(d[f]=xs(a,b,f))}}for(var g in a.i)a.i.hasOwnProperty(g)&&a.u&&a.u(g,a.i[g]);ls(a);a.Ga&&a.Ga(a.api);a.S.ka("onReady",a.api)}
function xs(a,b,c){var d=b[c];return function(){var e=Da.apply(0,arguments);try{return a.lastError=null,d.apply(b,e)}catch(f){"sendAbandonmentPing"!==c&&(f.params=c,a.lastError=f,Fn(f))}}}
function hs(a){a.Va=!1;if(a.Fa)for(var b in a.i)a.i.hasOwnProperty(b)&&a.Fa(b,a.i[b]);for(var c in a.K)a.K.hasOwnProperty(c)&&Hh(Number(c));a.K={};a.u=null;a.Fa=null;b=a.api;for(var d in b)b.hasOwnProperty(d)&&(b[d]=null);b.addEventListener=function(e,f){a.addEventListener(e,f)};
b.removeEventListener=function(e,f){a.removeEventListener(e,f)};
b.destroy=function(){a.dispose()};
b.getLastError=function(){return a.getLastError()};
b.getPlayerType=function(){return a.getPlayerType()};
b.getCurrentVideoConfig=function(){return a.Wa};
b.loadNewVideoConfig=function(e){a.loadNewVideoConfig(e)};
b.isReady=function(){return a.isReady()}}
l.isReady=function(){return this.Va};
function is(a){a.addEventListener("WATCH_LATER_VIDEO_ADDED",function(b){Hi("WATCH_LATER_VIDEO_ADDED",b)});
a.addEventListener("WATCH_LATER_VIDEO_REMOVED",function(b){Hi("WATCH_LATER_VIDEO_REMOVED",b)});
a.addEventListener("onAdAnnounce",function(b){Hi("a11y-announce",b)})}
l.addEventListener=function(a,b){var c=this,d=ns(this,b);d&&(0<=bb(this.Mb,a)||this.i[a]||(b=ys(this,a),this.u&&this.u(a,b)),this.S.subscribe(a,d),"onReady"===a&&this.isReady()&&Gh(function(){d(c.api)},0))};
l.removeEventListener=function(a,b){this.h()||(b=ns(this,b))&&Qf(this.S,a,b)};
function ns(a,b){var c=b;if("string"===typeof b){if(a.Ha[b])return a.Ha[b];c=function(){var d=Da.apply(0,arguments),e=A(b);if(e)try{e.apply(y,d)}catch(f){En(f)}};
a.Ha[b]=c}return c?c:null}
function ys(a,b){var c="ytPlayer"+b+a.L;a.i[b]=c;y[c]=function(d){var e=Gh(function(){if(!a.h()){a.S.ka(b,null!==d&&void 0!==d?d:void 0);var f=a.K,g=String(e);g in f&&delete f[g]}},0);
ob(a.K,String(e))};
return c}
l.getPlayerType=function(){return this.ga||(ps(this)?"html5":null)};
l.getLastError=function(){return this.lastError};
function ss(a){a.cancel();hs(a);a.ga=null;a.config&&(a.config.loaded=!1);var b=ps(a);b&&(os(a)||!vs(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));if(a.m)for(a=a.m;b=a.firstChild;)a.removeChild(b)}
l.cancel=function(){this.A&&gr(qs(this),this.A);Hh(this.mb);this.Z=!1};
l.H=function(){ss(this);if(this.l&&this.config&&this.l.destroy)try{this.l.destroy()}catch(b){En(b)}this.Ha=null;for(var a in this.i)this.i.hasOwnProperty(a)&&(y[this.i[a]]=null);this.Wa=this.config=this.api=null;delete this.m;delete this.j;I.prototype.H.call(this)};
function vs(a){var b,c;a=null===(c=null===(b=a.config)||void 0===b?void 0:b.args)||void 0===c?void 0:c.fflags;return!!a&&-1!==a.indexOf("player_destroy_old_version=true")}
function qs(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.jsUrl:(a=a.config.assets)?a.js:""}
function us(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.cssUrl:(a=a.config.assets)?a.css:""}
function ts(a,b){var c;if(a.webPlayerContextConfig)var d=a.webPlayerContextConfig.serializedExperimentFlags;else if(null===(c=a.config)||void 0===c?0:c.args)d=a.config.args.fflags;return"true"===ai(d||"","&")[b]}
function ms(a){for(var b={},c=q(Object.keys(a)),d=c.next();!d.done;d=c.next()){d=d.value;var e=a[d];b[d]="object"===typeof e?rb(e):e}return b}
;var zs={},As="player_uid_"+(1E9*Math.random()>>>0);function Bs(a,b,c){var d="player";c=void 0===c?!0:c;d="string"===typeof d?nd(d):d;var e=As+"_"+Na(d),f=zs[e];if(f&&c)return Cs(a,b)?f.api.loadVideoByPlayerVars(a.args||null):f.loadNewVideoConfig(a),f.api;f=new gs(d,e,a,b);zs[e]=f;Hi("player-added",f.api);Rd(f,function(){delete zs[f.getId()]});
return f.api}
function Cs(a,b){return b&&b.serializedExperimentFlags?b.serializedExperimentFlags.includes("web_player_remove_playerproxy=true"):a&&a.args&&a.args.fflags?a.args.fflags.includes("web_player_remove_playerproxy=true"):!1}
;var Ds=null,Es=null,Fs=null;function Gs(){var a=Ds.getVideoData(1);a=a.title?a.title+" - YouTube":"YouTube";document.title!==a&&(document.title=a)}
;function Hs(a,b,c){a="ST-"+Vb(a).toString(36);b=b?ac(b):"";c=c||5;ko()&&wj(a,b,c)}
;function Is(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=B("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=void 0===e?!0:e;var f=B("VALID_SESSION_TEMPDATA_DOMAINS",[]),g=Yb(window.location.href);g&&f.push(g);g=Yb(d);if(0<=bb(f,g)||!g&&0==d.lastIndexOf("/",0))if(L("autoescape_tempdata_url")&&(f=document.createElement("a"),Qb(f,d),d=f.href),d&&(d=Zb(d),f=d.indexOf("#"),d=0>f?d:d.substr(0,f)))if(e&&!b.csn&&(b.itct||b.ved)&&(b=Object.assign({csn:Wn()},b)),h){var h=parseInt(h,10);isFinite(h)&&0<h&&
Hs(d,b,h)}else Hs(d,b)}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var k=void 0===k?{}:k;var m=void 0===m?"":m;var n=void 0===n?window:n;c=n.location;a=bc(a,k)+m;var t=void 0===t?yd:t;a:{t=void 0===t?yd:t;for(k=0;k<t.length;++k)if(m=t[k],m instanceof wd&&m.isValid(a)){t=new hd(a,fd);break a}t=void 0}c.href=jd(t||id)}return!0}
;z("yt.setConfig",ih,void 0);z("yt.config.set",ih,void 0);z("yt.setMsg",ao,void 0);z("yt.msgs.set",ao,void 0);z("yt.logging.errors.log",En,void 0);
z("writeEmbed",function(){var a=B("PLAYER_CONFIG",void 0);if(!a){var b=B("PLAYER_VARS",void 0);b&&(a={args:b})}so(!0);"gvn"===a.args.ps&&(document.body.style.backgroundColor="transparent");a.attrs||(a.attrs={width:"100%",height:"100%",id:"video-player"});var c=document.referrer;b=B("POST_MESSAGE_ORIGIN");window!==window.top&&c&&c!==document.URL&&(a.args.loaderUrl=c);L("embeds_js_api_set_1p_cookie")&&(c=fi(window.location.href),c.embedsTokenValue&&(a.args.embedsTokenValue=c.embedsTokenValue));Wp();
if((c=B("WEB_PLAYER_CONTEXT_CONFIGS",void 0))&&"WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER"in c){c=c.WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER;if(!c.serializedForcedExperimentIds){var d=fi(window.location.href);d.forced_experiments&&(c.serializedForcedExperimentIds=d.forced_experiments)}Ds=Bs(a,c,!1)}else Ds=Bs(a);Ds.addEventListener("onVideoDataChange",Gs);a=B("POST_MESSAGE_ID","player");B("ENABLE_JS_API")?Fs=new Rr(Ds):B("ENABLE_POST_API")&&"string"===typeof a&&"string"===typeof b&&(Es=new Yr(window.parent,
a,b),Fs=new Vr(Ds,Es.connection));jr();L("ytidb_create_logger_embed_killswitch")||hk();L("flush_gel_on_teardown")&&(a={},Br||(Br=new Ar),Br.install((a.flush_logs={la:function(){$i()}},a)));
L("networkless_logging_web_embedded")&&(L("embeds_web_enable_new_nwl")?Pm():Xm());L("embeds_enable_ua_ch_polyfill")&&Jr();L("ytidb_clear_embedded_player")&&Qh.M(function(){if(!yq){var e={pb:{feedbackEndpoint:Ho(tq),modifyChannelNotificationPreferenceEndpoint:Ho(uq),playlistEditEndpoint:Ho(vq),subscribeEndpoint:Ho(rq),unsubscribeEndpoint:Ho(sq),webPlayerShareEntityServiceEndpoint:Ho(wq)}},f=L("web_enable_client_location_service")?Do.getInstance():void 0,g=[],h={};f&&(g.push(f),h.client_location=f);
if(void 0===k){to.h||(to.h=new to);var k=to.h}if(void 0===m){xq.h||(xq.h=new xq);var m=xq.h}fq(e,m,k,g,h);yq=eq.h}Uq()})},void 0);
var Js=uh(function(){bq();var a=Aj.getInstance(),b=Dj(119),c=1<window.devicePixelRatio;if(document.body&&Ze(document.body,"exp-invert-logo"))if(c&&!Ze(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!Ze(d,"inverted-hdpi")){var e=Xe(d);Ye(d,e+(0<e.length?" inverted-hdpi":"inverted-hdpi"))}}else!c&&Ze(document.body,"inverted-hdpi")&&$e();if(b!=c){b="f"+(Math.floor(119/31)+1);d=Ej(b)||0;d=c?d|67108864:d&-67108865;0==d?delete zj[b]:(c=d.toString(16),
zj[b]=c.toString());c=!0;L("web_secure_pref_cookie_killswitch")&&(c=!1);b=a.h;d=[];for(var f in zj)d.push(f+"="+encodeURIComponent(String(zj[f])));wj(b,d.join("&"),63072E3,a.i,c)}Iq.h||(Iq.h=new Iq);a=Iq.h;f=16623;var g=void 0===g?{}:g;Object.values(bo).includes(f)||(Fn(new nk("createClientScreen() called with a non-page VE",f)),f=83769);g.isHistoryNavigation||a.h.push({rootVe:f,key:g.key||""});a.o=[];a.D=[];g.sb?Lq(a,f,g):Mq(a,f,g)}),Ks=uh(function(){Ds&&Ds.sendAbandonmentPing&&Ds.sendAbandonmentPing();
B("PL_ATT")&&pr.dispose();for(var a=0,b=hr.length;a<b;a++)Qh.U(hr[a]);hr.length=0;fr("//static.doubleclick.net/instream/ad_status.js");ir=!1;ih("DCLKSTAT",0);Qd(Fs,Es);Ds&&(Ds.removeEventListener("onVideoDataChange",Gs),Ds.destroy())});
window.addEventListener?(window.addEventListener("load",Js),window.addEventListener("unload",Ks)):window.attachEvent&&(window.attachEvent("onload",Js),window.attachEvent("onunload",Ks));Va("yt.abuse.player.botguardInitialized",A("yt.abuse.player.botguardInitialized")||qr);Va("yt.abuse.player.invokeBotguard",A("yt.abuse.player.invokeBotguard")||rr);Va("yt.abuse.dclkstatus.checkDclkStatus",A("yt.abuse.dclkstatus.checkDclkStatus")||kr);
Va("yt.player.exports.navigate",A("yt.player.exports.navigate")||Is);Va("yt.util.activity.init",A("yt.util.activity.init")||Sh);Va("yt.util.activity.getTimeSinceActive",A("yt.util.activity.getTimeSinceActive")||Vh);Va("yt.util.activity.setTimestamp",A("yt.util.activity.setTimestamp")||Th);}).call(this);
