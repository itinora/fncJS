fnc.uiControls.orchestrators.loader = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var fncObjectCollection = fnc.core.fncObjectCollection;

    var loader = function (dom, publicProperties, privateProperties) {
        this.initialize(publicProperties['id'], publicProperties, privateProperties);
        this.tag = "loader";
        this.loadingStages = new fncObjectCollection();

    };
    loader.prototype = new uiElement();
    loader.prototype.render = function(options) {
        this.dom = document.createElement(this.tag);
        for(var i= 0, stage; stage = this.loadingStages.get(i); i++) {
            this.dom.appendChild(stage.render());
        }
        return this.dom;
    };
    return loader;
})();

