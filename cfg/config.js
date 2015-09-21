"use strict";

var XMLEditor = XMLEditor || {};
XMLEditor.Config = {
    _attributes_: {    // attributes of the current tag
        adress: {          // key for the parser
            xmlName: "Adress",   // field label and XML key
            type: "input",       // type of the attribute (input|boolean|select|textarea)
            required: true,      // true if the attribute is required
            defaultvalue: null   // default value if there is one
        }
    },
    _tags_: {
        books: {
            xmlName: "Books",
            multiple: false,
            required: true,
            _attributes_: {},
            text: false,     // text node (true | false | default value)
            _tags_: {        // children tags of the current tag
                book: {
                    xmlName: "Book",
                    multiple: true,    // true if there can be many of this tag
                    required: true,    // true if we need at least one of this tag
                    _attributes_: {
                        title: { 
                            xmlName: "Title",  
                            type: "input",  
                            required: true, 
                            defaultvalue: null   
                        },
                        publicationdate: {
                            xmlName: "PublicationDate",
                            type: "input",
                            required: false,
                            defaultvalue: null
                        }
                    },
                    text: false,
                    _tags_: { 
                        author: {
                            xmlName: "Author",
                            multiple: false,
                            required: false,
                            _attributes_: {
                                name: {
                                    xmlName: "Name", 
                                    type: "input",
                                    required: true,
                                    defaultvalue: null
                                },
                                birthdate: {
                                    xmlName: "Birthdate",
                                    type: "input",
                                    required: false,
                                    defaultvalue: null
                                },
                                nationality: {
                                    xmlName: "Nationality",
                                    type: "select",
                                    required: false,
                                    defaultvalue: null,
                                    possibleValues: ["EN", "US", "EI", "FR", "GE", "IT", "Other"]
                                }
                            }, 
                            text: false,
                            _tags_: {}
                        }
                    }
                }
            }
        }
    }
};
