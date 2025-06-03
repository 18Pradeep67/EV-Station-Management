<template>
  <div class="container">
    <h1 class="page-title">Manage Charging Stations Map</h1>
    
    <StationsMap 
      :stations="stations"
      :is-loading="isLoading"
      :center-station-id="centerStationId"
      :is-admin="true"
      @edit="editStation"
      @delete="deleteStation"
    />
    
    <transition name="fade">
      <div v-if="editingStation" class="modal-overlay">
        <div class="modal-container">
          <StationForm 
            :station="editingStation"
            :is-submitting="isSubmitting"
            @submit="saveStation"
            @close="closeForm"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StationsMap from '../../components/map/StationsMap.vue';
import StationForm from '../../components/admin/StationForm.vue';
import { useStations } from '../../composables/useStations';
import type { ChargingStation } from '../../types';

const route = useRoute();
const { 
  stations, 
  isLoading, 
  error, 
  fetchStations, 
  updateStation, 
  deleteStation: removeStation
} = useStations();

const centerStationId = ref<string | null>(null);
const editingStation = ref<ChargingStation | null>(null);
const isSubmitting = ref(false);

const editStation = (station: ChargingStation) => {
  editingStation.value = station;
};

const deleteStation = async (station: ChargingStation) => {
  if (station.id) {
    await removeStation(station.id);
  }
};

const saveStation = async (station: ChargingStation) => {
  isSubmitting.value = true;
  
  try {
    if (station.id) {
      await updateStation(station.id, station);
    }
    closeForm();
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};

const closeForm = () => {
  editingStation.value = null;
};

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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>