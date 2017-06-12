/* See license.txt for terms of usage */

define(["core/trace"],function(e){var t={};return t.getFileName=function(n){try{var r=t.splitURLBase(n);return r.name}catch(t){e.log(unescape(n))}return n},t.getFileExtension=function(e){if(!e)return null;var t=e.indexOf("?");t!==-1&&(e=e.substr(0,t));var n=e.lastIndexOf(".");return e.substr(n+1)},t.splitURLBase=function(e){return t.isDataURL(e)?t.splitDataURL(e):t.splitURLTrue(e)},t.isDataURL=function(e){return e&&"data:"===e.substr(0,5)},t.splitDataURL=function(e){var n=e.indexOf(":",3);if(4!==n)return!1;var r=e.indexOf(",",n+1);if(r<n)return!1;for(var a={encodedContent:e.substr(r+1)},s=e.substr(n+1,r),u=s.split(";"),i=0;i<u.length;i++){var o=u[i].split("=");2===o.length&&(a[o[0]]=o[1])}if(a.hasOwnProperty("fileName")){var p=decodeURIComponent(a.fileName),c=t.splitURLTrue(p);if(a.hasOwnProperty("baseLineNumber")){a.path=c.path,a.line=a.baseLineNumber;var f=decodeURIComponent(a.encodedContent.substr(0,200)).replace(/\s*$/,"");a.name="eval->"+f}else a.name=c.name,a.path=c.path}else a.hasOwnProperty("path")||(a.path="data:"),a.hasOwnProperty("name")||(a.name=decodeURIComponent(a.encodedContent.substr(0,200)).replace(/\s*$/,""));return a},t.splitURLTrue=function(e){var t=/:\/{1,3}(.*?)\/([^\/]*?)\/?($|\?.*)/,n=t.exec(e);return n?n[2]?{path:n[1],name:n[2]+n[3]}:{path:n[1],name:n[1]}:{name:e,path:e}},t.getQuery=function(e){if("string"!=typeof e)return window.location.search.substring(1);var t=e.indexOf("?");return t<0?"":e.substring(t+1)},t.getHash=function(e){if("string"!=typeof e)return window.location.hash.substring(1);var t=e.indexOf("#");return t<0?"":e.substring(t+1)},t.getURLParameter=function(e,n){for(var r=t.getQuery(n),a=r.split("&"),s=0;s<a.length;s++){var u=a[s].split("=");if(u[0]===e)return unescape(u[1])}return null},t.getURLParameters=function(e,n){for(var r=t.getQuery(n),a=[],s=r.split("&"),u=0;u<s.length;u++){var i=s[u].split("=");i[0]===e&&a.push(unescape(i[1]))}return a},t.getHashParameters=function(e,n){for(var r=t.getHash(n),a=[],s=r.split("&"),u=0;u<s.length;u++){var i=s[u].split("=");i[0]===e&&a.push(unescape(i[1]))}return a},t.parseURLParams=function(e){var n=e?e.indexOf("?"):-1;if(n===-1)return[];var r=e.substr(n+1),a=r.lastIndexOf("#");return a!==-1&&(r=r.substr(0,a)),r?t.parseURLEncodedText(r):[]},t.parseURLEncodedText=function(e,t){function n(e){try{return decodeURIComponent(e)}catch(t){return decodeURIComponent(unescape(e))}}var r=25e3,a=[];if(!e)return a;e=e.replace(/\+/g," ");for(var s=e.split("&"),u=0;u<s.length;++u)try{var i,o=s[u].indexOf("=");if(o!==-1){i=s[u].substring(0,o);var p=s[u].substring(o+1);p.length>r&&!t&&(p="LargeData"),a.push({name:n(i),value:n(p)})}else i=s[u],a.push({name:n(i),value:""})}catch(e){}return a.sort(function(e,t){return e.name<=t.name?-1:1}),a},t.getPrettyDomain=function(e){var t=/^(?!data:)[^:]+:\/{1,3}(www\.)?([^\/]{1,256})/.exec(e);return t?t[2]:""},t});