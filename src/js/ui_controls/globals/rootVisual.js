define(function (require) {
    var uiElement = require('../ui_element');

    var rootVisual = function (child) {
        if(child) {
            this.child = child;
        }

        this.render = function() {
            var dom = document.getElementsByTagName('body')[0];
            dom.appendChild(this.child.render());
        }
    }
    rootVisual.prototype = new uiElement();
    return rootVisual;
});

