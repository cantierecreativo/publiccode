const schema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  title: "PublicCode",
  description: "A schema def for validate publicode yaml",
  type: "object",
  properties: {
    "publiccode-yaml-version": {
      title: "publiccode-yaml-version",
      type: "string",
      default: "1.0"
    },
    name: {
      title: "Name",
      type: "string",
      description: "This key contains the name (short) of the product."
    },
    applicationSuite: {
      title: "applicationSuite",
      description:
        "This key contains the name of the suite to which the software belongs",
      type: "integer",
      minimum: 0
    },
    url: {
      title: "Url",
      type: "string"
    },
    landingURL: {
      title: "Landing Url",
      type: "string"
    },
    isBasedOn: {
      title: "isBasedOn",
      type: "string",
      description:
        "In case this software is a variant or a fork of another software, which might or might not contain a publiccode.yml file, this key will contain the url of the original project(s)."
    },
    softwareVersion: {
      title: "softwareVersion",
      default: "1.0",
      type: "string",
      description:
        "This key contains the latest stable version number of the software."
    },
    releaseDate: {
      title: "ReleaseDate",
      type: "string",
      description:
        "This key contains the date at which the latest version was released."
    },
    logo: {
      title: "Logo",
      type: "string"
    },
    monochromeLogo: {
      title: "MonochromeLogo",
      type: "string"
    },
    platforms: {
      title: "Platforms",
      type: "array",
      title: "A multiple choices list",
      items: {
        type: "string",
        enum: ["foo", "bar", "fuzz", "qux"]
      }
    },
    tags: {
      title: "Tags",
      type: "array",
      items: {
        type: "string",
        enum: ["foo", "bar", "fuzz", "qux"]
      },
      uniqueItems: true
    },
    usedBy: {
      title: "usedBy",
      type: "array",
      items: {
        type: "string"
      }
    },
    roadmap: {
      title: "roadmap",
      type: "string"
    },
    developmentStatus: {
      title: "developmentStatus",
      type: "string"
    },
    softwareType: {
      title: "softwareType",
      type: "string"
    }
  },
  required: [
    "publiccode-yaml-version",
    "name",
    "url",
    "softwareVersion",
    "releaseDate",
    "developmentStatus",
    "softwareType"
  ]
};

export default { schema, uiSchema };
