WFEditor.AttributeModel = Backbone.Model.extend({

    render: function() {
        this.trigger("render");
    },
    getJSON: function() {
        if(typeof this.get("value") === 'undefined') {
            return;
        }

        var str = '"' + this.id + '": ';
        str += this.get("value") === null ? 'null' : '"' + this.get("value") + '"';

        return str;
    }

});
