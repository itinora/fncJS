define(function (require) {
    var panel = require('ui_controls/panels/panel');

    var grid = function (name, config) {
        if(name) {
            this.name = name;
        }
        config = config || {};
        this.rows = config['rows'] || this.getProperty('rows') || 0;
        this.cols = config['cols'] || this.getProperty('cols') || 0;
        this.tag = 'grid';
    }
    grid.prototype = new panel();
    return grid;
});

