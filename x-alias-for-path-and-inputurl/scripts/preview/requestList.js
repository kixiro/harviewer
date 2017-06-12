/* See license.txt for terms of usage */

define("preview/requestList",["domplate/domplate","core/lib","i18n!nls/requestList","preview/harModel","core/cookies","preview/requestBody","domplate/infoTip","domplate/popupMenu"],function(e,t,s,i,n,a,r,l){function o(e){this.input=e,this.pageTimings=[],this.addPageTiming({name:"onContentLoad",classes:"netContentLoadBar",description:s.ContentLoad}),this.addPageTiming({name:"onLoad",classes:"netWindowLoadBar",description:s.WindowLoad}),r.addListener(this)}function c(e){this.files=[],this.pageTimings=[],this.addFile(e)}var m=e.domplate,p=e.DIV,d=e.FOR,u=e.SPAN,h=e.TABLE,f=e.TBODY,g=e.TD,T=e.TR,C=m({tableTag:h({"class":"timeInfoTip"},f()),timingsTag:d("time","$timings",T({"class":"timeInfoTipRow",$collapsed:"$time|hideBar"},g({"class":"$time|getBarClass timeInfoTipBar",$loaded:"$time.loaded",$fromCache:"$time.fromCache"}),g({"class":"timeInfoTipCell startTime"},"$time.start|formatStartTime"),g({"class":"timeInfoTipCell elapsedTime"},"$time.elapsed|formatTime"),g("$time|getLabel"))),startTimeTag:T(g(),g("$startTime.time|formatStartTime"),g({"class":"timeInfoTipStartLabel",colspan:2},"$startTime|getLabel")),separatorTag:T({},g({"class":"timeInfoTipSeparator",colspan:4,height:"10px"},u("$label"))),eventsTag:d("event","$events",T({"class":"timeInfoTipEventRow"},g({"class":"timeInfoTipBar",align:"center"},p({"class":"$event|getPageTimingClass timeInfoTipEventBar"})),g("$event.start|formatStartTime"),g({colspan:2},"$event|getTimingLabel"))),hideBar:function(e){return!e.elapsed&&"request.phase.Blocking"===e.bar},getBarClass:function(e){var t=e.bar.substr(e.bar.lastIndexOf(".")+1);return"net"+t+"Bar"},getPageTimingClass:function(e){return e.classes?e.classes:""},formatTime:function(e){return t.formatTime(e.toFixed(2))},formatStartTime:function(e){var s=e>0,i=t.formatTime(Math.abs(e.toFixed(2)));return e?(s>0?"+":"-")+i:i},getLabel:function(e){return s[e.bar]},getTimingLabel:function(e){return e.bar},render:function(e,n,a){var r=e.input,l=n.repObject,o=i.getParentPage(r,l),c=o?t.parseISO8601(o.startedDateTime):null,m=t.parseISO8601(l.startedDateTime),p=C.tableTag.replace({},a),d={};c?d.time=m-c:d.time=m-n.phase.startTime,d.bar="request.Started",this.startTimeTag.insertRows({startTime:d},p.firstChild),this.separatorTag.insertRows({label:s["request.phases.label"]},p.firstChild);var u=0,h=[],f=l.timings.blocked,g=l.timings.dns,T=(l.timings.ssl,l.timings.connect),b=l.timings.send,v=l.timings.wait,S=l.timings.receive;if(f>=0&&h.push({bar:"request.phase.Blocking",elapsed:f,start:u}),g>=0&&h.push({bar:"request.phase.Resolving",elapsed:g,start:u+=0>f?0:f}),T>=0&&h.push({bar:"request.phase.Connecting",elapsed:T,start:u+=0>g?0:g}),b>=0&&h.push({bar:"request.phase.Sending",elapsed:b,start:u+=0>T?0:T}),v>=0&&h.push({bar:"request.phase.Waiting",elapsed:v,start:u+=0>b?0:b}),S>=0&&h.push({bar:"request.phase.Receiving",elapsed:S,start:u+=0>v?0:v,loaded:l.loaded,fromCache:i.isCachedEntry(l)}),this.timingsTag.insertRows({timings:h},p.firstChild),!o)return!0;for(var y=[],L=0;L<n.phase.pageTimings.length;L++){var w=n.phase.pageTimings[L];y.push({bar:w.description?w.description:w.name,start:c+w.time-m,classes:w.classes,time:w.time})}return y.length&&(y.sort(function(e,t){return e.time<t.time?-1:1}),this.separatorTag.insertRows({label:s["request.timings.label"]},p.firstChild),this.eventsTag.insertRows({events:y},p.firstChild)),!0}}),b=m({tag:p(p({"class":"sizeInfoTip"},"$file|getSize"),p({"class":"sizeInfoTip",style:"display: $file|getCachedDisplayStyle"},"$file|getCached")),zippedTag:p(p({"class":"sizeInfoTip"},"$file|getBodySize"),p({"class":"sizeInfoTip"},"$file|getContentSize"),p({"class":"sizeInfoTip",style:"display: $file|getCachedDisplayStyle"},"$file|getCached")),getSize:function(e){var i=e.response.bodySize;return 0>i?s.unknownSize:t.formatString(s.tooltipSize,t.formatSize(i),t.formatNumber(i))},getBodySize:function(e){var i=e.response.bodySize;return 0>i?s.unknownSize:t.formatString(s.tooltipZippedSize,t.formatSize(i),t.formatNumber(i))},getContentSize:function(e){var i=e.response.content.size;return 0>i?s.unknownSize:t.formatString(s.tooltipUnzippedSize,t.formatSize(i),t.formatNumber(i))},getCached:function(e){return i.isCachedEntry(e)?s.resourceFromCache:""},getCachedDisplayStyle:function(e){return i.isCachedEntry(e)?"block":"none"},render:function(e,t,s){var i=t.repObject;return i.response.bodySize===i.response.content.size?this.tag.replace({file:i},s):this.zippedTag.replace({file:i},s)}});return o.columns=["index","url","status","type","domain","serverIPAddress","connection","size","timeline"],o.defaultColumns=["url","status","size","timeline"],o.getVisibleColumns=function(){var e=n.getCookie("previewCols");if(e)return e=e.replace(/\+/g," "),e=unescape(e),e.split(" ");if(!e){var s=document.getElementById("content");if(s&&(e=s.getAttribute("previewCols")))return e.split(" ")}return t.cloneArray(o.defaultColumns)},o.setVisibleColumns=function(e,t){e||(e=o.getVisibleColumns()),e.join&&(e=e.join(" "));var s=document.getElementById("content");s&&s.setAttribute("previewCols",e),t||n.setCookie("previewCols",e)},o.setVisibleColumns(),o.prototype=m({tableTag:h({"class":"netTable",cellpadding:0,cellspacing:0,onclick:"$onClick",_repObject:"$requestList"},f(T({"class":"netSizerRow"},g({"class":"netIndexCol netCol"}),g({"class":"netHrefCol netCol",width:"20%"}),g({"class":"netStatusCol netCol",width:"7%"}),g({"class":"netTypeCol netCol",width:"7%"}),g({"class":"netDomainCol netCol",width:"7%"}),g({"class":"netServerIPAddressCol netCol",width:"7%"}),g({"class":"netConnectionCol netCol",width:"7%"}),g({"class":"netSizeCol netCol",width:"7%"}),g({"class":"netTimeCol netCol",width:"100%"}),g({"class":"netOptionsCol netCol",width:"15px"})))),fileTag:d("file","$files",T({"class":"netRow loaded",$isExpandable:"$file|isExpandable",$responseError:"$file|isError",$responseRedirect:"$file|isRedirect",$fromCache:"$file|isFromCache"},g({"class":"netIndexCol netCol"},p({"class":"netIndexLabel netLabel"},"$file|getIndex")),g({"class":"netHrefCol netCol"},p({"class":"netHrefLabel netLabel",style:"margin-left: $file|getIndent\\px"},"$file|getHref"),p({"class":"netFullHrefLabel netHrefLabel netLabel",style:"margin-left: $file|getIndent\\px"},"$file|getFullHref")),g({"class":"netStatusCol netCol"},p({"class":"netStatusLabel netLabel",title:"$file|getStatus"},"$file|getStatus")),g({"class":"netTypeCol netCol"},p({"class":"netTypeLabel netLabel",title:"$file|getType"},"$file|getType")),g({"class":"netDomainCol netCol",title:"$file|getDomain"},p({"class":"netDomainLabel netLabel"},"$file|getDomain")),g({"class":"netServerIPAddressCol netCol"},p({"class":"netServerIPAddressLabel netLabel",title:"$file|getServerIPAddress"},"$file|getServerIPAddress")),g({"class":"netConnectionCol netCol"},p({"class":"netConnectionLabel netLabel",title:"$file|getConnection"},"$file|getConnection")),g({"class":"netSizeCol netCol"},p({"class":"netSizeLabel netLabel"},"$file|getSize")),g({"class":"netTimeCol netCol"},p({"class":"netTimelineBar"},"&nbsp;",p({"class":"netBlockingBar netBar"}),p({"class":"netResolvingBar netBar"}),p({"class":"netConnectingBar netBar"}),p({"class":"netSendingBar netBar"}),p({"class":"netWaitingBar netBar"}),p({"class":"netReceivingBar netBar"},u({"class":"netTimeLabel"},"$file|getElapsedTime")))),g({"class":"netOptionsCol netCol"},p({"class":"netOptionsLabel netLabel",onclick:"$onOpenOptions"})))),headTag:T({"class":"netHeadRow"},g({"class":"netHeadCol",colspan:9},p({"class":"netHeadLabel"},"$doc.rootFile.href"))),netInfoTag:T({"class":"netInfoRow"},g({"class":"netInfoCol",colspan:9})),summaryTag:T({"class":"netRow netSummaryRow"},g({"class":"netIndexCol netCol"}),g({"class":"netHrefCol netCol"},p({"class":"netCountLabel netSummaryLabel"},"-")),g({"class":"netStatusCol netCol"}),g({"class":"netTypeCol netCol"}),g({"class":"netDomainCol netCol"}),g({"class":"netServerIPAddressCol netCol"}),g({"class":"netConnectionCol netCol"}),g({"class":"netTotalSizeCol netSizeCol netCol"},p({"class":"netTotalSizeLabel netSummaryLabel"},"0KB")),g({"class":"netTotalTimeCol netTimeCol netCol"},p({"class":"",style:"width: 100%"},p({"class":"netCacheSizeLabel netSummaryLabel"},"(",u("0KB"),u(" "+s.summaryFromCache),")"),p({"class":"netUncompressedSizeLabel netSummaryLabel"},"(",u("0KB"),u(" "+s.uncompressed),")"),p({"class":"netTimeBar"},u({"class":"netTotalTimeLabel netSummaryLabel"},"0ms")))),g({"class":"netOptionsCol netCol"})),getIndex:function(e){return e.index+1},getIndent:function(e){return 0},isError:function(e){var t=Math.floor(e.response.status/100);return 4===t||5===t||0===t},isRedirect:function(e){return!1},isFromCache:function(e){return e.cache&&e.cache.afterRequest||i.isCachedEntry(e)},getHref:function(e){var s=t.getFileName(this.getFullHref(e));return unescape(e.request.method+" "+s)},getFullHref:function(e){return unescape(e.request.url)},getStatus:function(e){if(0===e.response.status&&e.response._error)return e.response._error;var t=e.response.status>0?e.response.status+" ":"";return t+e.response.statusText},getType:function(e){return e.response.content.mimeType},getDomain:function(e){return t.getPrettyDomain(e.request.url)},getServerIPAddress:function(e){return e.serverIPAddress||""},getConnection:function(e){return e.connection||""},getSize:function(e){var t=e.response.bodySize,s=t&&-1!==t?t:e.response.content.size;return this.formatSize(s)},isExpandable:function(e){var t=e.response.headers.length>0,s=0===e.request.url.indexOf("data:");return t||s},formatSize:function(e){return t.formatSize(e)},getElapsedTime:function(e){var s=Math.round(10*e.time)/10;return t.formatTime(s.toFixed(2))},onClick:function(e){var s=t.fixEvent(e);if(t.isLeftClick(e)){var i=t.getAncestorByClass(s.target,"netRow");i&&(this.toggleHeadersRow(i),t.cancelEvent(e))}else t.isControlClick(e)&&window.open(e.target.innerText||e.target.textContent)},toggleHeadersRow:function(e){if(t.hasClass(e,"isExpandable")){var s,i=e.repObject;if(t.toggleClass(e,"opened"),t.hasClass(e,"opened")){s=this.netInfoTag.insertRows({},e)[0],s.repObject=i;var n=new a;n.render(s.firstChild,i)}else s=e.nextSibling,e.parentNode.removeChild(s)}},onOpenOptions:function(e){var s=t.fixEvent(e);if(t.cancelEvent(e),t.isLeftClick(e)){var i=s.target,n=t.getAncestorByClass(i,"netRow"),a=this.getMenuItems(n);if(a.length){var r=new l({id:"requestContextMenu",items:a});r.showPopup(i)}}},getMenuItems:function(e){var i=e.repObject,n=e.phase,a=n.files[0]===i&&this.phases[0]===n,r=[{label:s.menuBreakTimeline,type:"checkbox",disabled:a,checked:n.files[0]===i&&!a,command:t.bind(this.breakLayout,this,e)},"-",{label:s.menuOpenRequest,command:t.bind(this.openRequest,this,i)},{label:s.menuOpenResponse,disabled:!i.response.content.text,command:t.bind(this.openResponse,this,i)}];return t.dispatch(this.listeners,"getMenuItems",[r,this.input,i]),r},openRequest:function(e,t){window.open(t.request.url)},openResponse:function(e,t){var s=t.response.content.text,i=t.response.content.mimeType,n=t.response.content.encoding,a="data:"+(i?i:"")+";"+(n?n:"")+","+s;window.open(a)},breakLayout:function(e,s){var n=s.repObject,a=s.phase,r=a.files[0]===n;s.breakLayout=!r,s.setAttribute("breakLayout",s.breakLayout?"true":"false");var l=t.getAncestorByClass(s,"netTable"),o=i.getParentPage(this.input,n);this.updateLayout(l,o)},updateLayout:function(e,s){var a=i.getPageEntries(this.input,s);this.table=e;var r=this.table.firstChild,l=this.firstRow=r.firstChild.nextSibling;this.phases=[];var o=n.getCookie("phaseInterval");o||(o=4e3);var c=null,m=s?t.parseISO8601(s.startedDateTime):null,p=s&&s.pageTimings?s.pageTimings.onLoad:-1;p>0&&(p+=m);for(var d=0;d<a.length;d++){var u=a[d];t.hasClass(l,"netInfoRow")&&(l=l.nextSibling),l.repObject=u,m||(m=t.parseISO8601(u.startedDateTime));var h=t.parseISO8601(u.startedDateTime),f=c?t.parseISO8601(c.getLastStartTime()):0,g=c?c.endTime:0,T=!1;o>=0&&(T=h>p&&h-f>=o&&h+u.time>=g+o),"boolean"==typeof l.breakLayout?!c||l.breakLayout?c=this.startPhase(u):c.addFile(u):!c||T?c=this.startPhase(u):c.addFile(u),this.phases[0]!==c&&l.setAttribute("breakLayout",c.files[0]===u?"true":"false"),("number"!=typeof c.startTime||c.startTime>h)&&(c.startTime=h),("number"!=typeof c.endTime||c.endTime<h+u.time)&&(c.endTime=h+u.time),l=l.nextSibling}this.updateTimeStamps(s),this.updateTimeline(s),this.updateSummaries(s)},startPhase:function(e){var t=new c(e);return this.phases.push(t),t},calculateFileTimes:function(e,s,i){if(i!==s.phase&&(i=s.phase,this.phaseStartTime=i.startTime,this.phaseEndTime=i.endTime,this.phaseElapsed=this.phaseEndTime-i.startTime),!s.timings)return i;var n=s.timings.blocked<0?0:s.timings.blocked,a=n+(s.timings.dns<0?0:s.timings.dns),r=a+(s.timings.connect<0?0:s.timings.connect),l=r+(s.timings.send<0?0:s.timings.send),o=l+(s.timings.wait<0?0:s.timings.wait),c=o+(s.timings.receive<0?0:s.timings.receive),m=t.parseISO8601(s.startedDateTime);return this.barOffset=((m-this.phaseStartTime)/this.phaseElapsed*100).toFixed(3),this.barBlockingWidth=(n/this.phaseElapsed*100).toFixed(3),this.barResolvingWidth=(a/this.phaseElapsed*100).toFixed(3),this.barConnectingWidth=(r/this.phaseElapsed*100).toFixed(3),this.barSendingWidth=(l/this.phaseElapsed*100).toFixed(3),this.barWaitingWidth=(o/this.phaseElapsed*100).toFixed(3),this.barReceivingWidth=(c/this.phaseElapsed*100).toFixed(3),this.calculatePageTimings(e,s,i),i},calculatePageTimings:function(e,s,i){if(e)for(var n=t.parseISO8601(e.startedDateTime),a=0;a<i.pageTimings.length;a++){var r=i.pageTimings[a].time;if(r>0){var l=n+r-i.startTime,o=(l/this.phaseElapsed*100).toFixed(3);i.pageTimings[a].offset=o}}},updateTimeline:function(e){for(var s,i=this.firstRow;i;i=i.nextSibling){var n=i.repObject;if(n&&!t.hasClass(i,"netInfoRow")){s=this.calculateFileTimes(e,n,s),i.phase=n.phase,delete n.phase;var a=t.getElementByClass(i,"netTimelineBar"),r=a.children[0],l=r.nextSibling,o=l.nextSibling,c=o.nextSibling,m=c.nextSibling,p=m.nextSibling;r.style.left=o.style.left=l.style.left=c.style.left=m.style.left=p.style.left=this.barOffset+"%",r.style.width=this.barBlockingWidth+"%",l.style.width=this.barResolvingWidth+"%",o.style.width=this.barConnectingWidth+"%",c.style.width=this.barSendingWidth+"%",m.style.width=this.barWaitingWidth+"%",p.style.width=this.barReceivingWidth+"%";for(var d=t.getElementsByClass(a,"netPageTimingBar"),u=0;u<d.length;u++)d[u].parentNode.removeChild(d[u]);for(var h=0;h<s.pageTimings.length;h++){var f=s.pageTimings[h];if(f.offset){var g=a.ownerDocument.createElement("DIV");a.appendChild(g),f.classes&&t.setClass(g,f.classes),t.setClass(g,"netPageTimingBar netBar"),g.style.left=f.offset+"%",g.style.display="block",f.offset=null}}}}},updateTimeStamps:function(e){if(e){var s,i=[];for(s=0;e.pageTimings&&s<this.pageTimings.length;s++){var n=this.pageTimings[s],a=e.pageTimings[n.name];a>0&&i.push({label:n.name,time:a,classes:n.classes,comment:n.description})}var r=e.pageTimings?e.pageTimings._timeStamps:[];r&&i.push.apply(i,r);var l=this.phases;for(s=0;s<l.length;s++)for(var o=l[s],c=l[s+1],m=0;m<i.length;m++){var p=i[m],d=p.time;if(d){var u=t.parseISO8601(e.startedDateTime);d+=u,(!c||d<c.startTime)&&(0===s||d>=o.startTime)&&(o.startTime>d&&(o.startTime=d),o.endTime<d&&(o.endTime=d),o.pageTimings.push({classes:p.classes?p.classes:"netTimeStampBar",name:p.label,description:p.comment,time:p.time}))}}}},updateSummaries:function(e){for(var s=this.phases,i=0,n=0,a=0,r=0,l=0,o=0;o<s.length;++o){var c=s[o];c.invalidPhase=!1;var m=this.summarizePhase(c);i+=m.fileCount,n+=m.totalTransferredSize,a+=m.totalUncompressedSize,r+=m.cachedSize,l+=m.totalTime}var p=this.summaryRow;if(p){var d=t.getElementByClass(p,"netCountLabel");d.firstChild.nodeValue=this.formatRequestCount(i);var u=t.getElementByClass(p,"netTotalSizeLabel");u.setAttribute("totalSize",n),u.firstChild.nodeValue=t.formatSize(n);var h=t.getElementByClass(p,"netUncompressedSizeLabel");h.setAttribute("collapsed",0===a),h.childNodes[1].firstChild.nodeValue=t.formatSize(a);var f=t.getElementByClass(p,"netCacheSizeLabel");f.setAttribute("collapsed",0===r),f.childNodes[1].firstChild.nodeValue=t.formatSize(r);var g=t.getElementByClass(p,"netTotalTimeLabel"),T=t.formatTime(l.toFixed(2));e&&e.pageTimings.onLoad>0&&(T+=" (onload: "+t.formatTime(e.pageTimings.onLoad.toFixed(2))+")"),g.innerHTML=T}},formatRequestCount:function(e){return e+" "+(1===e?s.request:s.requests)},summarizePhase:function(e){for(var s=0,n=0,a=0,r=0,l=0,o=0,c=0;c<e.files.length;c++){var m=e.files[c],p=t.parseISO8601(m.startedDateTime);++r;var d=i.getEntryTransferredSize(m),u=i.getEntryUncompressedSize(m);n+=d,a+=u,i.isCachedEntry(m)&&(s+=u),(!l||l>p)&&(l=p);var h=p+m.time;h>o&&(o=h)}var f=o-l;return{cachedSize:s,totalUncompressedSize:a,totalTransferredSize:n,totalTime:f,fileCount:r}},showInfoTip:function(e,s,i,n){var a=t.getAncestorByClass(s,"netTable");if(a&&a.repObject===this){var r=t.getAncestorByClass(s,"netRow");if(r){var l;if(t.getAncestorByClass(s,"netBar"))return e.setAttribute("multiline",!0),l=r.repObject.startedDateTime+"-nettime",this.infoTipURL=l,this.populateTimeInfoTip(e,r);if(t.hasClass(s,"netSizeLabel"))return l=r.repObject.startedDateTime+"-netsize",this.infoTipURL=l,this.populateSizeInfoTip(e,r)}}},populateTimeInfoTip:function(e,t){return C.render(this,t,e),!0},populateSizeInfoTip:function(e,t){return b.render(this,t,e),!0},render:function(e,t){var s=i.getPageEntries(this.input,t);return s.length?this.append(e,t,s):null},append:function(e,s,i){this.table||(this.table=this.tableTag.replace({requestList:this},e,this)),this.summaryRow||(this.summaryRow=this.summaryTag.insertRows({},this.table.firstChild)[0]);var n=this.table.firstChild,a=n.lastChild.previousSibling,r=i.map(function(e,s){return t.extend(e,{index:s})}),l=this.fileTag.insertRows({files:r},a,this);return this.updateLayout(this.table,s),l[0]},addPageTiming:function(e){this.pageTimings.push(e)}}),c.prototype={addFile:function(e){this.files.push(e),e.phase=this},getLastStartTime:function(){return this.files[this.files.length-1].startedDateTime}},o});