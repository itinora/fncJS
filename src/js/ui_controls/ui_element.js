define(function (require) {
    var fncObject = require('../core/fnc_object');

    var uiElement = function (name, publicProperties, privateProperties) {
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
        this.tag = 'div';
        this.dom = null;
    };
    uiElement.prototype = new fncObject();
    uiElement.prototype.render = function() {
        var elem = document.createElement(this.tag);
        if(this.name) {
            elem.setAttribute('id', this.name);
        }
        for(key in this.properties) {
            elem.setAttribute(key, this.properties[key]);
        }

        //add the existing properties
        for (var key in  this.properties) {
            elem.setAttribute(key, this.properties[key])
        }

        //add common properties for ui elements
        var height = this.properties['height'];
        if(height) {}
            elem.style.height = height + "px";
        var width = this.properties['width'];
        if(width) {}
            elem.style.width = width + "px";

        return elem;
    };
    return uiElement;
});

