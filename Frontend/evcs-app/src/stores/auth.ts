import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  isAdmin?: boolean
  [key: string]: any
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  const token = ref(localStorage.getItem('token') || '')

  const isAdmin = computed(() => {
    if (!token.value) return false
    try {
      const decoded = jwtDecode<DecodedToken>(
        token.value.startsWith('Bearer ') ? token.value.split(' ')[1] : token.value
      )
      return decoded?.isAdmin === true
    } catch {
      return false
    }
  })

  function login(receivedToken: string) {
    const bearerToken = receivedToken.startsWith('Bearer ') ? receivedToken : `Bearer ${receivedToken}`
    token.value = bearerToken
    localStorage.setItem('token', bearerToken)
    localStorage.setItem('isAuthenticated', 'true')
    isAuthenticated.value = true
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
    localStorage.setItem('isAuthenticated', 'false')
    isAuthenticated.value = false
  }

  return { isAuthenticated, isAdmin, token, login, logout }
})
