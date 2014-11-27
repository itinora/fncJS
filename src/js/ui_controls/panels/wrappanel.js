define(function (require) {
    var panel = require('ui_controls/panels/panel');

    var wrappanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "wrappanel";
    }
    var placeChildrenInsideWrapPanel = function() {
        var currentLeft = 0;
        var currentTop = 0;
        var maxHeight = 0;
        var panelHeight = 0;
        var panelWidth = this.properties['width'] || null;
        for(var i= 0, child; child=this.children.get(i); i++) {
            var style = child.dom.style;
            var width = parseInt(style.width.slice(0, -2));
            var height = parseInt(style.height.slice(0, -2));
            if (panelWidth && (currentLeft + width) > parseInt(panelWidth)) {
                currentLeft = 0;
                currentTop = currentTop + maxHeight;
                maxHeight = height;
            } else {
                if(height > maxHeight) {
                    maxHeight = height;
                }
            }
            style.left = currentLeft + 'px';
            style.top = currentTop + 'px';
            currentLeft = currentLeft + width;

        }
        this.dom.style.width = currentLeft + 'px';
        this.dom.style.height = (currentTop + maxHeight) + 'px';
    }

    wrappanel.prototype = new panel();
    wrappanel.prototype.render = function() {
        //create this.dom as per parent
        panel.prototype.render.call(this);

        this.renderChildren();
        placeChildrenInsideWrapPanel.call(this);
        panel.prototype.applyExplicitStyles.call(this);
        return this.dom;
    };
    return wrappanel;
});

