fnc.uiControls.panels.dockpanel = (function () {
    var panel = fnc.uiControls.panels.panel;

    var dockpanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "dockpanel";
        this.topStart = 0;
        this.bottomEnd = 0;
        this.height = 0;
    };
    dockpanel.prototype = new panel();
    dockpanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.height = parseInt(this.dom.style.height.slice(0,-2));
        this.bottomEnd = this.height;
        this.renderChildren({available_width: this.width, available_height: this.bottomEnd - this.topStart});
        return this.dom;
    };
    return dockpanel;
})();

