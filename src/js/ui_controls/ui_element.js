define(function (require) {
    var fncObject = require('../core/fnc_object');

    var uiElement = function (tag, name, value, publicProperties, privateProperties) {
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
        this.value = value || '';
        this.dom = null;
    };

    var addUIStyles = function() {
        var elem = this.dom;
        elem.style.height = (this.properties['height'] || 20) + "px";   //default height 20px
        elem.style.width = (this.properties['width'] || 100) + "px";    //default width 100px
        elem.style.position = "absolute";
        elem.style.textAlign = "center";
        elem.style.boxSizing = "border-box";
    };

    var setDomNameValueAndProperties = function() {
        if (this.name) {
            this.dom.setAttribute('id', this.name);
        }
        if(this.tag === 'input') {
            this.dom.setAttribute('value', this.dom.getAttribute('value'));
        } else {
            this.dom.innerText = this.value;
        }
        for (var key in this.properties) {
            this.dom.setAttribute(key, this.properties[key]);
        }
        return key;
    };

    var setPositionAndDimensionRelativeToParent = function() {
        for(var key in this.properties){
            var style = this.dom.style;
            if(key === "grid.row") {
                var rowIndex = parseInt(this.properties[key]);
                var grid = this["grid"];
                style.top = grid.rows[rowIndex].top + "px";
                if(this.dom.tagName !== 'SELECT' && this.dom.getAttribute('type') !== 'radio') { //for radio buttons and select controls if height and width are set it shows up big in size
                    style.height = grid.rows[rowIndex].height + "px";
                }
            } else if(key === "grid.rowspan") {
                var rowSpan = parseInt(this.properties[key]);
                var grid = this["grid"];
                var startWithRow = 0;
                var gridRowProperty = this.properties["grid.row"];
                if(gridRowProperty) {
                    startWithRow = gridRowProperty;
                }
                var height = 0;
                for(var r=0, row; row = grid.rows[startWithRow + r], r < rowSpan; r++) {
                        height = height + row["width"];
                }

                if(this.dom.tagName !== 'SELECT' && this.dom.getAttribute('type') !== 'radio') { //for radio buttons and select controls if height and width are set it shows up big in size
                    style.height = height + "px";
                }
            } else if(key === "grid.col") {
                var colIndex = parseInt(this.properties[key]);
                var grid = this["grid"];
                style.left = grid.cols[colIndex].left + "px";
                style.width = grid.cols[colIndex].width + "px";
            } else if(key === "grid.colspan") {
                var colSpan = parseInt(this.properties[key]);
                var grid = this["grid"];
                var startWithCol = 0;
                var gridColProperty = this.properties["grid.col"];
                if(gridColProperty) {
                    startWithCol = gridColProperty;
                }
                var width = 0;
                for(var c=0, col; col = grid.cols[startWithCol + c], c < colSpan; c++) {
                        width = width + col["width"];
                }

                style.width = width + "px";
            }
        }
    };

    uiElement.prototype = new fncObject();

    uiElement.prototype.render = function() {
        this.dom = document.createElement(this.tag);
        setDomNameValueAndProperties.call(this);
        addUIStyles.call(this);
        setPositionAndDimensionRelativeToParent.call(this);
        return this.dom;
    };
    return uiElement;
});

