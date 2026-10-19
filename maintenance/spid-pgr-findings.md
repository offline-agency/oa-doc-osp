# Verifica SPID Trentino e pgr_dmmsy — 16 ottobre 2026

## SPID Laravel Trentino

Guida pubblica in inglese ancorata a `v2.3.0`, commit `0fdb1e870606e471a39d35c144cde58158e023d6`, identico alla testa `master` verificata. Release e tag GitHub interrogati; Packagist pubblica `v2.3.0` con source/dist sullo stesso commit. Archivio Composer scaricato, 95.747 byte, SHA-256 `2d90d203389961fd2a5971a8ad03a4f887e6b4cdff376fb207206b3b3dcd5b6f`.

Manifest: PHP `^8.4`, Illuminate `^12.69|^13.30`, Jumbojett `^1.0.2`. Non usare il solo major Laravel come requisito: i minimi minor sono significativi. MIT verificata in `LICENSE.md`.

Letti README, manifest, configurazione, provider, route, controller/trait autenticazione, servizio, DTO, middleware/support token/sessione, migration, comandi e guida transaction log, mock e test rilevanti. Le migration modificano la tabella `users`; il modello auth configurabile non cambia automaticamente quel nome. Il matching è per codice fiscale completo, non per email. L'evento `SpidTrentinoLoggedIn` nasce dal servizio prima dell'autenticazione locale del controller. Logout locale, nessuna revoca token.

Registrazione transazioni attiva per default ma fail-open: mancata tabella/log write non blocca login salvo opt-in fail-closed di v2.3.0. Riportate limitazioni del check senza attività e HMAC con chiave corrente dopo rotazione; nessuna certificazione di conformità legale o provider.

Fixture propria offline superata su PHP 8.5.10/Laravel 13.35.0 vendor già presente. Copre DTO/JSON, claim malformati, hash log, risposta token, scadenza sessione. Non invia richieste AAC/identità/login e non accede a database persistenti. Nessuna dipendenza aggiunta al sito docs. Suite upstream, CI/coverage, PHPStan/Pint e login live non eseguiti.

## pgr_dmmsy

È un'estensione PostgreSQL scritta in C, non un package PHP/JS. Selezionato il tag realmente rilasciato `v0.1.0`, commit `86b21b8efd8edd0c2851ba2b433b4481d0c37de9`. Testa `main` al controllo: `f8de14341094b1e2d74ed48d4d76a19e66c4cf36`, con cambi successivi esclusi dalla guida della release. Non dedurre la release corrente dal solo `default_version` del control file.

Distribuzione GitHub verificata: asset Linux x86_64 PG16, macOS arm64 PG16 e sorgente, tutti scaricati con SHA-256 identico al digest API. I due binari sono presenti nei rispettivi archivi, ma non caricati. Windows compare nel testo release ma non tra gli asset reali: la guida segnala la differenza.

Letti README, COMPILE, INSTALL, control, Makefile PGXS, definizione SQL, interfaccia C/SPI, algoritmo/ricostruzione percorso e suite C/SQL/workflow. La query edge è letta per posizione con `DatumGetInt64`/`DatumGetFloat8`, senza validazione completa dei tipi: gli esempi impongono BIGINT/BIGINT/BIGINT/FLOAT8. Non copiati benchmark e garanzie asintotiche dal README come fatti verificati.

Difetto importante documentato: `target NULL`/omesso produce zero righe, non una mappa completa. Il wrapper costruisce il percorso solo con `target >= 0` e libera poi le distanze. Anche target negativi non richiedono percorso. `max_levels` conta fasi, non hop; `constant_degree` è accettato ma non letto dal core. `output_predecessors` non cambia la forma dell'output.

Nessun file LICENSE al tag, nonostante link README: GitHub non rileva licenza. Non attribuita licenza MIT o altra autorizzazione. Richiesta verifica ai maintainer prima di riuso/redistribuzione nella guida, senza inviare messaggi esterni.

38 test C rilasciati compilati e superati in copia temporanea con Apple Clang: 8 graph, 8 minheap, 11 algorithm, 11 edge cases. L'interfaccia PostgreSQL non è stata compilata/caricata né eseguita; nessun server/database modificato. Esecuzione SQL/PGRouting, suite installcheck/verify, benchmark, sanitizers e matrice CI restano non verificati. Fixture ripetibile aggiunta sotto `maintenance/fixtures/pgr_dmmsy/`.

## Ambito

Modificati esclusivamente le due guide, questo handoff, due JSON evidenza e fixture dedicate. Nessuna modifica a sorgenti upstream, account, deploy, release, impostazioni, messaggi o repository esterni. Manifest condivisi, catalogo, snapshot versionati e configurazione sito sono di competenza dell'agente principale.
