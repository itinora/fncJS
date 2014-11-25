define(function (require) {
    var uiElement = require('./ui_element');

    var html5Control = function (tag, name, value, publicProperties, privateProperties) {
        tag = tag || 'div';

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.value = value || '';
        this.dom = null;
    };

    var renderChildren = function() {
        for(var i= 0, child; child = this.children.get(i); i++) {
            this.dom.appendChild(child.render());
        }
    };

    html5Control.prototype = new uiElement();

    html5Control.prototype.render = function() {
        uiElement.prototype.render.call(this);

        if(this.children) {
            renderChildren.call(this);
        }
        return this.dom;
    };
    return html5Control;
});

