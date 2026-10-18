---
title: Filament SPID diagnostics
description: Run the read-only doctor and pinned local metadata validator with explicit exit codes and limits on acceptance evidence.
gitName: filament-spid
packageVersion: '1.0.0'
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
---

# Filament SPID diagnostics

## Doctor

```bash
php artisan filament-spid:doctor
php artisan filament-spid:doctor --json
php artisan filament-spid:doctor --strict
```

The [doctor](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/src/Commands/DoctorCommand.php) reads dependencies, configuration, files and the user model's database schema. It performs no login, migration, publication, configuration write or network request of its own. It checks dependency security floors (`onelogin/php-saml >=4.3.1`, `robrichards/xmlseclibs >=3.1.5`), the SPID patch's metadata behavior, panel/guard, user model and schema, minimum SPID level, HTTPS/session, assets, certificate matching/expiry and test IdPs.

| Exit | Meaning |
| --- | --- |
| `0` | No failing check; warnings may still exist without strict mode |
| `1` | Failure, or warning with `--strict` |
| `2` | Invalid invocation or internal error |

JSON has `schema_version: 1`, `overall_status` and individual checks (`pass`, `warn`, `fail`, `skip`). CSRF and CSP are **skip**, because the CLI cannot observe actual request middleware or deployed headers. Verify these separately; skip is never pass. A passing doctor is not a vulnerability audit or acceptance certificate.

## Metadata validation

Install the separate validation tools; they are not runtime login dependencies:

```bash
uv tool install spid-sp-test==1.2.18
# Install xmlsec1 with your OS package manager (for example apt install xmlsec1).
php artisan filament-spid:metadata:validate --file=metadata.xml --profile=spid-sp-private --json
php artisan filament-spid:metadata:validate --url=https://sp.example.test/spid/metadata --profile=spid-sp-public --strict --report=storage/app/private/spid-validation/metadata.json
```

The [adapter](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/src/Commands/MetadataValidateCommand.php) requires exactly `spid_sp_test 1.2.18` and `xmlsec1`. Choose exactly one of `--url` and `--file`; profile is `spid-sp-public` or `spid-sp-private`, defaulting from the explicitly configured SP profile. `--tool` selects an executable, `--timeout` bounds download/tool execution and `--ca-file` supplies a lab CA. HTTPS fetches verify TLS, refuse redirects and enforce a 1 MiB limit; do not disable TLS validation. A URL invocation does make a network request to that metadata URL. Validation uses the exact signed bytes.

Exit 0 means local checks passed (warnings fail under `--strict`); exit 1 means a failing check, including when the external tool exits 0 but its report fails. Missing/wrong tool version, missing xmlsec1, timeout, crash, malformed metadata, empty/unreadable report or zero checks are errors (exit 2), never successful validation.

Reports record SHA-256, profile, plugin/tool versions, time and checks. Preserve reports privately; the command may write `--report` output. Evidence is `LOCAL_METADATA_CHECK_PASSED` (or `_FAILED`, `_ERROR`) and always `HOSTED_VALIDATOR_NOT_RUN` plus `FORMAL_AGID_ACCEPTANCE_NOT_OBTAINED`. Nothing is sent to the hosted Validator by this command. A changed metadata document needs a new check. See the [pinned diagnostics reference](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/diagnostics.md).
