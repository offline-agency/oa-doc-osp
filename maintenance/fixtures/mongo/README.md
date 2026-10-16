# Controlli documentazione Mongo Auto Sync 3.1.1

Questo riproduttore esegue soltanto confronti strutturali sul sorgente rilasciato, lint degli snippet PHP e verifica degli anchor storici. Non installa dipendenze PHP e non apre connessioni MongoDB.

```bash
python3 maintenance/fixtures/mongo/verify.py --source /path/to/laravel-mongo-auto-sync
```

Il checkout passato deve essere sul commit `487a622ab48017f8839f4b90a0844d5c8fcbae7f` del tag `3.1.1`. Sono necessari Python 3, Git e PHP CLI.

Esecuzione del 16 ottobre 2026 su PHP 8.5.10:

```text
PASS: released source checks, 7 PHP snippets linted, 44 legacy anchors retained; no database execution.
```

Non è una fixture di integrazione MongoDB. Il runtime/dependency stack legacy compatibile non era disponibile: nessuna esecuzione CRUD, suite upstream o matrice CI viene dichiarata. L'extension MongoDB presente localmente è 2.5.2, ma questo non dimostra compatibilità con lo stack Jenssegers 3.x. Non sono stati usati `--ignore-platform-reqs`, database di produzione o analyzer.
