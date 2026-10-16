---
title: "Authentication and guest carts"
description: "Released Laravel Cart 4.0.3: authentication and guest carts."
permalink: /laravel-cart/authentication/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# Authentication and guest carts

## Released 4.0.3

Session storage follows the active Laravel session. Review session regeneration during login/logout, and test your actual authentication flow; do not assume an old session identifier remains the owner.

For database storage, guest live carts use session ownership and logged-in carts use authenticated user ownership. Login switches that scope. **4.0.3 has no public opt-in guest database transfer API.** Do not copy the preview transfer calls into a stable application.

`Http\Middleware\CartMergeMiddleware` and `CartRestoreMiddleware` are optional application-registered middleware. Their `cart.middleware.merge_on_login` / `auto_restore` settings operate on **legacy stored snapshots**, not a transfer of live guest database rows. Auto-restore requires an authenticated empty cart. Review their exception handling and snapshot authorization before enabling them.

`destroy_on_logout` forgets the session `cart` subtree. Despite the broader configuration comment, its stable implementation does not delete persisted database carts or legacy snapshot rows. Apply retention/logout deletion requirements explicitly in your application.

## Safe integration boundary

Resolve ownership server-side after authentication middleware. For mobile/API requests using the database driver, select your configured guard consistently before cart access; token authentication alone does not authorize arbitrary cart/snapshot IDs. For guest/session APIs, establish the session/cookie/CSRF lifecycle deliberately.

If an application needs guest-to-user transfer today, implement and test that business operation under application ownership checks and shared locks. Define whether to keep, merge or replace an existing authenticated cart and how to reprice/revalidate items. This website does not provide an untested substitute transfer API.

## Unreleased preview

PR #50 introduces explicit opt-in transfer and stronger built-in mutation handling. It is still open at the pinned SHA as of 16 October 2026. See the [next documentation](https://github.com/offline-agency/laravel-cart/pull/50) for its actual proposed API and requirements. Install released 4.0.3 by default; promote the preview only after verifying a published release and Packagist source reference.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
