WFEditor.TagCollection = Backbone.Collection.extend({
    model: WFEditor.TagModel,

    initialize: function() {
        this.on("destroy", this.alerting, this);

        return this;
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
    alerting: function(model) {
        this.remove(model);
    }
    
});