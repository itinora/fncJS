define(function (require) {
    var uiElement = require('ui_controls/ui_element');

    var radiobutton = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = 'radiobutton';
    }

    radiobutton.prototype = new uiElement();

    radiobutton.prototype.render = function() {
        //create this.dom as per parent
        uiElement.prototype.render.call(this);

        var input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', this.dom.getAttribute('id') + '_radio');
        this.dom.appendChild(input);

        var label = document.createElement('label');
        label.setAttribute('for', input.getAttribute('id'));
        label.innerText = this.properties.value;
        label.style.width = this.dom.style.width;
        label.style.boxSizing = this.dom.style.boxSizing;
        this.dom.appendChild(label);

        return this.dom;
    }

    return radiobutton;
});
