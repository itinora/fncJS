define(function (require) {
    var uiElement = require('ui_controls/ui_element');
    var grid = require('ui_controls/panels/grid');
    var textbox = require('ui_controls/input_controls/textbox');

    return {
        createUiControl: function (dom) {
            var propertiesToBeAdded = {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                propertiesToBeAdded[attr.name] = attr.value;
            }

            var controlObject = new uiElement();
            if (dom.tagName === 'GRID') {
                controlObject = new grid(propertiesToBeAdded['id'], propertiesToBeAdded);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child));
                }
            } else if (dom.tagName === 'TEXTBOX') {
                controlObject = new textbox(propertiesToBeAdded['id'], propertiesToBeAdded);
            }

            return controlObject;
        }
    }

});
