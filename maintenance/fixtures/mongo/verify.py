#!/usr/bin/env python3
"""Controlli sorgente e sintassi; non avvia connessioni MongoDB o dipendenze PHP."""
import argparse
import json
import pathlib
import re
import subprocess
import tempfile

parser = argparse.ArgumentParser()
parser.add_argument('--source', type=pathlib.Path, required=True)
args = parser.parse_args()
root = pathlib.Path(__file__).resolve().parents[3]
source = args.source
expected = '487a622ab48017f8839f4b90a0844d5c8fcbae7f'
sha = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
assert sha == expected, f'SHA inatteso: {sha}'
composer = json.loads((source / 'composer.json').read_text())
assert composer['name'] == 'offline-agency/laravel-mongo-auto-sync'
assert composer['require']['illuminate/database'] == '^5.0|^6.0|^7.0|^8.0'
provider = (source / 'src/MongoAutoSyncServiceProvider.php').read_text()
assert 'mergeConfigFrom(' in provider and 'publishes(' not in provider
model = (source / 'src/Http/Models/MDModel.php').read_text()
assert 'use Jenssegers\\Mongodb\\Eloquent\\Model as Eloquent;' in model
main = (source / 'src/Traits/MainMongoTrait.php').read_text()
for method in ['storeWithSync', 'updateWithSync', 'destroyWithSync']:
    assert f'function {method}(' in main
assert main.count('return $this->fresh();') == 2
assert 'return ! $request_has_key && $this->getHasPartialRequest() && ! $hasTarget;' in main
text = (root / 'laravel-mongo-auto-sync.md').read_text()
blocks = re.findall(r'```php\n(.*?)\n```', text, re.S)
with tempfile.TemporaryDirectory(prefix='mongo-doc-lint-') as directory:
    for i, block in enumerate(blocks):
        file = pathlib.Path(directory) / f'snippet-{i}.php'
        file.write_text('<?php\n' + block + '\n')
        subprocess.run(['php', '-l', str(file)], check=True, capture_output=True, text=True)
old = json.loads((root / 'maintenance/legacy-anchors.json').read_text())['routes']['/laravel-mongo-auto-sync/']
headings = re.findall(r'^#{1,6} (.+)$', text, re.M)
ids = {re.sub(r'-+', '-', re.sub(r'[^a-z0-9 -]', '', title.lower()).replace(' ', '-')) for title in headings}
ids.update(re.findall(r'<a id="([^"]+)"', text))
assert not set(old) - ids, f'Anchor mancanti: {set(old) - ids}'
print(f'PASS: released source checks, {len(blocks)} PHP snippets linted, {len(old)} legacy anchors retained; no database execution.')
