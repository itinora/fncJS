fnc={core:{},uiControls:{}};fnc.uiControls.globals={};fnc.uiControls.inputControls={};fnc.uiControls.panels={};fnc.core.fncObject=function(){var c=function(){};c.prototype={};c.prototype.initialize=function(a){for(var b in a)this[b]=a[b]};return c}();
fnc.core.fncObjectCollection=function(){var c=fnc.core.fncObject,a=function(){this.values=[]};a.prototype={};a.prototype.push=function(b){if(b instanceof c)this.values.push(b);else throw"Not an fncObject";};a.prototype.get=function(b){return this.values[b]};return a}();
fnc.uiControls.uiElement=function(){var c=function(a,b,d,f,e){a=a||"div";this.initialize=function(b,d,a){c.prototype.initialize.call(this,a);b&&(this.name=b);this.properties=d||{}};this.getProperty=function(b){return this.properties[b]};this.applyExplicitStyles=function(){var b=this.dom;this.properties.height&&(b.style.height=this.properties.height+"px");this.properties.width&&(b.style.width=this.properties.width+"px")};this.initialize(b,f,e);this.tag=a;this.value=d||"";this.dom=null};c.prototype=
new fnc.core.fncObject;c.prototype.render=function(){this.dom=document.createElement(this.tag);this.name&&this.dom.setAttribute("id",this.name);void 0===this.children&&("input"===this.tag?this.dom.setAttribute("value",this.dom.getAttribute("value")):this.dom.innerText=this.value);for(var a in this.properties)this.dom.setAttribute(a,this.properties[a]);a=this.dom;a.style.height="20px";a.style.width="100px";a.style.position="absolute";a.style.textAlign="center";a.style.boxSizing="border-box";for(var b in this.properties)if(a=
this.dom.style,"grid.row"===b){var d=parseInt(this.properties[b]),f=this.grid;a.top=f.rows[d].top+"px";"SELECT"!==this.dom.tagName&&"radio"!==this.dom.getAttribute("type")&&(a.height=f.rows[d].height+"px")}else if("grid.rowspan"===b){var d=parseInt(this.properties[b]),f=this.grid,e=0,c=this.properties["grid.row"];c&&(e=c);for(var g=c=0,q;q=f.rows[e+g],g<d;g++)c+=q.width;"SELECT"!==this.dom.tagName&&"radio"!==this.dom.getAttribute("type")&&(a.height=c+"px")}else if("grid.col"===b)d=parseInt(this.properties[b]),
f=this.grid,a.left=f.cols[d].left+"px",a.width=f.cols[d].width+"px";else if("grid.colspan"===b){e=parseInt(this.properties[b]);f=this.grid;c=0;(d=this.properties["grid.col"])&&(c=d);for(g=d=0;q=f.cols[c+g],g<e;g++)d+=q.width;a.width=d+"px"}else"f-canvas.left"===b?(f=parseInt(this.properties[b]),a.left=f+"px"):"f-canvas.top"===b?(f=parseInt(this.properties[b]),a.top=f+"px"):"dockpanel.dock"===b&&(f=this.properties[b],e=this.dockpanel,-1<f.indexOf("top")&&(a.top=e.topStart+"px",e.topStart+=parseInt(a.height.slice(0,
-2)),e.dom.style.height=e.topStart+"px",d=parseInt(a.width.slice(0,-2)),a.left="top-left"===f?"0":"top-right"===f?parseInt(e.properties.width)-d+"px":(parseInt(e.properties.width)-d)/2+"px"),-1<f.indexOf("bottom")&&(a.top=e.bottomEnd-parseInt(a.height.slice(0,-2))+"px",e.bottomEnd-=parseInt(a.height.slice(0,-2)),e.dom.style.height=e.topStart+"px",d=parseInt(a.width.slice(0,-2)),a.left="top-left"===f?"0":"top-right"===f?parseInt(e.properties.width)-d+"px":(parseInt(e.properties.width)-d)/2+"px"));
return this.dom};return c}();fnc.uiControls.html5Control=function(){var c=fnc.uiControls.uiElement,a=function(b,d,a,e,c){b=b||"div";this.initialize(d,e,c);this.tag=b;this.value=a||"";this.dom=null};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);this.applyExplicitStyles();if(this.children)for(var b=0,d;d=this.children.get(b);b++)this.dom.appendChild(d.render());return this.dom};return a}();
fnc.uiControls.inputControls.radiobutton=function(){var c=fnc.uiControls.uiElement,a=function(b,d,a){this.initialize(b,d,a);this.tag="radiobutton"};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);this.applyExplicitStyles();var b=document.createElement("input");b.setAttribute("type","radio");b.setAttribute("id",this.dom.getAttribute("id")+"_radio");this.dom.appendChild(b);var d=document.createElement("label");d.setAttribute("for",b.getAttribute("id"));d.innerText=this.properties.value;
d.style.width=this.dom.style.width;d.style.boxSizing=this.dom.style.boxSizing;this.dom.appendChild(d);return this.dom};return a}();
fnc.uiControls.inputControls.textbox=function(){var c=fnc.uiControls.uiElement,a=function(b,d,a){this.initialize(b,d,a);this.tag="textbox"};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);this.applyExplicitStyles();var b=document.createElement("input");b.setAttribute("type","text");var a=this.properties.placeholder;a&&b.setAttribute("placeholder",a);(a=this.properties.value)&&b.setAttribute("value",a);b.style.width=this.dom.style.width;b.style.boxSizing=this.dom.style.boxSizing;
this.dom.appendChild(b);return this.dom};return a}();fnc.uiControls.panels.panel=function(){var c=fnc.uiControls.uiElement,a=fnc.core.fncObjectCollection,b=function(b,f,e){this.initialize(b,f,e);this.children=new a};b.prototype=new c;b.prototype.render=function(){c.prototype.render.call(this);this.dom.style.position="relative"};b.prototype.renderChildren=function(){for(var b=0,a;a=this.children.get(b);b++)this.dom.appendChild(a.render())};return b}();
fnc.uiControls.panels.fCanvas=function(){var c=fnc.uiControls.panels.panel,a=function(b,a,f){this.initialize(b,a,f);this.tag="f-canvas"};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);c.prototype.applyExplicitStyles.call(this);this.renderChildren();return this.dom};return a}();
fnc.uiControls.panels.grid=function(){var c=fnc.uiControls.panels.panel,a=function(b,a,f){this.initialize(b,a,f);this.tag="grid";this.rows=[];this.cols=[]};a.prototype=new c;a.prototype.render=function(){var b=function(b,a,e,c){b=b.split(" ");for(var g=0,q=0,n;n=b[q];q++){var k=parseInt(n);-1<n.indexOf("%")?0<a&&(k=k*a/100,g+=k,n={},n[c]=k,e.push(n)):"*"===n?(n={},n[c]=a-g,e.push(n),g=a):(g+=k,n={},n[c]=k,e.push(n))}0<g&&(this.dom.style[c]=g+"px")};c.prototype.render.call(this);(function(){if(this.properties.rowheights){b.call(this,
this.properties.rowheights,parseInt(this.properties.height),this.rows,"height");for(var a=this.rows,f=0,c=0,p;p=a[c];c++)p.top=f,f+=p.height}}).call(this);(function(){if(this.properties.colwidths){b.call(this,this.properties.colwidths,parseInt(this.properties.width),this.cols,"width");for(var a=this.cols,c=0,e=0,p;p=a[e];e++)p.left=c,c+=p.width}}).call(this);this.renderChildren();return this.dom};return a}();
fnc.uiControls.panels.stackpanel=function(){var c=fnc.uiControls.panels.panel,a=function(b,a,c){this.initialize(b,a,c);this.tag="stackpanel"};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);this.renderChildren();if("horizontal"===(this.properties.orientation||"horizontal")){for(var a=0,d=0,f=0,e;e=this.children.get(f);f++){e=e.dom.style;e.left=a+"px";var p=parseInt(e.width.slice(0,-2)),g=parseInt(e.height.slice(0,-2)),a=a+p;g>d&&(d=g)}this.dom.style.width=a+"px";this.dom.style.height=
d+"px"}else{for(f=d=a=0;e=this.children.get(f);f++)e=e.dom.style,e.top=a+"px",g=parseInt(e.height.slice(0,-2)),p=parseInt(e.width.slice(0,-2)),a+=g,p>d&&(d=p);this.dom.style.height=a+"px";this.dom.style.width=d+"px"}this.applyExplicitStyles();return this.dom};return a}();
fnc.uiControls.panels.wrappanel=function(){var c=fnc.uiControls.panels.panel,a=function(a,c,f){this.initialize(a,c,f);this.tag="wrappanel"};a.prototype=new c;a.prototype.render=function(){c.prototype.render.call(this);this.renderChildren();for(var a=0,d=0,f=0,e=this.properties.width||null,p=0,g;g=this.children.get(p);p++){g=g.dom.style;var q=parseInt(g.width.slice(0,-2)),n=parseInt(g.height.slice(0,-2));e&&a+q>parseInt(e)?(a=0,d+=f,f=n):n>f&&(f=n);g.left=a+"px";g.top=d+"px";a+=q}this.dom.style.width=
a+"px";this.dom.style.height=d+f+"px";c.prototype.applyExplicitStyles.call(this);return this.dom};return a}();
fnc.core.factory=function(){var c=fnc.core.fncObjectCollection,a=fnc.uiControls.uiElement,b=fnc.uiControls.html5Control,d=fnc.uiControls.panels.grid,f=fnc.uiControls.panels.stackpanel,e=fnc.uiControls.panels.wrappanel,p=fnc.uiControls.panels.fCanvas,g=fnc.uiControls.panels.dockpanel,q=fnc.uiControls.inputControls.textbox,n=fnc.uiControls.inputControls.radiobutton;return{createUiControl:function(k,h,r){h=h||{};r=r||{};for(var l=k.attributes,m=0,s;s=l[m];m++)h[s.name]=s.value;l=new a;if("GRID"===k.tagName)for(l=
new d(h.id,h,r),m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{grid:l}));else if("STACKPANEL"===k.tagName)for(l=new f(h.id,h,r),m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{stackpanel:l}));else if("WRAPPANEL"===k.tagName)for(l=new e(h.id,h,r),m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{wrappanel:l}));else if("F-CANVAS"===k.tagName)for(l=new p(h.id,h,r),m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{f_canvas:l}));
else if("DOCKPANEL"===k.tagName)for(l=new g(h.id,h,r),m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{dockpanel:l}));else if("TEXTBOX"===k.tagName)l=new q(h.id,h,r);else if("RADIOBUTTON"===k.tagName)l=new n(h.id,h,r);else if(l=new b(k.tagName.toLowerCase(),h.id,k.innerText,h,r),0<k.children.length)for(l.children=new c,m=0;h=k.children[m];m++)l.children.push(this.createUiControl(h,{},{grid:l}));return l}}}();
fnc.uiControls.globals.rootVisual=function(){var c=fnc.core.factory,a=function(a){a&&(this.child=a);this.dom=document.getElementsByTagName("body")[0];this.refreshVisualTree=function(){for(var a=0,b;b=this.dom.children[a];a++)if("SCRIPT"!==b.tagName){this.child=c.createUiControl(b);this.render();break}};this.refreshVisualTree()};a.prototype=new fnc.uiControls.uiElement;a.prototype.render=function(){var a=this.dom.getElementsByTagName(this.child.tag)[0];a&&this.dom.removeChild(a);this.dom.appendChild(this.child.render())};
return a}();fnc.body=new fnc.uiControls.globals.rootVisual;fnc.main&&fnc.main();