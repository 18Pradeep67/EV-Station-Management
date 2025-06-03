// composables/useAuth.ts
import { computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  isAdmin?: boolean;
  [key: string]: any;
}

export function useAuth() {
  const tokenWithBearer = localStorage.getItem('token');
  const token = tokenWithBearer?.startsWith('Bearer ') ? tokenWithBearer.split(' ')[1] : null;

  // Decode token
  const decoded = token ? jwtDecode<DecodedToken>(token) : null;
  const isAdmin = computed(() => decoded?.isAdmin === true);

  return { isAdmin };
}
