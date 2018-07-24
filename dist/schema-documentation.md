
## <a name="resource-applicationSuite">applicationSuite</a>


This key contains the name of the 'suite' to which the software belongs.


## <a name="resource-dependsOn">dependsOn</a>


This section provides an overview on the system-level dependencies required to install and use this software.

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **hardware** | *array* | This key contains a list of hardware dependencies that must be owned to use the software. | `[{"name":"example","versionMin":"example","versionMax":"example","version":"example","optional":true}]` |
| **open** | *array* | This key contains a list of runtime dependencies that are distributed under an open-source license. | `[{"name":"example","versionMin":"example","versionMax":"example","version":"example","optional":true}]` |
| **proprietary** | *array* | TThis key contains a list of runtime dependencies that are distributed under a proprietary license. | `[{"name":"example","versionMin":"example","versionMax":"example","version":"example","optional":true}]` |


## <a name="resource-developmentStatus">developmentStatus</a>


Allowed values: concept, development, beta, stable, obsolete


## <a name="resource-inputTypes">inputTypes</a>


A list of Media Types (MIME Types) as mandated in RFC 6838 which the application can handle as output. In case the software does not support any input, you can skip this field or use application/x.empty.


## <a name="resource-intendedAudience">intended audience</a>




### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **countries** | *array* | This key explicitly includes certain countries in the intended audience, i.e. the software explicitly claims compliance with specific processes, technologies or laws. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes. | `[null]` |
| **onlyFor** | *array* | Public software could be very specific in scope because there is a large set of tasks that are specific to each type of administration. For instance, many softwares that are used in schools are probably not useful in hospitals. If you want to explicitly mark some software as only useful to certain types of administrations, you should add them to this key.The list of allowed values is defined in pa-types.md, and can be country-specific. This list can evolve at any time, separately from the version of this specification. | `[null]` |
| **unsupportedCountries** | *array* | This key explicitly marks countries as NOT supported. This might be the case if there is a conflict between how software is working and a specific law, process or technology. All countries are specified using lowercase ISO 3166-1 alpha-2 two-letter country codes. | `[null]` |


## <a name="resource-isBasedOn">isBasedOn</a>


In case this software is a variant or a fork of another software, which might or might not contain a publiccode.yml file, this key will contain the url of the original project(s). The existence of this key identifies the fork as a software variant, descending from the specified repositories.


## <a name="resource-landingURL">landingURL</a>


If the url parameter does not serve a human readable or browsable page, but only serves source code to a source control client, with this key you have an option to specify a landing page. This page, ideally, is where your users will land when they will click a button labeled something like 'Go to the application source code'. In case the product provides an automated graphical installer, this URL can point to a page which contains a reference to the source code but also offers the download of such an installer.


## <a name="resource-legal">legal</a>


This section provides an overview of the legal info of the software.

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **authorsFile** | *string* | Some open-source softwares adopt a convention of identify the copyright holders through a file that lists all the entities that own the copyright. This is common in projects strongly backed by a community where there are many external contributors and no clear single/main copyright owner. In such cases, this key can be used to refer to the authors file, using a path relative to the root of the repository. | `"example"` |
| **license** | *string* | This string describes the license under which the software is distributed. The string must contain a valid SPDX expression, referring to one (or multiple) open-source license. Please refer to the SPDX documentation for further information. | `"example"` |
| **mainCopyrightOwner** | *string* | This string describes the entity that owns the copyright on 'most' of the code in the repository. Normally, this is the line that is reported with the copyright symbol at the top of most files in the repo. | `"example"` |
| **repoOwner** | *string* | This string describes the entity that owns this repository; this might or might not be the same entity who owns the copyright on the code itself. For instance, in case of a fork of the original software, the repoOwner is probably different from the mainCopyrightOwner. | `"example"` |


## <a name="resource-localisation">localisation</a>


This section provides an overview of the localization features of the software.

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **availableLanguages** | *array* | If present, this is the list of languages in which the software is available. Of course, this list will contain at least one language. See also: https://en.wikipedia.org/wiki/ISO_639-2 | `[null]` |
| **localisationReady** | *boolean* | If yes, the software has infrastructure in place or is otherwise designed to be multilingual. It does not need to be available in more than one language. | `true` |


## <a name="resource-logo">logo</a>


This key contains the logo of the software. Logos should be in vector format; raster formats are only allowed as a fallback. In this case, they should be transparent PNGs, minimum 1000px of width. Acceptable formats: SVG, SVGZ, PNG


## <a name="resource-maintenance">maintenance</a>




### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **contacts** | *array* | One or more contacts maintaining this software. This key describes the technical people currently responsible for maintaining the software. All contacts need to be a physical person, not a company or an organisation. if somebody is acting as a representative of an institution, it must be listed within the affiliation of the contact. In case of a commercial agreement (or a chain of such agreements), specify the final entities actually contracted to deliver the maintenance. Do not specify the software owner unless it is technically involved with the maintenance of the product as well. | `[{"name":"example","email":"example","phone":"example","affiliation":"example"}]` |
| **contractors** | *array* | This key describes the entity or entities, if any, that are currently contracted for maintaining the software. They can be companies, organizations, or other collective names. | `[{"name":"example","until":"example","website":"example"}]` |
| **type** | *array* | This key describes how the software is currently maintained. 'internal' means that the software is internally maintained by the repository owner. 'contract' means that there is a commercial contract that binds an entity to the maintenance of the software; 'community' means that the software is currently maintained by one or more people that donate their time to the project; 'none' means that the software is not actively maintained. | `[null]` |


## <a name="resource-monochromeLogo">monochromeLogo</a>


A monochromatic (black) logo. The logo should be in vector format; raster formats are only allowed as a fallback. In this case, they should be transparent PNGs, minimum 1000px of width. Acceptable formats: SVG, SVGZ, PNG


## <a name="resource-name">The Name</a>





## <a name="resource-outputTypes">outputTypes</a>


A list of Media Types (MIME Types) as mandated in RFC 6838 which the application can handle as output. In case the software does not support any output, you can skip this field or use application/x.empty.


## <a name="resource-platforms">platforms</a>


Values: web, windows, mac, linux, ios, android. Human readable values outside this list are allowed


## <a name="resource-publiccodeYamlVersion">publicodeYamlVersion</a>


This key contains the name of the software. It contains the (short) public name of the product, which can be localised in the specific localisation section. It should be the name most people usually refer to the software. In case the software has both an internal 'code' name and a commercial name, use the commercial name.


## <a name="resource-releaseDate">releaseDate</a>


This key contains the date at which the latest version was released. This date is mandatory if the software has been released at least once and thus the version number is present.


## <a name="resource-roadmap">roadmap</a>


A link to a public roadmap of the software.


## <a name="resource-softwareType">softwareType</a>


Allowed values: standalone, addon, library, configurationFiles


## <a name="resource-softwareVersion">softwareVersion</a>


This key contains the latest stable version number of the software. The version number is a string that is not meant to be interpreted and parsed but just displayed; parsers should not assume semantic versioning or any other specific version format.


## <a name="resource-swDescription">swDescription</a>





## <a name="resource-tags">tags</a>


A list of words that can be used to describe the software and can help building catalogs of open software. Each tag must be in Unicode lowercase, and should not contain any Unicode whitespace character. The suggested character to separate multiple words is - (single dash). See also: description/[lang]/freeTags/


## <a name="resource-url">url</a>


A unique identifier for this software. This string must be a URL to the source code repository (git, svn, ...) in which the software is published. If the repository is available under multiple protocols, prefer HTTP/HTTPS URLs which don't require user authentication.


## <a name="resource-usedBy">usedBy</a>


A list of the names of prominent public administrations (that will serve as testimonials) that are currently known to the software maintainer to be using this software. Parsers are encouraged to enhance this list also with other information that can obtain independently; for instance, a fork of a software, owned by an administration, could be used as a signal of usage of the software.


