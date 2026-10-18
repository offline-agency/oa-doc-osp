---
home: true
pageClass: index
title: OFFLINE Agency open-source documentation
seoTitle: Open-source package documentation
description: >-
  Release-pinned guides to OFFLINE Agency open-source Laravel, Vue and
  PostgreSQL packages, with versions, sources and known limitations.
heroImage: null
heroText: Docs
tagline: >-
  Open source project guides, with explicit release, source and compatibility
  information.
actionText: null
actionLink: null
intro: >-
  We publish Laravel packages, Vue components and developer tools extracted from
  our application work. Compare each project’s declared requirements with your
  platform before installing.
openSource:
  title: Why we love open source
  intro: >-
    Almost every project we deliver runs on open source: Laravel, Vue,
    PostgreSQL, MongoDB. Publishing the tools we extract from client work is how
    we give something back to the ecosystem we build on.
  reasons:
    - title: Shared code gets better
      text: >-
        Public packages are read, tested and reported on by developers outside
        our team. Bugs surface sooner, and every fix reaches all the projects
        that use the package.
    - title: No lock-in for our clients
      text: >-
        Clients can inspect, fork and maintain the code their product depends
        on, with or without us. Their software stays theirs.
    - title: Claims you can verify
      text: >-
        Open code makes documentation checkable. That is why every guide here
        states its exact release, source and known limits.
projectTypes:
  - title: Current project
  - title: Legacy
projects:
  - title: laravel-cart
    link: /laravel-cart/
    details: >-
      Shopping carts with VAT, coupons, atomic database mutations and opt-in
      guest transfer. Checkout tax limits documented.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v4.1.0
    requirements: Laravel 12 / 13
  - title: laravel-webex
    link: /laravel-webex/
    details: >-
      Webex Meetings and Messaging APIs with per-request bearer tokens, typed
      results and guarded pagination.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v2.0.0
  - title: laravel-fatture-in-cloud-v2
    link: /laravel-fatture-in-cloud-v2/
    details: >-
      Fatture in Cloud API v2 wrapper. Company configuration, typed results and
      implemented endpoint coverage.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v3.0.1
    requirements: API v2
  - title: laravel-aruba-sms
    link: /laravel-aruba-sms/
    details: >-
      Aruba SMS notification channel, message builder, sandbox mode and credit
      monitoring.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v1.1.0
  - title: laravel-mongo-auto-sync
    link: /laravel-mongo-auto-sync/
    details: >-
      Synchronize configured embedded copies between MongoDB documents through
      explicit CRUD methods.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v3.1.1
    requirements: See requirements
  - title: laravel-fatture-in-cloud
    link: /laravel-fatture-in-cloud/
    details: >-
      Wrapper for API v1, retired by the provider from 31 January 2023.
      Migration reference only; use the API v2 guide for new work.
    type: Legacy
    maintenanceStatus: legacy
    ecosystem: php
    release: v2.2.8
  - title: laravel-bank-of-italy
    link: /laravel-bank-of-italy/
    details: >-
      Bank of Italy exchange-rate data through the released CSV API wrapper,
      with explicit query and error handling.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v1.0.1
  - title: ODPS Validator
    link: /odps-validator/
    details: >-
      Standalone JSON/YAML validation app with bundled schemas, browser-side
      results and documented schema limitations.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: javascript
    release: v1.0.1
    requirements: Source release
  - title: Braintree Vue 3
    link: /braintree-vue3/
    details: >-
      Vue 3 Braintree composables and hosted fields. No verified published
      package.
    type: Current project
    maintenanceStatus: next
    ecosystem: javascript
    release: Pinned commit
    requirements: Evaluation only
  - title: Vue 3 Burger Menu
    link: /vue3-burger-menu/
    details: >-
      Off-canvas Vue 3 menus with explicit source setup and a warning about the
      incomplete npm artifact.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: javascript
    release: v1.1.2
    requirements: GitHub release
  - title: SPID Laravel Trentino
    link: /spid-laravel-trentino/
    details: >-
      Laravel login through AAC Trentino OpenID Connect, with PKCE, token
      middleware and transaction logs.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v2.3.0
  - title: pgr_dmmsy
    link: /pgr_dmmsy/
    details: >-
      PostgreSQL shortest-path extension with explicit targets, build
      requirements and implementation limits.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: postgresql
    release: v0.1.0
    requirements: Research use
  - title: Filament SPID
    link: /filament-spid/
    details: >-
      SPID SAML login for Filament panels, with a pinned patched upstream
      dependency, installer, diagnostics and local metadata validation.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
    release: v1.0.0
    requirements: PHP 8.3+ / Laravel 12–13 / Filament 3–5
---

<div>

### How versions work

Documentation versions belong to each project, independently of VuePress. Each page identifies the exact source release; other guides keep their existing release permalinks.

</div>
<div>

### Compatibility lines

- [Laravel Cart v4](/laravel-cart/v4/)
- [SPID v2](/spid-laravel-trentino/v2/)
- [Burger Menu v1](/vue3-burger-menu/v1/)
- [pgr_dmmsy v0.1](/pgr_dmmsy/v0.1/)

</div>
<div>

### Archives and previews

- [Laravel Cart 4.0.3 archive](/laravel-cart/4.0.3/)
- [Braintree next](/braintree-vue3/next/) (unreleased)
- [Moneta reference](/laravel-moneta-online/) (unverified, kept for historical links; not part of the catalog)

</div>
