fnc.uiControls.panels.fCanvas = (function () {
    var panel = fnc.uiControls.panels.panel;

    var f_canvas = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "f-canvas";
    };
    f_canvas.prototype = new panel();
    f_canvas.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren();
        return this.dom;
    };
    return f_canvas;
})();

