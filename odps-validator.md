---
title: ODPS Validator
description: Run the ODPS Validator 1.0.1 web application and understand its bundled schema validation boundaries.
packageVersion: '1.0.1'
sourceCommit: bed32b74b2cf353bfebb134aab9dfb41ac033d81
gitName: odps-validator
---

# ODPS Validator

A standalone Next.js application for pasting JSON or YAML and checking it against bundled schema files. Validation runs in the browser with Ajv; the application fetches the selected schema from its own static assets. It is separate from Laravel and from this VuePress documentation site.

This guide describes GitHub release **1.0.1**, commit [`bed32b74b2cf353bfebb134aab9dfb41ac033d81`](https://github.com/offline-agency/odps-validator/tree/bed32b74b2cf353bfebb134aab9dfb41ac033d81), checked on **16 October 2026**. The release's `package.json` still says `1.0.0` and names the application `nextjs-odps-validator`; the documentation version follows the GitHub release tag. No public npm package was found under that manifest name. Install the released source, rather than inventing an npm or Composer library installation.

[Release](https://github.com/offline-agency/odps-validator/releases/tag/1.0.1) · [Implementation](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/pages/index.js) · [MIT license](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/LICENSE)

::: warning Validation scope
A green result means the supplied value passed the **bundled file and this application's validator configuration**. It is not certification of conformance to every official Open Data Product Specification rule. The released files/configuration have permissive behavior described below, including accepting empty input and some non-object JSON values.
:::

## Release and schema versions

Application **1.0.1** and schema folder names **v3.0/v3.1** are different version systems. The actual release includes:

| Folder | Source | Behavior |
| --- | --- | --- |
| `v3.0` | [Bundled YAML](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/public/schemas/v3.0/odps.yaml) | Default selection because folders are sorted; requires several top-level fields |
| `v3.1` | [Bundled YAML](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/public/schemas/v3.1/odps.yaml) | Requires top-level `schema`, `version` and `product`; those properties have their declared types |

The README's v1.0/v2.0/v3.0 list does not match the released assets. No v1.0 or v2.0 schema is bundled. The folder names do not independently establish the files' completeness or official provenance.

## Requirements and installation

The project does not declare a Node `engines` policy. Its committed lockfile resolves Next.js **15.3.2**, React/React DOM **19.1.0**, Bootstrap **5.3.6**, Ajv **8.17.1** and js-yaml **4.1.0**. The locked Next.js package declares Node `^18.18.0 || ^19.8.0 || >=20.0.0`; those minimums are not a recommendation to use end-of-life Node releases. The local checks used **Node 24.13.0 LTS and npm 11.6.2**.

```sh
git clone --branch 1.0.1 --depth 1 https://github.com/offline-agency/odps-validator.git odps-validator
cd odps-validator
git rev-parse HEAD
npm ci
npm run dev
```

The checkout should resolve to `bed32b74b2cf353bfebb134aab9dfb41ac033d81`. Open `http://localhost:3000`. Keep the committed lockfile: `next`, `react` and `react-dom` are declared as `latest`, so resolving dependencies afresh can select a different application stack. The frozen install and build are reproduction checks, not a security audit or a claim that these dependency versions remain supported.

No Laravel provider, database, bearer token or environment credentials are required by this release. Dependencies belong to the application checkout, not to a consuming Laravel application or to the documentation repository.

## Quick start

Select **v3.1**, then paste this synthetic YAML and press **Validate**:

```yaml
schema: https://example.invalid/odps.yaml
version: "3.1"
product:
  en:
    name: Synthetic example
```

Expected result: **Content is valid for v3.1**. This intentionally small fixture demonstrates the implemented checks; it is not a complete real-world data product description. The `schema` value is data: the application does not fetch that URL or use it to choose the validation schema.

Change `version: "3.1"` to `version: 3.1`. YAML now creates a number, and the UI reports a validation error at **`/version`** because the bundled property requires a string. JSON input with the same object/string values produces the same success result.

## Implemented validation flow

The submit handler:

1. Fetches `/schemas/{selected-folder}/odps.yaml` from the application's origin and loads it with js-yaml.
2. Tries `JSON.parse(content)`; if JSON parsing fails, tries `YAML.load(content)`.
3. Creates `new Ajv({ allErrors: true, strict: false })`, compiles the loaded schema and validates the parsed value.
4. Displays success, a list of errors using `instancePath` and `message`, or a caught exception message.

There is no exported validation SDK, server validation API, file upload, batch endpoint or application persistence layer in the release. Reuse of this UI is not a substitute for validating submitted data at your application's trusted boundary. The handler does not POST the pasted text; it fetches the local schema. This source observation is not a guarantee about every future hosted deployment or its added scripts.

### Known schema/configuration limitations

- The root schemas have no `type: object`. The tested release accepts JSON `42` and empty YAML input. Require the intended document shape separately before relying on validation.
- Selecting `v3.1` does not require the document's string `version` to equal `"3.1"`: the property has a string type but no matching `const`.
- Ajv 8 does not bundle string format implementations. The application does not register `ajv-formats`; with this configuration, `format: uri` produces warnings and is ignored. A non-URI string can pass. See [Ajv's format documentation](https://ajv.js.org/guide/formats.html).
- Undeclared properties are not generally rejected. Passing a partial fixture does not establish completeness of a data product's description.
- In the v3.0 file, several required names are at the root while their detailed definitions are nested under `product`. Do not infer that presence and value checks occur at the same level.
- All reported errors are Ajv errors for the bundled schema; there is no separate semantic, business-rule, credential, license or availability check.

These are documented release limitations, not changes applied to the upstream application.

## Build and static serving

The released [Next.js configuration](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/next.config.js) sets `output: 'export'` and `trailingSlash: true`:

```sh
npm run build
python3 -m http.server 4177 --bind 127.0.0.1 --directory out
```

Open `http://127.0.0.1:4177`. Serve the generated **`out/`** directory. The source declares a `start` script, but `next start` is not the serving workflow for this static-export configuration. See [Next.js static exports](https://nextjs.org/docs/pages/guides/static-exports).

The application fetches schemas with an absolute `/schemas/...` path. Hosting under a subdirectory needs a reviewed base-path/asset/fetch strategy; the release does not configure one. A deployment workflow in the source does not prove that a particular public URL is deployed or functional. This guide does not publish the application or change its hosting.

## Adding a schema in an application fork

`getStaticProps()` discovers and sorts subdirectories of `public/schemas` **at build time**. A custom schema folder must contain `odps.yaml`; rebuild after adding/removing folders. Adding files to a running static host alone does not update the prebuilt selector. The repository ignores `public` in `.gitignore`, so confirm that new schema assets are actually tracked and included in the build input.

Check a known-valid example, wrong types, missing properties and malformed input for every added schema. Keep a record of the authoritative schema source and license; avoid claiming official version support from a directory name alone.

## Troubleshooting and verification

| Symptom | Check |
| --- | --- |
| Failed to load local schema | The selected `odps.yaml` exists and is served from `/schemas/...`; check hosting base path and HTTP response |
| Unexpected valid result | Root type, required fields, additional properties, ignored formats and selected schema's actual constraints |
| YAML version rejected | Quote numeric-looking version identifiers when the schema requires a string |
| Added folder missing from selector | Rebuild; folder discovery runs in `getStaticProps()` |
| Build changes after reinstall | Use `npm ci` and the release lockfile; do not resolve `latest` dependencies again |

The documentation fixture executes the released submit handler with the locked Ajv/js-yaml versions, local schemas and intercepted fetches: YAML/JSON success, type/parse/load errors and the limitations above. The isolated source release also completed its frozen install and static production build. The upstream release has no test script or test suite; this does not imply that its deployment workflow or a wider browser/support matrix was verified.

Report implementation/schema problems through the [upstream issue tracker](https://github.com/offline-agency/odps-validator/issues), with the application tag, selected schema and a synthetic minimal example. Do not include confidential data or credentials. License: [MIT at the selected commit](https://github.com/offline-agency/odps-validator/blob/bed32b74b2cf353bfebb134aab9dfb41ac033d81/LICENSE).
