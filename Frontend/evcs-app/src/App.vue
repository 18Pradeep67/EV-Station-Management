<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import LayoutPublic from '@/layouts/LayoutPublic.vue'
import LayoutLoggedIn from '@/layouts/LayoutLoggedIn.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'public'
  switch (layout) {
    case 'loggedIn':
      return LayoutLoggedIn
    default:
      return LayoutPublic
  }
})
</script>
