"use strict";

XMLEditor.TagCollection = Backbone.Collection.extend({
    model: XMLEditor.TagModel,

    initialize: function() {
        this.on("destroy", this.removeModel, this);

        return this;
    },
    removeModel: function(model) {
        this.remove(model);
    },
    getJSON: function() {
        var array = [];
        this.each(function(tag) {
            var val = tag.getJSON();
            if(val)
                array.push(val);
        })

        return _.isEmpty(array) ? false : array;
    },
    toXML:function(tagName) {
        var array = [];
        this.each(function(tag) {
            var val = tag.toXML(tagName);
            if(val)
                array.push(val);
        })

        return _.isEmpty(array) ? false : array.join("");
    }
    
});