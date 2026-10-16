# Fixture pgr_dmmsy v0.1.0

```bash
PGR_SOURCE=/path/to/pgr_dmmsy \
bash maintenance/fixtures/pgr_dmmsy/verify.sh
```

Usare il checkout del tag `v0.1.0`, SHA `86b21b8efd8edd0c2851ba2b433b4481d0c37de9`. Il runner copia `src/` e `test/` in una directory temporanea e compila/esegue le quattro suite C rilasciate; non modifica il checkout verificato. La directory è stampata e conservata per ispezione.

Esecuzione del 16 ottobre 2026 con Apple Clang, tramite il comando `gcc` di sistema: graph 8, minheap 8, algorithm 11, edge cases 11; tutti i 38 controlli superati. Non richiede PostgreSQL, pgRouting o rete. Nessuna modifica a istanze o database.

L'interfaccia SQL è stata ispezionata, non eseguita. Nessun `make install`, `installcheck`, Docker, test SQL o caricamento dei binari di release. I tre asset GitHub sono stati scaricati e ne sono stati confrontati dimensioni/checksum e contenuti archivio. Non vengono copiati nella repository docs.
