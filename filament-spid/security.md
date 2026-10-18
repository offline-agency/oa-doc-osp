---
title: Filament SPID security and acceptance
description: Check SPID dependency floors, key handling, authorization, deployment checks and the distinction between local validation and formal acceptance.
gitName: filament-spid
packageVersion: '1.0.0'
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
---

# Filament SPID security and acceptance

## Deployment requirements

- Keep the pinned corrected SAML dependency until [issue #16](https://github.com/offline-agency/filament-spid/issues/16) is resolved and the replacement release is verified. Preserve `onelogin/php-saml >=4.3.1` and `robrichards/xmlseclibs >=3.1.5`, require successful SPID patch application and run `composer audit`. These are release security floors, not a guarantee against future advisories.
- Keep signing keys outside public paths, version control, logs and AI prompts. Use your own matching certificate/key pair, not upstream example keys; restrict filesystem access and plan renewal.
- Request at least SpidL2 with the default minimum, implement explicit canAccessPanel authorization and keep automatic account creation off unless justified. Review password login/reset policy when SPID must be the only entry point.
- Use HTTPS, verified TLS, secure cookies and explicit trusted proxies. Exempt only the ACS from CSRF. Verify actual CSRF behavior and CSP in HTTP/browser checks; doctor skip results do not prove either.
- Minimize requested and stored attributes and define retention. Ensure application logging does not expose fiscal codes, SAML payloads or session secrets.
- Keep real IdP configuration current; no test IdPs in production. Test login refusal, permitted login and logout on the application's actual guard and infrastructure.

## Three different evidence levels

| Evidence | What it establishes |
| --- | --- |
| Doctor and local metadata/lab reports | Configuration and tests on a specified version/document/environment only |
| Hosted AgID Validator results | Separate hosted metadata/request/response checks on the deployed service |
| Formal SPID acceptance | Organisation-specific procedure and confirmation; not granted by this package or local tooling |

This documentation update performed source/distribution checks and site validation. It did not run the hosted Validator, a real SPID identity login or formal acceptance, and does not claim that any service is accredited. Release evidence is scoped to its recorded fixtures and environments, not every deployment.

During an authorized acceptance window use `FILAMENT_SPID_DEPLOYMENT=acceptance`, only the official Validator as the extra IdP, and retain results privately. Follow the applicable AgID procedure. After acceptance work, remove the Validator/test IdPs, set deployment to production and perform an authorized end-to-end check. Review the [release's production checklist](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/production-checklist.md), [AgID testing guide](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/testing/agid.md) and [scoped evidence](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/testing/evidence.md).
