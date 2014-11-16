define(function (require) {
    var fncObject = require('../core/fnc_object');

    var private = {};
    private.parseDOM = function(){
        return {
            /* return values based on what is specified in the html by the user*/
        }
    }

    var uiElement = function (name) {
        if(name) {
            this.name = name;
        }

        this.render = function() {
            return document.createElement(this.tag);
        }

        this.getProperty = function(property) {
            return this.properties[property];
        }

        this.properties = private.parseDOM();
        this.tag = 'div';
    };
    uiElement.prototype = new fncObject();
    return uiElement;
});

