fnc.staticMethods = {
    refreshDOM: function(dom, options) {
        var factory = fnc.core.factory;
        var fncDOM = factory.createUiControl(dom);
        return fncDOM.render(options);
    },

    registerWebComponent: function(templateDoc) {
        if(!fnc.templateDocs) {
            fnc.templateDocs = [];
        }
        fnc.templateDocs.push(templateDoc);
    },

    registerAllWebComponents: function() {
        if(!fnc.templateDocs) {
            return;
        }

        for(var i= 0, templateDoc; templateDoc=fnc.templateDocs[i];i++) {
            var template = templateDoc.querySelector('template');
            var tagName = template.attributes['id'].value.replace('_','-');
            var control = document.registerElement(tagName, {
                prototype: Object.create(HTMLElement.prototype, {
                    createdCallback: {
                        value: function () {
                            var root = this.createShadowRoot();
                            var clone = document.importNode(template.content, true);
                            root.appendChild(clone);
                        }
                    }
                })
            });
        }
    }
};
