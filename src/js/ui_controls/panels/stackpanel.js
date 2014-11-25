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
            for(var i= 0, child; child=this.children.get(i); i++) {
                var style = child.dom.style;
                style.left = currentLeft + 'px';
                currentLeft = currentLeft + parseInt(style.width.slice(0,-2));
            }
        } else {
            var currentTop = 0;
            for(var i= 0, child; child=this.children.get(i); i++) {
                var style = child.dom.style;
                style.top = currentTop + 'px';
                currentTop = currentTop + parseInt(style.height.slice(0,-2));
            }
        }
    }

    stackpanel.prototype = new panel();
    stackpanel.prototype.render = function() {
        //create this.dom as per parent
        panel.prototype.render.call(this);

        this.renderChildren();
        setChildrenOrientation.call(this);
        return this.dom;
    };
    return stackpanel;
});

