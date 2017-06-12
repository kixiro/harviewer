/* See license.txt for terms of usage */

define("domplate/toolTip",["domplate/domplate","core/lib","core/trace"],function(e,t,n){function i(){this.element=null}var o=e.domplate,s=e.DIV,l="mousemove mouseover mousedown click mouseout",h=null;return i.prototype=o({tag:s({"class":"toolTip"},s()),show:function(e,n){h&&h.hide(),this.target=e,this.addListeners();var i=t.getBody(document);this.element=this.tag.append({options:n},i,this);var o=t.getElementBox(this.target);return this.element.style.top=o.top+o.height+"px",this.element.style.left=o.left+o.width+"px",this.element.style.display="block",h=this,this.element},hide:function(){this.element&&(this.removeListeners(),this.element.parentNode.removeChild(this.element),h=this.element=null)},addListeners:function(){this.onMouseEvent=t.bind(this.onMouseEvent,this),$(document).bind(l,this.onMouseEvent,!0)},removeListeners:function(){$(document).unbind(l,this.onMouseEvent,this,!0)},onMouseEvent:function(e){var n=t.fixEvent(e),i=t.getAncestorByClass(n.target,"toolTip");if(!i){var o=e.clientX,s=e.clientY,l=t.getElementBox(this.element);if("click"!==e.type&&"mousedown"!==e.type&&(l=t.inflateRect(l,10,10)),t.pointInRect(l,o,s))return void t.cancelEvent(n);if(t.isAncestor(n.target,this.target))return void t.cancelEvent(n);this.hide(),t.cancelEvent(n)}}}),i});