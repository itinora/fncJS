fnc.uiControls.uiElement = (function(){
    var fncObject = fnc.core.fncObject;

    var uiElement = function (tag, name, value, publicProperties, privateProperties) {
        tag = tag || 'div';
        this.initialize = function(name, publicProperties, privateProperties) {
            uiElement.prototype.initialize.call(this, privateProperties);
            if(name) {
                this.name = name;
            }
            this.properties = publicProperties || {};
        };

        this.getProperty = function(property) {
            return this.properties[property];
        };

        this.applyExplicitStyles = function() {
            var elem = this.dom;
            if(this.properties['height']) {
                elem.style.height = this.properties['height'] + "px";
            }
            if(this.properties['width']) {
                elem.style.width = this.properties['width'] + "px";
            }
        };

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.value = value || '';
        this.dom = null;
    };

    var setDomNameValueAndProperties = function() {
        if (this.name) {
            this.dom.setAttribute('id', this.name);
        }
        if(this.children === undefined) {
            if (this.tag === 'input') {
                this.dom.setAttribute('value', this.dom.getAttribute('value'));
            } else {
                this.dom.innerText = this.value;
            }
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
            }else if(key === "f-canvas.left") {
                var left = parseInt(this.properties[key]);
                style.left = left + "px";
            }else if(key === "f-canvas.top") {
                var top = parseInt(this.properties[key]);
                style.top = top + "px";
            } else if(key === "dockpanel.dock") {
                var dock = this.properties[key];
                var dockpanel = this["dockpanel"];
                if(dock.indexOf('top') > -1) {
                    style.top = dockpanel.topStart + "px";
                    dockpanel.topStart = dockpanel.topStart + parseInt(style.height.slice(0, -2));
                    var width = parseInt(style.width.slice(0, -2));
                    if(dock === 'top-left') {
                        style.left = '0';
                    } else if(dock === 'top-right') {
                        style.left = (parseInt(dockpanel.properties['width']) - width) + 'px';
                    } else { //centered
                        style.left = (parseInt(dockpanel.properties['width']) - width) / 2 + 'px';
                    }
                } else if(dock.indexOf('bottom') > -1) {
                    style.top = (dockpanel.bottomEnd - parseInt(style.height.slice(0,-2))) + "px";
                    dockpanel.bottomEnd = dockpanel.bottomEnd - parseInt(style.height.slice(0, -2));
                    var width = parseInt(style.width.slice(0, -2));
                    if(dock === 'bottom-left') {
                        style.left = '0';
                    } else if(dock === 'bottom-right') {
                        style.left = (parseInt(dockpanel.properties['width']) - width) + 'px';
                    } else {
                        style.left = (parseInt(dockpanel.properties['width']) - width) / 2 + 'px';
                    }
                } else if(dock === 'left') {
                    style.top = (dockpanel.height - parseInt(style.height.slice(0, -2))) / 2 + "px";
                    style.left = '0';
                } else if(dock === 'right') {
                    style.top = (dockpanel.height - parseInt(style.height.slice(0, -2))) / 2 + "px";
                    var width = parseInt(style.width.slice(0, -2));
                    style.left = (parseInt(dockpanel.properties['width']) - width) + 'px';
                }
            }
        }
    };

    var applyDefaultUIStyles = function() {
        var elem = this.dom;
        elem.style.height = "20px";   //default height 20px
        elem.style.width = "100px";    //default width 100px
        elem.style.position = "absolute";
        elem.style.textAlign = "center";
        elem.style.boxSizing = "border-box";
    };

    uiElement.prototype = new fncObject();

    uiElement.prototype.render = function() {
        this.dom = document.createElement(this.tag);
        setDomNameValueAndProperties.call(this);
        applyDefaultUIStyles.call(this);
        setPositionAndDimensionRelativeToParent.call(this);
        return this.dom;
    };
    return uiElement;
})();

