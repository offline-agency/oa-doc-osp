# Riscontri progetti Vue

Verifica in sola lettura del 16 ottobre 2026. Guide pubbliche in inglese; nessuna modifica ai repository dei pacchetti, pubblicazione, push, deploy o richiesta a provider di pagamento.

## Braintree Vue 3

- GitHub: branch predefinito `master`, HEAD `ff99c39e9fd45e6fe43440f8c3b7bcda58e01775`; endpoint releases e tags entrambi vuoti. `npm view braintree-vue3 --json` restituisce E404 dal registro pubblico. Il manifest riporta `0.1.0`, ma non è un rilascio verificato: guida marcata source-only, senza `packageVersion`.
- Ispezionati export, tipi/augmentations SDK, injection key, entrambi i componenti, tutti e sei i composable, configurazione Vite/Vitest, test e workflow. Peer: Vue `^3.3.0`, Braintree Web `^3.x`; nessun engine Node o lockfile. Manifest MIT, nessun file LICENSE autonomo.
- Esempio completo hosted-fields con contenitori, readiness, errori, busy, clear ed emissione nonce; distingue token client da credenziali private server e nonce da esito pagamento. Nessuna integrazione reale eseguita.
- Componenti renderless: solo slot default, nessun evento dichiarato; interfaccia esposta via ref. `authorization` catturata come stringa, token non aggiornato da prop/reinitialize; opzioni non osservate individualmente; assenza di cancellazione/generation guard su creazioni SDK pendenti. Errori inizializzazione salvati in ref, errori operativi propagati; teardown generalmente silenziato.
- Fixture Node 25 senza nuove dipendenze: esegue sorgenti effettivi con confini Vue/SDK sintetici. PASS lifecycle, guardia duplicazione, reinitialize, errore init, errore not-ready e tokenizzazione fittizia. Non è la suite upstream o un browser checkout; nessuna chiamata Braintree/PayPal/Venmo, challenge 3DS o transazione.

## Vue 3 Burger Menu

- GitHub: branch `main`, release `1.1.2` pubblicata 2023-02-07T11:21:40Z, SHA `27ed3fe184f55de51401590f3975011c4131f65a`; anche tag `1.0.0` sullo stesso commit. Manifest del tag `1.0.0`.
- Registro npm indipendente: unico/latest `@offlineagency/vue3-burger-menu@1.0.0`, gitHead `e19adffec7e1603544b2c847f6aff5d02c7a5658`, diverso dal tag documentato. Tarball scaricato e SHA-1 verificato `161137e9d41c13bf8b0b91fb423977921ddda577`.
- Difetto bloccante distribuzione: tarball contiene solo README.md, LICENSE, package.json. Mancano `dist/vue3-burger-menu.common.js` e UMD dichiarati nel manifest. Non proponiamo un normale npm install come percorso funzionante; guida documenta il difetto e un workflow di build da sorgente isolato, esplicitamente non eseguito. Non esiste npm1.1.2 verificato.
- Entry export default oggetto, non named export/plugin; esempio corretto con import scoped default + destructuring `Slide`. CSS incorporato nel bundle previsto (`extract: false`), nessun CSS separato nell'artifact effettivo. Dipendenza runtime Vue `^3.0.0-0`, toolchain Vue CLI4.5, nessun engine/lockfile. Vincoli datati non determinano da soli classificazione Legacy.
- API reali: width stringa numerica senza px; `disableEsc`, non `disableCloseOnEsc`; onStateChange dichiarata ma mai invocata; nessun update:isOpen; initial isOpen true non applicato dal watcher non immediato; closeOnNavigation chiude per qualsiasi click interno. `right.value` passato al watch come valore non reattivo. Wrapper con selettori hard-coded; nessun prop pageWrapId/appId; Push e Reveal richiedono solo #page-wrap, gli altri wrapper di trasformazione anche #app. ScaleDown/ScaleRotate hanno distanza default100 diversa dal menu300.
- Controlli built-in senza semantica button; esempio usa button nativo. Non implementa focus trap. Accesso document durante setup impedisce SSR diretto; overlay/body/transform globali, cleanup incompleto su unmount mentre aperto. Quattro animazioni marcate WIP upstream.
- Nessuna suite test/script test nel repository. Fixture PASS con setup/metodi reali e confini Vue/DOM sintetici: difetto entry mancante confermato, width/eventi/Escape/overlay/cleanup listener. Nessun test visuale/browser o build compatibilità. Licenza MIT presente.

## Riproducibilità e limiti

Entrambi gli esempi SFC hanno superato parse, compileScript e compileTemplate con il compilatore Vue già presente nella documentazione; questo verifica la sintassi, non import del pacchetto, tipi o montaggio reale.

I checkout esterni sotto `/private/tmp/oa-package-evidence/` non sono inclusi nella documentazione. Le fixture verificano SHA e pulizia src, poi leggono senza modificare il codice. README delle fixture e JSON evidence registrano comandi, riferimenti e risultati. Le ricette build richiedono risoluzione dipendenze senza lock e non costituiscono una promessa di build funzionante su Node corrente. Nessun output di screenshot viene consegnato. Snapshot versionati, catalogo e verifiche globali sono integrati dal task principale.
