fnc.uiControls.panels.dockpanel = (function () {
    var panel = fnc.uiControls.panels.panel;

    var dockpanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "dockpanel";
        this.topStart = 0;
        this.bottomEnd = 0;
    }
    dockpanel.prototype = new panel();
    dockpanel.prototype.render = function() {
        //create this.dom as per parent
        panel.prototype.render.call(this);

        //parse dockpanel specific properties
        panel.prototype.applyExplicitStyles.call(this);

        this.renderChildren();
        this.bottomEnd = parseInt(this.dom.style.height.slice(0,-2));
        return this.dom;
    };
    return dockpanel;
})();

