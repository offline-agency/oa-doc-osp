---
title: pgr_dmmsy
description: Build and evaluate the pgr_dmmsy PostgreSQL shortest-path extension with typed edge queries and explicit targets.
gitName: pgr_dmmsy
packageVersion: 'v0.1.0'
sourceCommit: 86b21b8efd8edd0c2851ba2b433b4481d0c37de9
---

# pgr_dmmsy

`pgr_dmmsy` is a C extension for PostgreSQL exposing a shortest-path SQL function for graphs with non-negative edge costs. It depends on pgRouting and explores ideas from the DMMSY directed single-source shortest-path algorithm. The upstream project describes it as research and evaluation software.

This guide documents [release v0.1.0](https://github.com/offline-agency/pgr_dmmsy/releases/tag/v0.1.0), checked on 16 October 2026. The default `main` branch contains later changes; those changes are outside this release guide. The paper's theoretical complexity and the upstream README's benchmark numbers were not established for this implementation by these checks.

## Requirements and distribution

The released build guide declares PostgreSQL 14+, pgRouting 3.x, a C compiler and Make with PostgreSQL server headers/PGXS. PostGIS must also be available as a dependency of pgRouting; enable it first in a fresh database. The release workflow defines Linux PostgreSQL 14/15/16 checks and PostgreSQL 16 binary builds; this is configuration evidence, not confirmation of successful CI or compatibility with other PostgreSQL majors.

The release has three actual downloadable assets:

| Asset | SHA-256 |
| --- | --- |
| `pgr_dmmsy-v0.1.0-linux-x86_64.tar.gz` | `78346bbc7c2ee1ea6687da3112bbcf5149a78878803d1eb0bf042aaf1cead7e1` |
| `pgr_dmmsy-v0.1.0-macos-arm64.tar.gz` | `aa1a37bc36fdd76017f122d31d5e22cebf14b012d5334e72676d1a3f9c78a3cc` |
| `pgr_dmmsy-v0.1.0-source.tar.gz` | `e32b83565280f88bda3b1dcbd87990075734fa161c424dbb4d4fc6b189cb2ac8` |

All three were downloaded and their checksums matched GitHub's asset metadata. The two binary archives contain the library, control file and extension SQL. Their loadability was not tested. Release notes mention Windows, but no Windows asset was present. There is no Composer or npm package in the selected source; distribute it as a PostgreSQL extension.

## Build and install

Use a checkout of the release to retain its tests and build files:

```bash
git clone https://github.com/offline-agency/pgr_dmmsy.git
cd pgr_dmmsy
git checkout --detach v0.1.0
pg_config --version
make PG_CONFIG=/path/to/your/postgresql/bin/pg_config
```

Select `pg_config` from the PostgreSQL installation that will load the extension. Install into that installation with the necessary local privileges:

```bash
make install PG_CONFIG=/path/to/your/postgresql/bin/pg_config
```

For release binaries, select the matching PostgreSQL 16 platform archive, verify its checksum, and copy its library to `pg_config --pkglibdir`; copy the `.control` and `.sql` files to the `extension` subdirectory of `pg_config --sharedir`. Do not assume a binary built for one PostgreSQL major or architecture loads on another.

In a fresh disposable database, with the PostGIS, pgRouting and pgr_dmmsy extension files installed on the server, enable them in dependency order:

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgrouting;
CREATE EXTENSION pgr_dmmsy;
SELECT extversion FROM pg_extension WHERE extname = 'pgr_dmmsy';
```

The control file sets version `0.1.0`, schema `public`, `relocatable = false` and dependency `pgrouting`. The [build guide](https://github.com/offline-agency/pgr_dmmsy/blob/86b21b8efd8edd0c2851ba2b433b4481d0c37de9/COMPILE.md) and [PGXS Makefile](https://github.com/offline-agency/pgr_dmmsy/blob/86b21b8efd8edd0c2851ba2b433b4481d0c37de9/Makefile) provide additional build details.

## Quick start

Use explicit SQL types and column order. The released C interface reads columns by position as `BIGINT`, `BIGINT`, `BIGINT`, `FLOAT8`; aliases alone do not convert their types.

```sql
BEGIN;

CREATE TEMP TABLE docs_edges (
    id BIGINT PRIMARY KEY,
    source BIGINT NOT NULL,
    target BIGINT NOT NULL,
    cost FLOAT8 NOT NULL
);
INSERT INTO docs_edges VALUES
    (1, 1, 2, 1.0),
    (2, 2, 3, 1.0),
    (3, 1, 3, 5.0);

SELECT seq, path_seq, node, edge, cost, agg_cost
FROM pgr_dmmsy(
    'SELECT id::bigint, source::bigint, target::bigint, cost::float8 FROM docs_edges',
    1::bigint,
    3::bigint
)
ORDER BY path_seq;

ROLLBACK;
```

For this graph the core path reconstruction selects nodes `1, 2, 3` with aggregate costs `0, 1, 2`. Each row's `edge` and `cost` describe the outgoing path segment; the destination has edge `-1` and cost `0`. This SQL example was reviewed against source; a live PostgreSQL extension execution was not performed in this documentation pass.

For an undirected traversal pass `directed => false`. This adds a reverse edge with the same cost; there is no `reverse_cost` input contract. Keep the edge query under application control and bind external source/target values through your database driver. Do not concatenate untrusted input into `edges_sql`.

## SQL interface

The [released SQL definition](https://github.com/offline-agency/pgr_dmmsy/blob/86b21b8efd8edd0c2851ba2b433b4481d0c37de9/sql/pgr_dmmsy--0.1.0.sql) declares:

```text
pgr_dmmsy(
  edges_sql text,
  source bigint,
  target bigint DEFAULT NULL,
  directed boolean DEFAULT true,
  output_predecessors boolean DEFAULT true,
  max_levels integer DEFAULT NULL,
  param_k integer DEFAULT NULL,
  param_t integer DEFAULT NULL,
  constant_degree boolean DEFAULT false
)
RETURNS TABLE (
  seq int, path_seq int, node bigint,
  edge bigint, cost float8, agg_cost float8
)
```

| Argument | Behavior in v0.1.0 |
| --- | --- |
| `edges_sql` | SELECT returning non-null edge ID, source, target, cost, in that order and the exact types above |
| `source`, `target` | Vertex identifiers; use an explicit non-negative target for path output |
| `directed` | `false` also adds the reverse of each input edge |
| `output_predecessors` | Present in the signature and passed to the core; it does not change the six output columns |
| `max_levels` | Limits processing phases, not path hops; NULL/negative is unlimited, `0` stops immediately |
| `param_k`, `param_t` | Positive overrides for core processing parameters; NULL/non-positive values use automatic calculation |
| `constant_degree` | Accepted and passed into the parameter structure; the released core does not read it |

Supply finite, non-negative costs and non-null values. The parser explicitly rejects negative costs and null fields; it does not provide a complete SQL type or finite-value validation layer. Graph memory is built in process, so evaluate representative data sizes before adopting it.

## Release limitations

In v0.1.0, an omitted or NULL `target` produces no output rows. Although the README and SQL comment describe all-target output, the [C wrapper](https://github.com/offline-agency/pgr_dmmsy/blob/86b21b8efd8edd0c2851ba2b433b4481d0c37de9/src/dmmsy.c) constructs returned rows only when `target >= 0`, then frees the distance map. Negative targets likewise do not request a path. Use an explicit target; do not rely on this release for a SQL all-target distance map.

An unreachable target returns no path. With `max_levels` set, processing may stop before the target is settled; treat limited results as exploratory. Do not interpret that parameter as a maximum hop count. Equal-cost paths are not promised to choose a particular sequence.

The release source has no `LICENSE` file, despite the README linking to one, and GitHub reports no detected license. Confirm licensing with the repository maintainers before reuse or redistribution. This guide does not assign a license.

## Verification and troubleshooting

The four released standalone C suites compiled and passed locally with Apple Clang on 16 October 2026: graph (8 tests), min-heap (8), algorithm (11) and edge cases (11), 38 checks total. They cover shortest-path selection, path reconstruction, unreachable vertices and parameter cases without PostgreSQL. They do not establish PostgreSQL parser safety, SQL integration, performance bounds or binary compatibility.

To reproduce against an isolated copy of the release source:

```bash
cd test/c
make run
```

Upstream also supplies `make installcheck`, SQL comparison suites under `verify/`, and a Docker workflow. Those database suites and CI outcomes were not verified here. Use a disposable database for them; the repository's convenience scripts create schemas and test data.

If PostgreSQL cannot locate the extension, compare the installation's `pg_config` paths with the running server. If `CREATE EXTENSION` reports a missing dependency, install and enable PostGIS and then pgRouting in the same database first. For empty results, check reachability, explicit target and `max_levels`; for input errors, check column order, explicit casts, nulls and costs.

Use the [repository](https://github.com/offline-agency/pgr_dmmsy) for issues and source. Link reports to the release commit so later `main` changes are not confused with this version.
