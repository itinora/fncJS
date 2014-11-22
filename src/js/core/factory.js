define(function (require) {
    var uiElement = require('ui_controls/ui_element');
    var grid = require('ui_controls/panels/grid');

    return {
        createUiControl: function (dom) {
            var propertiesToBeAdded = {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                propertiesToBeAdded[attr.name] = attr.value;
            }

            if (dom.tagName === 'GRID') {
                var containerObj = new grid(propertiesToBeAdded['id'], propertiesToBeAdded);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    containerObj.children.push(this.createUiControl(child));
                }
                return  containerObj;
            }

            return new uiElement();
        }
    }

});
