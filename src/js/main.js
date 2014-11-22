require(['ui_controls/globals/rootVisual', 'ui_controls/panels/grid'], function(rootVisual, grid){
    fnc.body = new rootVisual();
    if(fnc.main) {
        fnc.main();
    }
});