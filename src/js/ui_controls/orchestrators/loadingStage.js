fnc.uiControls.orchestrators.loadingStage = (function () {
    var panel = fnc.uiControls.panels.panel;

    var loadingStage = function (dom, publicProperties, privateProperties) {
        this.initialize(publicProperties['id'], publicProperties, privateProperties);
        this.tag = "loading-stage";
    };
    loadingStage.prototype = new panel();
    loadingStage.prototype.render = function(options) {
        this.dom = document.createElement(this.tag);
        for(var i= 0, child; child = this.children.get(i); i++) {
            if(child.tag === 'javascript') {

            } else {
                var childDOM = child.render();
                childDOM.style.position = "static";
                childDOM.style.width = null;
                childDOM.style.height = null;
                this.dom.appendChild(childDOM);
            }
        }
        return this.dom;
    };
    return loadingStage;
})();

