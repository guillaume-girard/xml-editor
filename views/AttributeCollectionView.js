"use strict";

XMLEditor.AttributeCollectionView = Backbone.View.extend({
    tagName: "div",
    className: "attribute-collection",

    initialize: function () {
        this.template = _.template($("#attrCollection-template").text());
        this.collection.on("render", this.render, this);
    },
    render: function() {
        this.$el.empty();
        this.$el.html(this.template());
        this.collection.each(function(attr){
            var attrView = new XMLEditor.AttributeView({ model: attr });
            this.$el.append(attrView.render().el);
        }, this);
        return this;
    }
});