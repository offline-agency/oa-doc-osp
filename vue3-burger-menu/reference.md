---
title: Burger Menu component source reference
description: >-
  Exact component exports, shared props and emitted events extracted from the
  pinned source.
packageVersion: 1.1.2
sourceCommit: 27ed3fe184f55de51401590f3975011c4131f65a
---
# Component source reference

Generated from the exact tagged source. The overview explains behavior and limitations; this reference retains the actual declarations instead of maintaining another API table.

## Default export

```js
// Different CSS animations

import Slide from './Menu/slide'
import Bubble from './Menu/bubble'
import Reveal from './Menu/reveal'
import Push from './Menu/push'
import Elastic from './Menu/elastic'
import FallDown from './Menu/fallDown'
import PushRotate from './Menu/pushRotate'
import Stack from './Menu/stack'
import ScaleRotate from './Menu/scaleRotate'
import ScaleDown from './Menu/scaleDown'
import Menu from './Menu'

export default {
    Menu,
    Slide,
    Bubble,
    Reveal,
    Push,
    PushRotate,
    ScaleDown,
    ScaleRotate,
    Stack,
    FallDown,
    Elastic
}
```

## Shared props

```js
props: {
        isOpen: {
          type: Boolean,
          required: false
        },
        right: {
          type: Boolean,
          required: false
        },
        width: {
          type: [String],
          required: false,
          default: '300'
        },
        disableEsc: {
          type: Boolean,
          required: false
        },
        noOverlay: {
          type: Boolean,
          required: false
        },
        onStateChange: {
          type: Function,
          required: false
        },
        burgerIcon: {
          type: Boolean,
          required: false,
          default: true
        },
        crossIcon: {
          type: Boolean,
          required: false,
          default: true
        },
        disableOutsideClick: {
          type: Boolean,
          required: false,
          default: false
        },
        closeOnNavigation: {
          type: Boolean,
          required: false,
          default: false
        }
      }
```

## Emitted events and slot

 - `closeMenu` (no payload argument)
 - `openMenu` (no payload argument)

The shared template contains one default slot. There is no `update:isOpen` event. `onStateChange` is a declared prop but the shared implementation does not call it.

## Source and attribution

- [src/components/Menu.vue](https://github.com/offline-agency/vue3-burger-menu/blob/27ed3fe184f55de51401590f3975011c4131f65a/src/components/Menu.vue)
- [src/components/index.js](https://github.com/offline-agency/vue3-burger-menu/blob/27ed3fe184f55de51401590f3975011c4131f65a/src/components/index.js)
- [LICENSE](https://github.com/offline-agency/vue3-burger-menu/blob/27ed3fe184f55de51401590f3975011c4131f65a/LICENSE)

The copied declarations retain their upstream ownership. [MIT license notice](/assets/vue3-burger-menu/v1/LICENSE.txt).
