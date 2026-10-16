<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const emit = defineEmits(['toggle'])
const button = ref(null)
const expanded = ref(false)
let observer
function escape(event) {
  if (event.key === 'Escape' && expanded.value) {
    emit('toggle')
    button.value?.focus()
  }
}
onMounted(() => {
  const container = button.value.closest('.vp-theme-container')
  const sync = () => { expanded.value = container?.classList.contains('sidebar-open') || false }
  observer = new MutationObserver(sync)
  if (container) observer.observe(container, { attributes: true, attributeFilter: ['class'] })
  document.addEventListener('keydown', escape)
  sync()
})
onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('keydown', escape)
})
</script>
<template>
  <button ref="button" class="vp-toggle-sidebar-button" type="button"
          aria-label="Toggle navigation" :aria-expanded="expanded" @click="emit('toggle')">
    <span class="icon" aria-hidden="true"><span></span><span></span><span></span></span>
  </button>
</template>
<style scoped>
.vp-toggle-sidebar-button { display:none; position:absolute; inset-inline-start:1rem; top:.6rem; padding:.6rem; border:0; background:transparent; color:inherit; cursor:pointer; }
.icon { display:flex; flex-direction:column; justify-content:center; width:1.25rem; height:1.25rem; gap:5px; }
.icon > span { display:block; width:100%; height:2px; background:currentColor; }
@media (max-width: 719px) { .vp-toggle-sidebar-button { display:block; } }
</style>
