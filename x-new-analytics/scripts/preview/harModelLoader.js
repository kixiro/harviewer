/* See license.txt for terms of usage */

define(["core/url"],function(a){var r={getLoadOptions:function(r){var t=a.getURLParameter("baseUrl",r);t&&"/"!==t[t.length-1]&&(t+="/");var e=a.getURLParameter("callback",r),n=a.getURLParameter("path",r),s=a.getURLParameters("path",r),l=a.getURLParameters("inputUrl",r).concat(a.getHashParameters("inputUrl",r)),i=s.map(function(a){return t?t+a:a});i=i.concat(l);var o=a.getURLParameters("har",r),c=a.getURLParameters("harp",r).concat(a.getHashParameters("harp",r));return t&&(o=o.map(function(a){return t+a}),c=c.map(function(a){return t+a})),{callbackName:e,baseUrl:t,urls:i,inputUrls:l,hars:o,harps:c,filePath:n}},run:function(a,r){var t=this.getLoadOptions(window.location.href);return t.hars.length>0||t.harps.length>0?this.loadArchives(t.hars,t.harps,t.callbackName,a,r):(t.baseUrl||t.inputUrls.length>0)&&t.urls.length>0?this.loadArchives([],t.urls,t.callbackName,a,r):t.filePath?this.loadArchives([t.filePath],[],t.callbackName,a,r):void 0},loadArchives:function(a,r,t,e,n){if(a=a||[],r=r||[],!a.length&&!r.length)return!1;var s=!1,l=a.shift();if(l||(s=!0,l=r.shift()),!l)return!1;t||(t="onInputData");var i={url:l,context:this,dataType:"json",success:function(){if(e&&e.apply(this,arguments),a.length+r.length>0){var s=this;setTimeout(function(){s.loadArchives(a,r,t,e,n)},300)}},error:function(){n&&n.apply(this,arguments)}};return s&&(i.dataType="jsonp",i.jsonp="callback",i.jsonpCallback=t),$.ajax(i),!0},load:function(a,r,t,e,n,s){function l(r){a.appendPreview&&a.appendPreview(r),n&&n.call(a,r)}function i(r,t,e){a.onLoadError&&a.onLoadError(r,t,e),s&&s.call(a,r,t,e)}var o=[],c=[];return t?c.push(r):o.push(r),this.loadArchives(o,c,e,l,i)}};return r});