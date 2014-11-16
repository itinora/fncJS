define(['core/fnc_object'], function (fncObject) {
    return function () {
        this.values = [];

        this.prototype.push = function (value) {
            if (typeof value === fncObject) {
                this.values.push(value);
            }
            else throw 'Not an fncObject';
        };

        this.prototype.get = function (index) {
            return this.values[index]
        }
    };

});
