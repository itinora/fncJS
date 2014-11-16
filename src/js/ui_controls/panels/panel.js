define(['../ui_element', '../../core/fnc_object_collection'], function (uiElement, fncObjectCollection) {
    var panel = function (name) {
        if(name) {
            this.name = name;
        }
        this.children = fncObjectCollection;
    }
    panel.prototype = new uiElement();
    return panel;
});

