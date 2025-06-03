<template>
  <div class="container">
    <h1 class="page-title">Charging Stations Map</h1>
    
    <StationsMap 
      :stations="stations"
      :is-loading="isLoading"
      :center-station-id="centerStationId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StationsMap from '../../components/map/StationsMap.vue';
import { useStations } from '../../composables/useStations';

const route = useRoute();
const { stations, isLoading, error, fetchStations } = useStations();

const centerStationId = ref<string | null>(null);

onMounted(async () => {
  await fetchStations();
  
  // Check if we need to center on a specific station
  if (route.query.stationId) {
    centerStationId.value = route.query.stationId as string;
  }
});
</script>

<style scoped>
.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
}
</style>