# `publiccode.yml` hyperschema and documentation builder

publiccode.yml is a metadata description standard for public software and policy repositories.

The goal of this standard is to make public software, such as the software developed by public administrations and public organisations, easily discoverable.

The first draft of the implementation has been created by the [Italian Digital Transformation Team](https://teamdigitale.governo.it).

## About the builder

The purpose of this script is to produce, from a hand-made json schema file, a validated and machine-readable json schema that we call _hyperschema_.

Contemporarily the script generates markdown and html documentation files.

The source [schema.json](source/schema.json) file can be edited specifying the required fields, types, validations, available values etc.

The build process creates the hyperschema and the documentation inside the `dist` directory in html, markdown and json (hyperschema) format.

## Setup & usage

Requires Ruby 2.5.1

```
gem install bundler && bundle install
bundle exec ruby generate_docs.rb 
```

## TO-DO
- add country-specific sub-schemas
- find a way to flat and generate documentation for nested  objects
- introduce versioning, producing different builds given multiple input json schema files
- add internationalized fields descriptions

## Licence

Licenced under the [AGPL](LICENSE)

