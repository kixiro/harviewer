/* See license.txt for terms of usage */

define(["core/lib","preview/jsonSchema","preview/ref","preview/harSchema","core/cookies","core/trace","i18n!nls/harModel"],function(e,t,r,n,a,i,o){function s(){this.input=null}function u(){var e={};for(var t in this)"toJSON"!==t&&(e[t]=this[t]);return this.text?(e.text=Array.prototype.map.call(this.text,function(e){var t=e.charCodeAt(0);if(t>=32&&127>t||10===t||13===t)return e.charAt(0);for(var r=t.toString(16).toUpperCase();r.length<4;)r="0"+r;return"\\u"+r}).join(""),e):e}return s.prototype={append:function(t){if(!t)return void i.error("HarModel.append; Trying to append null input!");if(t.log.entries.sort(function(t,r){var n=e.parseISO8601(t.startedDateTime),a=e.parseISO8601(r.startedDateTime);return a>n?-1:n>a?1:0}),this.input){if(!t.log.pages)return i.error("Import of additional data without a page is not yet supported."),null;for(var r=0;r<t.log.pages.length;r++)this.importPage(t.log.pages[r],t.log.entries)}else this.input=e.cloneJSON(t);return this.input},getPages:function(){return this.input&&this.input.log.pages?this.input.log.pages:[]},getFirstPage:function(){var e=this.getPages();return e.length>0?e[0]:null},getPageEntries:function(e){return s.getPageEntries(this.input,e)},getAllEntries:function(e){return this.input?this.input.log.entries:[]},getParentPage:function(e){return s.getParentPage(this.input,e)},importPage:function(e,t){var r=this.getUniquePageID(e.id),n=e.id;e.id=r,this.input.log.pages.push(e);for(var a=0;a<t.length;a++){var i=t[a];i.pageref===n&&(i.pageref=r,this.input.log.entries.push(i))}},getUniquePageID:function(e){for(var t=this.input.log.pages,r={},n=0;n<t.length;n++)r[t[n].id]=!0;if(!r[e])return e;for(var a=1;;){var i=e+a;if(!r[i])return i;a++}},toJSON:function(e){if(e||(e=this.input),!e)return"";for(var t=this.input.log.entries,r=0;r<t.length;r++){var n=t[r];n.response.content.text&&(n.response.content.toJSON=u)}var a=JSON.stringify(this.input,null,"	"),i=a.replace(/\\\\u/g,"\\u");return i}},s.parse=function(e,a){var o=e;try{"string"==typeof e&&(o=jQuery.parseJSON(e))}catch(s){throw i.exception("HarModel.parse; EXCEPTION",s),{errors:[{message:"Failed to parse JSON",property:"JSON evaluation"}]}}if(!a)return o;var u=r.resolveJson(n),p=t.validate(o,u.logType);if(p.valid)return this.validateRequestTimings(o),o;throw p},s.getPageEntries=function(e,t){var r=[],n=e.log.entries;if(!n)return r;for(var a=0;a<n.length;a++){var i=n[a];i.pageref||t||r.push(i),t&&i.pageref===t.id&&r.push(i)}return r},s.getParentPage=function(e,t){var r=e.log.pages;if(!r)return null;for(var n=0;n<r.length;n++)if(r[n].id===t.pageref)return r[n];return null},s.validateRequestTimings=function(t){for(var r=[],n=t.log.entries,a=0;a<n.length;a++){var i=n[a],s=i.timings;if(s.blocked<-1||s.connect<-1||s.dns<-1||s.receive<-1||s.send<-1||s.wait<-1){var u=e.formatString(o.validationNegativeTimeError,i.request.url,a,i.pageref);r.push({input:t,file:i,message:u,property:o.validationType})}}if(r.length)throw{errors:r,input:t}},s.isCachedEntry=function(e){var t=e.response,r=Math.max(0,t.bodySize);return 304===t.status||0===r&&t.content&&t.content.size>0},s.getEntrySize=function(e){var t=e.response.bodySize;return t&&-1!==t?t:e.response.content.size},s.getEntryUncompressedSize=function(e){return Math.max(0,e.response.content.size)||Math.max(0,e.response.bodySize)},s.getEntryTransferredSize=function(e){return 304===e.response.status?0:Math.max(0,e.response.bodySize)},s.Loader={getLoadOptions:function(t){var r=e.getURLParameter("baseUrl",t);r&&"/"!==r[r.length-1]&&(r+="/");var n=e.getURLParameter("callback",t),a=e.getURLParameters("path",t);a=a.concat(e.getURLParameters("har",t));var i=e.getURLParameters("inputUrl",t).concat(e.getHashParameters("inputUrl",t));return i=i.concat(e.getURLParameters("harp",t).concat(e.getHashParameters("harp",t))),r&&(a=a.map(function(e){return r+e}),i=i.concat(a),a=[]),{callbackName:n,baseUrl:r,hars:a,harps:i}},run:function(e,t){var r=this.getLoadOptions(window.location.href);this.loadArchives(r.hars,r.harps,r.callbackName,e,t)},loadExample:function(e,t){var r=document.location.href,n=r.indexOf("?");document.location=r.substr(0,n)+"?path="+e,a.setCookie("timeline",!0),a.setCookie("stats",!0)},loadArchives:function(e,t,r,n,a){if(e=e||[],t=t||[],!e.length&&!t.length)return!1;var i=!1,o=e.shift();if(o||(i=!0,o=t.shift()),!o)return!1;r||(r="onInputData");var s={url:o,context:this,dataType:"json",success:function(i){if(n&&n(i),e.length+t.length>0){var o=this;setTimeout(function(){o.loadArchives(e,t,r,n,a)},300)}},error:a};return i&&(s.dataType="jsonp",s.jsonp="callback",s.jsonpCallback=r),$.ajax(s),!0},load:function(e,t,r,n,a,i){function o(t){e.appendPreview&&e.appendPreview(t),a&&a.call(e,t)}function s(t,r,n){e.onLoadError&&e.onLoadError(t,r,n),i&&i.call(e,t,r,n)}var u=[],p=[];return r?p.push(t):u.push(t),this.loadArchives(u,p,n,o,s)}},s});