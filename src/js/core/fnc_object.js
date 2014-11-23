define([], function () {
    var fncObject = function () {
    };

    fncObject.prototype = {};
    fncObject.prototype.initialize = function(properties) {
        for(var key in properties) {
            this[key] = properties[key];
        }
    }
    return fncObject;
});
