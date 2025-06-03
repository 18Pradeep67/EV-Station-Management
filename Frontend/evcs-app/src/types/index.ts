export interface ChargingStation {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'Active' | 'Inactive' | 'Maintenance';
  powerOutput: number; // in kW
  connectorType: string;
}

export interface StationFilters {
  status: string;
  connectorType: string;
  minPower: number | null;
  maxPower: number | null;
}