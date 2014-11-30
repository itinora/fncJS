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
        this.applyExplicitStyles();

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        var placeholder = this.properties['placeholder'];
        if(placeholder) {
            input.setAttribute('placeholder', placeholder);
        }
        var value = this.properties['value'];
        if(value) {
            input.setAttribute('value', value);
        }
        input.style.width = this.dom.style.width;
        input.style.boxSizing = this.dom.style.boxSizing;
        this.dom.appendChild(input);

        return this.dom;
    }

    return textbox;
});
