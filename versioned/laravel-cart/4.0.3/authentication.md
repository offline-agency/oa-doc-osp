---
title: Authentication and guest carts — 4.0.3
description: 'Released Laravel Cart 4.0.3: authentication and guest carts.'
permalink: /laravel-cart/4.0.3/authentication/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Authentication and guest carts

## Released 4.0.3

Session storage follows the active Laravel session. Review session regeneration during login/logout, and test your actual authentication flow; do not assume an old session identifier remains the owner.

For database storage, guest live carts use session ownership and logged-in carts use authenticated user ownership. Login switches that scope. **4.0.3 has no public opt-in guest database transfer API.** Do not copy the 4.1.0+ transfer calls into a 4.0.3 application.

`Http\Middleware\CartMergeMiddleware` and `CartRestoreMiddleware` are optional application-registered middleware. Their `cart.middleware.merge_on_login` / `auto_restore` settings operate on **legacy stored snapshots**, not a transfer of live guest database rows. Auto-restore requires an authenticated empty cart. Review their exception handling and snapshot authorization before enabling them.

`destroy_on_logout` forgets the session `cart` subtree. Despite the broader configuration comment, its stable implementation does not delete persisted database carts or legacy snapshot rows. Apply retention/logout deletion requirements explicitly in your application.

## Safe integration boundary

Resolve ownership server-side after authentication middleware. For mobile/API requests using the database driver, select your configured guard consistently before cart access; token authentication alone does not authorize arbitrary cart/snapshot IDs. For guest/session APIs, establish the session/cookie/CSRF lifecycle deliberately.

If an application needs guest-to-user transfer today, implement and test that business operation under application ownership checks and shared locks. Define whether to keep, merge or replace an existing authenticated cart and how to reprice/revalidate items. This website does not provide an untested substitute transfer API.

<a id="unreleased-preview"></a>

## Later releases

PR #50 added explicit opt-in transfer and stronger built-in mutation handling; it was released in [4.1.0](https://github.com/offline-agency/laravel-cart/releases/tag/4.1.0). See the [current 4.x authentication guide](/laravel-cart/v4/authentication/) for that API and its requirements. This archive keeps the 4.0.3 behaviour for existing installations.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Current 4.x documentation](/laravel-cart/v4/) · [Historical site](/laravel-cart/legacy/).
