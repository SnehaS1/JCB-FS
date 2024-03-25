import express, { Request, Response } from "express";
import VehicleTracking, {
  VehicleTrackingInterface,
} from "../models/vehicletracker.schema";
import HeavyVehicle, { VehicleIntefrace } from "../models/heavyVehicle.schema";
import { faker } from "@faker-js/faker";
// Create router
const router = express.Router();

// Get real-time status and location of vehicles
router.get("/", async (req: Request, res: Response) => {
  try {
    const vehicles = await HeavyVehicle.find();
    const vehiclesWithIoTData = await Promise.all(
      vehicles.map(async (vehicle) => {
        return {
          ...vehicle.toObject(),
          location: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
          speed: faker.string.numeric(2),
          // Add more IoT fields as needed
        };
      })
    );

    // Return the vehicles with IoT data as JSON response
    res.json(vehiclesWithIoTData);
  } catch (error) {
    console.error("Error fetching vehicles with IoT data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const delHeavy = await HeavyVehicle.deleteMany({});
    res.json({ message: "All vehicles deleted successfully" });
  } catch (error) {
    console.error("Error deleting all vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export router
export default router;
