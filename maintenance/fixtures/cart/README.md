# Fixture documentale Cart 4.0.3

```bash
CART_PACKAGE_REPO=/path/to/laravel-cart \
CART_VENDOR_AUTOLOAD=/path/to/compatible/vendor/autoload.php \
bash maintenance/fixtures/cart/run.sh
```

Richiede PHP compatibile, un clone con il tag 4.0.3 e dipendenze Laravel/PHPUnit compatibili già installate in una directory esterna. Lo script verifica il commit, usa git archive per estrarre il rilascio senza modificare il clone, sostituisce la mappa PSR-4 del pacchetto e verifica via reflection la sorgente caricata. Dipendenze preesistenti lette in sola lettura. Nessun composer install nel repository docs.

Usa Cart e SessionStorage reali con driver di sessione array e dispatcher Laravel. Nessuna chiamata di rete o database. Esegue esempi numerici quick start, tasse, coupon, arrotondamenti, identità righe/quantità, sync, metadati/snapshot in memoria, limiti e CartFake con asserzioni PHPUnit. Il test coupon cart-level viene segnalato SKIP se BCMath manca; nell'esecuzione registrata BCMath era presente e il percorso è passato.

Non verifica database, store/restore SQL, migrazioni, comandi manutentivi, concurrency o matrice completa. Per il percorso dati persistenti usare i test dell'applicazione sul driver reale.
