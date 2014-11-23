define(function (require) {
    var panel = require('ui_controls/panels/panel');

    var grid = function (name, properties) {
        this.initialize(name, properties);
        this.tag = "grid";
        this.rows = [];
        this.cols = [];
    }
    grid.prototype = new panel();
    grid.prototype.render = function() {
        function parseCompositeProperty(propertyInDom, maxPropertyValue, toBeAddedTo, toBeAddedWithPropertyName) {
            var parts = propertyInDom.split(' ');
            var commulativeValue = 0;
            for (var i = 0, part; part = parts[i]; i++) {
                var partNumeric = parseInt(part);
                if (part.indexOf('%') > -1) {    //value is in percentage
                    if(maxPropertyValue > 0) {
                        var currentValue = partNumeric * maxPropertyValue / 100;
                        commulativeValue = commulativeValue + currentValue;
                        var prop = {};
                        prop[toBeAddedWithPropertyName] = currentValue
                        toBeAddedTo.push(prop);
                    }
                } else if (part === '*') {  //add the remaining value to this part
                    var prop = {};
                    prop[toBeAddedWithPropertyName] =  maxPropertyValue - commulativeValue;
                    toBeAddedTo.push(prop);
                    commulativeValue = maxPropertyValue;
                } else {    //number in pixel
                    commulativeValue = commulativeValue + partNumeric;
                    var prop = {};
                    prop[toBeAddedWithPropertyName] = partNumeric
                    toBeAddedTo.push(prop);
                }
            }
            if (commulativeValue > 0) {
                this.dom.style[toBeAddedWithPropertyName] = commulativeValue +  'px';
            }
        }


        //create base elem as per parent
        this.dom = panel.prototype.render.call(this);

        //parse grid specific properties
        parseCompositeProperty.call(this, this.properties['rowheights'], parseInt(this.properties['height']), this.rows, 'height');
        parseCompositeProperty.call(this, this.properties['colwidths'], parseInt(this.properties['width']), this.cols, 'width');

        this.renderChildren();
        return this.dom;
    };
    return grid;
});

