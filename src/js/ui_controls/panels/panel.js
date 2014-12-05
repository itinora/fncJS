fnc.uiControls.panels.panel = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var fncObjectCollection = fnc.core.fncObjectCollection;

    var panel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.children = new fncObjectCollection();
    }

    panel.prototype = new uiElement();

    panel.prototype.render = function(options) {
        //create this.dom as per parent
        uiElement.prototype.render.call(this, options);

        this.dom.style.position = "relative";
    }

    panel.prototype.renderChildren = function() {
        for(var i= 0, child; child = this.children.get(i); i++) {
            this.dom.appendChild(child.render());
        }
    }
    return panel;
})();

