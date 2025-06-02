import { ref, computed } from 'vue';
import type { ChargingStation, StationFilters } from '../types';

// This would normally fetch from an API
export function useStations() {
  const stations = ref<ChargingStation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  const fetchStations = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // This would be an API call in a real application
      // const response = await fetch('/api/stations');
      // const data = await response.json();
      // stations.value = data;
      
      // For now, we'll just simulate loading
      await new Promise(resolve => setTimeout(resolve, 800));
      stations.value = [];
      
    } catch (err) {
      error.value = 'Failed to load charging stations';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const addStation = async (station: ChargingStation) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // This would be an API call in a real application
      // const response = await fetch('/api/stations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(station)
      // });
      // const data = await response.json();
      // stations.value = [...stations.value, data];
      
      // For now, we'll just simulate adding
      await new Promise(resolve => setTimeout(resolve, 500));
      const newStation = {
        ...station,
        id: `station-${Date.now()}`
      };
      stations.value = [...stations.value, newStation];
      
    } catch (err) {
      error.value = 'Failed to add charging station';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const updateStation = async (id: string, updates: Partial<ChargingStation>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // This would be an API call in a real application
      // const response = await fetch(`/api/stations/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // const data = await response.json();
      
      // For now, we'll just simulate updating
      await new Promise(resolve => setTimeout(resolve, 500));
      stations.value = stations.value.map(station => 
        station.id === id ? { ...station, ...updates } : station
      );
      
    } catch (err) {
      error.value = 'Failed to update charging station';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const deleteStation = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // This would be an API call in a real application
      // await fetch(`/api/stations/${id}`, {
      //   method: 'DELETE'
      // });
      
      // For now, we'll just simulate deletion
      await new Promise(resolve => setTimeout(resolve, 500));
      stations.value = stations.value.filter(station => station.id !== id);
      
    } catch (err) {
      error.value = 'Failed to delete charging station';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const getStationById = (id: string) => {
    return stations.value.find(station => station.id === id) || null;
  };
  
  return {
    stations,
    isLoading,
    error,
    fetchStations,
    addStation,
    updateStation,
    deleteStation,
    getStationById
  };
}

export function useStationFilters() {
  const filters = ref<StationFilters>({
    status: '',
    connectorType: '',
    minPower: null,
    maxPower: null
  });
  
  const applyFilters = (stationsList: ChargingStation[]) => {
    return stationsList.filter(station => {
      // Filter by status if specified
      if (filters.value.status && station.status !== filters.value.status) {
        return false;
      }
      
      // Filter by connector type if specified
      if (filters.value.connectorType && station.connectorType !== filters.value.connectorType) {
        return false;
      }
      
      // Filter by min power if specified
      if (filters.value.minPower !== null && station.powerOutput < filters.value.minPower) {
        return false;
      }
      
      // Filter by max power if specified
      if (filters.value.maxPower !== null && station.powerOutput > filters.value.maxPower) {
        return false;
      }
      
      return true;
    });
  };
  
  const resetFilters = () => {
    filters.value = {
      status: '',
      connectorType: '',
      minPower: null,
      maxPower: null
    };
  };
  
  return {
    filters,
    applyFilters,
    resetFilters
  };
}