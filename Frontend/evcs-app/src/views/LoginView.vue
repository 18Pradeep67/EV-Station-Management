<template>
    <section class="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-green-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-black-700 mb-6">Create an Account</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block mb-1 font-semibold text-black-700">Username</label>
                    <input v-model="name" type="text" id="name" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div class="mb-4">
                    <label for="password" class="block mb-1 font-semibold text-black-700">Password</label>
                    <input v-model="password" type="password" id="password" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <button type="submit" class="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
                    Login
                </button>
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Don't have an account?
                        <router-link to="/signup" class="text-primary-600 hover:text-primary-500">
                            Sign up
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { login } from '@/api/auth.js';

const router = useRouter();
const name = ref('');
const password = ref('');

const handleSubmit = async () => {
  if (!name.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill in all fields.',
    });
    return;
  }

  const data = await login(name.value, password.value);

  if (data.token) {
    // Login successful
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', 'Bearer '+data.token);
    router.push('/dashboard');
  } else {
    // Login failed — backend message shown
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: data.message || 'Login failed',
    });
  }
};
</script>
