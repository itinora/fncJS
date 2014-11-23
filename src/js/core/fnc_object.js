define([], function () {
    var fncObject = function () {
    };

    fncObject.prototype = {};
    fncObject.prototype.initialize = function(properties) {
        for(key in properties) {
            this[key] = properties[key];
        }
    }
    return fncObject;
});
