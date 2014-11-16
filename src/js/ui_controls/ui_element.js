define(function (require) {
    var fncObject = require('../core/fnc_object');

    var private = {};
    private.parseDOM = function(){
        return {
            /* return values based on what is specified in the html by the user*/
        }
    }

    var uiElement = function (name, properties) {
        if(name) {
            this.name = name;
        }

        this.render = function() {
            var elem = document.createElement(this.tag);
            if(this.name) {
                elem.setAttribute('id', this.name);
            }
            for(key in this.properties) {
                elem.setAttribute(key, this.properties[key]);
            }
            return elem;
        }

        this.getProperty = function(property) {
            return this.properties[key];
        }

        this.properties = properties || {};
        var propertiesFromDOM = private.parseDOM();
        for (var key in  propertiesFromDOM) {
            this.properties[key] = propertiesFromDOM[key];
        }
        this.tag = 'div';
    };
    uiElement.prototype = new fncObject();
    return uiElement;
});

