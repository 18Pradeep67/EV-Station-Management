import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Charger, ChargerFilter } from '../types.ts';

export const useChargerStore = defineStore('charger', () => {
  // State
  const chargers = ref<Charger[]>([
    {
      id: 1,
      name: 'Downtown Fast Charger',
      status: 'active',
      powerOutput: 150,
      connectorType: 'CCS',
      location: { lat: 40.7128, lng: -74.006 },
      address: '123 Main St, New York, NY 10001',
      pricePerKwh: 0.35,
      lastMaintenance: '2025-01-15',
    },
    {
      id: 2,
      name: 'Central Park Charging Hub',
      status: 'active',
      powerOutput: 50,
      connectorType: 'CHAdeMO',
      location: { lat: 40.7829, lng: -73.9654 },
      address: '456 Park Ave, New York, NY 10022',
      pricePerKwh: 0.40,
      lastMaintenance: '2025-02-01',
    },
    {
      id: 3,
      name: 'Brooklyn Heights Charger',
      status: 'maintenance',
      powerOutput: 75,
      connectorType: 'Type 2',
      location: { lat: 40.6958, lng: -73.9936 },
      address: '789 Atlantic Ave, Brooklyn, NY 11217',
      pricePerKwh: 0.30,
      lastMaintenance: '2024-12-10',
    },
    {
      id: 4,
      name: 'Queens Express Charger',
      status: 'active',
      powerOutput: 250,
      connectorType: 'CCS',
      location: { lat: 40.7563, lng: -73.8458 },
      address: '321 Queens Blvd, Queens, NY 11101',
      pricePerKwh: 0.45,
      lastMaintenance: '2025-03-05',
    },
    {
      id: 5,
      name: 'Staten Island Mall Charger',
      status: 'inactive',
      powerOutput: 100,
      connectorType: 'Type 2',
      location: { lat: 40.5834, lng: -74.1496 },
      address: '654 Richmond Ave, Staten Island, NY 10314',
      pricePerKwh: 0.38,
      lastMaintenance: '2025-01-25',
    },
  ]);
  
  const filters = ref<ChargerFilter>({
    status: '',
    connectorType: '',
    minPower: null,
    maxPower: null,
  });
  
  // Computed
  const filteredChargers = computed(() => {
    return chargers.value.filter(charger => {
      // Status filter
      if (filters.value.status && charger.status !== filters.value.status) {
        return false;
      }
      
      // Connector type filter
      if (filters.value.connectorType && charger.connectorType !== filters.value.connectorType) {
        return false;
      }
      
      // Power output filter (min)
      if (filters.value.minPower !== null && charger.powerOutput < filters.value.minPower) {
        return false;
      }
      
      // Power output filter (max)
      if (filters.value.maxPower !== null && charger.powerOutput > filters.value.maxPower) {
        return false;
      }
      
      return true;
    });
  });
  
  // Actions
  function addCharger(charger: Omit<Charger, 'id'>) {
    const id = chargers.value.length > 0 
      ? Math.max(...chargers.value.map(c => c.id)) + 1 
      : 1;
      
    chargers.value.push({ ...charger, id });
    return id;
  }
  
  function updateCharger(id: number, updatedCharger: Partial<Charger>) {
    const index = chargers.value.findIndex(c => c.id === id);
    if (index !== -1) {
      chargers.value[index] = { ...chargers.value[index], ...updatedCharger };
      return true;
    }
    return false;
  }
  
  function deleteCharger(id: number) {
    const index = chargers.value.findIndex(c => c.id === id);
    if (index !== -1) {
      chargers.value.splice(index, 1);
      return true;
    }
    return false;
  }
  
  function setFilters(newFilters: Partial<ChargerFilter>) {
    filters.value = { ...filters.value, ...newFilters };
  }
  
  function resetFilters() {
    filters.value = {
      status: '',
      connectorType: '',
      minPower: null,
      maxPower: null,
    };
  }
  
  return { 
    chargers,
    filters,
    filteredChargers,
    addCharger,
    updateCharger,
    deleteCharger,
    setFilters,
    resetFilters
  };
});