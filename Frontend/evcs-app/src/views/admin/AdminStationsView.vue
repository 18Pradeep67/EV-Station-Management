<template>
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">Manage Charging Stations</h1>
      <button class="btn btn-primary" @click="showAddForm = true">
        <i class="mdi mdi-plus"></i> Add New Charger
      </button>
    </div>

    <StationsFilter v-model="filters" @apply="fetchStations" @reset="resetFilters" />

    <StationsList :stations="stations" :filtered-stations="filteredStations" :is-loading="isLoading" :error="error"
      :is-admin="true" @view-on-map="viewOnMap" @edit="editStation" @delete="deleteStation" />

    <transition name="fade">
      <div v-if="showAddForm || editingStation" class="modal-overlay">
        <div class="modal-container">
          <StationForm :station="editingStation" :is-submitting="isSubmitting" @submit="saveStation"
            @close="closeForm" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StationsFilter from '../../components/stations/StationsFilter.vue';
import StationsList from '../../components/stations/StationsList.vue';
import StationForm from '../../components/admin/StationForm.vue';
import { useStations, useStationFilters } from '../../composables/useStations';
import type { ChargingStation } from '../../types';
import Swal from 'sweetalert2';


const router = useRouter();
const {
  stations,
  isLoading,
  error,
  fetchStations,
  addStation,
  updateStation,
  removeStation
} = useStations();
const { filters, applyFilters, resetFilters } = useStationFilters();

const showAddForm = ref(false);
const editingStation = ref<ChargingStation | null>(null);
const isSubmitting = ref(false);

const filteredStations = computed(() => {
  return applyFilters(stations.value);
});

const viewOnMap = (station: ChargingStation) => {
  router.push({
    path: '/admin/map',
    query: { stationId: station.name }
  });
};

const editStation = (station: ChargingStation) => {
  editingStation.value = station;
};

const deleteStation = async (station: ChargingStation) => {
  if (station.name) {
    try {
      await removeStation(station);
      await fetchStations(); // make sure new station appears
    } catch (err) {
      console.error(err);
    } finally {
      await fetchStations();
    }
  }
};

const saveStation = async (station: ChargingStation) => {
  isSubmitting.value = true;
  try {
    if (editingStation.value) {
      await updateStation(station);
    } else {
      await addStation(station);
    }
    closeForm();
    await fetchStations(); // make sure new station appears
  } catch (err) {
    Swal.fire({
      icon: 'warning',
      title: 'Charging Station already exists',
      text: 'Please enter a new charging station name.',
    });
    console.error(err);
  } finally {
    await fetchStations();
    isSubmitting.value = false;
  }
};


const closeForm = () => {
  showAddForm.value = false;
  editingStation.value = null;
};

onMounted(async () => {
  await fetchStations();
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title {
  margin: 0;
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

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .page-header button {
    width: 100%;
  }
}
</style>