import mongoose, { Schema, Document } from "mongoose";
import { MaintenanceStatus, MaintenanceType } from "../constants";

export interface VehicleMaintenanceRecordInterface extends Document {
  vehicleId: mongoose.Types.ObjectId;
  maintenanceType: MaintenanceType;
  description: string;
  maintenanceStatus: MaintenanceStatus;
  timestamp: Date;
  vehicleModel: string;
  vehicleMake: string;
}

const VehicleMaintenanceRecordSchema: Schema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  maintenanceType: {
    type: String,
    enum: Object.values(MaintenanceType),
    required: true,
  },
  maintenanceStatus: {
    type: String,
    enum: Object.values(MaintenanceStatus),
    required: true,
  },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  vehicleModel: { type: String },
  vehicleMake: { type: String },
});

export default mongoose.model<VehicleMaintenanceRecordInterface>(
  "VehicleMaintenanceRecord",
  VehicleMaintenanceRecordSchema
);
