fnc.uiControls.panels.stackpanel = (function () {
    var panel = fnc.uiControls.panels.panel;

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
                var width = child.width;
                var height = child.height;
                currentLeft = currentLeft + width;
                if(height > maxHeight) {
                    maxHeight = height;
                }
            }
            this.dom.style.width = currentLeft + 'px';
            this.dom.style.height = (maxHeight > this.height ? maxHeight : this.height) + 'px';
        } else {
            var currentTop = 0;
            var maxWidth = 0;
            for(var i= 0, child; child=this.children.get(i); i++) {
                var style = child.dom.style;
                style.top = currentTop + 'px';
                var height = child.height;
                var width = child.width;
                currentTop = currentTop + height;
                if(width > maxWidth) {
                    maxWidth = width;
                }
            }
            this.dom.style.height = currentTop + 'px';
            this.dom.style.width = (maxWidth > this.width ? maxWidth : this.width) + 'px';
        }
    }

    stackpanel.prototype = new panel();
    stackpanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren({available_height: parseInt(this.dom.style.height), available_width: parseInt(this.dom.style.width)});
        setChildrenOrientation.call(this);
        return this.dom;
    };
    return stackpanel;
})();

