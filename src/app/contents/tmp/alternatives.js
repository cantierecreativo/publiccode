const schema = {
  title: "Public code",
  type: "object",
  definitions: {
    tag: {
      type: "array",
      items: {
        type: "string"
      }
    },

    descr_obj: {
      type: "object",
      properties: {
        localisedName: {
          type: "string"
        },
        shortDescription: {
          type: "string",
          default: "short desc"
        },
        longDescription: {
          type: "string",
          default: "long description"
        },
        documentation: {
          type: "string"
        },
        apiDocumentation: {
          type: "string"
        },
        featureList: {
          type: "array",
          items: {
            type: "string"
          }
        },
        screenshots: {
          type: "array",
          items: {
            type: "string"
          }
        },
        videos: {
          type: "array",
          items: {
            type: "string"
          }
        },
        awards: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "language",
        "longDescription",
        "shortDescription",
        "featureList"
      ]
    }
  },
  properties: {
    "publiccode-yaml-version": {
      type: "string",
      title: "Version of specification",
      default: "http://w3id.org/publiccode/version/0.1"
    },
    name: {
      type: "string",
      title: "Name",
      default: " - "
    },

    _freeTags: {
      DEU: { $ref: "#/definitions/tag" },
      ARA: { $ref: "#/definitions/tag" }
    },

    _description: {

      type: "array",
      items: {
        language: {
          type: "String",
          title: "Language",
          enum: ["DEU","ARA","ITA","ZHO"]

        },
        description: { $ref: "#/definitions/descr_obj" },
        uniqueItems:true
      },
      required: ["language", "description"]
    }


    description:{
    "description" : "schema validating people and vehicles",
    "type" : "object",
    "anyOf" : [{
        "properties" : {
            "it" : {
                "type" : "object",
                "properties" : {

                }

            },

        },
        "required" : ["firstName"]
    }, {
        "properties" : {
            "vehicle" : {
                "type" : "string"
            },
            "price" : {
                "type" : "integer"
            }
        },
        "additionalProperties":false
    }
]
}

  },
  required: ["publiccode-yaml-version", "name", "description"]
};
