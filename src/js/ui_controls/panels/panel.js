define(function (require) {
    var uiElement = require('../ui_element');
    var fncObjectCollection = require('../../core/fnc_object_collection');

    var panel = function (name) {
        if(name) {
            this.name = name;
        }
        this.children = fncObjectCollection;
    }
    panel.prototype = new uiElement();
    return panel;
});

