fnc.uiControls.html5Control = (function () {
    var uiElement = fnc.uiControls.uiElement;

    var html5Control = function (tag, name, value, publicProperties, privateProperties) {
        tag = tag || 'div';

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.value = value || '';
        this.dom = null;
    };

    var renderChildren = function() {
        for(var i= 0, child; child = this.children.get(i); i++) {
            var childDOM = child.render();
            childDOM.style.position = "static";
            childDOM.style.width = null;
            childDOM.style.height = null;

            this.dom.appendChild(childDOM);
        }
    };

    html5Control.prototype = new uiElement();

    html5Control.prototype.render = function(options) {
        uiElement.prototype.render.call(this, options);
        this.dom.innerText = this.value;    //any text put directly under div before the child elements
        if(this.children) {
            renderChildren.call(this);
        }
        return this.dom;
    };
    return html5Control;
})();

