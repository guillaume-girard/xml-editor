WFEditor.TagGroupView = Backbone.View.extend({
    tagName: "div",
    className: "tag-group",

    initialize: function () {
        this.template = _.template($("#tagGroup-template").text());
        this.model.on("render", this.render, this);
    },
    render: function() {
        this.$el.empty();

        var deletable = true;
        if(this.model.get("required") && this.model.get("collection").length <= 1)
            deletable = false;

        var addable = (this.model.get("multiple") || this.model.get("collection").length == 0);
        this.$el.html(this.template(_.extend({deletable: deletable, addable: addable}, this.model.toJSON())));
        
        this.contenu = this.$el.children("fieldset").children(".tagGroup-content");
        this.model.get("collection").each(function(tag) {
            var tagView = new WFEditor.TagView({ model: tag });
            this.contenu.append(tagView.render(this.model.get("xmlName"), deletable).el);
        }, this);


        if(addable) {
            this.addButton = this.$el.children("fieldset").children(".add-button");
            this.addButton.on("click", function() {
                this.addTag();
            }.bind(this));
        }

        return this;
    },
    events: {
        "click addButton": "addTag"
    },
    addTag: function() {
        var newTag = new WFEditor.TagModel({config: this.model.config, data: {}}, {parse: true})
        this.model.get("collection").add(newTag);
    }
});