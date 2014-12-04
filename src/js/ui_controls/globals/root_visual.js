fnc.uiControls.globals.rootVisual = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var factory = fnc.core.factory;

    var rootVisual = function (child) {
        if(child) {
            this.child = child;
        }
        this.dom = document.getElementsByTagName('body')[0];

        this.refreshVisualTree = function(){
            for(var i=0, child; child=this.dom.children[i]; i++) {
                if(child.tagName !== 'SCRIPT') {
                    this.child = factory.createUiControl(child);
                    this.render();
                    break;
                }
            }
        };
        this.refreshVisualTree();

    }
    rootVisual.prototype = new uiElement();
    rootVisual.prototype.render = function() {
        var child = this.dom.getElementsByTagName(this.child.tag)[0];
        if(child) {
            this.dom.removeChild(child);
        }
        this.dom.appendChild(this.child.render());
    };
    return rootVisual;
})();

