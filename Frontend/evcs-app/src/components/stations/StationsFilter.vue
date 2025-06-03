<template>
  <div class="filters-container card">
    <div class="filters-header" @click="toggleFilters">
      <h3>Filters</h3>
      <i class="mdi" :class="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></i>
    </div>
    
    <div class="filters-content" v-show="isExpanded">
      <div class="filters-grid">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select v-model="filters.status" class="form-select">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Connector Type</label>
          <select v-model="filters.connectorType" class="form-select">
            <option value="">All Connectors</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Min Power (kW)</label>
          <input 
            type="number" 
            v-model.number="filters.minPower" 
            class="form-input" 
            placeholder="Minimum"
            min="0"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Max Power (kW)</label>
          <input 
            type="number" 
            v-model.number="filters.maxPower" 
            class="form-input" 
            placeholder="Maximum"
            min="0"
          >
        </div>
      </div>
      
      <div class="filters-actions">
        <button class="btn btn-secondary" @click="resetFilters">
          Reset Filters
        </button>
        
        <button class="btn btn-primary" @click="applyFilters">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { StationFilters } from '../../types';

const props = defineProps<{
  modelValue: StationFilters;
}>();

const emit = defineEmits(['update:modelValue', 'apply', 'reset']);

const isExpanded = ref(true);
const filters = reactive<StationFilters>({
  status: props.modelValue.status,
  connectorType: props.modelValue.connectorType,
  minPower: props.modelValue.minPower,
  maxPower: props.modelValue.maxPower
});

watch(() => props.modelValue, (newVal) => {
  filters.status = newVal.status;
  filters.connectorType = newVal.connectorType;
  filters.minPower = newVal.minPower;
  filters.maxPower = newVal.maxPower;
}, { deep: true });

const toggleFilters = () => {
  isExpanded.value = !isExpanded.value;
};

const applyFilters = () => {
  emit('update:modelValue', { ...filters });
  emit('apply');
};

const resetFilters = () => {
  filters.status = '';
  filters.connectorType = '';
  filters.minPower = null;
  filters.maxPower = null;
  
  emit('update:modelValue', { ...filters });
  emit('reset');
};
</script>

<style scoped>
.filters-container {
  margin-bottom: 1.5rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filters-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.filters-content {
  margin-top: 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.filters-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .filters-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .filters-actions button {
    width: 100%;
  }
}
</style>