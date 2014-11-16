define(function (require) {
    var panel = require('ui_controls/panels/panel');

    var grid = function (name, properties) {
        if(name) {
            this.name = name;
        }
        properties = properties || {};
        this.rows = properties['rows'] || this.getProperty('rows') || 0;
        this.cols = properties['cols'] || this.getProperty('cols') || 0;
        this.tag = 'grid';
        for (var key in  properties) {
            this.properties[key] = properties[key];
        }
    }
    grid.prototype = new panel();
    return grid;
});

