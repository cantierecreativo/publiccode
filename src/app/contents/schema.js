import moment from "moment";
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
    legal: {},
    dependencies: {},
    version: {},
    tmpfs: {}
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
      title: "url"
    },
    landingURL: {
      type: "string",
      title: "landingURL"
    },
    isBasedOn: {
      type: "array",
      items: {
        type: "string",
        default: " "
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
      default: moment().format(date_format)
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
      }
    },
    _freeTags: {
      type: "array",
      items: {
        type: "string"
      }
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
      title: "Development Status",
      items: {
        type: "string",
        enum: developmentStatus_list
      }
    },

    softwareType: {
      type: "array",
      title: "softwareType",
      items: {
        type: "string",
        enum: softwareType_list
      }
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

    _description: {
      type: "object",
      properties: {
        localisedName: {
          type: "string"
        },
        shortDescription: {
          type: "string"
        },
        longDescription: {
          type: "string"
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
      required: ["longDescription", "shortDescription", "featureList"]
    },

    legal: {
      type: "object",
      properties: {
        license: {
          type: "string",
          title: "License"
        },
        mainCopyrightOwner: {
          type: "string",
          title: "Main Copyright Owner"
        },
        repoOwner: {
          type: "string",
          title: "Repo Owner"
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
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                title: "Name"
              },
              until: {
                type: "string",
                title: "Until"
              },
              website: {
                type: "string",
                title: "website"
              },
              phone: {
                type: "string",
                title: "Phone"
              }
            }
          }
        },
        contacts: {
          type: "array",
          items: {
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
          }
        }
      },
      required: ["type"]
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
    dependencies: {
      type: "object",
      properties: {
        open: {
          type: "array",
          items: {
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
          }
        },
        proprietary: {
          type: "array",
          items: {
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
          }
        },
        hardware: {
          type: "array",
          items: {
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
          }
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
  // developmentStatus: { items: { "ui:widget": "checkboxes" } },
  softwareType: { items: { "ui:widget": "checkboxes" } }
};

export default { schema, uiSchema };
