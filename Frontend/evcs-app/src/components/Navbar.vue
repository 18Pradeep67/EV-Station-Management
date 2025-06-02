<!-- src/components/Navbar.vue -->
<script setup>
import logo from '@/assets/img/logo.png'
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-green-700 text-white shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img :src="logo" class="h-10 w-auto mr-2" alt="Logo" />
          <span class="font-bold text-xl">Evoltsoft</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Home</router-link>
          <router-link to="/signup" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Sign up</router-link>
          <router-link to="/login" class="px-3 py-2 rounded-md hover:bg-green-800 transition">Login</router-link>
        </div>

        <!-- Mobile Menu Toggle -->
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
      <div v-if="mobileMenuOpen" class="md:hidden mt-2 space-y-1 pb-2">
        <router-link to="/" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Home</router-link>
        <router-link to="/signup" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Sign up</router-link>
        <router-link to="/login" class="block px-3 py-2 rounded-md hover:bg-green-800 transition" @click="mobileMenuOpen = false">Login</router-link>
      </div>
    </div>
  </nav>
</template>
