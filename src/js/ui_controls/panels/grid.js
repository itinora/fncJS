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
                    prop[toBeAddedWithPropertyName] =  '*';
                    toBeAddedTo.push(prop);
                } else {    //number in pixel
                    cummulativeValue = cummulativeValue + partNumeric;
                    var prop = {};
                    prop[toBeAddedWithPropertyName] = partNumeric;
                    toBeAddedTo.push(prop);
                }
            }
            for(var i = 0, prop; prop = toBeAddedTo[i]; i++) {
                if(prop[toBeAddedWithPropertyName] === '*') {
                    prop[toBeAddedWithPropertyName] = maxPropertyValue - cummulativeValue;
                    cummulativeValue = maxPropertyValue;
                }
            }
            if (cummulativeValue > 0) {
                this.dom.style[toBeAddedWithPropertyName] = cummulativeValue +  'px';
            }
        };

        var parseRowHeights = function() {
            if(this.properties['rowheights']) {
                parseCompositeProperty.call(this, this.properties['rowheights'], parseInt(this.dom.style.height), this.rows, 'height');
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
                parseCompositeProperty.call(this, this.properties['colwidths'], parseInt(this.dom.style.width), this.cols, 'width');
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

        this.renderChildren({available_height: parseInt(this.dom.style.height), available_width: parseInt(this.dom.style.width)});
        return this.dom;
    };
    return grid;
})();

