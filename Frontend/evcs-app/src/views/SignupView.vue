<template>
    <section class="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-green-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-black-700 mb-6">Create an Account</h2>
            <form @submit.prevent="signup">
                <div class="mb-4">
                    <label for="username" class="block mb-1 font-semibold text-black-700">Username</label>
                    <input v-model="username" type="text" id="username" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block mb-1 font-semibold text-black-700">Email ID</label>
                    <input v-model="email" type="email" id="email" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div class="mb-4">
                    <label for="password" class="block mb-1 font-semibold text-black-700">Password</label>
                    <input v-model="password" type="password" id="password" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div class="mb-6">
                    <label for="confirmPassword" class="block mb-1 font-semibold text-black-700">Confirm
                        Password</label>
                    <input v-model="confirmPassword" type="password" id="confirmPassword" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" :class="{
                            'border-red-500 focus:ring-red-500': confirmPassword && confirmPassword !== password,
                            'focus:ring-green-500': confirmPassword === password,
                        }" />
                    <p v-if="confirmPassword && confirmPassword !== password" class="text-red-600 text-sm mt-1">
                        Passwords do not match.
                    </p>
                </div>
                <button type="submit" class="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
                    Sign Up
                </button>
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Already have an account?
                        <router-link to="/login" class="text-primary-600 hover:text-primary-500">
                            Log in
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup LANG="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');


const signup = () => {
  // Form validations
    if (!username.value || !email.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'Please fill in all fields';
        alert(errorMessage.value);
        return;
    }
    
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match';
        alert(errorMessage.value);
        return;
    }
    // Here you would typically call an API to register the user
    // For now, we'll simulate a successful registration
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/dashboard');
};
</script>