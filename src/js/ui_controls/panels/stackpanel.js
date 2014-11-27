define(function (require) {
    var panel = require('ui_controls/panels/panel');

    var stackpanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "stackpanel";
    }
    var setChildrenOrientation = function() {
        var orientation = this.properties["orientation"] || 'horizontal';
        if(orientation === 'horizontal') {
            var currentLeft = 0;
            var maxHeight = 0;
            for(var i= 0, child; child=this.children.get(i); i++) {
                var style = child.dom.style;
                style.left = currentLeft + 'px';
                var width = parseInt(style.width.slice(0, -2));
                var height = parseInt(style.height.slice(0, -2));
                currentLeft = currentLeft + width;
                if(height > maxHeight) {
                    maxHeight = height;
                }
            }
            this.dom.style.width = currentLeft + 'px';
            this.dom.style.height = maxHeight + 'px';
        } else {
            var currentTop = 0;
            var maxWidth = 0;
            for(var i= 0, child; child=this.children.get(i); i++) {
                var style = child.dom.style;
                style.top = currentTop + 'px';
                var height = parseInt(style.height.slice(0, -2));
                var width = parseInt(style.width.slice(0, -2));
                currentTop = currentTop + height;
                if(width > maxWidth) {
                    maxWidth = width;
                }
            }
            this.dom.style.height = currentTop + 'px';
            this.dom.style.width = maxWidth + 'px';
        }
    }

    stackpanel.prototype = new panel();
    stackpanel.prototype.render = function() {
        //create this.dom as per parent
        panel.prototype.render.call(this);

        this.renderChildren();
        setChildrenOrientation.call(this);
        this.applyExplicitStyles();
        return this.dom;
    };
    return stackpanel;
});

