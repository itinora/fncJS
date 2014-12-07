fnc.uiControls.globals.rootVisual = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var factory = fnc.core.factory;

    var rootVisual = function (child) {
        if(child) {
            this.child = child;
        }
        this.dom = document.getElementsByTagName('body')[0];
        var attributes = this.dom.attributes;
        for (var i = 0, attr; attr = attributes[i]; i++){
            this.properties[attr.name] = attr.value;
            if(attr.name === 'standard-width') {
                this.standardWidth = parseInt(attr.value);
            }
            if(attr.name === 'standard-height') {
                this.standardHeight = parseInt(attr.value);
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
        var child = this.dom.getElementsByTagName(this.child.tag)[0];
        if(child) {
            this.dom.removeChild(child);
        }
        var availableWidth = this.standardWidth > window.innerWidth ? this.standardWidth : window.innerWidth;
        var availableHeight = this.standardHeight > window.innerHeight ? this.standardHeight : window.innerHeight;
        this.dom.appendChild(this.child.render({available_width: availableWidth, available_height: availableHeight}));
        this.scaleAsPerStandardDimensions();
    };
    rootVisual.prototype.scaleAsPerStandardDimensions = function() {
        var scaleX = window.innerWidth / this.standardWidth;
        if(scaleX < 1) {
            this.dom.style.transform = this.dom.style.transform + " scaleX(" + scaleX + ")";
        }
        var scaleY = window.innerHeight / this.standardHeight;
        if(scaleY < 1) {
            this.dom.style.transform = this.dom.style.transform + " scaleY(" + scaleY + ")";
        }
    }
    return rootVisual;
})();

