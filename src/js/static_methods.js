fnc.staticMethods.refreshDOM = function(dom, options) {
    var factory = fnc.core.factory;
    var fncDOM = factory.createUiControl(dom);
    return fncDOM.render(options);
};