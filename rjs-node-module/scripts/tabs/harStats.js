/* See license.txt for terms of usage */

define("tabs/harStats",["domplate/domplate","core/lib","core/StatsService","i18n!nls/harStats","preview/harModel","domplate/infoTip"],function(e,t,a,l,i,o){function r(){}function n(){}function s(){}function c(){}function d(){}function u(e,t){this.model=e,this.timeline=t,this.timeline.addListener(this)}var p=e.domplate,h=e.DIV,b=e.FOR,v=e.SPAN,g=e.TABLE,f=e.TBODY,m=e.TD,y=e.TR,S=p({tag:h({class:"pieLabelInfoTip"},"$text"),render:function(e,t,a){var l=e.getLabelTooltipText(t);this.tag.replace({text:l},a)}}),L=p({tag:g({class:"pagePieTable",cellpadding:0,cellspacing:0,_repObject:"$pie"},f(y(m({class:"pieBox",title:"$pie.title"}),m(b("item","$pie.data",h({class:"pieLabel",_repObject:"$item"},v({class:"box",style:"background-color: $item.color"},"&nbsp;"),v({class:"label"},"$item.label"))))))),render:function(e,a){var l=this.tag.append({pie:e},a),i=t.$(l,"pieBox"),o=document.createElement("canvas");return o.setAttribute("class","pieGraph"),o.setAttribute("height","100"),o.setAttribute("width","100"),i.appendChild(o),l},draw:function(e,t){if(e&&e.getContext){var a=e.getContext("2d"),l=Math.min(e.width,e.height)/2,i=[e.width/2,e.height/2];a.clearRect(0,0,e.width,e.height);var o,r=0,n=t.data,s=0;for(o=0;o<n.length;o++)s+=n[o].value;if(!s)return a.beginPath(),a.moveTo(i[0],i[1]),a.arc(i[0],i[1],l,0,2*Math.PI,!1),a.closePath(),a.fillStyle="rgb(229,236,238)",a.lineStyle="lightgray",void a.fill();for(o=0;o<n.length;o++){var c=n[o].value/s;c<=0||(a.beginPath(),a.moveTo(i[0],i[1]),a.arc(i[0],i[1],l,Math.PI*(-.5+2*r),Math.PI*(-.5+2*(r+c)),!1),a.lineTo(i[0],i[1]),a.closePath(),a.fillStyle=n[o].color,a.fill(),r+=c)}}},showInfoTip:function(e,a,l,i){var o=t.getAncestorByClass(a,"pagePieTable");if(!o)return!1;var r=t.getAncestorByClass(a,"pieLabel");return r?(S.render(o.repObject,r.repObject,e),!0):void 0}});r.prototype={data:[],title:"",getLabelTooltipText:function(e){return e.label+": "+t.formatSize(e.value)},cleanUp:function(){for(var e=0;e<this.data.length;e++)this.data[e].value=0,this.data[e].count=0}},n.prototype=t.extend(r.prototype,{title:"Summary of request times.",data:[{value:0,label:l.pieLabelBlocked,color:"rgb(228, 214, 193)"},{value:0,label:l.pieLabelDNS,color:"rgb(119, 192, 203)"},{value:0,label:l.pieLabelSSL,color:"rgb(168, 196, 173)"},{value:0,label:l.pieLabelConnect,color:"rgb(179, 222, 93)"},{value:0,label:l.pieLabelSend,color:"rgb(224, 171, 157)"},{value:0,label:l.pieLabelWait,color:"rgb(163, 150, 190)"},{value:0,label:l.pieLabelReceive,color:"rgb(194, 194, 194)"}],getLabelTooltipText:function(e){return e.label+": "+t.formatTime(e.value.toFixed(2))}}),s.prototype=t.extend(r.prototype,{title:"Summary of content types.",data:[{value:0,label:l.pieLabelHTMLText,color:"rgb(174, 234, 218)"},{value:0,label:l.pieLabelJavaScript,color:"rgb(245, 230, 186)"},{value:0,label:l.pieLabelCSS,color:"rgb(212, 204, 219)"},{value:0,label:l.pieLabelImage,color:"rgb(220, 171, 181)"},{value:0,label:l.pieLabelFlash,color:"rgb(166, 156, 222)"},{value:0,label:l.pieLabelOthers,color:"rgb(229, 171, 255)"}],getLabelTooltipText:function(e){return e.count+"x "+e.label+": "+t.formatSize(e.value)}}),c.prototype=t.extend(r.prototype,{title:"Summary of sent and received bodies & headers.",data:[{value:0,label:l.pieLabelHeadersSent,color:"rgb(247, 179, 227)"},{value:0,label:l.pieLabelBodiesSent,color:"rgb(226, 160, 241)"},{value:0,label:l.pieLabelHeadersReceived,color:"rgb(166, 232, 166)"},{value:0,label:l.pieLabelBodiesReceived,color:"rgb(168, 196, 173)"}]}),d.prototype=t.extend(r.prototype,{title:"Comparison of downloaded data from the server and browser cache.",data:[{value:0,label:l.pieLabelDownloaded,color:"rgb(182, 182, 182)"},{value:0,label:l.pieLabelPartial,color:"rgb(218, 218, 218)"},{value:0,label:l.pieLabelFromCache,color:"rgb(239, 239, 239)"}],getLabelTooltipText:function(e){return e.count+"x "+e.label+": "+t.formatSize(e.value)}});var T=new n,w=new s,P=new c,x=new d;return u.prototype=p({element:null,tag:h({class:"pageStatsBody",style:"height: auto; display: none"}),update:function(e){if(this.isVisible()){this.cleanUp(),e.length||e.push(null);var l=new a(this.model),i=l.calcTimingsTotalsForPages(e);T.data[0].value=i.blocked,T.data[1].value=i.dns,T.data[2].value=i.ssl,T.data[3].value=i.connect,T.data[4].value=i.send,T.data[5].value=i.wait,T.data[6].value=i.receive;var o=l.calcContentTotalsForPages(e);w.data[0].value=o.html.resBodySize,w.data[0].count=o.html.count,w.data[1].value=o.js.resBodySize,w.data[1].count=o.js.count,w.data[2].value=o.css.resBodySize,w.data[2].count=o.css.count,w.data[3].value=o.image.resBodySize,w.data[3].count=o.image.count,w.data[4].value=o.flash.resBodySize,w.data[4].count=o.flash.count,w.data[5].value=o.other.resBodySize,w.data[5].count=o.other.count;var r=l.calcTrafficTotalsForPages(e);P.data[0].value=r.request.headersSize,P.data[1].value=r.request.bodySize,P.data[2].value=r.response.headersSize,P.data[3].value=r.response.bodySize;var n=l.calcCacheTotalsForPages(e);x.data[1].value=n.partial.resBodySize,x.data[1].count=n.partial.count,x.data[2].value=n.cached.resBodySize,x.data[2].count=n.cached.count,x.data[0].value=n.downloaded.resBodySize,x.data[0].count=n.downloaded.count,L.draw(t.$(this.timingPie,"pieGraph"),T),L.draw(t.$(this.contentPie,"pieGraph"),w),L.draw(t.$(this.trafficPie,"pieGraph"),P),L.draw(t.$(this.cachePie,"pieGraph"),x)}},cleanUp:function(){T.cleanUp(),w.cleanUp(),P.cleanUp(),x.cleanUp()},showInfoTip:function(e,t,a,l){return L.showInfoTip(e,t,a,l)},onSelectionChange:function(e){this.update(e)},show:function(e){if(!this.isVisible()){o.addListener(this),t.setClass(this.element,"opened"),e?$(this.element).slideDown():this.element.style.display="block";var a=this.timeline.getSelection();this.update(a)}},hide:function(e){this.isVisible()&&(o.removeListener(this),t.removeClass(this.element,"opened"),e?$(this.element).slideUp():this.element.style.display="none")},isVisible:function(){return t.hasClass(this.element,"opened")},toggle:function(e){this.isVisible()?this.hide(e):this.show(e)},render:function(e){return this.element=this.tag.replace({},e),this.timingPie=L.render(T,this.element),this.contentPie=L.render(w,this.element),this.trafficPie=L.render(P,this.element),this.cachePie=L.render(x,this.element),this.cachePie.style.borderRight=0,this.element}}),u});