"use strict";

XMLEditor.TagModel = Backbone.Model.extend({
    initialize: function(data) {
        return this;
    },
    render: function() {
        this.trigger("render");
    },
    parse: function(response) {
        // a voir si avec response.text == "" ça renvoit pas false aussi
        var objParsed = {};

        var config = response.config || {};
        var data = response.data || {};

        // instanciation du text le cas échéant
        if(config.text)
            objParsed.text = data.text || config.text;

        // instanciation des attributs
        var objAttrs = {};
        objAttrs.config = config._attributes_ || {};
        objAttrs.data = data._attributes_ || {};
        objParsed.allAttrs = new XMLEditor.AttributeCollection(objAttrs, {parse: true});

        // instanciation des tags (via les TagGroup)
        objParsed.allTags = [];
        _.each(_.keys(config._tags_), function(element) {
            var objTags = {
                id: element,
                config: config._tags_[element]
            };
            data._tags_ = data._tags_ || {};
            objTags.data = data._tags_[element] || []; // tableau des datas tagName: [{}, {}, {}, ...]
            objParsed.allTags.push(new XMLEditor.TagGroup(objTags, {parse: true}));
        });

        return objParsed;
    },
    getJSON: function() {
        var obj = {};
        if(this.has("text")) {
            obj.text = this.get("text");
        }
        if(this.get("allAttrs").length > 0) {
            obj._attributes_ = this.get("allAttrs").getJSON();
        }
        if(this.get("allTags").length > 0) {
            var json = JSON.parse("{" + (_.invoke(this.get("allTags"), "getJSON").filter(function(val) {
                return val != undefined;
            }).join()) + "}");
            if(!_.isEmpty(json))
                obj._tags_ = json;
        }
        
        return _.isEmpty(obj) ? false : obj;
    },
    toXML: function(tagName) {
        console.log("++++++++++++" + tagName);
        console.log(this);
        var xml = "<" + tagName;

        if(this.get("allAttrs").length > 0) {
            xml += " " + this.get("allAttrs").toXML();
        }
        if(!this.has("text") && this.get("allTags").length == 0) {
            xml += " />"
        } else {
            xml += ">";
            if(this.has("text")) {
                xml += this.get("text");
            }
            if(this.get("allTags").length > 0) {
                xml += _.invoke(this.get("allTags"), "toXML").filter(function(val) {
                    return val != undefined;
                }).join();
            }
            xml += "</" + tagName + ">";
        }
        
        return xml;
    }
    
});
