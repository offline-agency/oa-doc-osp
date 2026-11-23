# Fixture pgr_dmmsy v0.1.0

```bash
PGR_SOURCE=/path/to/pgr_dmmsy \
bash maintenance/fixtures/pgr_dmmsy/verify.sh
```

Usare il checkout del tag `v0.1.0`, SHA `86b21b8efd8edd0c2851ba2b433b4481d0c37de9`. Il runner copia `src/` e `test/` in una directory temporanea e compila/esegue le quattro suite C rilasciate; non modifica il checkout verificato. La directory è stampata e conservata per ispezione.

Esecuzione del 16 ottobre 2026 con Apple Clang, tramite il comando `gcc` di sistema: graph 8, minheap 8, algorithm 11, edge cases 11; tutti i 38 controlli superati. Non richiede PostgreSQL, pgRouting o rete. Nessuna modifica a istanze o database.

The initial C-only verification did not execute SQL. The later focused SQL run below supersedes that limitation. Release binaries were downloaded and checked for size/hash/archive contents, but were not loaded; they are not copied into the docs repository. Full installcheck and platform matrices remain unexecuted.


## Focused SQL integration, 16 October 2026

`verify.sql` executes the documentation graph and asserts exact nodes/costs, directed reverse and missing target unreachability, undirected reverse path, omitted/NULL target empty output, and zero phase cap. Passed with source commit `86b21b8efd8edd0c2851ba2b433b4481d0c37de9`, PostgreSQL 17.11 (Debian), PostGIS 3.5.7 and pgRouting 4.0.1 on Linux arm64. This is one observed runtime, outside the declared pgRouting 3.x prerequisite; no general PostgreSQL/pgRouting matrix claim.

Reproduction uses an existing local base image (`althea-postgis:17.11-3.5.7`) with PG17 server headers/compiler; it is environment-specific, not an upstream public image recommendation. Dependencies are installed only in the disposable image. The base image ID used was `5368a5388137`; resulting image SHA was `9d1c6fccef26de9af083eb76275f44e5e66b95b4eabe748ccb728922da3d4cc3`.

Prepare a temporary build context containing `Dockerfile` from this fixture and a `src/` directory exported with `git archive v0.1.0` from the upstream clone. Build with `docker build -t oa-docs-pgr:v0.1.0-pg17 CONTEXT`. Then run the fixture:

```bash
docker run --rm --network none --tmpfs /tmp \
  -v "$PWD/maintenance/fixtures/pgr_dmmsy/run-container.sh:/fixture/run.sh:ro" \
  -v "$PWD/maintenance/fixtures/pgr_dmmsy/verify.sql:/fixture/verify.sql:ro" \
  --entrypoint sh oa-docs-pgr:v0.1.0-pg17 /fixture/run.sh
```

No ports, host PostgreSQL directory or existing database is used. The container initializes a new cluster under its tmpfs and removes it on exit. The committed scripts do not modify the upstream clone.
