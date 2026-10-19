---
title: Image Puzzle — v1 · 1.0.0
description: >-
  Split an image into a grid of puzzle pieces with GD, apply edge styles and
  export PNG or JPEG pieces with a JSON manifest.
gitName: php-image-puzzle
packageVersion: 1.0.0
sourceCommit: e1c0138e92debd07f8a60f8648479f8dbe627dab
permalink: /image-puzzle/v1/
documentationSnapshot: true
documentationKey: v1
documentationChannel: stable
---

# Image Puzzle

Split an image into a grid of puzzle pieces with PHP's GD extension, optionally shape the piece edges (rounded corners, jigsaw tabs, arcs, waves), and export every piece as a PNG or JPEG file together with a `manifest.json` describing the grid. The Composer package is `offline-agency/image-puzzle`; the source repository is [php-image-puzzle](https://github.com/offline-agency/php-image-puzzle).

This is the **v1 compatibility-line guide**, verified against release [1.0.0](https://github.com/offline-agency/php-image-puzzle/releases/tag/1.0.0) on 19 October 2026. [Packagist](https://packagist.org/packages/offline-agency/image-puzzle) source and dist references match the source commit above.

## Versions and compatibility

| Documentation line | Latest on Packagist | Status |
| --- | --- | --- |
| [v1](/image-puzzle/v1/) | `1.0.0` | Released; no support policy is published |

GitHub also has tags and releases `1.0.1` and `1.0.2`, but Packagist offers only `1.0.0` (and `dev-main`), so `composer require` installs 1.0.0. Compared with 1.0.0, `1.0.1` changes only the README and `1.0.2` only adds tests: the library code, configuration examples and documentation are identical. Every tag's `composer.json` declares `"version": "1.0.0"`.

## Requirements

The [Composer manifest](https://github.com/offline-agency/php-image-puzzle/blob/e1c0138e92debd07f8a60f8648479f8dbe627dab/composer.json) requires PHP `^8.4` and `ext-gd`, and suggests `ext-pcntl` for parallel export from the CLI. Supported input types are PNG, JPEG and GIF (as detected by GD); output is PNG or JPEG. CI on the release commit ran on PHP 8.4 and 8.5.

On PHP 8.5, export prints a `Function imagedestroy() is deprecated` notice for every piece written; the files are still produced. PHP 8.4 prints no notice.

## Installation

```bash
composer require offline-agency/image-puzzle
```

The namespace is `ImagePuzzle\`.

## Quick start

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use ImagePuzzle\EdgeStyle\RoundedCornersStyle;
use ImagePuzzle\PuzzleGenerator;

$generator = new PuzzleGenerator(new RoundedCornersStyle(4));
$puzzle = $generator->generateFromFile('photo.jpg', 4, 6); // rows, columns
$result = $puzzle->export('/path/to/output_dir');

echo count($result->getFiles()) . " files\n";   // 24 pieces + manifest.json
echo $result->getManifestPath() . "\n";
```

Or in one call:

```php
use ImagePuzzle\ExportOptions;

$result = PuzzleGenerator::generateAndExport(
    'photo.jpg', '/path/to/output_dir', 4, 6,
    new RoundedCornersStyle(4),   // optional edge style
    new ExportOptions(),          // optional export options
);
```

`generateFromGd(GdImage $image, $rows, $cols)` accepts an image already in memory. Rows and columns must be at least 1.

## The puzzle and its pieces

```php
$puzzle->getRows();   $puzzle->getCols();
$puzzle->getWidth();  $puzzle->getHeight();   // source dimensions

$piece = $puzzle->getPiece(0, 0);
$piece->getRow(); $piece->getCol();
$piece->getX();   $piece->getY();             // offset in the source image
$piece->getWidth(); $piece->getHeight();
$piece->toGdImage();                          // the rendered piece
```

**Splitting rule.** When the image does not divide evenly, the remainder pixels go to the last column and the last row: a 100×50 image split into 2 rows and 3 columns gives column widths 33, 33, 34 and row heights 25, 25. To change this, pass a `ImagePuzzle\SplitStrategy\DimensionSplitStrategy` (one method, `split(int $totalSize, int $segmentCount): array`) as the fourth constructor argument of `PuzzleGenerator`. The generator throws `InvalidArgumentException` when the returned sizes do not have `$segmentCount` entries summing to `$totalSize`.

## Export

```php
use ImagePuzzle\ExportOptions;

$options = new ExportOptions(
    format: ExportOptions::FORMAT_PNG,      // or ExportOptions::FORMAT_JPEG
    quality: 9,                             // PNG 0–9 compression, JPEG 0–100
    filenamePattern: 'piece_{row}_{col}.png',
    overwrite: true,
    manifestFilename: 'manifest.json',
);
$result = $puzzle->export('/path/to/output_dir', $options);
```

| Option | Default | Notes |
| --- | --- | --- |
| `format` | `png` | PNG keeps transparency (needed by shaped edges); JPEG does not |
| `quality` | `9` | PNG compression 0–9 or JPEG quality 0–100 |
| `filenamePattern` | `piece_{row}_{col}.png` | Placeholders `{row}`, `{col}`, `{index}`, `{rows}`, `{cols}`; with JPEG a pattern ending in `.png` becomes `.jpg` |
| `overwrite` | `true` | `false` keeps existing piece files; the manifest is still written |
| `manifestFilename` | `manifest.json` | |
| `onPieceBeforeSave`, `onPieceAfterSave` | `null` | `fn (Piece $piece, string $filepath): void` |
| `onManifestBuild` | `null` | `fn (array $manifest): array`; return the manifest to write |

Options are immutable; `withFormat()`, `withQuality()`, `withFilenamePattern()`, `withOverwrite()`, `withManifestFilename()` and the three `withOn…()` methods return a modified copy. The output directory is created when missing. `filenamePattern` and `manifestFilename` must not contain path separators; a pattern such as `../x_{row}_{col}.png` throws `ImagePuzzle\Exception\InvalidArgumentException`.

`ExportResult` provides `getOutputDirectory()`, `getFiles()` (pieces and manifest), `getManifestPath()` and `getManifest()` (decoded array). The manifest contains `source` (basename or `null`), `rows`, `cols`, `sourceWidth`, `sourceHeight` and `pieces`, each with `row`, `col`, `x`, `y`, `width`, `height` and `filename`. A [JSON schema](https://github.com/offline-agency/php-image-puzzle/blob/e1c0138e92debd07f8a60f8648479f8dbe627dab/docs/schemas/manifest.schema.json) is included.

**Parallel export.** `(new \ImagePuzzle\Exporter())->exportParallel($sourcePath, $directory, $rows, $cols, $options, $workers = 4, $edgeStyle, $baseDirectory)` forks workers with `pcntl`. Without `pcntl`, outside the CLI, or with one worker it exports sequentially. Piece hooks run in the workers; `onManifestBuild` runs once in the main process.

## Edge styles

| Style | Config `type` | Shape |
| --- | --- | --- |
| `NoEdgeStyle` (default) | `no_edge` | Unchanged rectangle |
| `RoundedCornersStyle($radius = 4)` | `rounded_corners` with `options.radius` | Transparent rounded corners; radius clamped to half the shorter side |
| `LineStyle` | `line` | Straight edges |
| `JigsawStyle` | `jigsaw` | Classic tab and socket |
| `ArcStyle` | `arc` | Arc-shaped tab and socket |
| `HalfCircleStyle` | `half_circle` | Half-circle tab and socket |
| `SinusStyle` | `sinus` | Wavy edge, two cycles per side |

All styles are in `ImagePuzzle\EdgeStyle`. The tab-and-socket styles put tabs on right and bottom edges and sockets on left and top edges, so neighbouring pieces fit. Use PNG output to keep the transparent areas.

Build a style from JSON:

```php
use ImagePuzzle\EdgeStyle\EdgeStyleFactory;

$style = EdgeStyleFactory::fromArray(['edge' => ['type' => 'rounded_corners', 'options' => ['radius' => 6]]]);
$style = EdgeStyleFactory::fromFile('edge-config.json');   // .json files only
$generator = new PuzzleGenerator($style);
```

`type: "composite"` with `top`, `right`, `bottom` and `left` sub-configs builds a `CompositeEdgeStyle` (one style per side; nesting composites is refused). `ResolverEdgeStyle` takes a closure that picks a style per piece from its `PieceContext` (row, column, offsets, sizes, source size, total rows and columns); it has no JSON form. Custom styles implement `EdgeStyleInterface::apply(GdImage $piece, PieceContext $context): GdImage`.

## Safety with user-supplied paths

Resolve and restrict any user-supplied input or output path before calling the library. `Puzzle::export()` and `Exporter::export()` accept a base directory as the last argument and throw `ExportFailedException` when the output directory is outside it:

```php
$result = $puzzle->export('/var/www/exports/user-123/puzzle', $options, '/var/www/exports');
```

The check runs after the output directory has been created: in 1.0.0 a rejected path outside the base directory is still created (empty) before the exception. Validate the path yourself first when that matters. Very large grids use a lot of memory and CPU; limit rows and columns for untrusted input.

## Errors

All exceptions implement `ImagePuzzle\Exception\ImagePuzzleException`:

| Exception | When |
| --- | --- |
| `GdNotAvailableException` | `ext-gd` is not loaded |
| `InvalidArgumentException` | Empty or unreadable path (`Image file is not readable: …`), rows or columns below 1, invalid split sizes, invalid edge config, path separators in file names |
| `UnsupportedImageTypeException` | Type not PNG, JPEG or GIF (`Unsupported image type: …`), or GD cannot load the file |
| `ExportFailedException` | Directory cannot be created or written, or is outside the base directory |

The upstream README's troubleshooting section quotes older messages ("cannot read from …", "unsuported image type"); the messages above are those thrown by 1.0.0.

## Example script

`examples/generate.php <input> <rows> <cols> <output_dir> [--config=<path>] [--rounded[=N]]` is meant to run from a clone of the repository after `composer install`: it loads the repository's own `vendor/autoload.php`, so running it from your application's `vendor/` directory stops with "Run composer install first."

## Testing and evidence

On the release commit, the [CI workflow](https://github.com/offline-agency/php-image-puzzle/actions/runs/21573111999) passed Pest tests and PHPStan on PHP 8.4 and 8.5 (checked 19 October 2026). For this guide the documented usage was also run against the Packagist 1.0.0 install on PHP 8.4.25 and 8.5.10: quick start, JPEG export, the JSON edge config, the splitting rule, file-name validation and the base-directory check behaved as described above. Parallel export with several workers was not exercised.

## Source, support and license

Use the [repository](https://github.com/offline-agency/php-image-puzzle) for [issues](https://github.com/offline-agency/php-image-puzzle/issues). The tagged source has no contribution guide and no security policy; the README asks for security issues to be reported by email to support@offlineagency.com rather than in the issue tracker. Release notes are in the [changelog](https://github.com/offline-agency/php-image-puzzle/blob/e1c0138e92debd07f8a60f8648479f8dbe627dab/CHANGELOG.md), which still lists 1.0.0 as unreleased. The package is distributed under the [MIT license](https://github.com/offline-agency/php-image-puzzle/blob/e1c0138e92debd07f8a60f8648479f8dbe627dab/LICENSE). It was inspired by the archived [pear/Image_Puzzle](https://github.com/pear/Image_Puzzle) and is a separate implementation.
