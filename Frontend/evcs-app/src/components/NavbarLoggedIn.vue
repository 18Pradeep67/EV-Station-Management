<!-- src/components/Navbar.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<template>
  <nav class="bg-green-700 text-white shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center">
          <div class="bg-white rounded-full p-1 mr-2">
            <div class="text-green-700 font-bold">V</div>
          </div>
          <span class="font-bold text-xl">Evoltsoft</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/dashboard" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Dashboard</router-link>
          <router-link to="/chargers" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Chargers</router-link>
          <router-link to="/map" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Map</router-link>
          <button @click="logout" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Logout</button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" class="text-white p-2" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-2 space-y-1 pb-1">
        <router-link to="/dashboard" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Dashboard</router-link>
        <router-link to="/chargers" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Chargers</router-link>
        <router-link to="/map" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Map</router-link>
        <button class="block w-full text-left px-3 py-2 rounded-md hover:bg-green-800 transition" @click="logout(); mobileMenuOpen = false">Logout</button>
      </div>
    </div>
  </nav>
</template>
