(function(g){var window=this;'use strict';var dXa=function(a,b){var c=(b-a.i)/(a.j-a.i);if(0>=c)return 0;if(1<=c)return 1;for(var d=0,e=1,f=0,h=0;8>h;h++){f=g.Uq(a,c);var l=(g.Uq(a,c+1E-6)-f)/1E-6;if(1E-6>Math.abs(f-b))return c;if(1E-6>Math.abs(l))break;else f<b?d=c:e=c,c-=(f-b)/l}for(h=0;1E-6<Math.abs(f-b)&&8>h;h++)f<b?(d=c,c=(c+e)/2):(e=c,c=(c+d)/2),f=g.Uq(a,c);return c},D5=function(){return{D:"svg",
V:{height:"100%",version:"1.1",viewBox:"0 0 110 26",width:"100%"},U:[{D:"path",Fb:!0,K:"ytp-svg-fill",V:{d:"M 16.68,.99 C 13.55,1.03 7.02,1.16 4.99,1.68 c -1.49,.4 -2.59,1.6 -2.99,3 -0.69,2.7 -0.68,8.31 -0.68,8.31 0,0 -0.01,5.61 .68,8.31 .39,1.5 1.59,2.6 2.99,3 2.69,.7 13.40,.68 13.40,.68 0,0 10.70,.01 13.40,-0.68 1.5,-0.4 2.59,-1.6 2.99,-3 .69,-2.7 .68,-8.31 .68,-8.31 0,0 .11,-5.61 -0.68,-8.31 -0.4,-1.5 -1.59,-2.6 -2.99,-3 C 29.11,.98 18.40,.99 18.40,.99 c 0,0 -0.67,-0.01 -1.71,0 z m 72.21,.90 0,21.28 2.78,0 .31,-1.37 .09,0 c .3,.5 .71,.88 1.21,1.18 .5,.3 1.08,.40 1.68,.40 1.1,0 1.99,-0.49 2.49,-1.59 .5,-1.1 .81,-2.70 .81,-4.90 l 0,-2.40 c 0,-1.6 -0.11,-2.90 -0.31,-3.90 -0.2,-0.89 -0.5,-1.59 -1,-2.09 -0.5,-0.4 -1.10,-0.59 -1.90,-0.59 -0.59,0 -1.18,.19 -1.68,.49 -0.49,.3 -1.01,.80 -1.21,1.40 l 0,-7.90 -3.28,0 z m -49.99,.78 3.90,13.90 .18,6.71 3.31,0 0,-6.71 3.87,-13.90 -3.37,0 -1.40,6.31 c -0.4,1.89 -0.71,3.19 -0.81,3.99 l -0.09,0 c -0.2,-1.1 -0.51,-2.4 -0.81,-3.99 l -1.37,-6.31 -3.40,0 z m 29.59,0 0,2.71 3.40,0 0,17.90 3.28,0 0,-17.90 3.40,0 c 0,0 .00,-2.71 -0.09,-2.71 l -9.99,0 z m -53.49,5.12 8.90,5.18 -8.90,5.09 0,-10.28 z m 89.40,.09 c -1.7,0 -2.89,.59 -3.59,1.59 -0.69,.99 -0.99,2.60 -0.99,4.90 l 0,2.59 c 0,2.2 .30,3.90 .99,4.90 .7,1.1 1.8,1.59 3.5,1.59 1.4,0 2.38,-0.3 3.18,-1 .7,-0.7 1.09,-1.69 1.09,-3.09 l 0,-0.5 -2.90,-0.21 c 0,1 -0.08,1.6 -0.28,2 -0.1,.4 -0.5,.62 -1,.62 -0.3,0 -0.61,-0.11 -0.81,-0.31 -0.2,-0.3 -0.30,-0.59 -0.40,-1.09 -0.1,-0.5 -0.09,-1.21 -0.09,-2.21 l 0,-0.78 5.71,-0.09 0,-2.62 c 0,-1.6 -0.10,-2.78 -0.40,-3.68 -0.2,-0.89 -0.71,-1.59 -1.31,-1.99 -0.7,-0.4 -1.48,-0.59 -2.68,-0.59 z m -50.49,.09 c -1.09,0 -2.01,.18 -2.71,.68 -0.7,.4 -1.2,1.12 -1.49,2.12 -0.3,1 -0.5,2.27 -0.5,3.87 l 0,2.21 c 0,1.5 .10,2.78 .40,3.78 .2,.9 .70,1.62 1.40,2.12 .69,.5 1.71,.68 2.81,.78 1.19,0 2.08,-0.28 2.78,-0.68 .69,-0.4 1.09,-1.09 1.49,-2.09 .39,-1 .49,-2.30 .49,-3.90 l 0,-2.21 c 0,-1.6 -0.2,-2.87 -0.49,-3.87 -0.3,-0.89 -0.8,-1.62 -1.49,-2.12 -0.7,-0.5 -1.58,-0.68 -2.68,-0.68 z m 12.18,.09 0,11.90 c -0.1,.3 -0.29,.48 -0.59,.68 -0.2,.2 -0.51,.31 -0.81,.31 -0.3,0 -0.58,-0.10 -0.68,-0.40 -0.1,-0.3 -0.18,-0.70 -0.18,-1.40 l 0,-10.99 -3.40,0 0,11.21 c 0,1.4 .18,2.39 .68,3.09 .49,.7 1.21,1 2.21,1 1.4,0 2.48,-0.69 3.18,-2.09 l .09,0 .31,1.78 2.59,0 0,-14.99 c 0,0 -3.40,.00 -3.40,-0.09 z m 17.31,0 0,11.90 c -0.1,.3 -0.29,.48 -0.59,.68 -0.2,.2 -0.51,.31 -0.81,.31 -0.3,0 -0.58,-0.10 -0.68,-0.40 -0.1,-0.3 -0.21,-0.70 -0.21,-1.40 l 0,-10.99 -3.40,0 0,11.21 c 0,1.4 .21,2.39 .71,3.09 .5,.7 1.18,1 2.18,1 1.39,0 2.51,-0.69 3.21,-2.09 l .09,0 .28,1.78 2.62,0 0,-14.99 c 0,0 -3.40,.00 -3.40,-0.09 z m 20.90,2.09 c .4,0 .58,.11 .78,.31 .2,.3 .30,.59 .40,1.09 .1,.5 .09,1.21 .09,2.21 l 0,1.09 -2.5,0 0,-1.09 c 0,-1 -0.00,-1.71 .09,-2.21 0,-0.4 .11,-0.8 .31,-1 .2,-0.3 .51,-0.40 .81,-0.40 z m -50.49,.12 c .5,0 .8,.18 1,.68 .19,.5 .28,1.30 .28,2.40 l 0,4.68 c 0,1.1 -0.08,1.90 -0.28,2.40 -0.2,.5 -0.5,.68 -1,.68 -0.5,0 -0.79,-0.18 -0.99,-0.68 -0.2,-0.5 -0.31,-1.30 -0.31,-2.40 l 0,-4.68 c 0,-1.1 .11,-1.90 .31,-2.40 .2,-0.5 .49,-0.68 .99,-0.68 z m 39.68,.09 c .3,0 .61,.10 .81,.40 .2,.3 .27,.67 .37,1.37 .1,.6 .12,1.51 .12,2.71 l .09,1.90 c 0,1.1 .00,1.99 -0.09,2.59 -0.1,.6 -0.19,1.08 -0.49,1.28 -0.2,.3 -0.50,.40 -0.90,.40 -0.3,0 -0.51,-0.08 -0.81,-0.18 -0.2,-0.1 -0.39,-0.29 -0.59,-0.59 l 0,-8.5 c .1,-0.4 .29,-0.7 .59,-1 .3,-0.3 .60,-0.40 .90,-0.40 z"}}]}},
E5=function(a){g.H.call(this);
this.callback=a;this.u=new g.Tq(0,0,.4,0,.2,1,1,1);this.delay=new g.lq(this.next,window,this);this.startTime=this.duration=this.j=this.i=NaN;g.J(this,this.delay)},F5=function(a){g.V.call(this,{D:"div",
K:"ytp-related-on-error-overlay"});var b=this;this.api=a;this.C=this.i=0;this.B=new g.lC(this);this.u=[];this.suggestionData=[];this.containerWidth=0;this.title=new g.V({D:"h2",K:"ytp-related-title",qa:"{{title}}"});this.previous=new g.V({D:"button",Ga:["ytp-button","ytp-previous"],V:{"aria-label":"Show previous suggested videos"},U:[g.aK()]});this.N=new E5(function(f){b.suggestions.element.scrollLeft=-f});
this.tileWidth=this.j=0;this.I=!0;this.next=new g.V({D:"button",Ga:["ytp-button","ytp-next"],V:{"aria-label":"Show more suggested videos"},U:[g.bK()]});g.J(this,this.B);a=a.T();this.J=a.i;g.J(this,this.title);this.title.Ca(this.element);this.suggestions=new g.V({D:"div",K:"ytp-suggestions"});g.J(this,this.suggestions);this.suggestions.Ca(this.element);g.J(this,this.previous);this.previous.Ca(this.element);this.previous.Pa("click",this.lR,this);g.J(this,this.N);for(var c={xr:0};16>c.xr;c={xr:c.xr},
c.xr++){var d=new g.V({D:"a",K:"ytp-suggestion-link",V:{href:"{{link}}",target:a.I,"aria-label":"{{aria_label}}"},U:[{D:"div",K:"ytp-suggestion-image",U:[{D:"div",V:{"data-is-live":"{{is_live}}"},K:"ytp-suggestion-duration",qa:"{{duration}}"}]},{D:"div",K:"ytp-suggestion-title",V:{title:"{{hover_title}}"},qa:"{{title}}"},{D:"div",K:"ytp-suggestion-author",qa:"{{views_or_author}}"}]});g.J(this,d);d.Ca(this.suggestions.element);var e=d.Da("ytp-suggestion-link");g.gn(e,"transitionDelay",c.xr/20+"s");
this.B.S(e,"click",function(f){return function(h){var l=b.suggestionData[f.xr],m=l.sessionData;g.NM(h,b.api,b.J,m||void 0)&&b.api.ek(l.videoId,m,l.playlistId)}}(c));
this.u.push(d)}g.J(this,this.next);this.next.Ca(this.element);this.next.Pa("click",this.kR,this);this.B.S(this.api,"videodatachange",this.onVideoDataChange);this.resize(this.api.bb().getPlayerSize());this.onVideoDataChange();this.show()},G5=function(a){a.next.element.style.bottom=a.C+"px";
a.previous.element.style.bottom=a.C+"px";var b=a.j,c=a.containerWidth-a.suggestionData.length*(a.tileWidth+a.i);g.O(a.element,"ytp-scroll-min",0<=b);g.O(a.element,"ytp-scroll-max",b<=c)},eXa=function(a){for(var b=0;b<a.suggestionData.length;b++){var c=a.suggestionData[b],d=a.u[b],e=c.shortViewCount?c.shortViewCount:c.author,f=c.Wk();
g.PD(a.api.T())&&(f=g.zj(f,g.LL("emb_rel_err")));d.element.style.display="";var h=d.Da("ytp-suggestion-title");g.Rq.test(c.title)?h.dir="rtl":g.rSa.test(c.title)&&(h.dir="ltr");h=d.Da("ytp-suggestion-author");g.Rq.test(e)?h.dir="rtl":g.rSa.test(e)&&(h.dir="ltr");h=c.isLivePlayback?"Live":c.lengthSeconds?g.XK(c.lengthSeconds):"";d.update({views_or_author:e,duration:h,link:f,hover_title:c.title,title:c.title,aria_label:c.Rl||null,is_live:c.isLivePlayback});d=d.Da("ytp-suggestion-image");c=c.Qe();d.style.backgroundImage=
c?"url("+c+")":""}for(;b<a.u.length;b++)a.u[b].element.style.display="none";G5(a)},H5=function(a){g.SM.call(this,a);
var b=this,c=a.T(),d={D:"svg",V:{fill:"#fff",height:"100%",viewBox:"0 0 24 24",width:"100%"},U:[{D:"path",V:{d:"M0 0h24v24H0V0z",fill:"none"}},{D:"path",V:{d:"M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"}}]};g.$D(c)&&(d={D:"svg",V:{fill:"none",height:"100%",viewBox:"0 0 25 25",
width:"100%"},U:[{D:"g",V:{"clip-path":"url(#clip0)",fill:"#fff"},U:[{D:"path",V:{d:"M12.57.98C6.21.98 1.05 6.14 1.05 12.5c0 6.36 5.16 11.52 11.52 11.52 6.36 0 11.52-5.16 11.52-11.52C24.09 6.14 18.93.98 12.57.98zm0 18.34c-3.77 0-6.82-3.05-6.82-6.82 0-3.77 3.05-6.82 6.82-6.82 3.77 0 6.82 3.05 6.82 6.82 0 3.77-3.05 6.82-6.82 6.82z"}},{D:"path",V:{d:"M12.57 6.52c-3.29 0-5.98 2.68-5.98 5.98 0 3.3 2.68 5.98 5.98 5.98 3.3 0 5.98-2.68 5.98-5.98 0-3.3-2.69-5.98-5.98-5.98zm-2.25 9.38V9.1l5.88 3.4-5.88 3.4z"}}]},
{D:"defs",U:[{D:"clipPath",V:{id:"clip0"},U:[{D:"path",V:{d:"M0 0h24v24H0z",fill:"#fff",transform:"translate(.57 .5)"}}]}]}]});c=new g.V({D:"a",K:"ytp-small-redirect",V:{href:g.wE(c),target:c.I,"aria-label":"Visit YouTube to search for more videos"},U:[d]});c.Ca(this.element);g.J(this,c);this.i=new F5(a);this.i.Ca(this.element);g.J(this,this.i);this.S(a,"videodatachange",function(){b.show()});
this.resize(this.api.bb().getPlayerSize())},fXa=function(a,b){a.Da("ytp-error-content").style.paddingTop="0px";
var c=a.Da("ytp-error-content"),d=c.clientHeight;a.i.resize(b,b.height-d);c.style.paddingTop=(b.height-a.i.element.clientHeight)/2-d/2+"px"},gXa=function(a,b){var c,d,e,f,h;
b.reason&&(I5(b.reason)?h=g.ry(b.reason):h=g.TM(g.qy(b.reason)),a.yd(h,"content"));var l;b.subreason&&(I5(b.subreason)?l=g.ry(b.subreason):l=g.TM(g.qy(b.subreason)),a.yd(l,"subreason"));if(b.proceedButton&&b.proceedButton.buttonRenderer&&(a=a.Da("ytp-error-content-wrap-subreason"),h=b.proceedButton.buttonRenderer,b=g.Ih("A"),h.text&&h.text.simpleText)){l=h.text.simpleText;b.textContent=l;a:{for(var m=g.qh("A",a),n=0;n<m.length;n++)if(m[n].textContent===l){l=!0;break a}l=!1}l||(l=null===(d=null===
(c=null===h||void 0===h?void 0:h.navigationEndpoint)||void 0===c?void 0:c.urlEndpoint)||void 0===d?void 0:d.url,h=null===(f=null===(e=null===h||void 0===h?void 0:h.navigationEndpoint)||void 0===e?void 0:e.urlEndpoint)||void 0===f?void 0:f.target,l&&b.setAttribute("href",l),h&&b.setAttribute("target",h),h=g.Ih("DIV"),h.appendChild(b),a.appendChild(h))}},I5=function(a){if(a.runs)for(var b=0;b<a.runs.length;b++)if(a.runs[b].navigationEndpoint)return!0;
return!1},J5=function(a,b){g.V.call(this,{D:"a",
Ga:["ytp-impression-link"],V:{target:"{{target}}",href:"{{url}}","aria-label":"Watch on YouTube"},U:[{D:"div",K:"ytp-impression-link-content",V:{"aria-hidden":"true"},U:[{D:"div",K:"ytp-impression-link-text",qa:"Watch on"},{D:"div",K:"ytp-impression-link-logo",U:[D5()]}]}]});this.api=a;this.j=b;this.Ma("target",a.T().I);this.api.Bb(this.element,this,96714);this.S(this.api,"presentingplayerstatechange",this.dg);this.S(this.api,"videoplayerreset",this.i);this.S(this.element,"click",this.onClick);this.i()},
K5=function(a){g.V.call(this,{D:"div",
Ga:["ytp-mobile-a11y-hidden-seek-button"],U:[{D:"button",Ga:["ytp-mobile-a11y-hidden-seek-button-rewind","ytp-button"],V:{"aria-label":"Rewind 10 seconds","aria-hidden":"false"}},{D:"button",Ga:["ytp-mobile-a11y-hidden-seek-button-forward","ytp-button"],V:{"aria-label":"Fast forward 10 seconds","aria-hidden":"false"}}]});this.api=a;this.i=this.Da("ytp-mobile-a11y-hidden-seek-button-rewind");this.forwardButton=this.Da("ytp-mobile-a11y-hidden-seek-button-forward");this.api.Bb(this.i,this,141902);this.api.Bb(this.forwardButton,
this,141903);this.S(this.api,"presentingplayerstatechange",this.dg);this.S(this.i,"click",this.j);this.S(this.forwardButton,"click",this.u);this.dg()},L5=function(a){g.V.call(this,{D:"div",
K:"ytp-muted-autoplay-endscreen-overlay",U:[{D:"div",K:"ytp-muted-autoplay-end-panel",U:[{D:"div",K:"ytp-muted-autoplay-end-text",qa:"{{text}}"}]}]});this.api=a;this.u=this.Da("ytp-muted-autoplay-end-panel");this.i=new g.LM(this.api);g.J(this,this.i);this.i.Ca(this.u,0);this.api.Bb(this.element,this,52428);this.S(this.api,"presentingplayerstatechange",this.j);this.Pa("click",this.onClick);this.hide()},M5=function(a){g.V.call(this,{D:"div",
K:"ytp-muted-autoplay-overlay",U:[{D:"div",K:"ytp-muted-autoplay-bottom-buttons",U:[{D:"button",Ga:["ytp-muted-autoplay-equalizer","ytp-button"],U:[{D:"div",Ga:["ytp-muted-autoplay-equalizer-icon"],U:[{D:"svg",V:{height:"100%",version:"1.1",viewBox:"-4 -4 24 24",width:"100%"},U:[{D:"g",V:{fill:"#fff"},U:[{D:"rect",K:"ytp-equalizer-bar-left",V:{height:"9",width:"4",x:"1",y:"7"}},{D:"rect",K:"ytp-equalizer-bar-middle",V:{height:"14",width:"4",x:"6",y:"2"}},{D:"rect",K:"ytp-equalizer-bar-right",V:{height:"12",
width:"4",x:"11",y:"4"}}]}]}]}]}]}]});this.api=a;this.bottomButtons=this.Da("ytp-muted-autoplay-bottom-buttons");this.Da("ytp-muted-autoplay-equalizer");this.u=new g.K(this.j,4E3,this);a.Bb(this.element,this,39306);this.S(a,"presentingplayerstatechange",this.i);this.S(a,"onMutedAutoplayStarts",this.i);this.Pa("click",this.onClick);this.hide()},N5=function(a,b){g.V.call(this,{D:"div",
K:"ytp-pause-overlay"});var c=this;this.api=a;this.I=b;this.i=new g.lC(this);this.B=new g.JK(this,1E3,!1,100);this.u=[];this.suggestionData=[];this.containerWidth=0;this.C=!1;this.Y=0;this.title=new g.V({D:"h2",K:"ytp-related-title",qa:"{{title}}"});this.previous=new g.V({D:"button",Ga:["ytp-button","ytp-previous"],V:{"aria-label":"Show previous suggested videos"},U:[g.aK()]});this.N=new E5(function(f){c.suggestions.element.scrollLeft=-f});
this.W=this.tileWidth=this.j=0;this.next=new g.V({D:"button",Ga:["ytp-button","ytp-next"],V:{"aria-label":"Show more suggested videos"},U:[g.bK()]});this.expandButton=new g.V({D:"button",Ga:["ytp-button","ytp-expand"],qa:"More videos"});g.J(this,this.i);g.J(this,this.B);b=a.T();"0"===b.controlsType&&g.N(a.getRootNode(),"ytp-pause-overlay-controls-hidden");this.J=b.i;g.J(this,this.title);this.title.Ca(this.element);this.suggestions=new g.V({D:"div",K:"ytp-suggestions"});g.J(this,this.suggestions);
this.suggestions.Ca(this.element);g.J(this,this.previous);this.previous.Ca(this.element);this.previous.Pa("click",this.nR,this);g.J(this,this.N);for(a={yr:0};16>a.yr;a={yr:a.yr},a.yr++){var d=new g.V({D:"a",K:"ytp-suggestion-link",V:{href:"{{link}}",target:b.I,"aria-label":"{{aria_label}}"},U:[{D:"div",K:"ytp-suggestion-image"},{D:"div",K:"ytp-suggestion-overlay",V:{style:"{{blink_rendering_hack}}","aria-hidden":"{{aria_hidden}}"},U:[{D:"div",K:"ytp-suggestion-title",qa:"{{title}}"},{D:"div",K:"ytp-suggestion-author",
qa:"{{author_and_views}}"},{D:"div",V:{"data-is-live":"{{is_live}}"},K:"ytp-suggestion-duration",qa:"{{duration}}"}]}]});g.J(this,d);d.Ca(this.suggestions.element);var e=d.Da("ytp-suggestion-link");g.gn(e,"transitionDelay",a.yr/20+"s");this.i.S(e,"click",function(f){return function(h){var l=f.yr;if(1E3>(0,g.R)()-c.Y)g.Tt(h),document.activeElement.blur();else{l=c.suggestionData[l];var m=l.sessionData;g.NM(h,c.api,c.J,m||void 0)&&c.api.ek(l.videoId,m,l.playlistId)}}}(a));
this.u.push(d)}g.J(this,this.next);this.next.Ca(this.element);this.next.Pa("click",this.mR,this);b=new g.V({D:"button",Ga:["ytp-button","ytp-collapse"],V:{"aria-label":"Hide more videos"},U:[{D:"svg",V:{height:"100%",viewBox:"0 0 16 16",width:"100%"},U:[{D:"path",V:{d:"M13 4L12 3 8 7 4 3 3 4 7 8 3 12 4 13 8 9 12 13 13 12 9 8z",fill:"#fff"}}]}]});g.J(this,b);b.Ca(this.element);b.Pa("click",this.BV,this);g.J(this,this.expandButton);this.expandButton.Ca(this.element);this.expandButton.Pa("click",this.CV,
this);this.i.S(this.api,"appresize",this.yb);this.i.S(this.api,"fullscreentoggled",this.Km);this.i.S(this.api,"presentingplayerstatechange",this.Rc);this.i.S(this.api,"videodatachange",this.onVideoDataChange);this.yb(this.api.bb().getPlayerSize());this.onVideoDataChange()},O5=function(a){var b=a.I.Xe()?32:16;
b=a.W/2+b;a.next.element.style.bottom=b+"px";a.previous.element.style.bottom=b+"px";b=a.j;var c=a.containerWidth-a.suggestionData.length*(a.tileWidth+8);g.O(a.element,"ytp-scroll-min",0<=b);g.O(a.element,"ytp-scroll-max",b<=c)},hXa=function(a){for(var b=0;b<a.suggestionData.length;b++){var c=a.suggestionData[b],d=a.u[b],e=c.shortViewCount?c.author+" \u2022 "+c.shortViewCount:c.author;
d.element.style.display="";g.qSa.test(c.title)&&(d.Da("ytp-suggestion-title").dir="rtl");g.qSa.test(e)&&(d.Da("ytp-suggestion-author").dir="rtl");var f=c.isLivePlayback?"Live":c.lengthSeconds?g.XK(c.lengthSeconds):"";var h=c.Wk();g.PD(a.api.T())&&(h=g.zj(h,g.LL("emb_rel_pause")));d.update({author_and_views:e,duration:f,link:h,title:c.title,aria_label:c.Rl||null,is_live:c.isLivePlayback,aria_hidden:!(!c.Rl||a.api.T().L("embeds_rv_aria_hidden_killswitch")),blink_rendering_hack:g.tz||g.ND?"will-change: opacity":
void 0});d=d.Da("ytp-suggestion-image");c=c.Qe();d.style.backgroundImage=c?"url("+c+")":""}for(;b<a.u.length;b++)a.u[b].element.style.display="none";O5(a)},P5=function(a){var b=a.T();
g.V.call(this,{D:"a",Ga:["ytp-watermark","yt-uix-sessionlink"],V:{target:b.I,href:"{{url}}","aria-label":g.dH("Watch on $WEBSITE",{WEBSITE:g.iE(b)}),"data-sessionlink":"feature=player-watermark"},U:[D5()]});this.api=a;this.i=null;this.j=!1;this.state=a.zb();a.Bb(this.element,this,76758);this.S(a,"videodatachange",this.dI);this.S(a,"videodatachange",this.onVideoDataChange);this.S(a,"presentingplayerstatechange",this.onStateChange);this.S(a,"appresize",this.yb);b=this.state;this.state!==b&&(this.state=
b);this.dI();this.onVideoDataChange();this.yb(a.bb().getPlayerSize())},Q5=function(a){g.qM.call(this,a);
this.G=a;this.j=new g.lC(this);g.J(this,this.j);this.load()};
g.w(E5,g.H);E5.prototype.start=function(a,b,c){this.i=a;this.j=b;this.duration=c;this.startTime=(0,g.R)();this.next()};
E5.prototype.next=function(){var a=(0,g.R)()-this.startTime;var b=this.u;a=dXa(b,a/this.duration);if(0==a)b=b.J;else if(1==a)b=b.N;else{var c=g.Xg(b.J,b.C,a),d=g.Xg(b.C,b.I,a);b=g.Xg(b.I,b.N,a);c=g.Xg(c,d,a);d=g.Xg(d,b,a);b=g.Xg(c,d,a)}b=g.Vg(b,0,1);this.callback((this.j-this.i)*b+this.i);1>b&&this.delay.start()};g.w(F5,g.V);g.k=F5.prototype;g.k.hide=function(){this.I=!0;g.V.prototype.hide.call(this)};
g.k.show=function(){this.I=!1;g.V.prototype.show.call(this)};
g.k.isHidden=function(){return this.I};
g.k.kR=function(){this.scrollTo(this.j-this.containerWidth)};
g.k.lR=function(){this.scrollTo(this.j+this.containerWidth)};
g.k.resize=function(a,b){var c=this.api.T(),d=16/9,e=650<=a.width,f=480>a.width||290>a.height,h=Math.min(this.suggestionData.length,this.u.length);if(150>=Math.min(a.width,a.height)||0===h||!c.Jb)this.hide();else{var l;if(e){var m=l=28;this.i=16}else this.i=m=l=8;if(f){var n=6;e=14;var p=12;f=24;c=12}else n=8,e=18,p=16,f=36,c=16;a=a.width-(48+l+m);l=Math.ceil(a/150);l=Math.min(3,l);l=a/l-this.i;m=Math.floor(l/d);b&&m+100>b&&50<l&&(m=Math.max(b,50/d),l=Math.ceil(a/(d*(m-100)+this.i)),l=a/l-this.i,
m=Math.floor(l/d));50>l||g.$L(this.api)?this.hide():this.show();for(b=0;b<h;b++){d=this.u[b];var r=d.Da("ytp-suggestion-image");r.style.width=l+"px";r.style.height=m+"px";d.Da("ytp-suggestion-title").style.width=l+"px";d.Da("ytp-suggestion-author").style.width=l+"px";d=d.Da("ytp-suggestion-duration");d.style.display=d&&100>l?"none":""}h=e+n+p+4;this.C=h+c+(m-f)/2;this.suggestions.element.style.height=m+h+"px";this.tileWidth=l;this.containerWidth=a;this.j=0;this.suggestions.element.scrollLeft=-0;G5(this)}};
g.k.onVideoDataChange=function(){var a=this.api.getVideoData(),b=this.api.T();this.J=a.C?!1:b.i;a.suggestions?this.suggestionData=g.Ro(a.suggestions,function(c){return c&&!c.playlistId}):this.suggestionData.length=0;
eXa(this);a.C?this.title.update({title:g.dH("More videos from $DNI_RELATED_CHANNEL",{DNI_RELATED_CHANNEL:a.author})}):this.title.update({title:"More videos on YouTube"})};
g.k.scrollTo=function(a){a=g.Vg(a,this.containerWidth-this.suggestionData.length*(this.tileWidth+this.i),0);this.N.start(this.j,a,1E3);this.j=a;G5(this)};g.w(H5,g.SM);H5.prototype.show=function(){g.SM.prototype.show.call(this);fXa(this,this.api.bb().getPlayerSize())};
H5.prototype.resize=function(a){g.SM.prototype.resize.call(this,a);fXa(this,a);g.O(this.element,"related-on-error-overlay-visible",!this.i.isHidden())};
H5.prototype.j=function(a){g.SM.prototype.j.call(this,a);var b=this.api.getVideoData();if(b.AF||b.playerErrorMessageRenderer)(a=b.AF)?gXa(this,a):b.playerErrorMessageRenderer&&gXa(this,b.playerErrorMessageRenderer);else{var c;a.zi&&(b.Jq?I5(b.Jq)?c=g.ry(b.Jq):c=g.TM(g.qy(b.Jq)):c=g.TM(a.zi),this.yd(c,"subreason"))}};g.w(J5,g.V);J5.prototype.dg=function(){this.api.zb().isCued()||(this.hide(),this.api.Za(this.element,!1))};
J5.prototype.i=function(){var a=this.api.getVideoData(),b=this.api.T(),c=this.api.getVideoData().C,d=b.Qb,e=!b.Jb,f=this.j.Af();b=g.$D(b);d||f||c||e||b||!a.videoId?(this.hide(),this.api.Za(this.element,!1)):(a=g.zj(this.api.getVideoUrl(),g.LL("emb_imp_woyt")),this.Ma("url",a),this.show())};
J5.prototype.onClick=function(a){var b=g.zj(this.api.getVideoUrl(),g.LL("emb_imp_woyt"));g.OM(b,this.api,a);this.api.ub(this.element)};
J5.prototype.show=function(){this.api.zb().isCued()&&(g.V.prototype.show.call(this),this.api.oo(this.element)&&this.api.Za(this.element,!0))};g.w(K5,g.V);K5.prototype.dg=function(){var a=this.api.zb();!this.api.kf()||g.U(a,2)&&g.XL(this.api)||g.U(a,64)?(this.api.Za(this.i,!1),this.api.Za(this.forwardButton,!1),this.hide()):(this.show(),this.api.Za(this.i,!0),this.api.Za(this.forwardButton,!0))};
K5.prototype.j=function(){this.api.seekBy(-10*this.api.getPlaybackRate());this.api.ub(this.i)};
K5.prototype.u=function(){this.api.seekBy(10*this.api.getPlaybackRate());this.api.ub(this.forwardButton)};g.w(L5,g.V);L5.prototype.j=function(){var a=this.api.zb(),b=this.api.getVideoData();this.api.T().L("embeds_enable_muted_autoplay")&&b.mutedAutoplay&&(g.U(a,2)&&!this.sb?(this.show(),this.i.show(),a=this.api.getVideoData(),this.Ma("text",a.wJ),g.O(this.element,"ytp-muted-autoplay-show-end-panel",!0),this.api.Za(this.element,this.sb),this.api.Oa("onMutedAutoplayEnds")):this.hide())};
L5.prototype.onClick=function(){var a=this.api.getVideoData(),b=this.api.getCurrentTime();a.mutedAutoplay=!1;a.endSeconds=NaN;g.mF(a);this.api.loadVideoById(a.videoId,b);this.api.ub(this.element);this.hide()};g.w(M5,g.V);M5.prototype.i=function(){var a=this.api.zb(),b=this.api.getVideoData();this.api.T().L("embeds_enable_muted_autoplay")&&b.mutedAutoplay&&!g.U(a,2)?this.sb||(g.V.prototype.show.call(this),this.u.start(),this.api.Za(this.element,this.sb)):this.hide()};
M5.prototype.j=function(){g.O(this.element,"ytp-muted-autoplay-hide-watermark",!0)};
M5.prototype.onClick=function(){var a=this.api.getVideoData(),b=this.api.getCurrentTime();a.mutedAutoplay=!1;a.endSeconds=NaN;g.mF(a);this.api.loadVideoById(a.videoId,b);this.api.ub(this.element)};g.w(N5,g.V);g.k=N5.prototype;g.k.hide=function(){g.Eq(this.api.getRootNode(),"ytp-expand-pause-overlay");g.V.prototype.hide.call(this)};
g.k.BV=function(){this.C=!0;g.Eq(this.api.getRootNode(),"ytp-expand-pause-overlay");this.expandButton.focus()};
g.k.CV=function(){this.C=!1;g.N(this.api.getRootNode(),"ytp-expand-pause-overlay")};
g.k.mR=function(){this.scrollTo(this.j-this.containerWidth)};
g.k.nR=function(){this.scrollTo(this.j+this.containerWidth)};
g.k.Km=function(){this.yb(this.api.bb().getPlayerSize())};
g.k.Rc=function(a){if(!(g.U(a.state,1)||g.U(a.state,16)||g.U(a.state,32))){var b=!this.api.T().L("embeds_disable_pauseoverlay_on_autoplay_blocked_killswitch")&&g.U(a.state,1024);!g.U(a.state,4)||g.U(a.state,2)||b?this.B.hide():this.suggestionData.length&&(this.C||(g.N(this.api.getRootNode(),"ytp-expand-pause-overlay"),O5(this)),this.B.show(),this.Y=(0,g.R)())}};
g.k.yb=function(a){var b=16/9,c=this.I.Xe();a=a.width-(c?112:58);c=Math.ceil(a/(c?320:192));c=(a-8*c)/c;b=Math.floor(c/b);for(var d=0;d<this.u.length;d++){var e=this.u[d].Da("ytp-suggestion-image");e.style.width=c+"px";e.style.height=b+"px"}this.suggestions.element.style.height=b+"px";this.tileWidth=c;this.W=b;this.containerWidth=a;this.j=0;this.suggestions.element.scrollLeft=-0;O5(this)};
g.k.onVideoDataChange=function(){var a=this.api.T(),b=this.api.getVideoData();this.J=b.C?!1:a.i;b.suggestions?this.suggestionData=g.Ro(b.suggestions,function(c){return c&&!c.playlistId}):this.suggestionData.length=0;
hXa(this);b.C?this.title.update({title:g.dH("More videos from $DNI_RELATED_CHANNEL",{DNI_RELATED_CHANNEL:b.author})}):this.title.update({title:"More videos"})};
g.k.scrollTo=function(a){a=g.Vg(a,this.containerWidth-this.suggestionData.length*(this.tileWidth+8),0);this.N.start(this.j,a,1E3);this.j=a;O5(this)};g.w(P5,g.V);g.k=P5.prototype;g.k.dI=function(){var a=this.api.getVideoData(),b=this.api.getVideoData(1).C,c=this.api.T();a=(a.mutedAutoplay||c.Qb&&!g.U(this.state,2))&&!(b&&c.pfpChazalUi);g.UJ(this,a);this.api.Za(this.element,a)};
g.k.onStateChange=function(a){a=a.state;this.state!==a&&(this.state=a);this.dI()};
g.k.onVideoDataChange=function(){if(this.api.getVideoData().videoId){var a=this.api.getVideoUrl(!0,!1,!1,!0);this.Ma("url",a);this.i||(this.i=this.Pa("click",this.onClick))}else this.i&&(this.Ma("url",null),this.wc(this.i),this.i=null)};
g.k.onClick=function(a){var b=this.api.getVideoUrl(!g.YK(a),!1,!0,!0);g.OM(b,this.api,a);this.api.ub(this.element)};
g.k.yb=function(a){if((a=480>a.width)&&!this.j||!a&&this.j){var b=new g.V(D5()),c=this.Da("ytp-watermark");g.O(c,"ytp-watermark-small",a);g.Kh(c);b.Ca(c);this.j=a}};g.w(Q5,g.qM);g.k=Q5.prototype;g.k.aj=function(){return!1};
g.k.create=function(){var a,b=this.G.T(),c=g.TL(this.G),d=null===(a=this.G.getVideoData())||void 0===a?void 0:a.clientPlaybackNonce;d&&g.Ry("cpn",d);b.Jb&&!b.cd&&(this.I=new N5(this.G,c),g.J(this,this.I),g.cM(this.G,this.I.element,4));b.L("embeds_enable_muted_autoplay")&&(this.i=new M5(this.G),g.J(this,this.i),g.cM(this.G,this.i.element,4),this.C=new L5(this.G),g.J(this,this.C),g.cM(this.G,this.C.element,4));if(b.Qb||this.i)this.watermark=new P5(this.G),g.J(this,this.watermark),g.cM(this.G,this.watermark.element,
8);this.u=new J5(this.G,c);g.J(this,this.u);g.cM(this.G,this.u.element,8);b.L("embeds_web_enable_mobile_a11y_hidden_seek_button")&&(this.B=new K5(this.G),g.J(this,this.B),g.cM(this.G,this.B.element,4));this.j.S(this.G,"appresize",this.yb);this.j.S(this.G,"presentingplayerstatechange",this.dg);this.j.S(this.G,"videodatachange",this.vZ);this.j.S(this.G,"onMutedAutoplayStarts",this.onMutedAutoplayStarts);this.Xb(this.G.zb());this.player.Ee("embed")};
g.k.yb=function(){var a=this.G.bb().getPlayerSize();this.Ie&&this.Ie.resize(a)};
g.k.dg=function(a){this.Xb(a.state)};
g.k.Xb=function(a){g.U(a,128)?(this.Ie||(this.Ie=new H5(this.G),g.J(this,this.Ie),g.cM(this.G,this.Ie.element,4)),this.Ie.j(a.getData()),this.Ie.show(),g.N(this.G.getRootNode(),"ytp-embed-error")):this.Ie&&(this.Ie.dispose(),this.Ie=null,g.Eq(this.G.getRootNode(),"ytp-embed-error"))};
g.k.onMutedAutoplayStarts=function(){this.G.getVideoData().mutedAutoplay&&this.i&&this.watermark&&this.watermark.Ca(this.i.bottomButtons,0)};
g.k.vZ=function(){var a=this.G.getVideoData();this.watermark&&this.i&&!a.mutedAutoplay&&g.Oh(this.i.element,this.watermark.element)&&g.cM(this.G,this.watermark.element,8)};g.pM("embed",Q5);})(_yt_player);
