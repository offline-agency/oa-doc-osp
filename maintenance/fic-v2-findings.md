# Manutenzione — Fatture in Cloud API v2

Aggiornamento 16 ottobre 2026, sito inglese; sorgente pacchetto 3.0.1 `04360c77c68e4d481f5a4943ffc2541f26b19767`. Release GitHub e distribuzione Packagist aggiornate prima della modifica. Branch predefinito `main`. PR 88 aperta, non integrata, head `175a3ff7c625cb81f33b20e89dbb7ca7dfda4969`: non è sorgente delle API documentate.

La generazione API del provider rimane v2 mentre il major del pacchetto è 3. Il Composer rilasciato dichiara PHP ^8.4, Illuminate ^11|^12|^13 e Guzzle ^7.9. Il workflow del commit configura PHP 8.4/8.5 × Laravel 11/12/13; non abbiamo verificato i risultati storici CI. Il supporto sicurezza Laravel 11 è terminato il 12 marzo 2026: le scelte raccomandate alla data della revisione sono Laravel 12/13, distinguendole dai vincoli Composer. Fonte ufficiale: https://laravel.com/docs/13.x/releases.

Problemi reali del rilascio da mantenere visibili nella documentazione:

- `Api::handleResponse()` ripete ricorsivamente ogni 403/429 senza limite. `waitThrottle()` passa i valori a `usleep()`: sono microsecondi nonostante il commento config dica ms. Default 403 = 0,3 s; 429 = 3,6 s. Non documentare retry limitati, backoff o Retry-After inesistenti. Un retry esterno non limita quello interno; serve un limite di processo/worker o una modifica verificata al pacchetto.
- Le classi di paginazione creano nuove API senza il connector iniziale. I metodi `goTo*Page()` possono quindi perdere azienda/token. L'esempio multi-azienda usa `list()` sulla stessa istanza e incrementa `page` conservando i filtri. `all()` mantiene il connector ma usa ricorsione, memoria cumulativa e query dei link successivi.
- `Info` implementa solo `listVatTypes()` e `listPaymentAccounts()`: altre classi entity non equivalgono a endpoint esposti.
- `Settings`/`Setting` sono suddivise in `VatType`, `PaymentAccount`, `PaymentMethod`; `ArchiveDocument` diventa `Archive`; `Cashbooks` diventa `Cashbook`. Le entity sono readonly tipizzate; payload array snake_case, proprietà entity camelCase. `Error` e `MessageBag` richiedono controlli espliciti; `getXML()` è un caso con oggetto grezzo.
- Nessun `UPGRADE` nel commit. Migrazione ricavata da CHANGELOG e codice effettivo; il changelog contiene un'intestazione futura 3.1.0, quindi non viene usato come prova della versione distribuita.
- URL documenti: dal 10 settembre 2025 scadono dopo sette giorni dal recupero. Fonte https://developers.fattureincloud.it/blog/url-expiration/. Conservare ID e richiedere nuovo URL tramite detail/list implementati, con campi appropriati; non aggiungere endpoint provider nuovi assenti dal wrapper.

Esaminati API, constructor connector, provider/config, trait list/date, entity/paginazione, workflow e test rilasciati (`ClientEntityTest`, `ListTraitTest`, `PaginationTest`). `git archive` rispetta export-ignore e omette test/workflow: queste prove sono state lette con `git show <commit>:<path>` dal clone, sempre al commit fissato.

Overlap con `/private/tmp/oa-package-evidence/docs-pr12.diff`: introduzione API v2, badge, avviso URL e checklist obsolete. Il diff propone anche un rinvio alla documentazione al posto delle istruzioni. Non copiato: la pagina resta una guida completa verificata al rilascio, senza badge di copertura/CI non verificati. I 30 anchor originali sono conservati con heading equivalenti; la route rimane `/laravel-fatture-in-cloud-v2/`.

Fixture e comandi esatti in `maintenance/fixtures/fic-v2/README.md`; test locale passato, nessuna credenziale reale, fattura o chiamata produzione. L'override PSR-4 e `ReflectionClass` garantiscono il codice release anche quando le dipendenze vengono lette dal vendor esistente. Non è stata modificata alcuna sorgente pacchetto. Evidence machine-readable: `maintenance/evidence/laravel-fatture-in-cloud-v2.json`.
