"use strict";

XMLEditor.TagView = Backbone.View.extend({
    tagName: "div",
    className: "tag",

    initialize: function() {
        this.template = _.template($("#tag-template").text());
        this.model.on("render", this.render, this);
    },
    events: {
        "click deleteButton": "removeTag",
        "change .text-container": "updateAttr"
    },
    render: function(xmlName, deletable) {
        xmlName = xmlName || "default";
        deletable = deletable || false;
        this.$el.empty();
        this.$el.html(this.template(_.extend({xmlName: xmlName, deletable: deletable}, this.model.toJSON())));

        this.deleteButton = this.$el.children(".delete-button");
        this.deleteButton.on("click", function() {
            this.removeTag();
        }.bind(this));

        if(this.model.get("allAttrs").length > 0) {
            this.$el.append((new XMLEditor.AttributeCollectionView({ collection: this.model.get("allAttrs") })).render().el);
        }
        if(this.model.get("allTags").length > 0) {
            _.each(this.model.get("allTags"), function(tagGroup) {
                var tmp = (new XMLEditor.TagGroupView({ model: tagGroup })).render();
                this.$el.append(tmp.el);
            }, this);
        }

        return this;
    },
    removeTag: function() {
        this.model.destroy(this.model);
    }

});