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

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.value = value || '';
        this.dom = null;
    };


    var applyExplicitStyles = function() {
        var elem = this.dom;
        var width = parseInt(this.properties['width']);
        if(width) {
            elem.style.width = width + "px";
            this.width = width;
        }
        var height = parseInt(this.properties['height']);
        if(height) {
            elem.style.height = height + "px";
            this.height = height;
        }
    };


    var setDomNameValueAndProperties = function() {
        if (this.name) {
            this.dom.setAttribute('id', this.name);
        }
        if(this.children === undefined) {
            if (this.tag === 'input') {
                this.dom.setAttribute('value', this.dom.getAttribute('value'));
            } else if(this.tag === 'div' || this.tag === 'label' || this.tag === 'li' || this.tag === 'dockpanel' || this.tag === 'f_canvas' || this.tag === 'grid' || this.tag === 'stackpanel' || this.tag === 'wrappanel' || this.tag === 'span') {
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
                        height = height + row["height"];
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
                var dockpanel = this["dockpanel"];
                if(!this.properties['height']) {
                    style.height = dockpanel.bottomEnd - dockpanel.topStart + 'px';
                }
                var dock = this.properties[key];
                var elemHeight = style.height.slice(0, -2);
                var elemWidth = style.width.slice(0, -2);
                if(dock.indexOf('top') > -1) {
                    style.top = dockpanel.topStart + "px";
                    dockpanel.topStart = dockpanel.topStart + parseInt(elemHeight);
                    var width = parseInt(elemWidth);
                    if(dock === 'top-left') {
                        style.left = '0';
                    } else if(dock === 'top-right') {
                        style.left = (dockpanel.width - width) + 'px';
                    } else { //centered
                        style.left = (dockpanel.width - width) / 2 + 'px';
                    }
                } else if(dock.indexOf('bottom') > -1) {
                    style.top = (dockpanel.bottomEnd - parseInt(elemHeight)) + "px";
                    dockpanel.bottomEnd = dockpanel.bottomEnd - parseInt(elemHeight);
                    var width = parseInt(elemWidth);
                    if(dock === 'bottom-left') {
                        style.left = '0';
                    } else if(dock === 'bottom-right') {
                        style.left = (dockpanel.width - width) + 'px';
                    } else {
                        style.left = (dockpanel.width - width) / 2 + 'px';
                    }
                } else if(dock === 'left') {
                    style.top = (dockpanel.height - parseInt(elemHeight)) / 2 + 'px';
                    style.left = '0';
                } else if(dock === 'right') {
                    style.top = (dockpanel.height - parseInt(elemHeight)) / 2 + 'px';
                    var width = parseInt(elemWidth);
                    style.left = (dockpanel.width - width) + 'px';
                }
            }
        }
    };

    var applyDefaultUIStyles = function(options) {
        var elem = this.dom;
        if(options) {
            var availableWidth = options['available_width'];
            var availableHeight = options['available_height'];
        }

        if(this.dom.tagName === 'SELECT' || this.dom.getAttribute('type') === 'radio') {
            elem.style.height = '20px'; //default height for select and radio controls
        } else {
            elem.style.width = availableWidth ? availableWidth + 'px' : window.innerWidth + 'px';
            elem.style.height = availableHeight ? availableHeight + 'px' : window.innerHeight + 'px';
        }

        elem.style.display = 'block';
        elem.style.position = "absolute";

        if (this.tag === 'div' || this.tag === 'span' || this.tag === 'ul' || this.tag === 'ol' || this.tag === 'li') {
            elem.style.textAlign = "left";
        } else {
            elem.style.textAlign = "center";
        }
        elem.style.boxSizing = "border-box";
    };

    uiElement.prototype = new fncObject();

    uiElement.prototype.render = function(options) {
        this.dom = document.createElement(this.tag);
        setDomNameValueAndProperties.call(this);
        applyDefaultUIStyles.call(this, options);
        setPositionAndDimensionRelativeToParent.call(this);
        applyExplicitStyles.call(this);

        //render shadow dom if exists
        if(this.dom.shadowRoot) {
            for(var i= 0, shadowDom; shadowDom = this.dom.shadowRoot.children[i]; i++) {
                if(shadowDom.tagName !== 'STYLE') {
                    var refreshDOM = fnc.staticMethods.refreshDOM(shadowDom, {available_height: parseInt(this.dom.style.height), available_width: parseInt(this.dom.style.width)});
                    this.dom.shadowRoot.removeChild(shadowDom);
                    this.dom.shadowRoot.appendChild(refreshDOM);
                }
            }
        }
        return this.dom;
    };
    return uiElement;
})();

