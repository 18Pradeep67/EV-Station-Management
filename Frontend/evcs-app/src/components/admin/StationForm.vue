<template>
  <div class="station-form-container">
    <div class="form-header">
      <h2>{{ isEditing ? 'Edit Charging Station' : 'Add New Charging Station' }}</h2>
      <button class="close-btn" @click="$emit('close')">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    
    <form @submit.prevent="submitForm">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label" for="name">Station Name*</label>
          <input 
            id="name"
            type="text" 
            v-model="form.name" 
            class="form-input"
            required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="status">Status*</label>
          <select 
            id="status"
            v-model="form.status" 
            class="form-select"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="address">Address</label>
          <input 
            id="address"
            type="text" 
            v-model="form.address" 
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="connectorType">Connector Type*</label>
          <select 
            id="connectorType"
            v-model="form.connectorType" 
            class="form-select"
            required
          >
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="powerOutput">Power Output (kW)*</label>
          <input 
            id="powerOutput"
            type="number" 
            v-model.number="form.powerOutput" 
            class="form-input"
            min="0"
            step="0.1"
            required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="price">Price (per kWh)</label>
          <input 
            id="price"
            type="text" 
            v-model="form.price" 
            class="form-input"
            placeholder="e.g. $0.35/kWh"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="latitude">Latitude*</label>
          <input 
            id="latitude"
            type="number" 
            v-model.number="form.location.latitude" 
            class="form-input"
            step="0.000001"
            required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="longitude">Longitude*</label>
          <input 
            id="longitude"
            type="number" 
            v-model.number="form.location.longitude" 
            class="form-input"
            step="0.000001"
            required
          >
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          Cancel
        </button>
        
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting">
            <i class="mdi mdi-loading mdi-spin"></i> Saving...
          </span>
          <span v-else>
            {{ isEditing ? 'Update Station' : 'Add Station' }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, PropType } from 'vue';
import type { ChargingStation } from '../../types';

const props = defineProps({
  station: {
    type: Object as PropType<ChargingStation | null>,
    default: null
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'close']);

const isEditing = computed(() => !!props.station);

const form = reactive<ChargingStation>({
  name: '',
  location: {
    latitude: 0,
    longitude: 0
  },
  status: 'Active',
  powerOutput: 0,
  connectorType: 'Type 2',
  address: '',
  price: ''
});

const initForm = () => {
  if (props.station) {
    form.name = props.station.name;
    form.location.latitude = props.station.location.latitude;
    form.location.longitude = props.station.location.longitude;
    form.status = props.station.status;
    form.powerOutput = props.station.powerOutput;
    form.connectorType = props.station.connectorType;
    form.address = props.station.address || '';
    form.price = props.station.price || '';
  }
};

const submitForm = () => {
  emit('submit', {
    ...(props.station?.id ? { id: props.station.id } : {}),
    name: form.name,
    location: {
      latitude: form.location.latitude,
      longitude: form.location.longitude
    },
    status: form.status,
    powerOutput: form.powerOutput,
    connectorType: form.connectorType,
    address: form.address,
    price: form.price
  });
};

onMounted(() => {
  initForm();
});
</script>

<style scoped>
.station-form-container {
  background-color: var(--bg-white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  width: 100%;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>