fnc = {};
fnc.core = {};
fnc.uiControls = {};
fnc.uiControls.globals = {};
fnc.uiControls.inputControls = {};
fnc.uiControls.panels = {};

fnc.core.fncObject = (function () {
    var fncObject = function () {
    };

    fncObject.prototype = {};
    fncObject.prototype.initialize = function(properties) {
        for(var key in properties) {
            this[key] = properties[key];
        }
    }
    return fncObject;
})();

fnc.core.fncObjectCollection = (function () {
    var fncObject = fnc.core.fncObject;

    var fncObjectCollection = function () {
        this.values = [];
    };

    fncObjectCollection.prototype = new Object();
    fncObjectCollection.prototype.push = function (value) {
        if (value instanceof fncObject) {
            this.values.push(value);
        }
        else throw 'Not an fncObject';
    };

    fncObjectCollection.prototype.get = function (index) {
        return this.values[index];
    }
    return fncObjectCollection;

})();

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
        var width = this.properties['width'];
        if(width) {
            elem.style.width = width + "px";
            this.width = width;
        }
        var height = this.properties['height'];
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
                var dockpanel = this["dockpanel"];
                if(!this.properties['height']) {
                    style.height = dockpanel.bottomEnd - dockpanel.topStart + 'px';
                }
                var dock = this.properties[key];
                if(dock.indexOf('top') > -1) {
                    style.top = dockpanel.topStart + "px";
                    dockpanel.topStart = dockpanel.topStart + parseInt(style.height.slice(0, -2));
                    var width = parseInt(style.width.slice(0, -2));
                    if(dock === 'top-left') {
                        style.left = '0';
                    } else if(dock === 'top-right') {
                        style.left = (dockpanel.width - width) + 'px';
                    } else { //centered
                        style.left = (dockpanel.width - width) / 2 + 'px';
                    }
                } else if(dock.indexOf('bottom') > -1) {
                    style.top = (dockpanel.bottomEnd - parseInt(style.height.slice(0,-2))) + "px";
                    dockpanel.bottomEnd = dockpanel.bottomEnd - parseInt(style.height.slice(0, -2));
                    var width = parseInt(style.width.slice(0, -2));
                    if(dock === 'bottom-left') {
                        style.left = '0';
                    } else if(dock === 'bottom-right') {
                        style.left = (dockpanel.width - width) + 'px';
                    } else {
                        style.left = (dockpanel.width - width) / 2 + 'px';
                    }
                } else if(dock === 'left') {
                    style.top = (dockpanel.height - parseInt(style.height.slice(0, -2))) / 2 + 'px';
                    style.left = '0';
                } else if(dock === 'right') {
                    style.top = (dockpanel.height - parseInt(style.height.slice(0, -2))) / 2 + 'px';
                    var width = parseInt(style.width.slice(0, -2));
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
        this.width = (availableWidth || 100);
        this.height = (availableHeight || 20);
        elem.style.width = this.width + 'px';    //default width 100px
        elem.style.height = this.height + 'px';   //default height 20px
        elem.style.position = "absolute";
        elem.style.textAlign = "center";
        elem.style.boxSizing = "border-box";

    };

    uiElement.prototype = new fncObject();

    uiElement.prototype.render = function(options) {
        this.dom = document.createElement(this.tag);
        setDomNameValueAndProperties.call(this);
        applyDefaultUIStyles.call(this, options);
        applyExplicitStyles.call(this);
        setPositionAndDimensionRelativeToParent.call(this);
        return this.dom;
    };
    return uiElement;
})();


fnc.uiControls.html5Control = (function () {
    var uiElement = fnc.uiControls.uiElement;

    var html5Control = function (tag, name, value, publicProperties, privateProperties) {
        tag = tag || 'div';

        this.initialize(name, publicProperties, privateProperties);
        this.tag = tag;
        this.value = value || '';
        this.dom = null;
    };

    var renderChildren = function() {
        for(var i= 0, child; child = this.children.get(i); i++) {
            this.dom.appendChild(child.render());
        }
    };

    html5Control.prototype = new uiElement();

    html5Control.prototype.render = function(options) {
        uiElement.prototype.render.call(this, options);

        if(this.children) {
            renderChildren.call(this);
        }
        return this.dom;
    };
    return html5Control;
})();


fnc.uiControls.inputControls.radiobutton = (function () {
    var uiElement = fnc.uiControls.uiElement;

    var radiobutton = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = 'radiobutton';
    }

    radiobutton.prototype = new uiElement();

    radiobutton.prototype.render = function() {
        //create this.dom as per parent
        uiElement.prototype.render.call(this);

        var input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', this.dom.getAttribute('id') + '_radio');
        this.dom.appendChild(input);

        var label = document.createElement('label');
        label.setAttribute('for', input.getAttribute('id'));
        label.innerText = this.properties.value;
        label.style.width = this.dom.style.width;
        label.style.boxSizing = this.dom.style.boxSizing;
        this.dom.appendChild(label);

        return this.dom;
    }

    return radiobutton;
})();

fnc.uiControls.inputControls.textbox = (function () {
    var uiElement = fnc.uiControls.uiElement;

    var textbox = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = 'textbox';
    }

    textbox.prototype = new uiElement();

    textbox.prototype.render = function() {
        //create this.dom as per parent
        uiElement.prototype.render.call(this);

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        var placeholder = this.properties['placeholder'];
        if(placeholder) {
            input.setAttribute('placeholder', placeholder);
        }
        var value = this.properties['value'];
        if(value) {
            input.setAttribute('value', value);
        }
        input.style.width = this.dom.style.width;
        input.style.boxSizing = this.dom.style.boxSizing;
        this.dom.appendChild(input);

        return this.dom;
    }

    return textbox;
})();

fnc.uiControls.panels.panel = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var fncObjectCollection = fnc.core.fncObjectCollection;

    var panel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.children = new fncObjectCollection();
    }

    panel.prototype = new uiElement();

    panel.prototype.render = function(options) {
        //create this.dom as per parent
        uiElement.prototype.render.call(this, options);

        this.dom.style.position = "relative";
    }

    panel.prototype.renderChildren = function(options) {
        for(var i= 0, child; child = this.children.get(i); i++) {
            this.dom.appendChild(child.render(options));
        }
    }
    return panel;
})();


fnc.uiControls.panels.fCanvas = (function () {
    var panel = fnc.uiControls.panels.panel;

    var f_canvas = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "f-canvas";
    }
    f_canvas.prototype = new panel();
    f_canvas.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren();
        return this.dom;
    };
    return f_canvas;
})();


fnc.uiControls.panels.grid = (function () {
    var panel = fnc.uiControls.panels.panel;

    var grid = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "grid";
        this.rows = [];
        this.cols = [];
    }
    grid.prototype = new panel();
    grid.prototype.render = function(options) {
        var parseCompositeProperty = function(propertyInDom, maxPropertyValue, toBeAddedTo, toBeAddedWithPropertyName) {
            var parts = propertyInDom.split(' ');
            var cummulativeValue = 0;
            for (var i = 0, part; part = parts[i]; i++) {
                var partNumeric = parseInt(part);
                if (part.indexOf('%') > -1) {    //value is in percentage
                    if(maxPropertyValue > 0) {
                        var currentValue = partNumeric * maxPropertyValue / 100;
                        cummulativeValue = cummulativeValue + currentValue;
                        var prop = {};
                        prop[toBeAddedWithPropertyName] = currentValue;
                        toBeAddedTo.push(prop);
                    }
                } else if (part === '*') {  //add the remaining value to this part
                    var prop = {};
                    prop[toBeAddedWithPropertyName] =  maxPropertyValue - cummulativeValue;
                    toBeAddedTo.push(prop);
                    cummulativeValue = maxPropertyValue;
                } else {    //number in pixel
                    cummulativeValue = cummulativeValue + partNumeric;
                    var prop = {};
                    prop[toBeAddedWithPropertyName] = partNumeric;
                    toBeAddedTo.push(prop);
                }
            }
            if (cummulativeValue > 0) {
                this.dom.style[toBeAddedWithPropertyName] = cummulativeValue +  'px';
            }
        };

        var parseRowHeights = function() {
            if(this.properties['rowheights']) {
                parseCompositeProperty.call(this, this.properties['rowheights'], parseInt(this.properties['height']), this.rows, 'height');
                var rows = this["rows"];
                var currentTop = 0;
                for (var i = 0, row; row = rows[i]; i++) {
                    row["top"] = currentTop;
                    currentTop = currentTop + row["height"];
                }
            }
        }

        var parseColWidths = function() {
            if(this.properties['colwidths']) {
                parseCompositeProperty.call(this, this.properties['colwidths'], parseInt(this.properties['width']), this.cols, 'width');
                var cols = this["cols"];
                var currentLeft = 0;
                for (var i = 0, col; col = cols[i]; i++) {
                    col["left"] = currentLeft;
                    currentLeft = currentLeft + col["width"];
                }
            }
        }


        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        //parse grid specific properties
        parseRowHeights.call(this);
        parseColWidths.call(this);

        this.renderChildren();
        return this.dom;
    };
    return grid;
})();


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
                var width = parseInt(style.width.slice(0, -2));
                var height = parseInt(style.height.slice(0, -2));
                currentLeft = currentLeft + width;
                if(height > maxHeight) {
                    maxHeight = height;
                }
            }
            this.dom.style.width = (currentLeft > this.width ? currentLeft : this.width) + 'px';
            this.dom.style.height = (maxHeight > this.height ? maxHeight : this.height) + 'px';
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
            this.dom.style.height = (currentTop > this.height ? currentTop : this.height) + 'px';
            this.dom.style.width = (maxWidth > this.width ? maxWidth : this.width) + 'px';
        }
    }

    stackpanel.prototype = new panel();
    stackpanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren();
        setChildrenOrientation.call(this);
        return this.dom;
    };
    return stackpanel;
})();


fnc.uiControls.panels.wrappanel = (function () {
    var panel = fnc.uiControls.panels.panel;

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
        this.dom.style.width = (currentLeft > this.width ? currentLeft : this.width) + 'px';
        var newHeight = (currentTop + maxHeight);
        this.dom.style.height = (newHeight > this.height ? newHeight : this.height) + 'px';
    }

    wrappanel.prototype = new panel();
    wrappanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren();
        placeChildrenInsideWrapPanel.call(this);
        return this.dom;
    };
    return wrappanel;
})();


fnc.uiControls.panels.dockpanel = (function () {
    var panel = fnc.uiControls.panels.panel;

    var dockpanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "dockpanel";
        this.topStart = 0;
        this.bottomEnd = 0;
        this.height = 0;
    }
    dockpanel.prototype = new panel();
    dockpanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.height = parseInt(this.dom.style.height.slice(0,-2));
        this.bottomEnd = this.height;
        this.renderChildren({available_width: this.width, available_height: this.bottomEnd - this.topStart});
        return this.dom;
    };
    return dockpanel;
})();


fnc.core.factory = (function () {
    var fncObjectCollection = fnc.core.fncObjectCollection;
    var uiElement = fnc.uiControls.uiElement;
    var html5Control = fnc.uiControls.html5Control;
    var grid = fnc.uiControls.panels.grid;
    var stackpanel = fnc.uiControls.panels.stackpanel;
    var wrappanel = fnc.uiControls.panels.wrappanel;
    var f_canvas = fnc.uiControls.panels.fCanvas;
    var dockpanel = fnc.uiControls.panels.dockpanel;
    var textbox = fnc.uiControls.inputControls.textbox;
    var radiobutton = fnc.uiControls.inputControls.radiobutton;

    return {
        createUiControl: function (dom, publicProperties, privateProperties) {
            publicProperties = publicProperties || {};
            privateProperties = privateProperties || {};
            var attributes = dom.attributes;
            for (var i = 0, attr; attr = attributes[i]; i++){
                publicProperties[attr.name] = attr.value;
            }

            var controlObject = new uiElement();
            if (dom.tagName === 'GRID') {
                controlObject = new grid(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                }
            } else if (dom.tagName === 'STACKPANEL') {
                controlObject = new stackpanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {stackpanel: controlObject}));
                }
            } else if (dom.tagName === 'WRAPPANEL') {
                controlObject = new wrappanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {wrappanel: controlObject}));
                }
            } else if (dom.tagName === 'F-CANVAS') {
                controlObject = new f_canvas(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {f_canvas: controlObject}));
                }
            } else if (dom.tagName === 'DOCKPANEL') {
                controlObject = new dockpanel(publicProperties['id'], publicProperties, privateProperties);
                for(var i= 0, child; child = dom.children[i]; i++) {
                    controlObject.children.push(this.createUiControl(child, {}, {dockpanel: controlObject}));
                }
            } else if (dom.tagName === 'TEXTBOX') {
                controlObject = new textbox(publicProperties['id'], publicProperties, privateProperties);
            } else if (dom.tagName === 'RADIOBUTTON') {
                controlObject = new radiobutton(publicProperties['id'], publicProperties, privateProperties);
            } else { //use the tag as given
                controlObject = new html5Control(dom.tagName.toLowerCase(), publicProperties['id'], dom.innerText, publicProperties, privateProperties);
                if(dom.children.length > 0) {
                    controlObject.children = new fncObjectCollection();
                    for(var i= 0, child; child = dom.children[i]; i++) {
                        controlObject.children.push(this.createUiControl(child, {}, {grid: controlObject}));
                    }
                }
            }

            return controlObject;
        }
    }

})();

fnc.uiControls.globals.rootVisual = (function () {
    var uiElement = fnc.uiControls.uiElement;
    var factory = fnc.core.factory;

    var rootVisual = function (child) {
        if(child) {
            this.child = child;
        }
        this.dom = document.getElementsByTagName('body')[0];

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
        this.dom.appendChild(this.child.render({available_width: window.innerWidth, available_height: window.innerHeight}));
    };
    return rootVisual;
})();


fnc.body = new fnc.uiControls.globals.rootVisual();
