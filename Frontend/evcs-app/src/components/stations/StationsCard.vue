<template>
  <div class="station-card card">
    <div class="station-header">
      <h3>{{ station.name }}</h3>
      <span class="badge" :class="statusClass">{{ station.status }}</span>
    </div>
    
    <!-- <div class="station-address">
      {{ station.address || 'No address available' }}
    </div> -->
    
    <div class="station-details">
      <div class="detail-item">
        <span class="detail-label">Power Output:</span>
        <span class="detail-value">{{ station.powerOutput }} kW</span>
      </div>
      
      <div class="detail-item">
        <span class="detail-label">Connector Type:</span>
        <span class="detail-value">{{ station.connectorType }}</span>
      </div>
      
    </div>
    
      <div class="station-actions">
        <button class="btn btn-secondary" @click="$emit('view-on-map', station)">
          <i class="mdi mdi-map-marker"></i> View on Map
        </button>
        
        <template v-if="isAdmin">
          <button class="btn btn-primary" @click="$emit('edit', station)">
            <i class="mdi mdi-pencil"></i> Edit
          </button>
          
          <button class="btn btn-danger" @click="confirmDelete">
            <i class="mdi mdi-delete"></i> Delete
          </button>
        </template>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { computed, PropType } from 'vue';
  import type { ChargingStation } from '../../types';
  import Swal from 'sweetalert2';


  const props = defineProps({
    station: {
      type: Object as PropType<ChargingStation>,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['view-on-map', 'edit', 'delete']);

  const statusClass = computed(() => {
    switch (props.station.status) {
      case 'Active':
        return 'badge-active';
      case 'Inactive':
        return 'badge-inactive';
      case 'Maintenance':
        return 'badge-maintenance';
      default:
        return '';
    }
  });

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: `Delete ${props.station.name}?`,
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    emit('delete', props.station);
    Swal.fire({
      title: 'Deleted!',
      text: `${props.station.name} has been deleted.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }
};

  </script>

<style scoped>
.station-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
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
  flex: 1;
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
  flex-wrap: wrap;
}
</style>