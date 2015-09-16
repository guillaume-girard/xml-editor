"use strict";

WFEditor.AttributeView = Backbone.View.extend({
    
    tagName: "div",
    className: "attribute",

    initialize: function() {
        this.template = _.template($("#attr-template").text());
        this.model.on("render", this.render, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .add-button': 'addAttr',
        'click .delete-button': 'deleteAttr',
        'change .value-container': 'updateAttr'
    },
    addAttr: function() {
        this.model.set("value", this.model.get("defaultvalue"));
        this.render();
    },
    deleteAttr: function() {
        this.model.unset("value");
        this.render();
    },
    updateAttr: function(e) {
        this.model.set("value", $(e.target).val());
    }
    
});