var WFEditor = WFEditor || {};
var WFEditor.StateConfig = {
    _attributes_: {
        id: {  // id pour le graph
            xmlName: "Id",  // nom affiché + nom de l'attr dans le xml
            type: "input",  //type d'attributs (input|boolean|select|textarea)
            required: true, // true si l'attributs est obligatoire
            defaultvalue: null   // valeur par défaut si besoin
        },
        title: {  // id pour le graph
            xmlName: "Title",  // nom affiché + nom de l'attr dans le xml
            type: "input",  //type d'attributs (input|boolean|select|textarea)
            required: true, // true si l'attributs est obligatoire
            defaultvalue: null   // valeur par défaut si besoin
        },
        description: {
            xmlName: "Description",
            type: "textarea",
            required: false,
            defaultvalue: null
        }
    },
    _tags_: {
        precondition: {
            xmlName: "Precondition",
            multiple: false,
            required: false,
            _attributes_: {},
            text: "default_text_precondition",
            _tags_: {}
        },
        postcondition: {
            xmlName: "Postcondition",
            multiple: false,
            required: false,
            _attributes_: {},
            text: true,
            _tags_: {}
        },
        attributes: {
            xmlName: "Attributes",
            multiple: false,
            required: false,
            _attributes_: {},
            text: false,
            _tags_: {
                attribute: {
                    xmlName: "Attribute",
                    multiple: true,
                    required: true,
                    _attributes_: {
                        name: {
                            xmlName: "name",  
                            type: "select",  
                            required: false, 
                            defaultvalue: null, 
                            possibleValues: ["actor", "nexus", "user", "xCase"]
                        }
                    },
                    text: false,
                    _tags_: {}    // pas de balises filles
                }
            }
        },
        params: {
            xmlName: "Params",
            multiple: false,
            required: false,
            _attributes_: {},
            text: false,
            _tags_: {
                param: {
                    xmlName: "Param",
                    multiple: false,
                    required: true,
                    _attributes_: {},
                    text: false,
                    _tags_: {}    // pas de balises filles
                }
            }
        }
    }
};

var basedata = {};