/* See license.txt for terms of usage */

define("preview/validationError",["domplate/domplate","core/lib","core/trace","domplate/popupMenu"],function(e,r,t,n){var s=e.domplate,o=e.DIV,i=e.FOR,a=e.SPAN,p=e.TABLE,l=e.TBODY,c=e.TD,u=e.TR,f=s({errorTable:p({"class":"errorTable",cellpadding:3,cellspacing:0},l(i("error","$errors",u({"class":"errorRow",_repObject:"$error"},c({"class":"errorProperty"},a("$error.property")),c({"class":"errorOptions",$hasTarget:"$error|hasTarget"},o({"class":"errorOptionsTarget",onclick:"$onOpenOptions"},"&nbsp;")),c("&nbsp;"),c({"class":"errorMessage"},a("$error.message")))))),hasTarget:function(e){return e.input&&e.file},onOpenOptions:function(e){var t=r.fixEvent(e);if(r.cancelEvent(e),r.isLeftClick(e)){var s=t.target,o=r.getAncestorByClass(s,"errorRow"),i=o.repObject;if(i&&i.input&&i.file){var a=this.getMenuItems(i.input,i.file);if(a.length){var p=new n({id:"requestContextMenu",items:a});p.showPopup(s)}}}},getMenuItems:function(e,t){var n=[];return r.dispatch(this.listeners,"getMenuItems",[n,e,t]),n},listeners:[],addListener:function(e){this.listeners.push(e)},removeListener:function(e){r.remove(this.listeners,e)},appendError:function(e,r){e.errors&&this.errorTable.append(e,r)}});return f});