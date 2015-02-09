fnc.staticMethods.refreshDOM = function(dom) {
    var factory = fnc.core.factory;
    var fncDOM = factory.createUiControl(dom);
    return fncDOM.render();
};