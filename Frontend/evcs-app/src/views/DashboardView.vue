<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = ref([
  { id: 1, label: 'Chargers Nearby', value: 18, color: 'bg-primary-100 text-primary-600' },
  { id: 2, label: 'Charging Sessions', value: 42, color: 'bg-green-100 text-green-600' },
  { id: 3, label: 'Energy Saved', value: '526 kWh', color: 'bg-lime-100 text-lime-600' },
  { id: 4, label: 'CO₂ Avoided', value: '212 kg', color: 'bg-blue-100 text-blue-600' },
  { id: 5, label: 'Charging Time', value: '134 hrs', color: 'bg-purple-100 text-purple-600' },
  { id: 6, label: 'Avg. Session Time', value: '1.8 hrs', color: 'bg-amber-100 text-amber-600' },
  { id: 7, label: 'Searches Made', value: 231, color: 'bg-pink-100 text-pink-600' },
  { id: 8, label: 'Most Active Area', value: 'Magarpatta', color: 'bg-emerald-100 text-emerald-600' }
]);

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen overflow-x-hidden">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.id"
          :class="['w-full p-10 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105', stat.color]"
        >
          <p class="text-xl font-medium">{{ stat.label }}</p>
          <p class="text-4xl font-extrabold mt-3">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
