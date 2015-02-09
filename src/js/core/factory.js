fnc.core.factory = (function () {
    var fncObjectCollection = fnc.core.fncObjectCollection;
    var uiElement = fnc.uiControls.uiElement;
    var html5Control = fnc.uiControls.html5Control;
    var loader = fnc.uiControls.orchestrators.loader;
    var loadingStage = fnc.uiControls.orchestrators.loadingStage;
    var grid = fnc.uiControls.panels.grid;
    var stackpanel = fnc.uiControls.panels.stackpanel;
    var wrappanel = fnc.uiControls.panels.wrappanel;
    var f_canvas = fnc.uiControls.panels.fCanvas;
    var dockpanel = fnc.uiControls.panels.dockpanel;
    var textbox = fnc.uiControls.inputControls.textbox;
    var radiobutton = fnc.uiControls.inputControls.radiobutton;

    return {
        createUiControl: function (dom, publicProperties, privateProperties) {
            publicProperties = publicProperties || {};
            privateProperties = privateProperties || {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                publicProperties[attr.name] = attr.value;
            }

            var controlObject = new uiElement();
            if (dom.tagName === 'LOADER') {
                controlObject = new loader(dom, publicProperties, privateProperties);
                for (var i = 0, child; child = dom.children[i]; i++) {
                    controlObject.loadingStages.push(this.createUiControl(child, {}, {}));
                }
            } else if (dom.tagName === 'LOADING-STAGE') {
                controlObject = new loadingStage(dom, publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {}));
                }
            } else if (dom.tagName === 'GRID') {
                controlObject = new grid(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'STACKPANEL') {
                controlObject = new stackpanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {stackpanel: controlObject}));
                }
            } else if (dom.tagName === 'WRAPPANEL') {
                controlObject = new wrappanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {wrappanel: controlObject}));
                }
            } else if (dom.tagName === 'F-CANVAS') {
                controlObject = new f_canvas(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {f_canvas: controlObject}));
                }
            } else if (dom.tagName === 'DOCKPANEL') {
                controlObject = new dockpanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {dockpanel: controlObject}));
                }
            } else if (dom.tagName === 'TEXTBOX') {
                controlObject = new textbox(publicProperties['id'], publicProperties, privateProperties);
            } else if (dom.tagName === 'RADIOBUTTON') {
                controlObject = new radiobutton(publicProperties['id'], publicProperties, privateProperties);
            } else { //use the tag as given
                var value = dom.innerText;
                if (dom.firstChild && dom.firstChild.nodeType == 3) {
                    value = dom.firstChild.data;
                }
                controlObject = new html5Control(dom.tagName.toLowerCase(), publicProperties['id'], value, publicProperties, privateProperties);
                if(dom.children.length > 0) {
                    controlObject.children = new fncObjectCollection();
                    for(var i= 0, child; child = dom.children[i]; i++) {
                        controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                    }
                }
            }

            return controlObject;
        }
    }

})();
