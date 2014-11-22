define(function (require) {
    var fncObject = require('core/fnc_object');

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

});
