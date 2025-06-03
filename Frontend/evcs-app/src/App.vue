<template>
  <component :is="currentNavbar" />
  <router-view />
</template>

<script setup>
import NavBarLoggedIn from '@/components/NavbarLoggedIn.vue'
import NavBarPublic from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()

const noNavbarRoutes = []
const publicRoutes = ['/login', '/signup', '/']

const currentNavbar = computed(() => {
  if (noNavbarRoutes.includes(route.path)) return null

  // Show logged-in navbar only if:
  // - user is authenticated AND
  // - token exists AND
  // - token is valid (admin or not — we just care it's legit)
  const tokenValid = auth.token && auth.token.length > 10 // crude check
  if (auth.isAuthenticated && tokenValid && !publicRoutes.includes(route.path)) {
    return NavBarLoggedIn
  }

  return NavBarPublic
})
</script>
