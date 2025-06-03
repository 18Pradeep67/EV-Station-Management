import { ref, computed } from 'vue';
import type { ChargingStation, StationFilters } from '../types';
import { addChargingStation, allChargingStations, deleteChargingStation, updateChargingStation } from '@/api/stations.js';
import { all } from 'axios';

// This would normally fetch from an API
export function useStations() {
  const stations = ref<ChargingStation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchStations = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      stations.value = await allChargingStations(); // ← fix here
      console.log('Received in usestations', stations.value)
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
      const response = await addChargingStation(station);
      console.log(response.message);
    } catch (err) {
      if (err.response) {
        error.value = err.response.message;
        console.error("usestations", err.response.message);
        throw new Error(err.response.message); // ✅ RE-THROW
      }
      error.value = 'Failed to add charging stations';
      console.error(err);
      throw new Error('Failed to add charging stations'); // ✅ RE-THROW
    } finally {
      isLoading.value = false;
    }
  };


  const updateStation = async (station: ChargingStation) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await updateChargingStation(station);
      console.log(response.message);
    } catch (err) {
      if (err.response) {
        error.value = err.response.message;
        console.error("usestations", err.response.message);
        throw new Error(err.response.message); // ✅ RE-THROW
      }
      error.value = 'Failed to update charging stations';
      console.error(err);
      throw new Error('Failed to update charging stations'); // ✅ RE-THROW
    } finally {
      isLoading.value = false;
    }

  };

  const removeStation = async (station: ChargingStation) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deleteChargingStation(station);
    } catch (err) {
      if (err.response) {
        error.value = err.response.message;
        console.error("usestations", err.response.message);
        throw new Error(err.response.message); // ✅ RE-THROW
      }
      error.value = 'Failed to update charging stations';
      console.error(err);
      throw new Error('Failed to update charging stations'); // ✅ RE-THROW
    } finally {
      isLoading.value = false;
    }
  };

  const getStationById = (id: string) => {
    return stations.value.find(station => station.name === id) || null;
  };

  return {
    stations,
    isLoading,
    error,
    fetchStations,
    addStation,
    updateStation,
    removeStation,
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