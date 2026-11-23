# ODPS Validator —16 ottobre2026

Release GitHub1.0.1 verificata, SHA `bed32b74b2cf353bfebb134aab9dfb41ac033d81`; default `main`, HEAD differente `f63f82ffaccc77db531aacdca63692fc966f567a` non usato come API documentata. Pacchetto manifest `nextjs-odps-validator` versione1.0.0; registro npm restituisce E404, quindi guida installazione sorgente/tag, non npm install di una libreria inesistente.

Lock originale Next15.3.2/React19.1.0/Bootstrap5.3.6/Ajv8.17.1/js-yaml4.1.0, dichiarazioni latest di Next/React; npm ci e build effettuati in estrazione temporanea con Node24.13.0/npm11.6.2. Nessuna dipendenza installata nel sito o modifica al clone.

Difetti upstream documentati:
- README elenca schema v1/v2/v3 ma asset rilasciati sono v3.0 e v3.1.
- Nessun tipo object radice:42 e inputvuoto possono passare; proprietàversion non coincide necessariamente con cartella selezionata.
- Ajv-formats assente, URI ignorati con warning nella configurazione strictfalse.
- Required v3.0 a livello radice, definizioni relative in product; conformità ufficiale non provata dalnomecartella.
- Versione package.json non allineata al tag, nessuna enginepolicy, latest nelle dipendenze.
- output export con script nextstart e path fetch assoluto: guida serve out, nessuna assunzione suhost/subdirectory/GitHubPages funzionante.
- pubblica cartella ignorata: verificare tracking di nuovi schemi. Nessuna testsuite/script test nella release.

Fixture locale riproduce handler/staticprops reali e casi positivi/negativi senza HTTP reale; risultati nel README fixture. Nessun cambiamento al package, nuovo endpoint o deployment.
