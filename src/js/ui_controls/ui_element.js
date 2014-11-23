define(function (require) {
    var fncObject = require('../core/fnc_object');

    var uiElement = function (tag, name, publicProperties, privateProperties) {
        tag = tag || 'div';
        this.initialize = function(name, publicProperties, privateProperties) {
            uiElement.prototype.initialize.call(this, privateProperties);
            if(name) {
                this.name = name;
            }
            this.properties = publicProperties || {};
        }

        this.getProperty = function(property) {
            return this.properties[property];
        }

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.dom = null;
    };

    var addUIStyles = function() {
        var elem = this.dom;
        elem.style.height = (this.properties['height'] || 20) + "px";   //default height 20px
        elem.style.width = (this.properties['width'] || 100) + "px";    //default width 100px
        elem.style.position = "absolute";
    };

    var setDomNameAndProperties = function() {
        if (this.name) {
            this.dom.setAttribute('id', this.name);
        }
        for (var key in this.properties) {
            this.dom.setAttribute(key, this.properties[key]);
        }
        return key;
    };

    var setPositionAndDimensionRelativeToParent = function() {
        for(var key in this.properties){
            if(key === "grid.row") {
                var rowIndex = parseInt(this.properties[key]);
                var grid = this["grid"];
                this.dom.style.top = grid.rows[rowIndex].top + "px";
            } else if(key === "grid.col") {
                var colIndex = parseInt(this.properties[key]);
                var grid = this["grid"];
                this.dom.style.left = grid.cols[colIndex].left + "px";
            }
        }
    };

    uiElement.prototype = new fncObject();

    uiElement.prototype.render = function() {
        this.dom = document.createElement(this.tag);
        setDomNameAndProperties.call(this);
        addUIStyles.call(this);
        setPositionAndDimensionRelativeToParent.call(this);
        return this.dom;
    };
    return uiElement;
});

