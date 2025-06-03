<template>
  <div class="container">
    <h1 class="page-title">Charging Stations</h1>
    
    <StationsFilter 
      v-model="filters"
      @apply="fetchStations"
      @reset="resetFilters"
    />
     
    <StationsList 
      :stations="stations"
      :filtered-stations="filteredStations"
      :is-loading="isLoading"
      :error="error"
      @view-on-map="viewOnMap"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StationsFilter from '../../components/stations/StationsFilter.vue';
import StationsList from '../../components/stations/StationsList.vue';
import { useStations, useStationFilters } from '../../composables/useStations';
import type { ChargingStation } from '../../types';

const router = useRouter();
const { stations, isLoading, error, fetchStations } = useStations();
const { filters, applyFilters, resetFilters } = useStationFilters();

const filteredStations = computed(() => {
  return applyFilters(stations.value);
});
const viewOnMap = (station: ChargingStation) => {
  router.push({ 
    path: '/map',
    query: { stationId: station.name }
  });
};

onMounted(async() => {
  await fetchStations();
  console.log('Received in mount', stations.value)

});
</script>

<style scoped>
.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
}
</style>