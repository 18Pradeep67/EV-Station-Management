<template>
  <div class="stations-list">
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading stations...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="filteredStations.length === 0" class="empty-state">
      <i class="mdi mdi-map-marker-off"></i>
      <h3>No charging stations found</h3>
      <p>Try adjusting your filters or check back later.</p>
    </div>
    
    <div v-else class="stations-grid">
      <StationCard 
        v-for="station in filteredStations" 
        :key="station.id"
        :station="station"
        :is-admin="isAdmin"
        @view-on-map="$emit('view-on-map', station)"
        @edit="$emit('edit', station)"
        @delete="$emit('delete', station)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { ChargingStation } from '../../types';
import StationCard from './StationsCard.vue';

const props = defineProps({
  stations: {
    type: Array as PropType<ChargingStation[]>,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  filteredStations: {
    type: Array as PropType<ChargingStation[]>,
    required: true
  }
});

defineEmits(['view-on-map', 'edit', 'delete']);
</script>

<style scoped>
.stations-list {
  width: 100%;
}

.stations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading, .error-message, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.error-message {
  color: var(--error-color);
}

.empty-state {
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .stations-grid {
    grid-template-columns: 1fr;
  }
}
</style>