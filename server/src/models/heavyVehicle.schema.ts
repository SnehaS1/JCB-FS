import mongoose, { Schema, Document } from "mongoose";
import { MaintenanceStatus } from "../constants";

export interface VehicleIntefrace extends Document {
  make: string;
  vehicleModel: string;
  vin: string;
  mileage: number;
  type: string;
  lastMaintenanceDate: Date;
  status: MaintenanceStatus;
  maximumLoadCapacity: number;
}

const VehicleSchema: Schema = new Schema({
  make: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vin: { type: String, required: true, unique: true },
  mileage: { type: Number, required: true },
  type: { type: String, required: true },
  lastMaintenanceDate: { type: Date },
  maximumLoadCapacity: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: Object.values(MaintenanceStatus),
  },
});

export default mongoose.model<VehicleIntefrace>("HeavyVehicle", VehicleSchema);
