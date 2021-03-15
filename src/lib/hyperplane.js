(function () {

    function getHyperplaneValueForElt(elt, name) {
        var hyperPlane = elt.getAttribute('data-hyperplane');
        if(hyperPlane) {
            var parsed = JSON.parse(hyperPlane);
            return parsed[name];
        } else {
            return null;
        }
    }

    function setHyperplaneValueForElt(elt, name, value) {
        var hyperPlane = elt.getAttribute('data-hyperplane');
        if(hyperPlane) {
            var parsed = JSON.parse(hyperPlane);
        } else {
            var parsed = {};
        }
        parsed[name] = value;
        elt.setAttribute('data-hyperplane', JSON.stringify(parsed));
    }

    function getHyperplaneValueForHierarchy(elt, name) {
        if (elt != null) {
            var hyperplaneValueForElt = getHyperplaneValueForElt(elt);
            if (typeof hyperplaneValueForElt !== "undefined") {
                return hyperplaneValueForElt;
            } else {
                return getHyperplaneValueForElt(elt.parentElement, name);
            }
        }
    }

    function getHyperplaneValueForStorage(name) {
        var hyperPlane = localStorage.getItem('hyperplane');
        if(hyperPlane) {
            var parsed = JSON.parse(hyperPlane);
            return parsed[name];
        } else {
            return null;
        }
    }

    function setHyperplaneValueForStorage(name, value) {
        var hyperPlane = localStorage.getItem('hyperplane');
        if(hyperPlane) {
            var parsed = JSON.parse(hyperPlane);
        } else {
            var parsed = {};
        }
        parsed[name] = value;
        localStorage.setItem('hyperplane', JSON.stringify(parsed));
    }

    function getHyperPlane(context, persistent, hierarchy) {
        if (persistent) {
            return new Proxy({}, {
                get: function (obj, property) {
                    return getHyperplaneValueForStorage(property);
                },
                set: function(obj, property, value) {
                    setHyperplaneValueForStorage(property, value);
                    return true;
                }
            });
        } else if(hierarchy) {
            return new Proxy({}, {
                get: function (obj, property) {
                    return getHyperplaneValueForHierarchy(context, property);
                },
                set: function(obj, property, value) {
                    throw new Error("Cannot set values into hierarchy");
                }
            });
        } else {
            return new Proxy({}, {
                get: function (obj, property) {
                    return getHyperplaneValueForElt(context, property);
                },
                set: function(obj, property, value) {
                    setHyperplaneValueForElt(context, property, value);
                    return true;
                }
            });
        }
    }

    function slashes(tokens, count) {
        count--;
        while (count > 0) {
            var token = tokens.token(count);
            if (!token.op || !token.value === "/") {
                return false;
            }
            count--;
        }
        return true;
    }

    _hyperscript.addLeafExpression("hyperReference", function(parser, runtime, tokens) {
        if ((slashes(tokens, 1) && tokens.token(1, true).type === "IDENTIFIER") ||
            (slashes(tokens, 2) && tokens.token(2, true).type === "IDENTIFIER") ||
            (slashes(tokens, 3) && tokens.token(3, true).type === "IDENTIFIER") ) {
            tokens.matchOpToken("/");
            if (tokens.matchOpToken("/")) {
                if (tokens.matchOpToken("/")) {
                    var persistent = true;
                } else {
                    var hierarchy = true;
                }
            }

            var slot = tokens.requireTokenType("IDENTIFIER");

            var root = {
                type:'hyperplane',
                args:[],
                op: function(context) {
                    return getHyperPlane(context.me, persistent, hierarchy);
                },
                evaluate : function(context){
                    return runtime.unifiedEval(this, context);
                }
            }

            return {
                type:'hyperplaneReference',
                root: root,
                args:[root],
                prop:slot,
                op: function(context, root) {
                    return root[slot.value];
                },
                evaluate : function(context){
                    return runtime.unifiedEval(this, context);
                }
            }
        }
    })
})()