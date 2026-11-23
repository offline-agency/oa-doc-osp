---
title: "ODPS Validator — 1.0.0"
description: "Archived ODPS Validator 1.0.0 (commit afd8c83, 2025-05-20): requirements, changes and the README shipped with the tag."
permalink: /odps-validator/1.0.0/
packageVersion: "1.0.0"
sourceCommit: afd8c834102142091aca3e685f64c6eb35710395
documentationSnapshot: true
documentationArchive: generated-tag
---
# ODPS Validator 1.0.0

This archived page describes tag `1.0.0` of [offline-agency/odps-validator](https://github.com/offline-agency/odps-validator). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/odps-validator/) for the maintained release (1.0.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.0.0](https://github.com/offline-agency/odps-validator/releases/tag/1.0.0) |
| Commit | [`afd8c834102142091aca3e685f64c6eb35710395`](https://github.com/offline-agency/odps-validator/tree/afd8c834102142091aca3e685f64c6eb35710395) |
| Commit date | 2025-05-20 |
| npm package name | `nextjs-odps-validator` (manifest version `1.0.0`) |

## Requirements

`package.json` `dependencies`:

- `next`: `latest`
- `react`: `latest`
- `react-dom`: `latest`
- `bootstrap`: `^5.0.0`
- `js-yaml`: `^4.1.0`
- `ajv`: `^8.12.0`

## Changes

First tag of the repository: 7 non-merge commits up to this tag.

## README at 1.0.0

Shipped as [`README.md`](https://github.com/offline-agency/odps-validator/blob/afd8c834102142091aca3e685f64c6eb35710395/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### ODPS Validator
[![GitHub release](https://img.shields.io/github/release/offline-agency/odps-validator?include_prereleases=&sort=semver&color=blue)](https://github.com/offline-agency/odps-validator/releases/)
![License](https://img.shields.io/badge/License-MIT-blue)
[![issues - odps-validator](https://img.shields.io/github/issues/offline-agency/odps-validator)](https://github.com/offline-agency/odps-validator/issues)

This project provides a Next.js web application to validate YAML or JSON content against different versions of the ODPS (Open Data Product Schema) JSON Schema.

#### Features

* Select ODPS schema version (v1.0, v2.0, v3.0)
* Paste YAML or JSON content to validate
* Displays validation errors or success messages
* Schemas are loaded locally for offline use

#### Project Structure

```
nextjs-odps-validator/
├── public/
│   └── schemas/
│       ├── v1.0/odps.yaml       # ODPS v1.0 JSON Schema
│       ├── v2.0/odps.yaml       # ODPS v2.0 JSON Schema
│       └── v3.0/odps.yaml       # ODPS v3.0 JSON Schema
├── pages/
│   ├── _app.js                  # Bootstrap CSS import
│   └── index.js                 # App entry and validation logic
├── package.json
└── README.md
```

#### Sample Schema Snippet (v1.0)

```yaml
$schema: "http://json-schema.org/draft-07/schema#"
title: "Open Data Product Schema v1.0"
type: object
properties:
  SLA:
    type: array
    items:
      type: object
      properties:
        dimension:
          type: string
        objective:
          type: number
        unit:
          type: string
      required: [dimension, objective, unit]
  dataAccess:
    type: object
    properties:
      format:
        type: string
      specification:
        type: string
    required: [format, specification]
required: [SLA, dataAccess]
```

*(Full schemas are located in **`public/schemas/{version}/odps.yaml`**.)*

#### Installation

```bash
npm install
```

#### Development

```bash
npm run dev
```

#### Build & Run

```bash
npm run build
npm start
```

#### How to Add New Schema Versions

1. Place the new `odps.yaml` under `public/schemas/{new-version}/`.
2. No code change required—folders are auto-discovered at build time.

#### License

This project is licensed under the MIT License.

© 2025 [Offline Agency](https://offlineagency.it). All rights reserved.

#### Contributors

Built and maintained by [Offline Agency](https://offlineagency.it).

We welcome contributions! Please open a pull request or issue on [Github](https://github.com/offline-agency/odps-validator/issues)
:::
