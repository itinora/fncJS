define(function (require) {
    var uiElement = require('ui_controls/ui_element');

    var textbox = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = 'textbox';
    }

    textbox.prototype = new uiElement();

    textbox.prototype.render = function() {
        //create this.dom as per parent
        uiElement.prototype.render.call(this);

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        this.dom.appendChild(input);

        return this.dom;
    }

    return textbox;
});
