(function () {

    function deserializeValue(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }

    function serializeValue(val) {
        if (typeof val === 'string' || val instanceof String) {
            try {
                JSON.parse(val); // if the parse succeeds, we need to escape the string
                return JSON.stringify(val);
            } catch (e) {
                return val;  // not ambiguous w/ JSON, can just output the value
            }
        } else {
            return JSON.stringify(val);
        }
    }

    function getHyperplaneValueForElt(elt, name) {
        if (elt.hasAttribute('data-' + name)) {
            var attrValue = elt.getAttribute('data-' + name);
            return deserializeValue(attrValue);
        }
    }

    function setHyperplaneValueForElt(elt, name, value) {
        if (value) {
            elt.setAttribute('data-' + name, serializeValue(value));
        } else {
            elt.removeAttribute('data-' + name);
        }
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

    function setHyperplaneValueForHierarchy(elt, name, value) {
        if (elt.matches('body') || elt.hasAttribute("data-" + name)) {
            elt.setAttribute("data-" + name, serializeValue(value));
        } else {
            setHyperplaneValueForElt(elt.parentElement, name, value);
        }
    }

    function getHyperplaneValueForStorage(name) {
        var value = localStorage.getItem(name);
        if(value) {
            return deserializeValue(value);
        }
    }

    function setHyperplaneValueForStorage(name, value) {
        if (value) {
            localStorage.setItem(name, serializeValue(value));
        } else {
            localStorage.removeItem(name);
        }
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
                    return setHyperplaneValueForHierarchy(context, property);
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
        var tokenIndex = 0;
        while (tokenIndex < count) {
            var token = tokens.token(tokenIndex);
            if (!token.op || !token.value === "/") {
                return false;
            }
            tokenIndex++;
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

            var slot = parser.requireElement("dotOrColonPath", tokens);

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