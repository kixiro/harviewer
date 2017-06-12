/* See license.txt for terms of usage */

define("tabs/domTab",["domplate/domplate","domplate/tabView","core/lib","i18n!nls/domTab","domplate/toolbar","tabs/search","core/dragdrop","domplate/domTree","core/cookies","domplate/tableView","core/trace","json-query/JSONQuery"],function(e,t,r,s,a,o,n,l,i,c,h){function u(){this.toolbar=new a,this.toolbar.addButtons(this.getToolbarButtons()),this.tableView=!1}var d=e.domplate,p=e.DIV,b=e.INPUT,g=e.SPAN,m=e.TABLE,y=e.TBODY,v=e.TD,B=e.TR,f="searchJsonQuery";return u.prototype=d(t.Tab.prototype,{id:"DOM",label:s.domTabLabel,separator:p({"class":"separator"}),tabBodyTag:p({"class":"tab$tab.id\\Body tabBody",_repObject:"$tab"},p({"class":"domToolbar"}),p({"class":"domContent"})),domBox:m({"class":"domBox",cellpadding:0,cellspacing:0},y(B(v({"class":"content"},p({"class":"title"},"$title")),v({"class":"splitter"}),v({"class":"results"},p({"class":"resultsDefaultContent"},s.searchResultsDefaultText))))),queryResultsViewType:p({"class":"queryResultsViewType"},b({"class":"type",type:"checkbox",onclick:"$onTableView"}),g({"class":"label"},s.queryResultsTableView)),onUpdateBody:function(e,t){if(this.toolbar.render(r.$(t,"domToolbar")),!r.supportsSelectElementText){var a=r.getElementByClass(t,"searchBox"),o=r.getElementByClass(a,"searchInput");o.setAttribute("disabled","true"),o.setAttribute("title",s.searchDisabledForIE);var n=r.getElementByClass(a,"arrow");n.setAttribute("disabled","true")}this.updateSearchResultsUI()},getToolbarButtons:function(){var e=[];return e.push({id:"search",tag:o.Box.tag,initialize:o.Box.initialize}),e},createSearchObject:function(e){var t=r.getElementsByClass(this._body,"domTable");t=r.cloneArray(t);var s=t.map(function(e){return e.repObject.input});return new o.ObjectSearch(e,s,!1,!1)},getSearchOptions:function(){var e=[];return e.push({label:s.searchOptionJsonQuery,checked:i.getBooleanCookie(f),command:r.bindFixed(this.onOption,this,f)}),e},onOption:function(e){o.Box.onOption(e),this.updateSearchResultsUI()},updateSearchResultsUI:function(){for(var e=i.getBooleanCookie(f),t=r.getElementsByClass(this._body,"domBox"),a=0;a<t.length;a++){var o=t[a],n=r.getElementByClass(o,"results"),l=r.getElementByClass(o,"splitter");e?(r.setClass(n,"visible"),r.setClass(l,"visible")):(r.removeClass(n,"visible"),r.removeClass(l,"visible"))}var c=r.getElementByClass(this._body,"searchInput");if(c){var h=e?s.jsonQueryPlaceholder:s.searchPlaceholder;c.setAttribute("placeholder",h)}},onSearch:function(e,t){var s=i.getBooleanCookie(f);if(s)return this.evalJsonQuery(e,t);if(e.length<3)return!0;if(this.currSearch&&this.currSearch.text!==e&&(this.currSearch=null),this.currSearch||(this.currSearch=this.createSearchObject(e)),this.currSearch.findNext(e)){for(var a=this.currSearch.stack[1].object,o=this.getDomTree(a),n=0;n<this.currSearch.stack.length;n++)o.expandRow(this.currSearch.stack[n].object);var l=this.currSearch.getCurrentMatch(),c=o.getRow(l.value);if(c){var h=c.querySelector(".memberValueCell .objectBox");this.currSearch.selectText(h.firstChild),r.scrollIntoCenterView(h)}return!0}return this.currSearch.matches.length>0&&(this.currSearch=this.createSearchObject(e)),!1},evalJsonQuery:function(e,t){if(13!==t)return!0;for(var s=r.getElementsByClass(this._body,"domBox"),a=0;a<s.length;a++){var o=s[a],n=r.getElementByClass(o,"domTable"),i=n.repObject.input,u=o.querySelector(".domBox .results");r.clearNode(u);try{var d=this.queryResultsViewType.append({},u);if(this.tableView){var p=r.getElementByClass(d,"type");p.setAttribute("checked","true")}var b=JSONQuery(e,i);if(u.repObject=b,this.tableView)c.render(u,b);else{var g=new l(b);g.append(u)}}catch(m){h.exception(m)}}return!0},onTableView:function(e){var t=r.fixEvent(e),s=t.target,a=r.getAncestorByClass(s,"tabBody"),o=$(s).prop("checked");a.repObject.tableView=o;var n=r.getAncestorByClass(s,"results"),i=n.repObject,h=r.getElementByClass(n,"domTable");h&&h.parentNode.removeChild(h);var u=r.getElementByClass(n,"dataTableSizer");if(u&&u.parentNode.removeChild(u),o)c.render(n,i);else{var d=new l(i);d.append(n)}},append:function(e){for(var t=r.$(this._body,"domContent"),s=[],a=0;a<e.log.pages.length;a++){var o=e.log.pages[a];s.push(o.title)}var i=this.domBox.append({title:s.join(", ")},t),c=r.getElementByClass(i,"content"),h=r.getElementByClass(i,"splitter");this.splitter=new n.Tracker(h,{onDragStart:r.bind(this.onDragStart,this),onDragOver:r.bind(this.onDragOver,this),onDrop:r.bind(this.onDrop,this)}),this.updateSearchResultsUI();var u=new l(e);u.append(c),this.separator.append({},t)},getDomTree:function(e){for(var t=r.getElementsByClass(this._body,"domTable"),s=0;s<t.length;s++){var a=t[s].repObject;if(a.input===e)return a}return null},highlightFile:function(e,t){var s=this.getDomTree(e);if(s){s.expandRow(e.log),s.expandRow(e.log.entries);var a=s.expandRow(t);a&&r.setClassTimed(a,"jumpHighlight");var o=r.$(this._body,"domContent");o.scrollTop=a.offsetTop}},onDragStart:function(e){var t=r.getBody(this._body.ownerDocument);t.setAttribute("vResizing","true");var s=r.getAncestorByClass(e.element,"domBox"),a=r.getElementByClass(s,"content");this.startWidth=a.clientWidth},onDragOver:function(e,t){var s=r.getAncestorByClass(t.element,"domBox"),a=r.getElementByClass(s,"content"),o=this.startWidth+e.x;a.style.width=o+"px"},onDrop:function(e){var t=r.getBody(this._body.ownerDocument);t.removeAttribute("vResizing")}}),u});