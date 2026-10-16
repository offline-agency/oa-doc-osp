---
home: true
pageClass: index
title: Offline Agency open source documentation
description: >-
  Release and source guides to Offline Agency packages, applications and
  developer tools.
heroImage: null
heroText: Docs
tagline: >-
  Open source project guides, with explicit release, source and compatibility
  information.
actionText: null
actionLink: null
cat1Title: Open source projects
cat1DescriptionL1: >-
  We publish Laravel packages, Vue components and developer tools extracted from
  our application work. Each guide identifies its selected release or source
  revision.
cat1DescriptionL2: >-
  Compare each project’s declared requirements with your platform. Published
  releases, source references and retired provider APIs are identified
  separately.
projectTypes:
  - title: Current project
  - title: Legacy
projects:
  - title: laravel-cart
    link: /laravel-cart/
    details: >-
      Laravel 12/13 shopping carts with VAT, coupons, atomic database mutations
      and opt-in guest transfer. Released package 4.1.0; checkout tax limits
      documented.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: laravel-webex
    link: /laravel-webex/
    details: >-
      Implemented Webex Meetings and Messaging APIs with per-request bearer
      tokens, typed results and guarded pagination. Release 2.0.0.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: laravel-fatture-in-cloud-v2
    link: /laravel-fatture-in-cloud-v2/
    details: >-
      Fatture in Cloud API v2 wrapper, package 3.0.1. Company configuration,
      typed results and implemented endpoint coverage.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: laravel-aruba-sms
    link: /laravel-aruba-sms/
    details: >-
      Aruba SMS notification channel, message builder, sandbox mode and credit
      monitoring. Release 1.1.0.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: laravel-mongo-auto-sync
    link: /laravel-mongo-auto-sync/
    details: >-
      Synchronize configured embedded copies between MongoDB documents through
      explicit CRUD methods. Documented release 3.1.1; see its declared
      framework requirements.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: laravel-fatture-in-cloud
    link: /laravel-fatture-in-cloud/
    details: >-
      Historical 2.2.8 wrapper for API v1, retired by the provider from 31
      January 2023. Migration reference only; use the API v2 guide for new work.
    type: Legacy
    maintenanceStatus: legacy
    ecosystem: php
  - title: laravel-bank-of-italy
    link: /laravel-bank-of-italy/
    details: >-
      Retrieve Bank of Italy exchange-rate data through the released CSV API
      wrapper. Version 1.0.1, with explicit query and error handling.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: ODPS Validator
    link: /odps-validator/
    details: >-
      Standalone JSON/YAML validation app with bundled schemas, browser-side
      results and documented schema limitations. Source release 1.0.1.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: javascript
  - title: Braintree Vue 3
    link: /braintree-vue3/
    details: >-
      Vue 3 Braintree composables and hosted fields, documented at a pinned
      source commit. No verified published package; evaluation guide only.
    type: Current project
    maintenanceStatus: next
    ecosystem: javascript
  - title: Vue 3 Burger Menu
    link: /vue3-burger-menu/
    details: >-
      Off-canvas Vue 3 menus from GitHub release 1.1.2, with explicit source
      setup and a warning about the incomplete npm artifact.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: javascript
  - title: SPID Laravel Trentino
    link: /spid-laravel-trentino/
    details: >-
      Laravel login through AAC Trentino OpenID Connect, with PKCE, token
      middleware and transaction logs. Release v2.3.0.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: php
  - title: pgr_dmmsy
    link: /pgr_dmmsy/
    details: >-
      PostgreSQL shortest-path extension for research and evaluation. Release
      v0.1.0, with explicit targets, build requirements and implementation
      limits.
    type: Current project
    maintenanceStatus: maintained
    ecosystem: postgresql
---

The [unverified Moneta reference](/laravel-moneta-online/) is retained for historical inbound links and is not part of the recommended package catalog.

Documentation versions belong to each project independently of VuePress. The SPID, Burger Menu and PostgreSQL extension entry points redirect to their documented compatibility lines: [SPID v2](/spid-laravel-trentino/v2/), [Burger Menu v1](/vue3-burger-menu/v1/) and [pgr_dmmsy v0.1](/pgr_dmmsy/v0.1/). Each page identifies the exact source release. [Braintree next](/braintree-vue3/next/) is unreleased source documentation. [Laravel Cart v4](/laravel-cart/v4/) documents release 4.1.0; its [4.0.3 archive](/laravel-cart/4.0.3/) preserves earlier behavior. Other guides retain their existing release permalinks.
