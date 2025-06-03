<template>
  <div class="map-container">
    <div v-if="isLoading" class="map-loading">
      <div class="loading-spinner"></div>
      <p>Loading map...</p>
    </div>
    
    <div ref="mapElement" class="map-element"></div>
    
    <div v-if="selectedStation" class="station-popup card">
      <button class="close-btn" @click="selectedStation = null">
        <i class="mdi mdi-close"></i>
      </button>
      
      <div class="station-header">
        <h3>{{ selectedStation.name }}</h3>
        <span class="badge" :class="getStatusClass(selectedStation.status)">
          {{ selectedStation.status }}
        </span>
      </div>
      
      <div class="station-address" v-if="selectedStation.address">
        {{ selectedStation.address }}
      </div>
      
      <div class="station-details">
        <div class="detail-item">
          <span class="detail-label">Power Output:</span>
          <span class="detail-value">{{ selectedStation.powerOutput }} kW</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Connector Type:</span>
          <span class="detail-value">{{ selectedStation.connectorType }}</span>
        </div>
        
        <div class="detail-item" v-if="selectedStation.price">
          <span class="detail-label">Price:</span>
          <span class="detail-value">{{ selectedStation.price }}</span>
        </div>
      </div>
      
      <div class="station-actions" v-if="isAdmin">
        <button class="btn btn-primary" @click="$emit('edit', selectedStation)">
          <i class="mdi mdi-pencil"></i> Edit
        </button>
        
        <button class="btn btn-danger" @click="confirmDelete(selectedStation)">
          <i class="mdi mdi-delete"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, PropType } from 'vue';
import L from 'leaflet';
import type { ChargingStation } from '../../types';

const props = defineProps({
  stations: {
    type: Array as PropType<ChargingStation[]>,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  centerStationId: {
    type: String,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['edit', 'delete']);

const mapElement = ref<HTMLDivElement | null>(null);
const map = ref<L.Map | null>(null);
const markers = ref<{ [key: string]: L.Marker }>({});
const selectedStation = ref<ChargingStation | null>(null);

const initMap = () => {
  if (!mapElement.value) return;
  
  map.value = L.map(mapElement.value).setView([12.91684608873003, 77.6216720791379], 12);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);
  
  updateMarkers();
};

const updateMarkers = () => {
  if (!map.value) return;
  
  // Clear existing markers
  Object.values(markers.value).forEach(marker => {
    marker.remove();
  });
  
  markers.value = {};
  
  // Add new markers
  props.stations.forEach(station => {
    if (!map.value) return;
    
    const { latitude, longitude } = station.location;
    
    // Create marker with appropriate icon
    const markerIcon = L.divIcon({
      className: `station-marker station-marker-${station.status.toLowerCase()}`,
      html: `<i class="mdi mdi-ev-station"></i>`,
      iconSize: [30, 30]
    });
    
    const marker = L.marker([latitude, longitude], { icon: markerIcon })
      .addTo(map.value);
    
    // Add click handler
    marker.on('click', () => {
      selectedStation.value = station;
    });
    
    markers.value[station.id || ''] = marker;
  });
  
  // If we have stations, fit the map to show all of them
  if (props.stations.length > 0) {
    const coordinates = props.stations.map(station => [
      station.location.latitude,
      station.location.longitude
    ]);
    
    map.value.fitBounds(coordinates as L.LatLngBoundsExpression);
  }
  
  // If a specific station should be centered
  if (props.centerStationId) {
    const station = props.stations.find(s => s.id === props.centerStationId);
    if (station) {
      map.value.setView(
        [station.location.latitude, station.location.longitude], 
        15
      );
      
      selectedStation.value = station;
    }
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'badge-active';
    case 'Inactive':
      return 'badge-inactive';
    case 'Maintenance':
      return 'badge-maintenance';
    default:
      return '';
  }
};

const confirmDelete = (station: ChargingStation) => {
  if (confirm(`Are you sure you want to delete ${station.name}?`)) {
    emit('delete', station);
    selectedStation.value = null;
  }
};

// Initialize map when component is mounted
onMounted(() => {
  initMap();
});

// Clean up map when component is unmounted
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});

// Update markers when stations change
watch(() => props.stations, () => {
  updateMarkers();
}, { deep: true });

// Update markers when center station changes
watch(() => props.centerStationId, () => {
  if (props.centerStationId && map.value) {
    const station = props.stations.find(s => s.id === props.centerStationId);
    if (station) {
      map.value.setView(
        [station.location.latitude, station.location.longitude], 
        15
      );
      
      selectedStation.value = station;
    }
  }
});
</script>

<style>
.station-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--primary-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
}

.station-marker-active {
  background-color: var(--primary-color);
}

.station-marker-inactive {
  background-color: var(--text-secondary);
}

.station-marker-maintenance {
  background-color: var(--warning-color);
}
</style>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: var(--radius);
  overflow: hidden;
}

.map-element {
  width: 100%;
  height: 100%;
}

.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 500;
}

.station-popup {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 300px;
  z-index: 1000;
  max-height: calc(100% - 2rem);
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-right: 1.5rem;
}

.station-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.station-address {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.station-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.5rem;
}

.detail-label {
  width: 40%;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.detail-value {
  width: 60%;
  font-size: 0.875rem;
}

.station-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .map-container {
    height: 400px;
  }
  
  .station-popup {
    width: calc(100% - 2rem);
  }
  
  .station-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .station-actions button {
    width: 100%;
  }
}
</style>