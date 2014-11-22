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
    uiElement.prototype.render = function() {
        var elem = document.createElement(this.tag);
        if(this.name) {
            elem.setAttribute('id', this.name);
        }
        for(key in this.properties) {
            elem.setAttribute(key, this.properties[key]);
        }
        var height = this.properties['height'];
        if(height) {}
            elem.style.height = height + "px";
        return elem;
    };
    return uiElement;
});

