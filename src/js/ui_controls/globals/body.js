define(['../ui_element'], function (uiElement) {
    var body = function (child) {
        this.child = child;
        var dom = document.getElementsByTagName('body')[0];
        dom.appendChild(child.render());
    }
    body.prototype = new uiElement();
    return body;
});

