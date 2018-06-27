import moment from "moment";
import langs from "./langs";
import tags from "./tags";
const date_format = "YYYY-MM-DD";
let tag_names = tags.map(t => t.tag);
let tag_descrs = tags.map(t => t.descr);
let developmentStatus_list = [
  "concept",
  "development",
  "beta",
  "stable",
  "obsolete"
];
let softwareType_list = [
  "standalone",
  "addon",
  "library",
  "configurationFiles"
];

const schema = {
  title: "Public code",
  type: "object",
  definitions: {
    legal: {
      type: "object",
      properties: {
        license: {
          type: "string",
          title: "License",
          default: "MIT"
        },
        mainCopyrightOwner: {
          type: "string",
          title: "Main Copyright Owner"
        },
        repoOwner: {
          type: "string",
          title: "Repo Owner",
          default: "owner"
        },
        authorsFile: {
          type: "string",
          title: "Author's File"
        }
      },
      required: ["license", "repoOwner"]
    },

    list: {
      type: "array",
      items: {
        type: "string"
      }
    },
    person: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Name"
        },
        email: {
          type: "string",
          title: "Email"
        },
        affiliation: {
          type: "string",
          title: "Affiliation"
        },
        phone: {
          type: "string",
          title: "Phone"
        }
      }
    },
    library: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Name"
        },
        versionMin: {
          type: "string",
          title: "versionMin"
        },
        versionMax: {
          type: "string",
          title: "versionMax"
        },
        version: {
          type: "string",
          title: "Version"
        },
        optional: {
          type: "boolean",
          title: "Optional",
          default: false
        }
      }
    },
    description_lang: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          $ref: "#/definitions/description"
        },
        freeTags: {
          $ref: "#/definitions/list"
        }
      }
    },

    description: {
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
          default: "long description",
          widget:"textarea"
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
      required: ["longDescription", "shortDescription"]
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
    applicationSuite: {
      type: "string",
      title: "Applicationsuite"
    },
    url: {
      type: "string",
      title: "url",
      default: "https://sampleurl.com"
    },
    landingURL: {
      type: "string",
      title: "landingURL",
      widget: "url"
    },
    isBasedOn: {
      type: "array",
      items: {
        type: "string"
      }
    },
    softwareVersion: {
      type: "string",
      title: "Softwareversion",
      default: "1.0"
    },
    releaseDate: {
      type: "string",
      title: "Releasedate",
      default: moment().format(date_format),
      widget: "date"
    },
    logo: {
      type: "string",
      title: "Logo"
    },
    monochromeLogo: {
      type: "string",
      title: "Monochrome Logo"
    },
    platforms: {
      type: "array",
      items: {
        type: "string",
        default: "web",
        enum: ["web", "windows", "mac", "linux", "ios", "android"]
      }
    },
    tags: {
      type: "array",
      items: {
        type: "string",
        enum: tag_names,
        enumNames: tag_descrs
      },
      default: ["email"]
    },

    usedBy: {
      type: "array",
      items: {
        type: "string"
      }
    },
    roadmap: {
      type: "string",
      title: "Roadmap"
    },

    developmentStatus: {
      type: "array",
      uniqueItems: true,
      title: "developmentStatus",
      items: {
        type: "string",
        enum: developmentStatus_list
      },
      default: ["development"]
    },
    softwareType: {
      type: "array",
      uniqueItems: true,
      title: "softwareType",
      items: {
        type: "string",
        enum: softwareType_list
      },
      default: ["standalone"]
    },

    intendedAudience: {
      type: "object",
      properties: {
        onlyFor: {
          type: "array",
          items: {
            type: "string"
          }
        },
        countries: {
          type: "array",
          items: {
            type: "string",
            title: "List of countries"
          }
        },
        unsupportedCountries: {
          type: "array",
          items: {
            type: "string",
            title: "List of countries"
          }
        }
      }
    },

    description: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          language: {
            type: "string",
            title: "Language",
            enum: langs
          },
          description: { $ref: "#/definitions/description_lang" }
        },
        required: ["language", "description"]
      }
    },

    // description: {
    //   type: "object",
    //   uniqueItems: true,
    //   properties: {
    //     ita: {
    //       $ref: "#/definitions/description_lang"
    //     },
    //     en: {
    //       $ref: "#/definitions/description_lang"
    //     }
    //   }
    // },

    legal: {
      type: "object",
      properties: {
        license: {
          type: "string",
          title: "License",
          default: "MIT"
        },
        mainCopyrightOwner: {
          type: "string",
          title: "Main Copyright Owner"
        },
        repoOwner: {
          type: "string",
          title: "Repo Owner",
          default: "owner"
        },
        authorsFile: {
          type: "string",
          title: "Author's File"
        }
      },
      required: ["license", "repoOwner"]
    },

    maintenance: {
      type: "object",
      properties: {
        type: {
          type: "array",
          title: "Type",
          items: {
            type: "string",
            enum: ["internal", "contract", "community", "none"]
          }
        },
        contractors: {
          type: "array",
          items: { $ref: "#/definitions/person" }
        },
        contacts: {
          type: "array",
          items: { $ref: "#/definitions/person" }
        }
      },
      required: ["contacts"]
    },

    localisation: {
      type: "object",
      properties: {
        localisationReady: {
          type: "boolean",
          title: "Localization Ready",
          default: false
        },
        availableLanguages: {
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    },
    dependsOn: {
      type: "object",
      properties: {
        open: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        },
        proprietary: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        },
        hardware: {
          type: "array",
          items: { $ref: "#/definitions/library" }
        }
      }
    }
  },
  required: [
    "publiccode-yaml-version",
    "name",
    "url",
    "releaseDate",
    "tags",
    "developmentStatus",
    "softwareType",
    "description",
    "legal"
  ]
};

const uiSchema = {
  releaseDate: {
    "ui:widget": "date"
  },
  url: {
    "ui:widget": "uri"
  },
  developmentStatus: {
    "ui:widget": "checkboxes"
  },
  softwareType: {
    "ui:widget": "checkboxes"
  }
};

export default { schema, uiSchema };
