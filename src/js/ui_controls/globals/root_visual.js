fnc.uiControls.globals.rootVisual = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var factory = fnc.core.factory;

    var rootVisual = function (child) {
        if(child) {
            this.child = child;
        }
        this.dom = document.body;
        var attributes = this.dom.attributes;
        for (var i = 0, attr; attr = attributes[i]; i++) {
            this.properties[attr.name] = attr.value;
            if(attr.name === 'min-resolution-width') {
                this.minResolutionWidth = parseInt(attr.value);
            }
        }

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
        var topLevelContainer = this.child.render({available_width: availableWidth, available_height: availableHeight});
        var availableWidth = this.minResolutionWidth > window.innerWidth ? this.minResolutionWidth : window.innerWidth;
        var availableHeight = this.minResolutionWidth * window.innerHeight / window.innerWidth;
        this.dom.style.width = availableWidth + 'px';
        this.dom.style.height = availableHeight + 'px';

        var child = this.dom.getElementsByTagName(this.child.tag)[0];
        if(child) {
            this.dom.removeChild(child);
        }
        this.dom.appendChild(topLevelContainer);
        this.scaleAsPerStandardDimensions();
    };
    rootVisual.prototype.scaleAsPerStandardDimensions = function() {
        var scale = window.innerWidth / this.minResolutionWidth;
        if(scale < 1) {
            this.dom.style.transform = this.dom.style.transform + " scaleX(" + scale + ") scaleY(" + scale + ")";
        }
    }
    return rootVisual;
})();

