WFEditor.AttributeCollection = Backbone.Collection.extend({
    model: WFEditor.AttributeModel,

    initialize: function() {
        this.on("add remove", this.render);
    },
    render: function() {
        console.log("render AttributeCollection");
        this.trigger("render");
    },
    parse: function(response) {
        var arrayParsed = [];  // le tableau de modele à ajouter à la collection

        var config = response.config || {};
        var data = response.data || {};

        _.each(_.keys(config), function(element) {
            var objAttr = _.extend({}, config[element]);
            objAttr.id = element;
            if(data[element])
                objAttr.value = data[element];
            else if(objAttr.required)
                objAttr.value = objAttr.defaultvalue;
            arrayParsed.push(new WFEditor.AttributeModel(objAttr));
        });

        return arrayParsed;
    },
    getJSON: function() {
        var obj = JSON.parse("{" + ((this.invoke("getJSON")).filter(function(val) {
            return val != undefined;
        }).join(",")) + "}");
        return obj;
    }

});