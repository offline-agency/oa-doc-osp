# Laravel Bank of Italy — verifica documentale

Verifica del 16 ottobre 2026 sulla release `1.0.1`, commit `8b4ae70b92d0b802139138e70367d789d80251af`. La guida pubblica è in inglese. Nessun file del pacchetto è stato modificato, nessuna release/push/deploy/commento è stato eseguito. Le letture della copia di evidenza usano il commit immutabile, non il branch di default.

## Identità e perimetro

Il metadata Packagist fresco fornito dal coordinatore (`/private/tmp/oa-bank-packagist.json`) indica `1.0.1` con source/dist reference uguale al commit sopra. L'ultima release GitHub è stata verificata dal coordinatore. Non è stato riscaricato il dist in questa sottotask: la verifica aggregata resta al coordinatore.

Il pacchetto è un progetto corrente del catalogo. Le dipendenze dichiarate Illuminate 8/9 sono riportate come vincoli Composer, senza attribuire al progetto uno stato “legacy” né promettere supporto a versioni moderne non dichiarate. Non sono stati verificati risultati CI correnti.

## Correzioni rispetto al README upstream

- Date di input `Y-m-d`: il README propone `01-01-2000`, che fallisce la validazione. La guida usa `2000-01-01`.
- Il provider è auto-discoverable e fa `mergeConfigFrom`: pubblicare il config non è obbligatorio.
- L'alias facade esiste ma risolve `LaravelBankOfItaly`, classe vuota. L'operazione va istanziata con `Api\ExchangeRate`; nessuna chiamata inventata alla facade.
- Gli errori HTTP non-200 diventano `Entities\Error` con il solo body; errori di connessione propagano eccezioni. “Errore durante la chiamata” non descrive tutti i casi.
- `referenceDate` non viene convertito: non promettere un formato di output in base al formato richiesto in input.
- Il parser non è un reader CSV completo, non controlla Content-Type e non richiede esplicitamente CSV. Un 200 JSON può diventare una collezione vuota. Il formato live non è stato verificato e la guida lo dichiara.

## Contratto rilevato dal codice

`getExchangeRates(array = []): MessageBag|Error|ExchangeRates`; cinque chiavi ammesse. `lang` e `baseCurrencyIsoCode` accettano qualunque stringa o null; `currencyIsoCode` è case-sensitive `EUR,USD,ITL` o null. Non valida ordine date, massimo intervallo o disponibilità del dato. Parametri sconosciuti filtrati. Default configurati dopo validazione; null espliciti per valuta/lingua non ripristinano il default. Date assenti/null calcolate indipendentemente con Carbon now/subYear e sovrascritte dopo il merge; startYear/startMonth/endYear/endMonth calcolati ma eliminati dal filtro finale.

HTTP: singolo `Http::get` senza credenziali, header, timeout, retry, cache o paginazione aggiunti dal pacchetto. Solo status esatto 200 è successo. Nessun accessore per status o header degli errori. Il framework sottostante mantiene i suoi default di trasporto.

Parser: trim del body, scarto prima riga, split newline e comma, righe vuote/corte ignorate, prime sei colonne, valori stringa senza normalizzazione. `getItems` restituisce un array, `setItems` lo sostituisce. `Error` ha getter/setter stringa. Le entità hanno sei proprietà stringa pubbliche.

## Verifiche eseguite e limiti

Fixture isolata in `maintenance/fixtures/bank-of-italy/`: 21 assert passati su PHP 8.1.34, Illuminate 9.52.16, Guzzle 7.15.5, Carbon 2.73.0. Dipendenze installate esclusivamente in `/private/tmp/oa-bank-fixture-runtime`; nessuna dipendenza PHP nella repository JS o nelle copie dei pacchetti. Fonte estratta in directory temporanea da `git archive` del commit. Tutte le richieste hanno fake wildcard. Risultati e lock riproducibili salvati, nessuna chiamata reale al provider.

La fixture copre query/default/filtri, validazione senza HTTP, stringhe ritornate, errore 503 e 204, JSON 200 vuoto, righe malformate, sostituzione items, null e propagazione ConnectionException. Non testa un'app Laravel completa né discovery/publishing; tali dettagli sono verificati staticamente sul provider/composer.

La suite upstream contiene richieste live, un conteggio fisso di 285 righe e un'asserzione errore con argomenti sospetti (`assertIsString(Error::class, $response->getError())`). Non è stata eseguita. La workflow rilasciata cita PHP 7.4/8.0 e Laravel 8, ma ciò non prova supporto (PHP >=8.0 è il vincolo del pacchetto) né esiti positivi. Non sono stati eseguiti coverage, analizzatori o matrice completa.

Le istruzioni REST e il portale ufficiale della Banca d'Italia sono stati trovati/verificati tramite ricerca web; i link primari sono nella guida. Non si usa la documentazione del provider per inventare operazioni non implementate dal client.
