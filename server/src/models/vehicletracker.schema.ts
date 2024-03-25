import mongoose, { Schema, Document } from "mongoose";

export interface VehicleTrackingInterface extends Document {
  vehicleId: string;
  latitude: number;
  longitude: number;
  status: string;
  timestamp: Date;
}

const VehicleTrackingSchema: Schema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<VehicleTrackingInterface>(
  "VehicleTracking",
  VehicleTrackingSchema
);
