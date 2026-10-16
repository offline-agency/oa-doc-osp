---
title: Our open-source philosophy
seoTitle: Our open-source philosophy
pageType: AboutPage
description: >-
  Why OFFLINE Agency publishes open-source packages, what we value in them, how
  to check the evidence for each project and how to contribute.
sidebar: false
---

# Why we build and share open-source software

At OFFLINE Agency, open source starts with a practical problem. When a solution can be useful beyond a single project, we aim to make it reusable and understandable, so that other developers can inspect it, adapt it and contribute to it.

## Giving back to the ecosystems we use

We build on the work of open-source communities every day. Most of the [projects documented here](/) are Laravel packages; others are Vue 3 libraries, a JavaScript validation app and a PostgreSQL extension. Sharing these tools is one way to contribute to the ecosystems we rely on, and to avoid solving the same problem in isolation.

## What we value in a package

Publishing code is a starting point. We value clear interfaces, explicit dependencies, useful examples and documentation that explains both capabilities and limitations. Where a project includes automated checks, its repository should make those checks and their results easy to find.

These are principles we work towards, not a claim that every project already meets them equally. Projects differ: some ship a continuous-integration matrix, contribution guide and security policy, while others currently have no tests or no license file in their documented source. Each package overview on this site lists those facts as we verified them, including what is missing.

## Clarity about versions and change

Developers need to know which version a guide describes, what an upgrade changes and whether an example applies to their application. That is why every guide here names its exact release or source commit, previous major lines keep their own documentation, and unreleased work is labelled as such instead of appearing next to stable releases.

## Transparency

The source of every package documented here is public on [GitHub](https://github.com/offline-agency). Licenses, changelogs and contribution policies live in each repository, and known limitations are written into the guides rather than left for users to discover. When something could not be verified — a release, a license, a test result — the documentation says so.

## How to contribute

Contributions do not have to start with a large feature. A reproducible bug report, a corrected example, a test or a clearer explanation can make a package more useful. Each repository defines the appropriate way to contribute and to report security concerns; the **Project facts** panel on every package overview links to them, or tells you when they are not published.

Corrections to this documentation site are welcome through its [issue tracker](https://github.com/offline-agency/oa-doc-osp/issues).

## Sustainability

Open source needs ongoing maintenance and prioritisation. A permissive license grants rights to use and modify the code; it does not include a support agreement. Where a repository commits to supported versions or to acknowledging security reports within a set time, that commitment is stated in its own policy; no general support agreement is published. If our packages are useful to you, you can support their maintenance through [GitHub Sponsors](https://github.com/sponsors/offline-agency).

## Choosing responsibly

Our goal is to offer useful building blocks that teams can evaluate with confidence. Choose a package because it fits your requirements, after reading its documented limitations — not because of a promise that it is the right answer to every problem. A package is a component of your application, not a guarantee of compliance or suitability.

## See these principles in practice

Selected examples, not proof of an audited process applied to every project:

- **Versioned upgrades:** the [Laravel Cart v4 upgrade guide](/laravel-cart/v4/upgrading/) describes release 4.1.0, while the [4.0.3 archive](/laravel-cart/4.0.3/) preserves earlier behaviour.
- **Visible automated checks:** the Laravel Cart [CI run on the 4.1.0 release commit](https://github.com/offline-agency/laravel-cart/actions/runs/38922612753) covers PHP 8.4/8.5, Laravel 12/13, MySQL and PostgreSQL.
- **Documented limitations:** [Money and tax](/laravel-cart/v4/money-and-tax/) explains what cart coupons do and do not do for VAT in the current release.
- **License and contribution policy:** Laravel Cart's [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE), [contribution guide](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/CONTRIBUTING.md) and [security policy](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/SECURITY.md), at the documented release.
- **Unreleased work kept separate:** [Braintree Vue 3](/braintree-vue3/next/) is documented at a pinned commit and marked as having no published release.

## Next steps

[Explore the packages](/), read the source on [GitHub](https://github.com/offline-agency), or open an issue in the repository of the project you use.
