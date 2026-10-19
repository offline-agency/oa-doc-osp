<script>
import { h, onMounted, ref } from 'vue'

// Line icons per project route. Paths draw in through CSS; looping SMIL
// motion is added after mount unless the visitor prefers reduced motion.
const ICONS = {
  'laravel-cart': { d: ['M3 4h2l2.4 11h10.2l2-8H6.2', 'M9 19.5a1.3 1.3 0 1 0 0.01 0', 'M17 19.5a1.3 1.3 0 1 0 0.01 0'], loop: 'shift' },
  'laravel-webex': { d: ['M3 7h11v10H3z', 'M14 11l6-3v8l-6-3'], dot: [6.5, 10] },
  'laravel-fatture-in-cloud-v2': { d: ['M6 3h9l4 4v14H6z', 'M15 3v4h4'], lines: [[9, 11, 16], [9, 14, 16], [9, 17, 13]], loop: 'write' },
  'laravel-aruba-sms': { d: ['M4 5h16v11H9l-4 4v-4H4z'], dots: [[9, 10.5], [12, 10.5], [15, 10.5]] },
  'laravel-mongo-auto-sync': { d: ['M20 12a8 8 0 0 1-13.7 5.7', 'M4 12a8 8 0 0 1 13.7-5.7', 'M17.7 3v3.3h-3.3', 'M6.3 21v-3.3h3.3'], loop: 'spin' },
  'laravel-bank-of-italy': { d: ['M4 8h15', 'M16 5l3 3-3 3', 'M20 16H5', 'M8 13l-3 3 3 3'], loop: 'swap' },
  'odps-validator': { d: ['M6 3h9l4 4v14H6z', 'M15 3v4h4'], check: 'M9 14l2 2 4-4' },
  'braintree-vue3': { d: ['M3 6h18v12H3z', 'M3 10h18'], bar: true },
  'vue3-burger-menu': { lines: [[5, 7, 19], [5, 12, 19], [5, 17, 19]], loop: 'burger' },
  'spid-laravel-trentino': { d: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M12 9.5a1.6 1.6 0 1 0 0.01 0', 'M12 11.5v3'], loop: 'pulse' },
  'filament-spid': { d: ['M3 5h18v14H3z', 'M3 9h18', 'M12 12a1.8 1.8 0 1 0 0.01 0', 'M8.8 17.2c.7-1.5 1.8-2.2 3.2-2.2s2.5.7 3.2 2.2'] },
  pgr_dmmsy: { d: ['M5 18L10 8L16 14L19 5'], nodes: [[5, 18], [10, 8], [16, 14], [19, 5]] },
  'laravel-fatture-in-cloud': { d: ['M6 3h9l4 4v14H6z', 'M15 3v4h4', 'M9.5 11.5l5 5', 'M14.5 11.5l-5 5'] },
}
const C = '#22706b'

export default {
  props: { slug: { type: String, required: true }, index: { type: Number, default: 0 } },
  setup(props) {
    const live = ref(false)
    onMounted(() => { live.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches })
    return () => {
      const s = ICONS[props.slug]
      if (!s) return null
      const on = live.value
      const base = props.index * 0.09
      const loop = (attributeName, values, dur, extra = {}) => on ? h('animate', { attributeName, values, dur, repeatCount: 'indefinite', ...extra }) : null
      const transform = (type, values, dur) => on ? h('animateTransform', { attributeName: 'transform', type, values, dur, repeatCount: 'indefinite' }) : null
      const kids = (s.d || []).map((d, k) => h('path', { d, pathLength: 1, class: 'draw', style: { animationDelay: `${base + k * 0.12}s` } }))
      ;(s.lines || []).forEach(([x1, y, x2], k) => kids.push(h('path', { d: `M${x1} ${y}H${x2}`, pathLength: 1, 'stroke-dasharray': 1 }, [
        s.loop === 'write' ? loop('stroke-dashoffset', '1;0;0;1', '3.2s', { keyTimes: '0;.35;.85;1', begin: `${base + 0.6 + k * 0.25}s` }) : null,
        s.loop === 'burger' ? loop('d', `M${x1} ${y}H${x2};M${x1} ${y}H${x2 - 6 + k * 2};M${x1} ${y}H${x2}`, '2.4s', { begin: `${k * 0.2}s` }) : null,
      ])))
      if (s.dot) kids.push(h('circle', { cx: s.dot[0], cy: s.dot[1], r: 1.2, fill: C, stroke: 'none' }, [loop('opacity', '1;0.15;1', '1.6s')]))
      ;(s.dots || []).forEach(([x, y], k) => kids.push(h('circle', { cx: x, cy: y, r: 1.1, fill: C, stroke: 'none' }, [loop('cy', `${y};${y - 1.6};${y};${y}`, '1.2s', { begin: `${k * 0.15}s`, keyTimes: '0;.25;.5;1' })])))
      if (s.check) kids.push(h('path', { d: s.check, pathLength: 1, 'stroke-dasharray': 1 }, [loop('stroke-dashoffset', '1;0;0;1', '2.8s', { keyTimes: '0;.25;.85;1', begin: `${base + 0.8}s` })]))
      if (s.bar) kids.push(h('path', { d: 'M6 14.5h4', 'stroke-width': 2.2 }, [loop('d', 'M6 14.5h4;M6 14.5h9;M6 14.5h4', '2.2s')]))
      if (s.nodes) {
        s.nodes.forEach(([x, y]) => kids.push(h('circle', { cx: x, cy: y, r: 1.6, fill: '#e6f2f1' })))
        if (on) kids.push(h('circle', { r: 1.4, fill: C, stroke: 'none' }, [h('animateMotion', { path: s.d[0], dur: '2.6s', repeatCount: 'indefinite', keyPoints: '0;1;1', keyTimes: '0;.8;1', calcMode: 'linear' })]))
      }
      let groups = kids
      if (s.loop === 'shift') groups = [h('g', null, [...kids, transform('translate', '0 0;1.2 0;0 0', '1.8s')])]
      if (s.loop === 'spin') groups = [h('g', null, [...kids, transform('rotate', '0 12 12;360 12 12', '6s')])]
      if (s.loop === 'pulse') groups = [h('g', null, [...kids, loop('opacity', '1;.55;1', '2.4s')])]
      if (s.loop === 'swap') groups = [
        h('g', null, [...kids.slice(0, 2), transform('translate', '0 0;1.5 0;0 0', '2s')]),
        h('g', null, [...kids.slice(2), transform('translate', '0 0;-1.5 0;0 0', '2s')]),
      ]
      return h('svg', {
        class: 'project-icon', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: C,
        'stroke-width': 1.7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
      }, groups)
    }
  },
}
</script>
