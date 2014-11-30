define(function (require) {
    var fncObjectCollection = require('core/fnc_object_collection');
    var uiElement = require('ui_controls/ui_element');
    var html5Control = require('ui_controls/html5_control');
    var grid = require('ui_controls/panels/grid');
    var stackpanel = require('ui_controls/panels/stackpanel');
    var wrappanel = require('ui_controls/panels/wrappanel');
    var f_canvas = require('ui_controls/panels/f_canvas');
    var textbox = require('ui_controls/input_controls/textbox');
    var radiobutton = require('ui_controls/input_controls/radiobutton');

    return {
        createUiControl: function (dom, publicProperties, privateProperties) {
            publicProperties = publicProperties || {};
            privateProperties = privateProperties || {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                publicProperties[attr.name] = attr.value;
            }

            var controlObject = new uiElement();
            if (dom.tagName === 'GRID') {
                controlObject = new grid(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'STACKPANEL') {
                controlObject = new stackpanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'WRAPPANEL') {
                controlObject = new wrappanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'F-CANVAS') {
                controlObject = new f_canvas(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'TEXTBOX') {
                controlObject = new textbox(publicProperties['id'], publicProperties, privateProperties);
            } else if (dom.tagName === 'RADIOBUTTON') {
                controlObject = new radiobutton(publicProperties['id'], publicProperties, privateProperties);
            } else { //use the tag as given
                controlObject = new html5Control(dom.tagName.toLowerCase(), publicProperties['id'], dom.innerText, publicProperties, privateProperties);
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

});
