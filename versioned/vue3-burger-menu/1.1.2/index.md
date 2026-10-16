---
title: Vue 3 Burger Menu — 1.1.2
description: >-
  Verified source API for Vue 3 off-canvas menus, including the missing npm
  bundle and integration limits.
packageVersion: 1.1.2
sourceCommit: 27ed3fe184f55de51401590f3975011c4131f65a
gitName: vue3-burger-menu
permalink: /vue3-burger-menu/1.1.2/
documentationSnapshot: true
---

# Vue 3 Burger Menu

An off-canvas Vue 3 menu with CSS transition wrappers and a default slot for navigation content. This guide targets GitHub release **1.1.2**, pinned to `27ed3fe184f55de51401590f3975011c4131f65a`. GitHub and the public npm registry were checked independently on 16 October 2026.

[Release](https://github.com/offline-agency/vue3-burger-menu/releases/tag/1.1.2) · [Pinned source](https://github.com/offline-agency/vue3-burger-menu/tree/27ed3fe184f55de51401590f3975011c4131f65a) · [npm metadata](https://registry.npmjs.org/@offlineagency%2fvue3-burger-menu)

## Distribution and requirements

**The published npm artifact cannot currently be imported.** The only scoped registry version is `@offlineagency/vue3-burger-menu@1.0.0`. Its tarball contains only `package.json`, `README.md` and `LICENSE`; the declared `main`, `dist/vue3-burger-menu.common.js`, is missing. `npm install` can download it, but does not produce a usable library bundle.

The GitHub tag is `1.1.2`, while its package manifest says `1.0.0`. Registry `1.0.0` records `gitHead` `e19adffec7e1603544b2c847f6aff5d02c7a5658`, a different commit from the release. There is no verified npm `1.1.2`. Use the scoped name above; the upstream README's unscoped import is inconsistent with its manifest.

The source declares runtime dependency `vue: ^3.0.0-0`, Vue CLI `^4.5.0` and `@vue/compiler-sfc: ^3.0.0-0` for development. It declares no Node engine and has no lockfile. These older constraints do not establish a current runtime/build compatibility matrix or, by themselves, make the project legacy.

## Source evaluation setup

Evaluate a built copy of the pinned source in an isolated application until a corrected registry artifact is available:

```bash
git clone https://github.com/offline-agency/vue3-burger-menu.git
cd vue3-burger-menu
git checkout --detach 27ed3fe184f55de51401590f3975011c4131f65a
# Resolve and review dependencies in this isolated checkout.
npm install
npm run build-bundle
```

Install the resulting local directory into a separate Vue 3 application. The manifest points to the generated CommonJS file and includes CommonJS/UMD bundles in its package file list. This source-build workaround has **not** been executed for this guide: the old Vue CLI toolchain and unlocked dependency resolution may require further work on your Node version. Installing the Git URL alone will not build `dist` because no `prepare` script exists.

## Import and complete example

The source entry exports **one default object**, not named exports and not a Vue plugin. With a working locally built package:

```vue
<script setup>
import { ref } from 'vue'
import BurgerMenu from '@offlineagency/vue3-burger-menu'

const { Slide } = BurgerMenu
const isOpen = ref(false)
</script>

<template>
  <button type="button" :aria-expanded="isOpen" @click="isOpen = !isOpen">
    Toggle navigation
  </button>
  <Slide
    :is-open="isOpen"
    width="320"
    :burger-icon="false"
    :cross-icon="false"
    :close-on-navigation="true"
    @open-menu="isOpen = true"
    @close-menu="isOpen = false"
  >
    <a href="/">Home</a>
    <a href="/contact/">Contact</a>
  </Slide>
  <main id="page-wrap">
    <h1>Example application</h1>
    <p>Your page content.</p>
  </main>
</template>

<style>
.bm-menu { background: #243044; }
.bm-item-list > a { color: white; }
</style>
```

The example uses a native external button because the built-in burger/cross controls are clickable `div`/`span` elements without keyboard button semantics. Add and test focus management, focus restoration, appropriate navigation labelling and keyboard behavior for your application. The component does not provide a focus trap or a complete accessible-dialog implementation.

## Props, events and slot

Wrapper components forward attributes to the shared `Menu`. Source prop names below can be written in kebab case in templates.

| Prop | Type / default | Behavior |
| --- | --- | --- |
| `isOpen` | Boolean / false | Watches changes; synchronize state with both menu events. There is no `update:isOpen` event for `v-model`. Initial true is not applied by the non-immediate watcher; start false and change after mount if needed. |
| `right` | Boolean / false | Opening positions the sidebar at the right edge. Dynamic position changes have a defective watcher; keep the position fixed for the mounted instance. |
| `width` | String / `'300'` | Numeric pixel string, e.g. `"320"`. The implementation appends `px`; do not pass `"320px"` or a number binding. |
| `disableEsc` | Boolean / false | Skips registering the Escape key listener on mount. `disableCloseOnEsc` is not an implemented prop. |
| `noOverlay` | Boolean / false | Avoids adding `bm-overlay` to `document.body` when opening. |
| `burgerIcon`, `crossIcon` | Boolean / true | Show or hide built-in click controls. |
| `disableOutsideClick` | Boolean / false | Prevents closing when a click is outside the menu and burger. |
| `closeOnNavigation` | Boolean / false | Closes on a click anywhere inside `.bm-menu`, not only link navigation. |
| `onStateChange` | Function / unset | Declared but never called by the source; use events. |

`openMenu` and `closeMenu` are emitted without payload. The wrappers forward these notifications; they are not guaranteed to indicate an actual state transition, because methods emit even when called repeatedly. The default slot is rendered inside `nav.bm-item-list`; there are no named or scoped slots.

## Animations and layout

The default export object contains `Menu`, `Slide`, `Bubble`, `Reveal`, `Push`, `PushRotate`, `ScaleDown`, `ScaleRotate`, `Stack`, `FallDown`, `Elastic`. The README marks `Bubble`, `Elastic`, `FallDown` and `Stack` as work in progress; their presence in the object is not a support guarantee.

| Wrapper | Required application elements in the source |
| --- | --- |
| `Menu`, `Slide` | No page wrapper selector. |
| `Push`, `Reveal` | `#page-wrap` after the menu. |
| `PushRotate`, `ScaleDown`, `ScaleRotate` | `#page-wrap` after the menu and an outer `#app` containing both. |

IDs are hard-coded in the wrappers. `pageWrapId` / `appId` are not customizable props. Missing elements cause null DOM access when opening or closing. For transforms, mount your Vue app on `#app`, render the menu before `<main id="page-wrap">`, and keep those elements stable. `ScaleDown` / `ScaleRotate` use a default transform distance of 100px even though the shared menu defaults to 300px; set `width` explicitly.

The unscoped style in `Menu.vue` provides `.bm-menu`, `.bm-burger-button`, `.bm-burger-bars`, `.bm-cross`, `.bm-cross-button`, `.bm-item-list`, `.bm-overlay`, `.line-style` and `.cross-style`. `vue.config.js` disables CSS extraction, so the intended library bundle injects these styles; the published npm tarball contains neither bundle nor standalone CSS. Apply global overrides after the working bundle is loaded, or Vue `:deep()` rules from scoped application styles. `.bm-overlay` changes the body's background; it does not create a separate overlay element.

## Runtime limits and verification

This component accesses `document` directly during setup; mount it on the client in SSR applications. It manipulates global body classes/styles and fixed selectors, so multiple simultaneous menus can interfere. Close before unmounting: listener cleanup exists, but unmount does not restore an open menu's overlay or all wrapper transform/style changes. Keep `disableEsc` stable while mounted because listener registration and removal depend on its value.

The right-position watcher passes `right.value` rather than a reactive source to `watch`, so Vue can warn and dynamic positioning is unreliable. There is no structured error event or recovery API; handle prerequisites in your application. Browser claims in the upstream README were not reproduced; reduced motion, mobile layout, keyboard navigation, visual animation and SSR behavior require application testing.

The repository has no test script or test files. Local Node 25 checks executed the actual released `Menu.vue` setup/methods against synthetic Vue/DOM boundaries: pixel width, open/close events, overlay, Escape and listener cleanup passed. Tarball inspection independently confirmed its missing main entry. No browser rendering, production bundle build or full upstream compatibility test was performed. The project includes the MIT license with attribution to Mohit Bajoria.
