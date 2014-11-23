define(function (require) {
    var uiElement = require('../ui_element');
    var fncObjectCollection = require('../../core/fnc_object_collection');

    var panel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.children = new fncObjectCollection();
    }
    panel.prototype = new uiElement();
    panel.prototype.renderChildren = function() {
        for(var i= 0, child; child = this.children.get(i); i++) {
            this.dom.appendChild(child.render());
        }
    }
    return panel;
});

