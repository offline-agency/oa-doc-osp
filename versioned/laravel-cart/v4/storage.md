---
title: Storage and mutation guarantees — v4 · 4.1.0
description: >-
  Persistent database and session carts: owner isolation, TTL, atomic mutation,
  PostgreSQL/MySQL concurrency and snapshots.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/storage/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Storage and mutation guarantees

> **Release 4.1.0.** This guide describes the selected `4.1.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. These guarantees must not be assumed for the earlier 4.0.3 release. See [storage](/laravel-cart/v4/storage/), [money and tax](/laravel-cart/v4/money-and-tax/) and [authentication](/laravel-cart/v4/authentication/). Public amounts remain floats; cart coupons do not allocate post-discount VAT per tax rate.

Session carts live under session keys. Database live carts use normalized `carts`
and `cart_items`, keyed by owner plus instance; guests use `session_id`, users the
configured owner column. Numeric, UUID and ULID owner types are configurable.
TTL purges expired live database carts on access; it is not a snapshot retention policy.
Bindings are request/job scoped, and Cart reloads coupons after owner changes/expiry.

`store($identifier)` and `restore($identifier)` are explicit saved snapshots in the
separate `cart` table, not login migration of the live guest cart. Callers must
authorize snapshot identifiers. Restore retains the existing snapshot format and
migration behavior; automatic driver migration does not infer ownership for old snapshots.

Built-in logical live mutations (including multi-add, batch and sync) stage detached
state, validate, persist, then publish successful events. Failure before commit
leaves state and held item references untouched. Session writes are staged in memory;
use Laravel session blocking if several requests can write the same session.
Database mutations lock owner/instance before reading, through commit, and include
items, coupons, options and metadata. Accepted concurrent adds accumulate instead of
last-committed-write-wins replacement. Transactions retry concurrency errors at most
three attempts using fresh state and no duplicate events; exhaustion raises the
underlying database concurrency exception (for example DeadlockException or QueryException) with the connection/SQL failure. Direct raw writes and
DatabaseStorage::put() still replace supplied values; they do not gain merge semantics.

Database mutation events wait for an application-owned outer transaction to commit.
Outer rollback discards queued events. A listener throwing after commit does not undo
the write or arbitrary external side effects. Use an outbox for stronger delivery needs.
Saved snapshot store/restore operations coordinate their SQL write with staged built-in
state, preserving the existing snapshot format and replacement/merge policy. Their
events also wait for outer SQL commit. Session memory is not enlisted in an
application-owned outer SQL transaction: if your application rolls back after a
successful session restore, manage that session state in the application as well.

Custom drivers implement the unchanged CartStorage interface. Candidate preparation
is detached and validation failures are atomic, but multiple writes cannot be promised
transactional for arbitrary custom drivers. Optionally implement AtomicCartStorage
with a read/write boundary and afterCommit callback. Never mutate returned CartItem
properties directly for concurrent persistence; use the Cart mutation API.

---

Imported from [docs/v4/storage.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/storage.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
