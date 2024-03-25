import mongoose, { Schema, Document } from "mongoose";
import Post, { IPost } from "../models/post.schema";
import HeavyVehicle, { VehicleIntefrace } from "../models/heavyVehicle.schema";

// Connect to MongoDB

// Sample data for heavy vehicles
const sampleHeavyVehicles = [
  {
    make: "Volvo",
    vehicleModel: "FH16",
    registrationNumber: "ABC123",
    vin: "3D7KS28D27G718313",
    year: 2019,
    mileage: 200000,
    type: "Truck",
    lastMaintenanceDate: new Date("2021-01-01"),
    status: "Active",
  },
  {
    make: "Scania",
    vehicleModel: "R730",
    registrationNumber: "DEF456",
    vin: "5FNYF18614B031765",
    year: 2020,
    mileage: 150000,
    type: "Truck",
    lastMaintenanceDate: new Date("2021-02-01"),
    status: "Active",
  },
  // Add more sample data as needed
];

// Insert sample data into the database
async function insertSampleData() {
  try {
    await HeavyVehicle.insertMany(sampleHeavyVehicles);
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    // Close the connection after inserting sample data
  }
}

// Call the function to insert sample data
export { sampleHeavyVehicles, insertSampleData };
