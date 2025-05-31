import mongoose from "mongoose";

const chargingStationSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  powerOutput: {
    type: Number, // in kW
    required: true,
  },
  connectorType: {
    type: String,
    required: true,
  } ,
}, { 
    timestamps: true 
});

const chargingStation = mongoose.model('Charging Station',chargingStationSchema);
export default chargingStation;