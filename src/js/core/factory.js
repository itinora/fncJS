define(function (require) {
    var uiElement = require('ui_controls/ui_element');
    var grid = require('ui_controls/panels/grid');
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
            } else if (dom.tagName === 'TEXTBOX') {
                controlObject = new textbox(publicProperties['id'], publicProperties, privateProperties);
            } else if (dom.tagName === 'RADIOBUTTON') {
                controlObject = new radiobutton(publicProperties['id'], publicProperties, privateProperties);
            } else if (dom.tagName === 'DIV') {
                controlObject = new uiElement('div', publicProperties['id'], dom.innerText, publicProperties, privateProperties);
            } else { //use the tag as given
                controlObject = new uiElement(dom.tagName.toLowerCase(), publicProperties['id'], dom.innerText, publicProperties, privateProperties);
            }

            return controlObject;
        }
    }

});
