---
title: "Storage, ownership, TTL and snapshots"
description: "Released Laravel Cart 4.0.3: storage, ownership, ttl and snapshots."
permalink: /laravel-cart/storage/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# Storage, ownership, TTL and snapshots

## Session storage

Default `CART_STORAGE_DRIVER=session` uses Laravel sessions. Start the session before cart access. Requests sharing the session can overwrite read/modify/write state; use Laravel session blocking for routes that mutate the same cart and configure a lock-capable backend. This does not reserve stock or serialize separate authenticated sessions automatically.

A Laravel session stored in Redis is **still the session cart driver**:

```dotenv
SESSION_DRIVER=redis
CART_STORAGE_DRIVER=session
```

Configure Laravel's Redis connection and session locks in your app. The package's built-in drivers are only `session` and `database`; it does not ship a dedicated Redis cart driver. Custom implementations of CartStorage must define their own ownership, validation, locking and persistence behavior.

## Live database storage

Use the `cart-database-migrations` tag for `carts` and `cart_items`. The driver resolves an authenticated owner from `auth()->id()`, otherwise a guest owner from the Laravel session ID. Owner and cart instance both scope reads. Never accept an owner ID directly from an untrusted payload.

`cart.ttl` is minutes or null (no expiry). In 4.0.3 the database driver's `expires_at` is set when the cart is created; writes do **not** slide the expiry. Reading an expired cart removes it and treats it as missing. `CartExpiredException` is defined but is not thrown by this expiration path. Session expiry follows Laravel's own configuration; legacy snapshots have no automatic TTL.

## Concurrency and raw writes

4.0.3 database writes use transactions/locks while replacing the item collection, but a full cart read/modify/write operation is not serialized end to end. Concurrent mutations can lose an update. Do not advertise atomic batches, safe concurrent coupon/limit validation or checkout inventory locking for this release. PR #50's stronger built-in mutation guarantees are unreleased.

Serialize competing requests under a common application lock where required, re-read state inside that boundary, and enforce inventory/checkout constraints separately. Direct SQL changes, raw driver writes, mutated CartItems and custom drivers bypass assumptions or cached reads. Avoid using them as supported public mutation guarantees.

## Legacy store and restore snapshots

These use the separate `cart.database.table` (default `cart`), even when the live driver is session. Publish the `migrations` tag only for a fresh snapshot table; use the column-only upgrade tag for an existing one.

```php
use OfflineAgency\LaravelCart\Facades\Cart;

// $snapshotKey is derived and authorized by the application, never raw request input.
Cart::instance('shopping')->store($snapshotKey, overwrite: true);
Cart::restore($snapshotKey, mergeOnRestore: false, keepStored: false);
```

`store()` saves items, cart coupons and meta when supported columns exist. It does not save cart options. `overwrite: false` throws when that identifier/instance already exists. `restore()` normally consumes/deletes the snapshot; a missing snapshot is a no-op. It can fall back to a stored instance for the identifier, temporarily switch to it and switch back.

Merge is a union by row ID: an existing row wins without adding quantities. Restored cart coupons merge by hash; empty snapshot coupon/meta fields do not necessarily clear existing state. Do not promise a complete whole-state replacement.

Snapshot lookups do **not** authorize ownership. Authorize identifier and instance in your application; never expose arbitrary `restore($request->id)`. Restrict database write access. Serialized/base64 payloads are not encrypted or signed, and allowed model classes may have unserialization behavior.

`Cart::snapshot()` is different: it returns an in-memory array with timestamp and cart data. It neither creates a legacy database snapshot nor grants authorization to restore one.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
