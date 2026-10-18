---
title: Filament SPID troubleshooting
description: Resolve Composer, SPID patch, panel authorization, ACS, assets and validator failures without bypassing security.
gitName: filament-spid
packageVersion: '1.0.0'
sourceCommit: 99f80235a6be15b6365840f46f160476e2fdb38e
---

# Filament SPID troubleshooting

| Symptom | Check and action |
| --- | --- |
| Composer cannot resolve the stable plugin | Verify the complete [installation](/filament-spid/installation/) sequence, PHP/Laravel/Filament constraints, fork repository, pinned alias, patch plugin permission and lockfile. Packagist availability alone does not resolve the SAML dependency. Never ignore advisories. |
| SPID patch fails or doctor reports spid_patch failure | Stop deployment. Check immutable patch URL, install output and actual patched metadata behavior. PATCHES.txt alone is insufficient. |
| Login button missing | Ensure `->plugin(SpidPlugin::make())` comes after `->login()`, plugin enabled and selected panel correct; republish Filament assets. |
| Login denied or no account found | Confirm requested level is at least SpidL2, minimum is a valid SPID URI, fiscal code is mapped, provisioning policy is deliberate and canAccessPanel grants the actual user access. Do not enable accounts for everyone as a workaround. |
| Database schema failure | Review migration, unique fiscal_code index, spid_data column and user model connection/table before migrating. |
| ACS returns 419 | Check the real library ACS path and narrowly scoped CSRF exception in bootstrap/app.php. Keep other POST endpoints protected. |
| HTTPS, destination or session mismatch behind proxy | Verify external APP_URL, entity/base/ACS URLs, trusted proxies, php-saml proxy variables and secure cookies. Never disable signature validation. |
| Unstyled button or CSP errors | Run filament:assets; verify local scripts/styles are served and inspect real CSP/browser console. The CLI cannot certify CSP. |
| Metadata validation exits 2 | Check exactly spid_sp_test 1.2.18, xmlsec1, tool path, file permissions, report and timeout; ensure URL returns XML directly over verified HTTPS. |
| Doctor flags test IdPs | Remove demo/local IdPs; only official Validator during acceptance, none in production. Re-run strict checks. |

Use [doctor JSON](/filament-spid/diagnostics/) for reproducible diagnostics. Share versions, exit codes and redacted checks, never signing keys, fiscal codes, complete SAML assertions, cookies or production identity payloads. For security reports use the pinned [SECURITY.md](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/SECURITY.md); follow the [upstream troubleshooting](https://github.com/offline-agency/filament-spid/blob/99f80235a6be15b6365840f46f160476e2fdb38e/docs/troubleshooting.md) for deeper cases.
