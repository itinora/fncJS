define(function (require) {
    var uiElement = require('ui_controls/ui_element');

    var textbox = function (name, properties) {
        this.tag = 'textbox';
    }
    textbox.prototype = new uiElement();
    return textbox;
});
