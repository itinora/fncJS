define(function (require) {
    var grid = require('ui_controls/panels/grid');

    return {
        createUiControl: function (dom) {
            var propertiesToBeAdded = {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                propertiesToBeAdded[attr.name] = attr.value;
            }

            if (dom.tagName === 'GRID') {
                return new grid(propertiesToBeAdded['id'], propertiesToBeAdded);
            }
        }
    }

});
