WFEditor.TagGroup = Backbone.Model.extend({

    initialize: function() {
        this.listenTo(this.get("collection"), "add remove", this.render);
        return this;
    },
    render: function() {
        this.trigger("render");
        return this;
    },
    parse: function(response) {
        var config = response.config || {};
        var data = response.data || [];

        this.config = config;

        var objParsed = _.pick(config, "xmlName", "multiple", "required");
        
        objParsed.id = response.id;

        var tags = [];
        if(config.required && data.length == 0) {
            tags.push(new WFEditor.TagModel({config: config, data: {}}, {parse: true}));
        }
        _.each(data, function(element) {
            tags.push(new WFEditor.TagModel({config: config, data: element}, {parse: true}));
        });

        objParsed.collection = new WFEditor.TagCollection(tags);

        return objParsed;
    },
    getJSON: function() {
        var json = this.get("collection").getJSON();
        if(json) {
            var val = '"' + this.get("id") + '": ' + JSON.stringify(json);
            return val;
        }
        return;
    }
    
});

