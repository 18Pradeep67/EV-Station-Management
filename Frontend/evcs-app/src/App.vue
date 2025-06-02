<template>
  <component :is="currentNavbar" />
  <router-view />
</template>

<script setup>
import NavBarLoggedIn from '@/components/NavbarLoggedIn.vue'
import NavBarPublic from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// Get current route
const route = useRoute()

// Routes where NO navbar should show (optional)
const noNavbarRoutes = []

// Routes where public navbar should show
const publicRoutes = ['/login', '/signup', '/']

// Determine which navbar to show
const currentNavbar = computed(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (noNavbarRoutes.includes(route.path)) return null

  return isAuthenticated && !publicRoutes.includes(route.path)
    ? NavBarLoggedIn
    : NavBarPublic
})
</script>
